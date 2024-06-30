import {Injectable} from "@angular/core";
import {Client, IFrame} from "@stomp/stompjs";
import {IChatMessage} from "../model/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatWebSocketService {
  private readonly WS_ENDPOINT = 'ws://localhost:8080/ws';
  private _messages: IChatMessage[] = [];
  private client!: Client;

  get messages(): any[] {
    return this._messages;
  }

  set messages(value: any[]) {
    this._messages = value;
  }

  init(): void {
    this.client = new Client({
      brokerURL: this.WS_ENDPOINT,
      onConnect: (frame: IFrame) => {
        this.client.subscribe('/topic/messages', (message: { body: any; }) => {
            this.messages = [...this.messages, message.body];
          }
        );
      },
    });
    this.client.activate();
  }

  sendMessage(message: IChatMessage): void {
    this.client.publish({destination: '/app/send', body: JSON.stringify(message)});
  }
}
