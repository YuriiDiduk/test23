import { ModalWindow } from 'components/common/Modal/ModalWindow';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormTextInput } from 'components/common/Form/FormElements/FormTextInput';
import { NOT_EMPTY_VALIDATION } from 'const';
import { Button } from 'components/common/Button/Button';
import { useDispatch } from 'react-redux';
import { UpdateTableContext } from 'context/UpdateTableContext';
import { useContext } from 'react';
import { useLoading } from 'hooks/useLoading';
import { FormTextArea } from 'components/common/Form/FormElements/FormTextArea';
import { createFaqAction } from 'actions/faqActions';

type Props = {
  isOpen: boolean;
  handleClose(): void;
};

export interface IFormValues {
  title: string;
  body: string;
}

export const ModalAddFaq = ({ isOpen, handleClose }: Props) => {
  const dispatch = useDispatch();
  const { updateTable } = useContext(UpdateTableContext);
  const isLoading = useLoading("faqReducer");

  const defaultValues: IFormValues = {
    title: "",
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
  
  const handleRedirect = () => {
    updateTable();
    onClose();
  }

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    dispatch(createFaqAction(data, { redirect: handleRedirect }));
  };

  return (
    <>
      <ModalWindow
        title="Add Question"
        isOpen={isOpen}
        handleClose={onClose}
        size="middle"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal-simple">
          <Controller
            control={control}
            name="title"
            rules={NOT_EMPTY_VALIDATION}
            render={({ field }) => {
              return (
                <FormTextInput
                  {...field}
                  name="title"
                  placeholder="Enter title"
                  error={errors.title}
                  label="*Title"
                />
              );
            }}
          />
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
                  label="*Text"
                  minRows={6}
                />
              );
            }}
          />
          <Button
            type="submit"
            size="long"
            value="Add Question"
            onClick={handleSubmit(onSubmit)}
            className="submit-btn"
            isLoading={isLoading}
          />
        </form>
      </ModalWindow>
    </>
  );
};