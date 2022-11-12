import { ModalWindow } from "components/common/Modal/ModalWindow";
import { useModal } from "hooks/useModal";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FieldsGroup } from "components/common/Form/FieldsGroup";
import { FormTextInput } from "components/common/Form/FormElements/FormTextInput";
import { UploadAvatar } from "components/common/UploadAvatar/UploadAvatar";
import {
  DATE_VALIDATION,
  EMAIL_VALIDATION,
  NOT_EMPTY_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_PATTERN,
  PHONE_VALIDATION,
} from "const";
import { ModalConfirmRemoveAvatar } from "components/common/Modal/ModalConfirmRemoveAvatar";
import { FormSelect } from "components/common/Form/FormElements/FormSelect";
import { FormPasswordInput } from "components/common/Form/FormElements/FormPasswordInput";
import { Button } from "components/common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTableContext } from "context/UpdateTableContext";
import { useContext } from "react";
import { useLoading } from "hooks/useLoading";
import { IPatientCreate, IPatientPhoto } from "interfaces";
import { createPatientAction } from "actions/patientsActions";
import { religionOptions } from "const/patients";
import { makeSelector } from "helpers";
import { IPatientsReducerState } from "store/reducers/patientsReducer";
import { FormDatePicker } from "components/common/Form/FormElements/FormDatePicker";
import { format } from "date-fns";

type Props = {
  isOpen: boolean;
  handleClose(): void;
  roles: string[];
};

export interface IFormValuesAddPatient extends IPatientCreate {
  avatar: File | string;
}

export const ModalAddPatient = ({ isOpen, handleClose, roles }: Props) => {
  const ethnicityGroups = useSelector<IPatientsReducerState, string[]>(
    makeSelector(["patientsReducer", "ethnicityGroups"])
  );

  const dispatch = useDispatch();
  const { updateTable } = useContext(UpdateTableContext);
  const isLoading = useLoading("patientsReducer");

  const defaultValues: IFormValuesAddPatient = {
    avatar: "",
    fullName: "",
    dateOfBirth: null,
    phone: "",
    ethnicity: "",
    email: "",
    password: "",
    religion: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm<IFormValuesAddPatient>({
    defaultValues,
  });

  const {
    isOpen: isOpenConfirm,
    openModal: openModalConfirm,
    closeModal: closeModalConfirm,
  } = useModal("confirm");

  const onClose = () => {
    handleClose();
    reset();
  };

  const handleRedirect = () => {
    updateTable();
    onClose();
  };

  const onSubmit: SubmitHandler<IPatientCreate & IPatientPhoto> = (data) => {
    const { avatar, phone, dateOfBirth, ...rest } = data;

    const sendData = {
      ...rest,
      phone: phone.replace(/[\s_]/g, ""),
      file: avatar,
      dateOfBirth: format(dateOfBirth, "MM/dd/yyyy"),
    };

    dispatch(createPatientAction(sendData, { redirect: handleRedirect }));
  };

  return (
    <>
      <ModalWindow
        title="Create New Patient"
        isOpen={isOpen}
        handleClose={onClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
          <div className="upload">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value, onChange } }) => {
                return (
                  <UploadAvatar
                    name="avatar"
                    value={value}
                    onChange={onChange}
                    isProfile={true}
                    removeAvatar={openModalConfirm}
                  />
                );
              }}
            />
          </div>
          <FieldsGroup>
            <Controller
              control={control}
              name="fullName"
              rules={NOT_EMPTY_VALIDATION}
              render={({ field }) => {
                return (
                  <FormTextInput
                    {...field}
                    name="fullName"
                    placeholder="Full Name"
                    error={errors.fullName}
                    label="*Full Name"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              rules={DATE_VALIDATION}
              render={({ field }) => {
                return (
                  <FormDatePicker
                    {...field}
                    name="dateOfBirth"
                    placeholder="00/00/0000"
                    error={errors.dateOfBirth}
                    label="*Date of Birth"
                    minAge={18}
                  />
                );
              }}
            />
          </FieldsGroup>
          <FieldsGroup>
            <Controller
              control={control}
              name="phone"
              rules={PHONE_VALIDATION}
              render={({ field }) => {
                return (
                  <FormTextInput
                    {...field}
                    name="phone"
                    label="*Phone Number"
                    inputMask={PHONE_PATTERN}
                    error={errors.phone}
                    placeholder="Phone"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="ethnicity"
              rules={NOT_EMPTY_VALIDATION}
              render={({ field }) => {
                return (
                  <FormSelect
                    {...field}
                    name="ethnicity"
                    label="*Ethnicity"
                    placeholder="Select"
                    options={ethnicityGroups}
                    error={errors.ethnicity}
                  />
                );
              }}
            />
          </FieldsGroup>
          <FieldsGroup>
            <Controller
              control={control}
              name="email"
              rules={EMAIL_VALIDATION}
              render={({ field }) => {
                return (
                  <FormTextInput
                    {...field}
                    name="email"
                    placeholder="Email"
                    error={errors.email}
                    label="*Email"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="religion"
              render={({ field }) => {
                return (
                  <FormSelect
                    {...field}
                    name="religion"
                    label="Religion"
                    placeholder="Select"
                    options={religionOptions}
                  />
                );
              }}
            />
          </FieldsGroup>
          <FieldsGroup>
            <Controller
              control={control}
              name="password"
              rules={PASSWORD_VALIDATION}
              render={({ field }) => {
                return (
                  <FormPasswordInput
                    {...field}
                    name="password"
                    error={errors.password}
                    label="*Password"
                    placeholder="Password"
                  />
                );
              }}
            />
            <Button
              type="submit"
              size="long"
              value="Add Patient"
              onClick={handleSubmit(onSubmit)}
              className="submit-btn"
              isLoading={isLoading}
            />
          </FieldsGroup>
        </form>
      </ModalWindow>
      <ModalConfirmRemoveAvatar
        isOpen={isOpenConfirm}
        closeModal={closeModalConfirm}
        resetField={resetField}
      />
    </>
  );
};
