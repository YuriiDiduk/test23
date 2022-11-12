import * as React from "react";

import TableCell from "@mui/material/TableCell";
import { withStyles, WithStyles } from "@mui/styles";
import { Theme, createTheme } from "@mui/material/styles";
import cn from "classnames";
import s from "./Table.module.scss";
import { useContext, useEffect, useState } from "react";
import { IColumnData, Page, SORT_BY, Status } from "interfaces";
import { usePrevious } from "hooks/usePrevious";
import { IActionFn } from "interfaces";
import { QueryParams } from "interfaces";
import { useDispatch } from "react-redux";
import {
  defaultValuesFaq,
  defaultValuesStaff,
  defaultValuesPatients,
  QueryDef,
  pointStatuses,
} from "const";
import { UpdateTableContext } from "context/UpdateTableContext";
import {
  getTablePhotoAction,
  resetTablePhotosAction,
} from "actions/tablePhotosActions";
import { TableRow } from "./TableRow";
import { TableVirtualized } from "./TableVirtualized";
import { RESET_TABLE } from "const/actionTypes/tableTypes";
import { useLoading } from "hooks/useLoading";
import { useInView } from "react-intersection-observer";
import { isEqual } from "lodash";
import LoadingDots from "../LoadingDots/LoadingDots";
import { Roles } from "interfaces/profile";

const styles = (theme: Theme) =>
  ({
    innerScrollContainer: {
      overflow: "auto",
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
    },
    cellVirtualized: {
      fontSize: "14px",
      whiteSpace: "nowrap",
      padding: "16px 2px",
    },
    cell: {
      fontSize: "14px",
      padding: "16px",
    },
    cellFlex: {
      flex: "1",
      padding: "16px 2px",
    },
    cellMessage: {
      maxWidth: "calc(100% - 450px)",
      minWidth: "200px",
      paddingRight: "10px",
    },
  } as const);

export interface IObjectKeys {
  [key: string]: string;
}
interface IProps extends WithStyles<typeof styles> {
  isTableVirtualized?: boolean;
  columns: IColumnData[];
  rows: any[];
  rowsCount?: number;
  getRowsAction: IActionFn<QueryParams, any>;
  updateDataAction?: IActionFn<any, any>;
  updatePhotoAction?: IActionFn<any, any>;
  removeRowAction?: IActionFn<any, any>;
  toggleStatusPointAction?: IActionFn<any, any>;
  isAvatarExist?: boolean;
  sortDefault?: SORT_BY;
  statusDefault?: Status;
  ethnicityGroups?: string[];
  roles: string[];
  withHeading?: boolean;
  isStriped?: boolean;
  className?: string;
  itemName?: string;
  page: Page;
  handleOpenRoom?: (id: string) => void;
  rowHeight?: number;
}

const Table = (props: IProps) => {
  const {
    isTableVirtualized = false,
    columns,
    rows,
    rowsCount,
    getRowsAction,
    updateDataAction,
    removeRowAction,
    updatePhotoAction,
    toggleStatusPointAction,
    classes,
    isAvatarExist = false,
    sortDefault = QueryDef.SORT_BY,
    statusDefault,
    ethnicityGroups,
    roles,
    withHeading = true,
    isStriped = true,
    className,
    itemName,
    page,
    handleOpenRoom,
    rowHeight,
  } = props;

  const defaultParams = () => {
    let params: QueryParams = { page: 1 };
    if (sortDefault && sortDefault !== QueryDef.SORT_BY) {
      params = {
        ...params,
        sort: sortDefault,
      };
    }

    if (statusDefault && statusDefault !== Status.all) {
      const value = pointStatuses.find((i) => i.label === statusDefault)?.value;

      params = {
        ...params,
        isActive: value,
      };
    }
    return params;
  };

  const [params, setParams] = useState<QueryParams>(defaultParams);
  const [isUpdate, setUpdate] = useState(false);
  const [rowsIsGot, setRows] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const {
    isUpdating,
    updateFinish,
    updateTable,
    params: paramsOuter,
    resetParams,
  } = useContext(UpdateTableContext);

  const prevRows = usePrevious<any[]>(rows);
  const prevCount = usePrevious(rowsCount);

  const [tableRows, setTableRows] = useState<any[]>(rows);

  const dispatch = useDispatch();

  const getPhoto = (rows: any[]) => {
    isAvatarExist &&
      rows.forEach((row) => {
        if (row.photo?.uuid) {
          dispatch(getTablePhotoAction(row.photo.uuid));
        }
      });
  };

  const [idSelected, setIdSelected] = useState("");
  const [selectedRow, selectRow] = useState<string>("");
  const [ref, inView] = useInView();

  const isAdmin = roles[0] === Roles.admin || roles[0] === Roles.superAdmin;
  const col =
    isAdmin || page !== Page.staff
      ? columns
      : columns.filter(({ dataKey }) => dataKey !== "edit");

  const defineFormValues = () => {
    switch (page) {
      case Page.staff:
        return defaultValuesStaff;
      case Page.patients:
        return defaultValuesPatients;
      case Page.helpCentre:
        return defaultValuesFaq;
      case Page.messaging:
        return {};
    }
  };

  const defaultValues = defineFormValues();

  const defineReducer = () => {
    switch (page) {
      case Page.staff:
        return "staffReducer";
      case Page.patients:
        return "patientsReducer";
      case Page.helpCentre:
        return "faqReducer";
      case Page.messaging:
        return "messgingReducer";
    }
  };

  const isLoading = useLoading(defineReducer());

  const limit = QueryDef.LIMIT;

  useEffect(() => {
    updateTable();
    isAvatarExist && dispatch(resetTablePhotosAction(null));
    return () => {
      dispatch({ type: RESET_TABLE });
      resetParams();
      updateFinish();
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      setIdSelected("");
      selectRow("");
    }
  }, [inView]);

  useEffect(() => {
    if (prevCount && !rowsCount) {
      updateFinish();
    }
  }, [rowsCount]);

  useEffect(() => {
    const isEquality = isEqual(prevRows, rows);

    if (
      (!isUpdate && !prevRows?.length && rows?.length) ||
      (!isUpdate && prevRows?.length && !rows?.length) ||
      (!isUpdate && prevRows?.length && rows[0].uuid !== prevRows[0].uuid)
    ) {
      setTableRows((tableRows) => {
        return [...tableRows, ...rows];
      });

      getPhoto(rows);
    }

    if ((isUpdate && !isEquality) || (isUpdate && isEquality && rowsIsGot)) {
      setTableRows([...rows]);
      setUpdate(false);
      setRows(false);

      isAvatarExist && dispatch(resetTablePhotosAction(null));
      getPhoto(rows);

      const pageCount = rowsCount ? Math.ceil(rowsCount / limit) : null;
      if (!isTableVirtualized || pageCount === 1 || rowsCount === 0)
        updateFinish();
      rowsCount === 0 ? setNotFound(true) : setNotFound(false);
    }
  }, [rows]);

  const updateTableRows = (paramsOuter = {}) => {
    setParams((params) => {
      return {
        ...params,
        ...paramsOuter,
        page: 1,
      };
    });

    if (isUpdating) {
      setUpdate(true);
    }

    dispatch(
      getRowsAction(
        { ...params, ...paramsOuter, page: 1 },
        { redirect: () => setRows(true) }
      )
    );
  };

  useEffect(() => {
    if (isUpdating) {
      updateTableRows(paramsOuter);
      setIdSelected("");
      selectRow("");
    }
  }, [isUpdating]);

  const headerRenderer = () => {
    return (
      <div className={cn(s.flexRow, s.row, s.header)}>
        {col.map(({ dataKey, label, width, shrink }: IColumnData) => {
          return (
            <TableCell
              key={dataKey}
              component="div"
              className={cn(
                classes.flexContainer,
                isTableVirtualized ? classes.cellVirtualized : classes.cell,
                !shrink && isTableVirtualized && classes.cellFlex
              )}
              variant="head"
              style={{ height: 60, minWidth: `${width}px` }}
            >
              <span>{label}</span>
            </TableCell>
          );
        })}
      </div>
    );
  };

  const renderTable = () => {
    return isTableVirtualized ? (
      <TableVirtualized
        columns={col}
        rowsCount={rowsCount ? rowsCount : 0}
        idSelected={idSelected}
        setIdSelected={setIdSelected}
        selectedRow={selectedRow}
        selectRow={selectRow}
        tableRows={tableRows}
        getRowsAction={getRowsAction}
        updateDataAction={updateDataAction}
        updatePhotoAction={updatePhotoAction}
        removeRowAction={removeRowAction}
        toggleStatusPointAction={toggleStatusPointAction}
        classes={classes}
        ethnicityGroups={ethnicityGroups}
        roles={roles}
        params={params}
        setParams={setParams}
        itemName={itemName}
        defaultValues={defaultValues}
        isLoading={isLoading}
        ref={ref}
        page={page}
        handleOpenRoom={handleOpenRoom}
        rowHeight={rowHeight}
      />
    ) : (
      <>
        {tableRows.map((row, index) => {
          return (
            <TableRow
              index={index}
              key={row.uuid}
              rowId={row.uuid}
              idSelected={idSelected}
              setIdSelected={setIdSelected}
              tableRows={tableRows}
              columns={col}
              classes={classes}
              roles={roles}
              updatePhotoAction={updatePhotoAction}
              updateDataAction={updateDataAction}
              ethnicityGroups={ethnicityGroups}
              removeRowAction={removeRowAction}
              toggleStatusPointAction={toggleStatusPointAction}
              itemName={itemName}
              defaultValues={defaultValues}
              isLoading={isLoading}
              page={page}
              handleOpenRoom={handleOpenRoom}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={cn(s.wrapper, className && s[className])}>
      {tableRows.length ? (
        <div className={cn(s.inner, isStriped && s.striped)}>
          {withHeading && headerRenderer()}
          <div className={s.rows}>{renderTable()}</div>
        </div>
      ) : (
        <div className={s.empty}>
          {notFound ? (
            <span>Not Found</span>
          ) : (
            <div className={s.loading}>
              <LoadingDots isLight={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const defaultTheme = createTheme();
export const TableCustom = withStyles(styles, { defaultTheme })(Table);
