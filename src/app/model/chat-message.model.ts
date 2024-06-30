import {IUser} from "./user.model";

export interface IChatMessage {
  type: MessageType;
  content: string;
  sender: IUser;
}

export enum MessageType {
  CHAT = "CHAT",
  JOIN = "JOIN",
  LEAVE = "LEAVE"
}
