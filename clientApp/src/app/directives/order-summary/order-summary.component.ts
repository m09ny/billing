import { Order } from 'src/app/models/order';
import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent implements OnInit {

  @Input() order: Order;

  @Input() printButton: boolean;

  @Input() submitButton: boolean;

// tslint:disable-next-line: no-output-on-prefix
  @Output() onPrepaymentEvent: EventEmitter<any> = new EventEmitter<number>();

  prepayment: number;

  displayPrepaymentDialog = false;

  constructor() { }

  ngOnInit() {

  }

  onPrepayment(): void {
    this.displayPrepaymentDialog = true;
  }

  onPayPrepayment(prepayment: number): void {
    this.onPrepaymentEvent.emit(prepayment);
    this.displayPrepaymentDialog = false;
  }

  checkValidPrepayment(prepayment: number): boolean {
    if (prepayment != null && prepayment >= 0 && prepayment <= this.order.totalPriceVat) {
      return false;
    } else {
      return true;
    }
  }

}
