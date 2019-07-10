import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { WorkmanshipPriceService } from './../../services/workmanship-price/workmanship-price.service';
import { WorkmanshipPrice } from './../../models/workmanship-price';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  templateUrl: './workmanship-prices.component.html',
  styleUrls: ['./workmanship-prices.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkmanshipPricesComponent implements OnInit {

  workmanshipPrices: WorkmanshipPrice[];

  displayEditWorkmanshipPriceDialog = false;

  editWorkmanshipPriceForm = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    name: new FormControl(),
    price: new FormControl()
  });

  constructor(
    private workmanshipPriceService: WorkmanshipPriceService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => { this.workmanshipPrices = data.resolvedWorkmanShipPricesData; },
      error => console.log(error)
    );
  }

  onWorkmanshipEdit(workmanshipPrice: WorkmanshipPrice): void {
    this.displayEditWorkmanshipPriceDialog = true;
    this.editWorkmanshipPriceForm.setValue(workmanshipPrice);
  }

  onSubmitEditWorkmanshipPriceForm(): void {
    this.workmanshipPriceService.updateWorkmanshipPrice(this.editWorkmanshipPriceForm.value).subscribe(
      response => {
        console.log(response);
        this.refreshTable();
      },
      error => console.log(error)
    );

    this.displayEditWorkmanshipPriceDialog = false;
  }

  private refreshTable(): void {
    this.workmanshipPriceService.getWorkmanshipPrices().subscribe(prices => {
      this.workmanshipPrices = prices;
    });
  }

}
