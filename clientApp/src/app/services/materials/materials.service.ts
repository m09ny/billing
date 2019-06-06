import { Material } from './../../models/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(environment.backendUrl + 'api/materials/');
  }

  addMaterial(material: Material): Observable<string> {
    return this.http.post<string>(environment.backendUrl + 'api/materials/', material, { headers: this.headers });
  }

  updateMaterial(material: Material): Observable<string> {
    return this.http.put<string>(environment.backendUrl + 'api/materials/' + material.id, material, { headers: this.headers });
  }

  deleteMaterial(id: number): Observable<string> {
    return this.http.delete<string>(environment.backendUrl + 'api/materials/' + id);
  }

}
