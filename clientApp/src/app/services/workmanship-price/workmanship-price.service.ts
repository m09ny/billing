import { WorkmanshipPrice } from '../../models/workmanship-price';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkmanshipPriceService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getWorkmanshipPrices(): Observable<WorkmanshipPrice[]> {
    return this.http.get<WorkmanshipPrice[]>(environment.backendUrl + 'api/workmanship/price/');
  }

  updateWorkmanshipPrice(workmanshipPrice: WorkmanshipPrice): Observable<string> {
    return this.http.put<string>(environment.backendUrl + 'api/workmanship/price/' + workmanshipPrice.id, workmanshipPrice,
      { headers: this.headers });
  }
}
