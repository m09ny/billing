import { WorkmanshipPrice } from '../../models/workmanship-price';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkmanshipService {

  constructor(private http: HttpClient) { }

  getWorkmanshipPrices(): Observable<WorkmanshipPrice[]> {
    return this.http.get<WorkmanshipPrice[]>(environment.backendUrl + 'api/workmanship/price/');
  }
}
