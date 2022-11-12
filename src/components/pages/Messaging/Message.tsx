import * as React from "react";
import s from "./Messaging.module.scss";
import cn from "classnames";
import { Avatar } from "components/common/Avatar/Avatar";
import { Button } from "components/common/Button/Button";
import { IFile, MessageType } from "interfaces";
import { Icon } from "components/common/Icon";

type Props = {
  type: MessageType;
  avatar: string;
  staffPhoto: string;
  text: string;
  date: Date;
  files: IFile[];
  questionText: string;
  onReply: () => void;
};

export const Message = ({
  type,
  avatar,
  staffPhoto,
  text,
  date,
  onReply,
  questionText,
  files,
}: Props) => {
  return (
    <div
      className={cn(
        s.messageRow,
        type === MessageType.question ? s.question : s.answer
      )}
    >
      {type === MessageType.question ? (
        <div className={cn(s.messageRow, s.question)}>
          <Avatar avatar={avatar} size={60} className={s.avatar} />
          <div className={s.message}>
            <p>{text}</p>
            <div className={s.messageBottom}>
              <span className={s.date}>{date}</span>
            </div>
          </div>
          <Button
            filled="invisible"
            value="Reply"
            icon="reply"
            onClick={onReply}
          />
        </div>
      ) : (
        <div className={cn(s.messageRow, s.answer)}>
          <div className={s.message}>
            {questionText && (
              <div className={s.answeredQuestion}>
                <Avatar avatar={avatar} size={32} className={s.avatar} />
                <p className={s.questionText}>{questionText}</p>
              </div>
            )}
            <p>{text}</p>
            <div className={s.messageBottom}>
              {files && (
                <div className={s.messageFiles}>
                  {files.map(({ imageName }) => {
                    return (
                      <span key={imageName} className={s.messageFile}>
                        <Icon icon="paperclip" className={s.attachIcon} />
                        {imageName}
                      </span>
                    );
                  })}
                </div>
              )}
              <span className={s.date}>{date}</span>
            </div>
          </div>
          <Avatar avatar={staffPhoto} size={60} className={s.avatar} />
        </div>
      )}
    </div>
  );
};
