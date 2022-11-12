import { makeSelector } from "helpers";
import {
  Status,
  IActionFn,
  IColumnData,
  IFaqTable,
  IMessagesTable,
  IStaffTable,
  MessageType,
  Page,
  Specialty,
  StatusValue,
} from "interfaces";
import { IPatientsTable, Religion } from "interfaces";
import { IPhotoList } from "interfaces/tablePhotos";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITablePhotosReducerState } from "store/reducers/tablePhotosReducer";
import TableCell from "@mui/material/TableCell";
import cn from "classnames";
import s from "./Table.module.scss";
import { EditCell } from "./EditCell";
import { useForm } from "react-hook-form";
import { useSpecialtyOptions } from "hooks/useSpecialtyOptions";
import { useRef, useState } from "react";
import format from "date-fns/format";
import { ModalConfirm } from "../Modal/ModalConfirm";
import { useModal } from "hooks/useModal";
import { Avatar } from "../Avatar/Avatar";
import { EditButtons } from "./EditButtons";
import { ClassNameMap } from "@mui/material";
import { Icon } from "../Icon";
import { BreakpointsContext } from "context/BreakpointsContext";
import { defaultValuesStaff, defaultValuesFaq } from "const";
import { defaultValuesPatients } from "const/patients";
import { UpdateTableContext } from "context/UpdateTableContext";
import { getPhoneMask } from "helpers/form";

type Props = {
  isTableVirtualized?: boolean;
  index: number;
  rowId?: string;
  keyId?: string;
  selectedRow?: string;
  idSelected: string;
  setIdSelected: (id: string) => void;
  selectRow?: (key: string) => void;
  style?: React.CSSProperties;
  tableRows: any[];
  columns: IColumnData[];
  classes: ClassNameMap<
    | "innerScrollContainer"
    | "flexContainer"
    | "cellVirtualized"
    | "cell"
    | "cellFlex"
    | "cellMessage"
  >;
  roles: string[];
  updatePhotoAction?: IActionFn<any, any>;
  updateDataAction?: IActionFn<any, any>;
  removeRowAction?: IActionFn<any, any>;
  toggleStatusPointAction?: IActionFn<any, any>;
  ethnicityGroups?: string[];
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
};

export interface FormValuesEditTable {
  avatar?: string;
  fullName?: string;
  phone?: string;
  specialty?: Specialty | string;
  ethnicity?: string;
  religion?: Religion | string;
  dateOfBirth?: any;
  title?: string;
  body?: string;
}

export const TableRow = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      isTableVirtualized,
      index,
      rowId,
      idSelected,
      keyId,
      selectedRow,
      setIdSelected,
      selectRow,
      style,
      tableRows,
      columns,
      classes,
      roles,
      updatePhotoAction,
      updateDataAction,
      removeRowAction,
      toggleStatusPointAction,
      ethnicityGroups,
      itemName,
      isLoading,
      defaultValues,
      page,
      handleOpenRoom,
      rowHeight,
    } = props;

    const photoList = useSelector<ITablePhotosReducerState, IPhotoList[]>(
      makeSelector(["tablePhotoReducer", "photoList"])
    );

    const [switchPoint, toggleSwitch] = useState({
      id: "",
      isActive: StatusValue.inactive,
    });

    const stateName =
      switchPoint.isActive === StatusValue.active
        ? Status.inactive
        : Status.active;

    const { isMobile } = React.useContext(BreakpointsContext);

    const { updateTable } = React.useContext(UpdateTableContext);

    const photoId = tableRows.length && tableRows[index]?.photo?.uuid;
    const avatar =
      photoId && photoList?.length
        ? photoList.find((item) => item.id === photoId)?.photo
        : "";

    const { isOpen, openModal, closeModal } = useModal("confirmDelete");

    const {
      isOpen: isOpenModalSwitch,
      openModal: openModalSwitch,
      closeModal: closeModalSwitch,
    } = useModal("confirmSwitch");

    const handleOpenModalSwitch = (id: string, isActive: StatusValue) => () => {
      openModalSwitch();
      toggleSwitch({
        id,
        isActive: isActive,
      });
    };

    const isSelected = rowId
      ? !isOpen && idSelected === rowId
      : selectedRow === keyId;

    const editBtnsRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const {
      handleSubmit,
      control,
      setValue,
      reset,
      resetField,
      formState: { errors, isDirty, dirtyFields },
    } = useForm<FormValuesEditTable>({
      defaultValues,
    });

    const { options: specialtyOptions } = useSpecialtyOptions(
      roles,
      resetField
    );

    const onSubmit = (data: FormValuesEditTable) => {
      const { avatar, dateOfBirth, phone, specialty, title, body, ...rest } =
        data;

      const isChangedAvatarOnly =
        dirtyFields.avatar && Object.keys(dirtyFields).length === 1;

      const getData = () => {
        if (page === Page.staff) {
          return {
            fullName: data.fullName,
            phone: data.phone,
            specialty,
          };
        }

        if (page === Page.patients) {
          return {
            ...rest,
            phone: phone?.replace(/[\s_]/g, ""),
            dateOfBirth:
              typeof dateOfBirth === "string"
                ? dateOfBirth
                : format(dateOfBirth, "MM/dd/yyyy"),
          };
        }

        if (page === Page.helpCentre) {
          return {
            title,
            body,
          };
        }
      };

      const userData = {
        data: getData(),
        id: idSelected,
      };

      const fileData = {
        data: {
          file: avatar,
        },
        id: idSelected,
      };

      const handleRedirect = () => {
        updateTable();
        setIdSelected("");
        selectRow && selectRow("");
      };

      if (updatePhotoAction && avatar && isChangedAvatarOnly) {
        dispatch(updatePhotoAction(fileData, { redirect: handleRedirect }));
      }
      if (updatePhotoAction && avatar && !isChangedAvatarOnly) {
        dispatch(updatePhotoAction(fileData));
      }
      if (!isChangedAvatarOnly && updateDataAction) {
        dispatch(updateDataAction(userData, { redirect: handleRedirect }));
      }
    };

    const onEdit =
      (key: string = "", row: IStaffTable | IPatientsTable | IFaqTable) =>
      () => {
        selectRow && selectRow(key);
        setIdSelected(row.uuid);
        if (defaultValues) setValue("avatar", row.avatar);
        setValue("fullName", row.fullName);
        setValue("phone", row.phone);
        setValue("specialty", row.specialty);
        setValue(
          "ethnicity",
          ethnicityGroups?.includes(row.ethnicity) ? row.ethnicity : ""
        );
        setValue("religion", row.religion);
        setValue("dateOfBirth", row.dateOfBirth);
        setValue("title", row.title);
        setValue("body", row.body);
      };

    const onDelete = (id: string) => () => {
      openModal();
      setIdSelected(id);
    };

    const removeRow = () => {
      const handleRedirect = () => {
        updateTable();
        closeModal();
      };

      removeRowAction &&
        dispatch(removeRowAction(idSelected, { redirect: handleRedirect }));
    };

    const onCancel = () => {
      selectRow && selectRow("");
      setIdSelected("");
      reset();
    };

    const handleCloseModalConfirm = () => {
      setIdSelected("");
      closeModal();
    };

    const handleSwitchConfirm = () => {
      const handleRedirect = () => {
        updateTable();
        closeModalSwitch();
      };

      const data = {
        ...switchPoint,
        isActive:
          switchPoint.isActive === StatusValue.active
            ? StatusValue.inactive
            : StatusValue.active,
      };

      toggleStatusPointAction &&
        dispatch(toggleStatusPointAction(data, { redirect: handleRedirect }));
    };

    const handleRowClick =
      (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (
          handleOpenRoom &&
          e.target instanceof Node &&
          !editBtnsRef?.current?.contains(e.target)
        ) {
          const id = tableRows[index].roomId
            ? tableRows[index].roomId
            : tableRows[index].uuid;
          handleOpenRoom && handleOpenRoom(id);
        }
      };

    const cellStyle = (
      width: number | undefined,
      widthMobile: number | undefined,
      maxWidth: string | undefined,
      style: {} = {}
    ) => {
      if (isTableVirtualized) {
        return {
          ...style,
          height: rowHeight,
          minWidth: `${width}px`,
        };
      } else {
        if (width && (!widthMobile || !isMobile)) {
          return {
            ...style,
            width: `${width}px`,
          };
        }

        if (widthMobile && isMobile) {
          return {
            ...style,
            width: `${widthMobile}px`,
          };
        }
        if (maxWidth)
          return {
            ...style,
            maxWidth: `${maxWidth}`,
          };
      }
      return style;
    };

    const isReplyMessage =
      page === Page.messaging && tableRows[index]?.type === MessageType.answer;

    const cellRender = () => {
      return columns.map(
        ({
          dataKey,
          width,
          widthMobile,
          maxWidth,
          editable,
          shrink,
          maxWidthText,
          className,
          style,
        }: IColumnData) => {
          const row: IStaffTable | IPatientsTable | IFaqTable | IMessagesTable =
            tableRows.length && tableRows[index];

          const rowEdit: IStaffTable | IPatientsTable | IFaqTable =
            tableRows.length && tableRows[index];

          const cellData =
            row[dataKey] && row[dataKey] !== "" ? row[dataKey] : undefined;

          const renderCellData = () => {
            switch (dataKey) {
              case "avatar":
                return (
                  <div>
                    <Avatar avatar={avatar} />
                  </div>
                );
              case "edit":
                return (
                  <EditButtons
                    onEdit={onEdit(keyId, rowEdit)}
                    onDelete={onDelete(row.uuid)}
                    className={className}
                    isTableVirtualized={isTableVirtualized}
                    page={page}
                    isActive={row.isActive}
                    handleSwitchClick={handleOpenModalSwitch(
                      row.uuid,
                      row.isActive ? StatusValue.active : StatusValue.inactive
                    )}
                    ref={editBtnsRef}
                  />
                );
              case "titleIcon":
                return <Icon icon="grab" className={s.faqTitleIcon} />;
              case "status":
                return isReplyMessage ? (
                  <Icon icon="union" className={s.answered} />
                ) : (
                  <span
                    className={cn(
                      s.notAnswered,
                      row.isRead ? s.read : s.unread
                    )}
                  ></span>
                );
              case "text":
                return (
                  <span
                    className={cn(maxWidthText && s.cellData, s.textMessage)}
                    style={{ maxWidth: maxWidthText }}
                  >
                    {isReplyMessage && (
                      <Icon icon="reply" className={s.replyIcon} />
                    )}
                    <span className={s.reply}>{cellData}</span>
                  </span>
                );
              case "phone":
                return (
                  <span
                    className={cn(
                      maxWidthText && s.cellData,
                      className && s[className]
                    )}
                    style={{ maxWidth: maxWidthText }}
                  >
                    {cellData && getPhoneMask(cellData)}
                  </span>
                );
              default:
                return (
                  <>
                    <span
                      className={cn(
                        maxWidthText && s.cellData,
                        className && s[className]
                      )}
                      style={{ maxWidth: maxWidthText }}
                    >
                      {cellData}
                    </span>
                  </>
                );
            }
          };

          return (
            <TableCell
              key={dataKey}
              component="div"
              className={cn(
                classes.flexContainer,
                isTableVirtualized ? classes.cellVirtualized : classes.cell,
                !shrink && isTableVirtualized && classes.cellFlex,
                !shrink && page === Page.messaging && classes.cellMessage
              )}
              variant="body"
              style={cellStyle(width, widthMobile, maxWidth, style)}
            >
              {isSelected && editable ? (
                <EditCell
                  dataKey={dataKey}
                  control={control}
                  errors={errors}
                  onCancel={onCancel}
                  isLoading={isLoading}
                  avatar={avatar}
                  ethnicityGroups={ethnicityGroups}
                  specialtyOptions={specialtyOptions}
                  isDirty={isDirty}
                  className={className}
                />
              ) : (
                <>{renderCellData()}</>
              )}
            </TableCell>
          );
        }
      );
    };

    return (
      <div key={rowId} className={s.row} style={style}>
        {isSelected ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form-table">
            <div className={cn(s.flexRow, s.selected)} ref={ref}>
              {cellRender()}
            </div>
          </form>
        ) : (
          <div
            className={cn(s.flexRow, handleOpenRoom && s.clickable)}
            onClick={handleRowClick(index)}
          >
            {cellRender()}
          </div>
        )}
        <ModalConfirm
          title={`Do you really want to delete this ${itemName} from the database?`}
          btnCancel="No, cancel"
          iconCancel="close"
          btnConfirm="Yes, delete"
          iconConfirm="trash"
          isOpen={isOpen}
          handleClose={handleCloseModalConfirm}
          handleConfirm={removeRow}
          isLoading={isLoading}
        >
          <p
            className={cn("h3", "modal-text")}
          >{`All ${itemName} data will be lost forever`}</p>
        </ModalConfirm>
        {itemName && (
          <ModalConfirm
            title={`Mark as ${stateName}?`}
            btnCancel="No, cancel"
            btnConfirm={`Yes, mark as ${stateName}`}
            iconCancel="close"
            cancelFilled={false}
            isOpen={isOpenModalSwitch}
            handleClose={closeModalSwitch}
            handleConfirm={handleSwitchConfirm}
            isLoading={isLoading}
          >
            <p
              className={cn("h3", "modal-text")}
            >{`This ${itemName} will be displayed in the ${stateName} ${
              itemName?.charAt(0).toUpperCase() + itemName.slice(1)
            }s list`}</p>
          </ModalConfirm>
        )}
      </div>
    );
  }
);
