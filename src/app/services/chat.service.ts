import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  sendMessage(userId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/send`, { senderId: userId, content });
  }


  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat/messages`);
  }
}
