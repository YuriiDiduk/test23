import { ModalWindow } from "components/common/Modal/ModalWindow";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NOT_EMPTY_VALIDATION } from "const";
import { Button } from "components/common/Button/Button";
import { useDispatch } from "react-redux";
import { useLoading } from "hooks/useLoading";
import { FormTextArea } from "components/common/Form/FormElements/FormTextArea";
import { createReportAction } from "actions/faqActions";
import cn from "classnames";
import s from "./HelpCentre.module.scss";

type Props = {
  isOpen: boolean;
  handleClose(): void;
};

export interface IFormValues {
  body: string;
}

export const ModalReport = ({ isOpen, handleClose }: Props) => {
  const dispatch = useDispatch();
  const isLoading = useLoading("faqReducer");

  const defaultValues: IFormValues = {
    body: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues,
  });

  const onClose = () => {
    handleClose();
    reset();
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    dispatch(createReportAction(data, { redirect: onClose }));
  };

  return (
    <>
      <ModalWindow
        title="Report a Problem"
        isOpen={isOpen}
        handleClose={onClose}
        size="middle"
      >
        <p className={cn("h3", s.reportModalInfo)}>
          Please let us know if you have any problems using the Nexus Admin Panel
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal-simple">
          <Controller
            control={control}
            name="body"
            rules={NOT_EMPTY_VALIDATION}
            render={({ field }) => {
              return (
                <FormTextArea
                  {...field}
                  name="body"
                  placeholder="Enter text"
                  error={errors.body}
                  label="Your Message to Nexus"
                  minRows={6}
                />
              );
            }}
          />
          <Button
            type="submit"
            size="long"
            value="Send Report"
            onClick={handleSubmit(onSubmit)}
            className="submit-btn"
            isLoading={isLoading}
          />
        </form>
      </ModalWindow>
    </>
  );
};
