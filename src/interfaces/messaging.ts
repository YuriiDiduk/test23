import { IObjectKeys } from "components/common/TableCustom/TableCustom";

export enum MessageType {
  question = "question",
  answer = "answer",
}

export interface IMessage {
  fullName: string;
  avatar: string;
  createdAt: string;
  text: string;
  type: MessageType;
}

export interface IFile {
  imageName: string;
  uuid: string;
}
export interface IMessageRoom {
  author: {
    fullName: string;
    email: string;
    uuid: string;
    photo: {
      uuid: string;
    };
  };
  createdAt: Date;
  files: IFile[];
  id: number;
  roomId: number;
  type: MessageType;
  title: string;
  text: string;
  questionText: string;
}

export interface ISendGeneralMessage {
  body: string;
  title: string;
}

export interface ISendMessage {
  message: string;
  files: string[];
  title: string;
  roomId: string;
}
export interface IReplyMessage {
  message: string;
  files: string[];
  id: number;
  roomId: string;
}

export enum messageSubject {
  general = "General message",
  answer = "Answer from Nexus",
}

export interface IMessagesTable extends IMessage, IObjectKeys {}
