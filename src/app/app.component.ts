import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatWebSocketService} from "./service/web-socket.service";
import {NgForOf} from "@angular/common";
import {MessageType} from "./model/chat-message.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'chat-web';
  protected webSocketService = inject(ChatWebSocketService)

  ngOnInit(): void {
    this.webSocketService.init();
  }

  sendMessage(): void {
    this.webSocketService.sendMessage({
      type: MessageType.CHAT,
      content: 'Hello, WebSocket',
      sender: null
    });
  }
}
