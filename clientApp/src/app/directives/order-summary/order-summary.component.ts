import { Order } from 'src/app/models/order';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input() order: Order;

  @Input() printButton: boolean;

  @Input() submitButton: boolean;

  constructor() { }

  ngOnInit() {

  }

}
