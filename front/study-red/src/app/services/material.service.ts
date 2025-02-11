import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = '/api/materials';

  constructor(private http: HttpClient) {}

  postMaterial(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
