import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getTodosMateriais(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getmateriais`);
  }

  getMateriaisPorUsuario(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${userId}`);
}
  postMaterial(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiais/`, formData);
  }

  deleteMaterial(materialId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiais`);
  }

}
