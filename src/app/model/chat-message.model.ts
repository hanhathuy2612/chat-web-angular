import {IUser} from "./user.model";

export class ChatMessage {

  constructor(
    public id: number,
    public type: MessageType,
    public content: string,
    public sender?: IUser | null
  ) {
  }
}


export enum MessageType {
  CHAT = "CHAT",
  JOIN = "JOIN",
  LEAVE = "LEAVE"
}
