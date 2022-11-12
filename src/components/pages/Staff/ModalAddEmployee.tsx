import { ModalWindow } from 'components/common/Modal/ModalWindow';
import { useModal } from 'hooks/useModal';
import { IStaffCreate, IStaffPhoto, Specialty } from 'interfaces';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldsGroup } from 'components/common/Form/FieldsGroup';
import { FormTextInput } from 'components/common/Form/FormElements/FormTextInput';
import { UploadAvatar } from 'components/common/UploadAvatar/UploadAvatar';
import { EMAIL_VALIDATION, NOT_EMPTY_VALIDATION, PHONE_PATTERN, PHONE_VALIDATION } from 'const';
import { ModalConfirmRemoveAvatar } from 'components/common/Modal/ModalConfirmRemoveAvatar';
import { FormSelect } from 'components/common/Form/FormElements/FormSelect';
import { Button } from 'components/common/Button/Button';
import { useDispatch } from 'react-redux';
import { createStaffAction } from 'actions/staffActions';
import { UpdateTableContext } from 'context/UpdateTableContext';
import { useContext } from 'react';
import { useLoading } from 'hooks/useLoading';
import { useSpecialtyOptions } from 'hooks/useSpecialtyOptions';

type Props = {
  isOpen: boolean;
  handleClose(): void;
  roles: string[];
};

export interface IFormValuesAddEmployee {
  avatar: File | string;
  fullName: string;
  specialty: Specialty | string;
  phone: string;
  email: string;
  password: string;
}

export const ModalAddEmployee = ({ isOpen, handleClose, roles }: Props) => {  
  const dispatch = useDispatch();
  const { updateTable } = useContext(UpdateTableContext);
  const isLoading = useLoading("staffReducer");

  const defaultValues: IFormValuesAddEmployee = {
    avatar: "",
    fullName: "",
    specialty: "",
    phone: "",
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm<IFormValuesAddEmployee>({
    defaultValues,
  });

  const {options} = useSpecialtyOptions(roles, resetField);

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
  }

  const onSubmit: SubmitHandler<IStaffCreate & IStaffPhoto> = (data) => {
    const { avatar, phone, ...rest } = data;

    const sendData = {
      ...rest,
      phone: phone.replace(/[\s_]/g, ""),
      photo: avatar,
    };

    dispatch(createStaffAction(sendData, { redirect: handleRedirect }));
  };

  return (
    <>
      <ModalWindow
        title="Create New Employee"
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
              name="specialty"
              rules={NOT_EMPTY_VALIDATION}
              render={({ field }) => {
                return (
                  <FormSelect
                    {...field}
                    name="specialty"
                    label="*Position"
                    options={options}
                    error={errors.specialty}
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
          </FieldsGroup>
          <FieldsGroup>
            <Button
              type="submit"
              size="long"
              value="Add Employee"
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