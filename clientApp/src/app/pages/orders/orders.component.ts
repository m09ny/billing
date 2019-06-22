import { ActivatedRoute } from '@angular/router';
import { Order } from './../../models/order';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  ordersTableCols: any[];

  orders: Order[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.ordersTableCols = [
      { field: 'id', header: 'Numar comanda' },
      { field: 'society', header: 'Societatea' },
      { field: 'tel', header: 'Numar telefon' },
      { field: 'totalPrice', header: 'Total pret cu T.V.A.' },
      { field: 'creationDate', header: 'Data crearii' }
    ];

    this.route.data.subscribe(
      data => { this.orders = data.resolvedOrdersData; },
      error => console.log(error)
    );

  }

  onOrderShow(order: Order): void {

  }

}
