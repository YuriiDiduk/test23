import { getStaffAction, removeStaffAction, updateStaffAction, uploadStaffPhotoAction } from "actions/staffActions";
import { Search } from "components/common/Search/Search";
import { Sorting } from "components/common/Sorting/Sorting";
import { TableCustom } from "components/common/TableCustom/TableCustom";
import { Header } from "components/layouts/Header/Header";
import { PageHeader } from "components/layouts/PageHeader/PageHeader";
import { staffColumns } from "const";
import { makeSelector } from "helpers";
import { useModal } from "hooks/useModal";
import { Page, SORT_BY } from "interfaces";
import { IProfile, Roles } from "interfaces/profile";
import * as React from "react";
import { useSelector } from "react-redux";
import { IProfileReducerState } from "store/reducers/profileReducer";
import { IStaffList, IStaffReducerState } from "store/reducers/staffReducer";
import { ModalAddEmployee } from "./ModalAddEmployee";


const Staff = () => {
  const { staff, count } = useSelector<IStaffReducerState, IStaffList>(
    makeSelector(["staffReducer", "staffList"])
  );

  const { roles } = useSelector<IProfileReducerState, IProfile>(
    makeSelector(["profileReducer", "profile"])
  );

  const isAdmin = roles[0] === Roles.admin || roles[0] === Roles.superAdmin;

  const columns = staffColumns;
  const { isOpen, openModal, closeModal } = useModal('addStaff');

  return (
    <>
      <Header>
        <Search />
      </Header>
      <div className="container">
        <PageHeader
          title="Staff"
          textBtn="Add Employee"
          handleClickBtn={openModal}
          isAccessibleAdd={isAdmin}
          isTableVirtualized
        >
          <Sorting sortDefault={SORT_BY.latest} />
        </PageHeader>
        <TableCustom
          isTableVirtualized
          columns={columns}
          rows={staff}
          rowsCount={count}
          getRowsAction={getStaffAction}
          updateDataAction={updateStaffAction}
          removeRowAction={removeStaffAction}
          updatePhotoAction={uploadStaffPhotoAction}
          isAvatarExist={true}
          roles={roles}
          itemName="staff"
          page={Page.staff}
        />
      </div>
      <ModalAddEmployee
        isOpen={isOpen}
        handleClose={closeModal}
        roles={roles}
      />
    </>
  );
};

export default Staff;
