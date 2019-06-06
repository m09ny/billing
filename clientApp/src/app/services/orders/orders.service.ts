import { Order } from './../../models/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.backendUrl + 'api/orders/');
  }

  addOrder(order: Order): Observable<string> {
    return this.http.post<string>(environment.backendUrl + 'api/materials/', order, { headers: this.headers });
  }
}
