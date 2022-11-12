import {
  getPatientsAction,
  removePatientAction,
  updatePatientAction,
  toggleStatusPatientAction,
} from "actions/patientsActions";
import { Filter } from "components/common/Filter/Filter";
import { Search } from "components/common/Search/Search";
import { Sorting } from "components/common/Sorting/Sorting";
import { TableCustom } from "components/common/TableCustom/TableCustom";
import { TableRoom } from "components/common/TableCustom/TableRoom";
import { Header } from "components/layouts/Header/Header";
import { PageHeader } from "components/layouts/PageHeader/PageHeader";
import { filterPatientsOptions, patientsColumns } from "const";
import { makeSelector } from "helpers";
import { useModal } from "hooks/useModal";
import { Status, Page } from "interfaces";
import { IProfile, Roles } from "interfaces/profile";
import * as React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  IPatientsList,
  IPatientsReducerState,
} from "store/reducers/patientsReducer";
import { IProfileReducerState } from "store/reducers/profileReducer";
import { ModalAddPatient } from "./ModalAddPatient";
import { PatientRoom } from "./PatientRoom";

const Patients = () => {
  const { result, count } = useSelector<IPatientsReducerState, IPatientsList>(
    makeSelector(["patientsReducer", "patientsList"])
  );

  const { roles } = useSelector<IProfileReducerState, IProfile>(
    makeSelector(["profileReducer", "profile"])
  );

  const ethnicityGroups = useSelector<IPatientsReducerState, string[]>(
    makeSelector(["patientsReducer", "ethnicityGroups"])
  );

  const navigate = useNavigate();

  const isAdmin = roles[0] === Roles.admin || roles[0] === Roles.superAdmin;

  const columns = patientsColumns;
  const { isOpen, openModal, closeModal } = useModal("addPatient");

  const handleOpenRoom = (id: string) => {
    navigate(`${id}`);
  };

  const handleCloseRoom = () => {
    navigate(-1);
  };

  const renderRoom = () => {
    return (
      <TableRoom backText="Back to list" handleClose={handleCloseRoom}>
        <PatientRoom />
      </TableRoom>
    );
  };

  return (
    <>
      <Header>
        <Search />
      </Header>
      <div className="container">
        <PageHeader
          title="Patients"
          textBtn="Add Patient"
          handleClickBtn={openModal}
          isAccessibleAdd={isAdmin}
          isTableVirtualized
          page={Page.patients}
        >
          <>
            <Sorting />
            <Filter
              options={filterPatientsOptions}
              defaultValue={Status.active}
            />
          </>
        </PageHeader>
        <TableCustom
          isTableVirtualized
          columns={columns}
          rows={result}
          rowsCount={count}
          getRowsAction={getPatientsAction}
          updateDataAction={updatePatientAction}
          removeRowAction={removePatientAction}
          toggleStatusPointAction={toggleStatusPatientAction}
          isAvatarExist={true}
          statusDefault={Status.active}
          ethnicityGroups={ethnicityGroups}
          roles={roles}
          itemName="patient"
          page={Page.patients}
          handleOpenRoom={handleOpenRoom}
        />
      </div>
      <ModalAddPatient isOpen={isOpen} handleClose={closeModal} roles={roles} />
      <Routes>
        <Route path=":id" element={renderRoom()} />
      </Routes>
    </>
  );
};

export default Patients;
