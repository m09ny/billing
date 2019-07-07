import { Observable } from 'rxjs';
import { Order } from './../../models/order';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrdersService } from './orders.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService {

  constructor(private ordersService: OrdersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> | Promise<Order[]> {
    return this.ordersService.getOrders();
  }

}
