import { ActivatedRoute } from '@angular/router';
import { WorkmanshipPriceService } from './../../services/workmanship-price/workmanship-price.service';
import { WorkmanshipPrice } from './../../models/workmanship-price';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './workmanship-prices.component.html',
  styleUrls: ['./workmanship-prices.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkmanshipPricesComponent implements OnInit {

  workmanshipPrices: WorkmanshipPrice[];

  constructor(private workmanshipPriceService: WorkmanshipPriceService) { }

  ngOnInit() {

    this.workmanshipPriceService.getWorkmanshipPrices().subscribe(prices => {
      this.workmanshipPrices = prices;
    });
  }

  onWorkmanshipEdit(workmanshipPrice: WorkmanshipPrice): void {

  }

}
