import {
  DATE_VALIDATION,
  NOT_EMPTY_VALIDATION,
  PHONE_PATTERN,
  PHONE_VALIDATION,
} from "const";
import * as React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormTextInput } from "../Form/FormElements/FormTextInput";
import { FormValuesEditTable } from "./TableRow";
import s from "./Table.module.scss";
import cn from "classnames";
import { EditButtons } from "./EditButtons";
import { UploadAvatar } from "../UploadAvatar/UploadAvatar";
import { FormSelect } from "../Form/FormElements/FormSelect";
import { religionOptions } from "const/patients";
import { FormDatePicker } from "../Form/FormElements/FormDatePicker";
import { Specialty } from "interfaces";
import { FormTextArea } from "../Form/FormElements/FormTextArea";

type Errors = {
  fullName?: FieldError | undefined;
  phone?: FieldError | undefined;
  dateOfBirth?: FieldError | undefined;
  ethnicity?: FieldError | undefined;
  title?: FieldError | undefined;
  body?: FieldError | undefined;
};

type Props = {
  dataKey: string;
  control: Control<FormValuesEditTable, object>;
  errors: Errors;
  onCancel: () => void;
  isLoading: boolean;
  avatar?: string;
  ethnicityGroups?: string[];
  specialtyOptions: Specialty[];
  isDirty: boolean;
  className?: string;
};

export const EditCell = ({
  dataKey,
  control,
  errors,
  onCancel,
  isLoading,
  avatar,
  ethnicityGroups,
  specialtyOptions,
  isDirty,
  className,
}: Props) => {
  switch (dataKey) {
    case "avatar":
      return (
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value, onChange } }) => {
            return (
              <UploadAvatar
                name="avatar"
                value={value || avatar}
                onChange={onChange}
              />
            );
          }}
        />
      );
    case "fullName":
      return (
        <Controller
          control={control}
          name="fullName"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextInput
                {...field}
                name="fullName"
                error={errors.fullName}
                className={s.formTable}
              />
            );
          }}
        />
      );
    case "phone":
      return (
        <Controller
          control={control}
          name="phone"
          rules={PHONE_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextInput
                {...field}
                name="phone"
                inputMask={PHONE_PATTERN}
                error={errors.phone}
                className={s.formTable}
              />
            );
          }}
        />
      );
    case "dateOfBirth":
      return (
        <Controller
          control={control}
          name="dateOfBirth"
          rules={DATE_VALIDATION}
          render={({ field }) => {
            return (
              <FormDatePicker
                {...field}
                name="dateOfBirth"
                className={s.formTable}
                error={errors.dateOfBirth}
                minAge={18}
              />
            );
          }}
        />
      );
    case "specialty":
      return (
        <Controller
          control={control}
          name="specialty"
          render={({ field }) => {
            return (
              <FormSelect
                {...field}
                name="specialty"
                options={specialtyOptions}
                className={s.formTable}
              />
            );
          }}
        />
      );
    case "ethnicity":
      return (
        <Controller
          control={control}
          name="ethnicity"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormSelect
                {...field}
                name="ethnicity"
                options={ethnicityGroups || []}
                className={s.formTable}
                error={errors.ethnicity}
              />
            );
          }}
        />
      );
    case "religion":
      return (
        <Controller
          control={control}
          name="religion"
          render={({ field }) => {
            return (
              <FormSelect
                {...field}
                name="religion"
                options={religionOptions}
                className={s.formTable}
              />
            );
          }}
        />
      );
    case "title":
      return (
        <Controller
          control={control}
          name="title"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextInput
                {...field}
                name="title"
                error={errors.title}
                className={cn(s.formTable, className && s[className])}
              />
            );
          }}
        />
      );
    case "body":
      return (
        <Controller
          control={control}
          name="body"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextArea
                {...field}
                name="body"
                error={errors.body}
                className={cn(s.formTable, className && s[className])}
              />
            );
          }}
        />
      );
    case "edit":
      return (
        <EditButtons
          isHover={false}
          onCancel={onCancel}
          isLoading={isLoading}
          isDirty={isDirty}
          className={className}
        />
      );
    default:
      return null;
  }
};
