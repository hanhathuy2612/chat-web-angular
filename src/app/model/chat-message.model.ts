import {IUser} from "./user.model";

export interface IChatMessage {
  type: MessageType;
  content: string;
  sender?: IUser | null;
}

export enum MessageType {
  CHAT = "CHAT",
  JOIN = "JOIN",
  LEAVE = "LEAVE"
}
