import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}


  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  getAlunos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/role/aluno`);
  }
  getUsers(role: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/role/void`);
  }

  updateUserToAluno(email: string) {
    return this.http.put(`${this.apiUrl}/to-aluno`, { email });
  }
}
