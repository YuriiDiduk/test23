import * as React from 'react';
import s from "./Form.module.scss";
import cn from "classnames";
import { messageSubject, Specialty } from 'interfaces';
import { getMessageRoomAction, replyToMessageAction, sendGeneralMessageAction, sendMessageAction } from 'actions/messagingActions';
import { NOT_EMPTY_VALIDATION } from 'const';
import { useLoading } from 'hooks/useLoading';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ModalWindow } from '../Modal/ModalWindow';
import { FormTextArea } from './FormElements/FormTextArea';
import { Button } from '../Button/Button';
import { FormTextInput } from './FormElements/FormTextInput';
import { FormInputFile } from './FormElements/FormInputFile/FormInputFile';
import { UpdateTableContext } from 'context/UpdateTableContext';

type Props = {
  id?: number | null;
  roomId?: string | null;
  isOpen: boolean;
  handleClose(): void;
  titleModal: string;
  senderRole: Specialty;
  senderEmail: string;
  receiverName: string;
  receiverEmail?: string;
  subject?: messageSubject.answer | null;
  maxLength?: number;
};

export interface IFormValues {
  title: string;
  message: string;
  files: string[];
}

export const EmailForm = ({
  id,
  roomId,
  isOpen,
  handleClose,
  titleModal,
  senderRole,
  senderEmail,
  receiverName,
  receiverEmail,
  subject = null,
  maxLength = 1000,
}: Props) => {

  const { updateTable } = React.useContext(UpdateTableContext);
  const dispatch = useDispatch();
  const isLoading = useLoading("messagingReducer");

  const defaultValues: IFormValues = {
    title: "",
    message: "",
    files: [],
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

  const handleRedirect = (roomId: string) => {
    dispatch(getMessageRoomAction(roomId));
    updateTable();
    onClose();
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (roomId && id !== undefined) {
      if (id === null) {
        const sendData = {
          ...data,
          roomId,
        };
        dispatch(
          sendMessageAction(sendData, {
            redirect: () => handleRedirect(roomId),
          })
        );
      } else {
        const sendData = {
          ...data,
          id,
          roomId,
          title: subject,
        };
        dispatch(
          replyToMessageAction(sendData, {
            redirect: () => handleRedirect(roomId),
          })
        );
      }
    } else {
      const sendData = {
        title: data.title,
        body: data.message,
      };

      dispatch(sendGeneralMessageAction(sendData, { redirect: onClose }));
    }
  };

  return (
    <ModalWindow
      title={titleModal}
      isOpen={isOpen}
      handleClose={onClose}
      size="middle"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("form-modal-email", s.emailForm)}
      >
        <div className={s.emailData}>
          <div className={s.emailFormRow}>
            <span className={s.emailTitleRow}>From:&emsp;</span>
            <div className={s.nowrap}>
              <span className={s.delimiter}>{senderRole}</span>
              <span>{senderEmail}</span>
            </div>
          </div>
          <div className={s.emailFormRow}>
            <span className={s.emailTitleRow}>To:&emsp;</span>
            <div className={s.nowrap}>
              <span className={receiverEmail && s.delimiter}>
                {receiverName}
              </span>
              {receiverEmail && <span>{receiverEmail}</span>}
            </div>
          </div>
          <div className={s.emailFormRow}>
            <span className={s.emailTitleRow}>Subject:&emsp;</span>
            {subject ? (
              <span>{subject}</span>
            ) : (
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
                      maxLength={70}
                    />
                  );
                }}
              />
            )}
          </div>
        </div>
        <Controller
          control={control}
          name="message"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextArea
                {...field}
                name="message"
                error={errors.message}
                minRows={6}
                maxLength={maxLength}
              />
            );
          }}
        />
        <div className={s.btnGroup}>
          {roomId && (
            <Controller
              control={control}
              name="files"
              render={({ field }) => {
                return <FormInputFile {...field} name="files" multiple />;
              }}
            />
          )}
          <Button
            type="submit"
            value="Send"
            icon="send"
            onClick={handleSubmit(onSubmit)}
            className="submit-btn"
            isLoading={isLoading}
          />
        </div>
      </form>
    </ModalWindow>
  );
};