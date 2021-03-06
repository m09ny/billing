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

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(environment.backendUrl + 'api/orders/' + id);
  }

  addOrder(order: Order): Observable<string> {
    return this.http.post<string>(environment.backendUrl + 'api/orders/', order, { headers: this.headers });
  }

  deleteOrder(id: number): Observable<string> {
    return this.http.delete<string>(environment.backendUrl + 'api/orders/' + id);
  }

}
