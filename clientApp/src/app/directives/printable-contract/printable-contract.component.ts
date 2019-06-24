import { Order } from 'src/app/models/order';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-printable-contract',
  templateUrl: './printable-contract.component.html',
  styleUrls: ['./printable-contract.component.css']
})
export class PrintableContractComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  }

}
