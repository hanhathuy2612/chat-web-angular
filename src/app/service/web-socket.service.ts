import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class ChatWebSocketService {
  private readonly WS_ENDPOINT = 'ws://localhost:8080/gs-guide-websocket';
  private _messages: any[] = [];
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
      onConnect: () => {
        this.client.subscribe('/topic/greetings', (message: { body: any; }) => {
            console.log(`Received: ${message.body}`)
            this.messages = [...this.messages, message.body];
          }
        );
      },
    });
    this.client.activate();
  }

  sendMessage(message: string): void {
    this.client.publish({destination: '/app/hello', body: JSON.stringify({'name': message})});
  }
}
