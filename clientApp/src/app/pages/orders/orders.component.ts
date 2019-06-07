import { ActivatedRoute } from '@angular/router';
import { Order } from './../../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(
      data => this.orders = data.resolvedOrdersData,
      error => console.log(error)
    );

  }

}
