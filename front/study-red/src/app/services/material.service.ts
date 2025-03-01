import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  getMateriaisPorUsuario(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${userId}`);
}

  postMaterial(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiais/`, formData);
  }
}
