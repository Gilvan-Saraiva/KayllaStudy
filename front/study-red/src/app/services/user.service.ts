import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  getAlunos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/role/aluno`);
  }
  getUsers(role: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/role/void`);
  }

  updateUserToAluno(email: string) {
    return this.http.put(`${this.apiUrl}/users/to-aluno`, { email });
  }
}
