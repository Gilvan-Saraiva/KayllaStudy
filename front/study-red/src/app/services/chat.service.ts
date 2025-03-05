import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}


  sendMessage(userId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, { senderId: userId, content });
  }


  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`);
  }
}
