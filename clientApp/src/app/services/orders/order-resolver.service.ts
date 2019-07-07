import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrdersService } from './orders.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService {

  constructor(private ordersService: OrdersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> | Promise<Order> {
    const orderId = +route.paramMap.get('id');
    return this.ordersService.getOrder(orderId);
  }

}
