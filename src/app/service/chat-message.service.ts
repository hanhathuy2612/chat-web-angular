import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ChatMessage} from "../model/chat-message.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatMessageService {
  private http = inject(HttpClient);

  query(req?: any): Observable<HttpResponse<ChatMessage[]>> {
    return this.http.get<ChatMessage[]>('api/chat-messages', {
      params: {
        ...req
      },
      observe: "response"
    });
  }
}
