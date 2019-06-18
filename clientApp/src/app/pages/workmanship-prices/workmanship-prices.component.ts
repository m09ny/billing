import { WorkmanshipService } from './../../services/workmanship/workmanship.service';
import { WorkmanshipPrice } from './../../models/workmanship-price';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workmanship-prices',
  templateUrl: './workmanship-prices.component.html',
  styleUrls: ['./workmanship-prices.component.css']
})
export class WorkmanshipPricesComponent implements OnInit {

  workmanshipPrices: WorkmanshipPrice[];

  workmanshipPricesTableCols: any[];

  constructor(private workmanshipService: WorkmanshipService) { }

  ngOnInit() {
    this.workmanshipPricesTableCols = [
      { field: 'name', header: 'Nume' },
      { field: 'price', header: 'Pret' }
    ];

    this.workmanshipService.getWorkmanshipPrices().subscribe(prices => {
      this.workmanshipPrices = prices;
    });
  }

}
