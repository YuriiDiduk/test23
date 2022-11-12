import * as React from "react";
import {
  AutoSizer,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps,
} from "react-virtualized";

import { IColumnData, Page } from "interfaces/tableData";
import { IActionFn } from "interfaces";
import { QueryParams } from "interfaces";
import { useDispatch } from "react-redux";
import { defaultValuesFaq, defaultValuesStaff, QueryDef } from "const";
import { debounce } from "lodash";
import { TableRow } from "./TableRow";
import { ClassNameMap } from "@mui/material";
import { defaultValuesPatients } from "const/patients";
import { UpdateTableContext } from "context/UpdateTableContext";

interface IProps {
  columns: IColumnData[];
  rowsCount: number;
  idSelected: string;
  setIdSelected: (id: string) => void;
  selectedRow: string;
  selectRow: (key: string) => void;
  tableRows: any[];
  getRowsAction: IActionFn<QueryParams, any>;
  updateDataAction?: IActionFn<any, any>;
  updatePhotoAction?: IActionFn<any, any>;
  removeRowAction?: IActionFn<any, any>;
  toggleStatusPointAction?: IActionFn<any, any>;
  classes: ClassNameMap<
    | "innerScrollContainer"
    | "flexContainer"
    | "cellVirtualized"
    | "cell"
    | "cellFlex"
    | "cellMessage"
  >;
  ethnicityGroups?: string[];
  roles: string[];
  params: QueryParams;
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
  itemName?: string;
  defaultValues:
    | typeof defaultValuesStaff
    | typeof defaultValuesPatients
    | typeof defaultValuesFaq
    | {};
  isLoading: boolean;
  page: Page;
  handleOpenRoom?: (id: string) => void;
  rowHeight?: number;
}

export const TableVirtualized = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const {
    columns,
    rowsCount,
    idSelected,
    setIdSelected,
    selectedRow,
    selectRow,
    tableRows,
    getRowsAction,
    updateDataAction,
    updatePhotoAction,
    removeRowAction,
    toggleStatusPointAction,
    classes,
    ethnicityGroups,
    roles,
    params,
    setParams,
    itemName,
    defaultValues,
    isLoading,
    page,
    handleOpenRoom,
    rowHeight = 60,
  } = props;

  const {
    isUpdating,
    updateFinish,
  } = React.useContext(UpdateTableContext);

  const dispatch = useDispatch();

  const isRowLoaded = ({ index }: Index) => {
    return !!tableRows[index];
  };

  const limit = QueryDef.LIMIT;

  const handleRedirect = (nextPage: number, pageCount: number) => {
    if (
      (pageCount < 3 && nextPage === pageCount) ||
      (pageCount >= 3 && nextPage >= 3)
    ) {
      setTimeout(() => {
        updateFinish(); 
      }, 2000);
    }
  };

  const loadMoreRows = debounce(
    ({ startIndex, stopIndex = rowsCount }: IndexRange) => {
      const currentPage = params.page ? params.page : 1;
      const pageCount = Math.ceil(rowsCount / limit);

      if (currentPage < pageCount) {
        const nextPage = currentPage + 1;

        dispatch(
          getRowsAction(
            {
              ...params,
              page: nextPage,
            },
            { redirect: () => handleRedirect(nextPage, pageCount) }
          )
        );

        setParams((params: QueryParams) => {
          return {
            ...params,
            page: nextPage,
          };
        });
      } else {
        if (isUpdating) updateFinish();
      }

      return Promise.resolve();
    },
    200
  );

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    return (
      <TableRow
        isTableVirtualized
        index={index}
        key={key}
        keyId={key}
        selectedRow={selectedRow}
        idSelected={idSelected}
        selectRow={selectRow}
        setIdSelected={setIdSelected}
        style={style}
        tableRows={tableRows}
        columns={columns}
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
        ref={ref}
        handleOpenRoom={handleOpenRoom}
        rowHeight={rowHeight}
      />
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows as any}
      rowCount={10000}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={registerChild}
              width={width}
              height={height}
              onRowsRendered={onRowsRendered}
              rowHeight={rowHeight}
              rowCount={tableRows.length}
              rowRenderer={rowRenderer}
              style={{outline: "none"}}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
});
