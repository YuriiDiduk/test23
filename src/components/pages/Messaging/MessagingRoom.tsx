import * as React from "react";
import s from "./Messaging.module.scss";
import cn from "classnames";
import { Button } from "components/common/Button/Button";
import { useModal } from "hooks/useModal";
import { IMessageRoom, MessageType } from "interfaces";
import { makeSelector } from "helpers";
import { useDispatch, useSelector } from "react-redux";
import { IMessagingReducerState } from "store/reducers/messagingReducer";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getMessageRoomAction,
  getPatientPhotoAction,
  getStaffPhotoAction,
  readMessageAction,
} from "actions/messagingActions";
import { usePrevious } from "hooks/usePrevious";
import { Message } from "./Message";
import { ModalSendMessage } from "./ModalSendMessage";
import { Roles } from "interfaces/profile";
import { UpdateTableContext } from "context/UpdateTableContext";
import { useParams } from "react-router-dom";
import { IPhotoList } from "interfaces/tablePhotos";
import { getNotificationsAction } from "actions/notificationsActions";

type Props = {
  roles: Roles[];
  senderEmail: string;
};

export const MessagingRoom = ({ roles, senderEmail }: Props) => {
  const messageRoom = useSelector<IMessagingReducerState, IMessageRoom[]>(
    makeSelector(["messagingReducer", "messageRoom"])
  );

  const photoInRoom = useSelector<IMessagingReducerState, string>(
    makeSelector(["messagingReducer", "photoInRoom"])
  );

  const staffPhotosInRoom = useSelector<IMessagingReducerState, IPhotoList[]>(
    makeSelector(["messagingReducer", "staffPhotosInRoom"])
  );

  const [messageId, setId] = useState<number | null>(null);

  const { updateTable } = useContext(UpdateTableContext);

  const chatBottom = useRef<HTMLSpanElement>(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const prevId = usePrevious(id);

  const author = messageRoom.length ? messageRoom[0].author : null;
  const roomId = messageRoom.length ? messageRoom[0].roomId.toString() : null;
  const photo = author?.photo;

  const prevPhoto = usePrevious(photo);
  const prevRoomId = usePrevious(roomId);
  const prevMessageRoom = usePrevious(messageRoom);

  const handleRedirectRead = () => {
    updateTable();
    dispatch(getNotificationsAction(null));
  };

  useEffect(() => {
    if (!prevMessageRoom?.length && messageRoom.length) {
      messageRoom
        .filter(({ type }) => type === MessageType.answer)
        .forEach(({ author }) => {
          dispatch(getStaffPhotoAction(author.photo.uuid));
        });
      chatBottom?.current?.scrollIntoView();
    }
  }, [messageRoom]);

  useEffect(() => {
    if (!prevId && id) {
      dispatch(getMessageRoomAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (!prevRoomId && roomId) {
      dispatch(
        readMessageAction(
          { room_id: roomId },
          { redirect: () => handleRedirectRead() }
        )
      );
    }
  }, [roomId]);

  useEffect(() => {
    if (!prevPhoto && photo) {
      dispatch(getPatientPhotoAction(photo.uuid));
    }
  }, [photo]);

  const { isOpen, openModal, closeModal } = useModal("sendMessage");

  const handleReply = (id: number) => () => {
    openModal();
    setId(id);
  };

  const handleCloseModal = () => {
    setId(null);
    closeModal();
  };

  return (
    <>
      {author && (
        <>
          <div className={cn(s.bgBlock, "bg-block")}>
            <div className={s.patientInfo}>
              <span className={cn("h2", s.delimeter)}>{author.fullName}</span>
              <span className={s.email}>{author.email}</span>
            </div>
            <Button
              value="Send Message"
              icon="message-circle"
              onClick={openModal}
              className={s.sendBtn}
            />
          </div>
          <div className={cn(s.chatWrap, "scroll")}>
            {messageRoom.map(
              ({
                id,
                text,
                createdAt,
                type,
                questionText,
                files,
                author,
              }: IMessageRoom) => {
                const staffPhoto =
                  staffPhotosInRoom.find(({ id }) => id === author.photo?.uuid)
                    ?.photo || "";

                return (
                  <Message
                    key={id}
                    type={type}
                    avatar={photoInRoom}
                    staffPhoto={staffPhoto}
                    text={text}
                    date={createdAt}
                    onReply={handleReply(id)}
                    files={files}
                    questionText={questionText}
                  />
                );
              }
            )}
            <span ref={chatBottom} aria-hidden="true"></span>
          </div>

          <ModalSendMessage
            id={messageId}
            roomId={roomId}
            roles={roles}
            isOpen={isOpen}
            handleClose={handleCloseModal}
            senderEmail={senderEmail}
            receiverName={author.fullName}
            receiverEmail={author.email}
          />
        </>
      )}
    </>
  );
};
