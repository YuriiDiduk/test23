import { Button } from 'components/common/Button/Button';
import { FieldsGroup } from 'components/common/Form/FieldsGroup';
import { FormPasswordInput } from 'components/common/Form/FormElements/FormPasswordInput';
import { FormTextInput } from 'components/common/Form/FormElements/FormTextInput';
import { ModalWindow } from 'components/common/Modal/ModalWindow';
import { UploadAvatar } from 'components/common/UploadAvatar/UploadAvatar';
import { CONFIRM_PASSWORD_VALIDATION, EMAIL_VALIDATION, PHONE_VALIDATION, NOT_EMPTY_VALIDATION, PASSWORD_VALIDATION, PHONE_PATTERN } from 'const';
import { useModal } from 'hooks/useModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from "./Settings.module.scss";
import cn from "classnames";
import { ModalConfirmRemoveAvatar } from 'components/common/Modal/ModalConfirmRemoveAvatar';
import { useDispatch } from 'react-redux';
import { IProfile } from 'interfaces/profile';
import { changePasswordAction, removePhotoAction, updateProfileAction, uploadPhotoAction } from 'actions/profileActions';
import { usePrevious } from 'hooks/usePrevious';
import { useLoading } from 'hooks/useLoading';

type Props = {
  profile: IProfile;
  file: string;
  isOpen: boolean;
  handleClose(): void;
};

export interface IFormValuesModalSettings {
  avatar: File | string | null;
  fullName: string;
  email: string;
  phone: string;
  old_password: string;
  new_password: string;
  passConfirm: string;
}

export const ModalSettings = ({profile, file, isOpen, handleClose}: Props) => {
  const {fullName, email, phone } = profile;

  const prevFile = usePrevious(file);

  const isLoading = useLoading("profileReducer");

  const [blockIsOpen, toggleOpen] = useState(false);
  const dispatch = useDispatch();

  const defaultValues = {
    avatar: file,
    fullName: fullName,
    email: email,
    phone: phone,
    old_password: '',
    new_password: '',
    passConfirm: '',
  };

  const {
    handleSubmit,
    control,
    watch,
    reset,
    resetField,
    formState: { errors, dirtyFields },
  } = useForm<IFormValuesModalSettings>({
    defaultValues,
  });

  const toggleBlock = () => {
    toggleOpen((blockIsOpen) => {
      resetField("old_password", {defaultValue: "" });
      resetField("new_password", { defaultValue: "" });
      resetField("passConfirm", { defaultValue: "" });
      return !blockIsOpen;
    });
  };

  useEffect(() => {
    if (prevFile !== file) {
      resetField('avatar', {defaultValue: file});
    }
  }, [file]);

  const watchNewPassword = watch("new_password");

  const {
    isOpen: isOpenConfirm,
    openModal: openModalConfirm,
    closeModal: closeModalConfirm,
  } = useModal("confirm");

  const onCloseReset = () => {
    reset(defaultValues);
    handleClose();
    toggleOpen(false);
  }

  const onClose = () => {
    handleClose();
    toggleOpen(false);
  };

  const onSubmit: SubmitHandler<IFormValuesModalSettings> = (data) => {
    const {
      avatar,
      fullName,
      email,
      phone,
      passConfirm: pass,
      ...restPass
    } = data;

    const dataProfile = {
      data: {
        fullName,
      },
      id: profile.uuid,
    }

    if (file && !avatar) {
      dispatch(removePhotoAction(null, { redirect: onClose }));
    }
    if ((avatar && typeof avatar !== 'string')) {
      dispatch(uploadPhotoAction({ file: avatar }, { redirect: onClose }));
    }
    if (data.new_password) {
      dispatch(changePasswordAction(restPass, { redirect: () => onCloseReset() }));
    }
    if (dirtyFields.fullName) {
      dispatch(updateProfileAction(dataProfile, { redirect: () => onClose() }));
    }
  };
  
  return (
    <>
      <ModalWindow
        title="Profile Settings"
        isOpen={isOpen}
        handleClose={onCloseReset}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
          <h2>Personal Information</h2>
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
                    placeholder="Your Full Name"
                    error={errors.fullName}
                    label="*Full Name"
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
                    placeholder="Your Email"
                    error={errors.email}
                    label="*Email"
                    disabled
                  />
                );
              }}
            />
          </FieldsGroup>
          <FieldsGroup className={s.blockLine}>
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
                    placeholder='Your Phone'
                    disabled
                  />
                );
              }}
            />
            <Button
              type="submit"
              size="long"
              value="Save Changes"
              onClick={handleSubmit(onSubmit)}
              className="submit-btn"
              isLoading={isLoading}
            />
          </FieldsGroup>
          <span
            className={cn(s.opener, blockIsOpen && s.open)}
            onClick={toggleBlock}
          >
            Change Password
          </span>
          {blockIsOpen && (
            <>
              <FieldsGroup>
                <Controller
                  control={control}
                  name="old_password"
                  rules={NOT_EMPTY_VALIDATION}
                  render={({ field }) => {
                    return (
                      <FormPasswordInput
                        {...field}
                        name="old_password"
                        error={errors.old_password}
                        label="*Current Password"
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="new_password"
                  rules={PASSWORD_VALIDATION}
                  render={({ field }) => {
                    return (
                      <FormPasswordInput
                        {...field}
                        name="new_password"
                        error={errors.new_password}
                        label="*New Password"
                      />
                    );
                  }}
                />
              </FieldsGroup>
              <FieldsGroup>
                <Controller
                  control={control}
                  name="passConfirm"
                  rules={CONFIRM_PASSWORD_VALIDATION(watchNewPassword)}
                  render={({ field }) => {
                    return (
                      <FormPasswordInput
                        {...field}
                        name="passConfirm"
                        error={errors.passConfirm}
                        label="*Confirm New Password"
                      />
                    );
                  }}
                />
              </FieldsGroup>
            </>
          )}
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