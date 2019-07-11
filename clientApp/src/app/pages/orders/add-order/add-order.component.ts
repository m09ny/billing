import { OrdersService } from '../../../services/orders/orders.service';
import { Material } from '../../../models/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkmanshipPrice } from 'src/app/models/workmanship-price';

@Component({
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddOrderComponent implements OnInit {

  activeIndex = 0;

  stepItems: MenuItem[];

  materials: Material[];

  selectedMaterials: Material[];

  addOrderForm = new FormGroup({
    material: new FormGroup({
      id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      thickness: new FormControl('', Validators.required),
      surface: new FormControl('', Validators.required),
      finish: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      priceVat: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required)
    }),
    entries: new FormArray([]),
    entriesTotal: new FormGroup({
      totalPiecesNumber: new FormControl(0, Validators.required),
      totalCuttings: new FormControl(0, Validators.required),
      totalProfiling: new FormControl(0, Validators.required),
      totalDraining: new FormControl(0, Validators.required),
      totalArea: new FormControl(0, Validators.required)
    }),
    workmanship: new FormGroup({
      decupajeLavoare: new FormControl('', Validators.required),
      decupajePeCurb: new FormControl('', Validators.required),
      gauriCarota: new FormControl('', Validators.required),
      lipireAdaos: new FormControl('', Validators.required),
      canalAntiderapant: new FormControl('', Validators.required),
    }),
    clientMetadata: new FormGroup({
      society: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.minLength(10)),
      cfRo: new FormControl('', Validators.required),
      rc: new FormControl('', Validators.required),
      account: new FormGroup({
        first: new FormControl('', Validators.minLength(4)),
        second: new FormControl('', Validators.minLength(4)),
        third: new FormControl('', Validators.minLength(4)),
        fourth: new FormControl('', Validators.minLength(4)),
        fifth: new FormControl('', Validators.minLength(4))
      }),
      bank: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
      ownerStatus: new FormControl('', Validators.required)
    }),
    workmanshipFinishType: new FormControl('', Validators.required),
    workmanshipFinishPrice: new FormControl(0, Validators.required),
    totalPrice: new FormControl(0, Validators.required),
    totalPriceVat: new FormControl(0, Validators.required),
    materialTotalPrice: new FormControl(0, Validators.required),
    prepayment: new FormControl(0, Validators.required),
    totalPriceLeftVat: new FormControl(0, Validators.required)
  });

  isAddOrderFormSubmitted = false;

  workmanshipPrices: { [key: string]: number } = {};

  banks: string[] = ['Banca Transilvania', 'BRD', 'BCR', 'ING', 'Raiffeisen'];

  filteredBanks: any[];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.stepItems = [
      {
        label: 'Material',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Intrari',
        command: (event: any) => {
          this.addOrderForm.get('entriesTotal').disable();
          this.activeIndex = 1;
        }
      },
      {
        label: 'Manopera',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Informatii client',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Finalizare comanda',
        command: (event: any) => {
          this.addOrderForm.get('entriesTotal').enable();
          this.calculateMaterialTotalPrice();
          this.calculateWorkmanshipFinishPrice(this.addOrderForm.get('workmanshipFinishType').value);
          this.calculatetotalPrice();
          this.calculatetotalPriceVat();
          this.calculatetotalPriceLeftVat(0);
          this.activeIndex = 4;
        }
      }
    ];

    this.route.data.subscribe(data => {
      this.materials = data.resolvedMaterialsData;
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.resolvedWorkmanShipPricesData.length; i++) {
        switch (data.resolvedWorkmanShipPricesData[i].code) {
          case 1: {
            this.workmanshipPrices['semibaston'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 2: {
            this.workmanshipPrices['bizot'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 3: {
            this.workmanshipPrices['profilSpecial'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 4: {
            this.workmanshipPrices['picurator'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 5: {
            this.workmanshipPrices['taiat'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 6: {
            this.workmanshipPrices['decupajeLavoare'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 7: {
            this.workmanshipPrices['decupajePeCurb'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 8: {
            this.workmanshipPrices['gauriCarota'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 9: {
            this.workmanshipPrices['lipireAdaos'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          case 10: {
            this.workmanshipPrices['canalAntiderapant'] = data.resolvedWorkmanShipPricesData[i].price;
            break;
          }
          default: {
            break;
          }
        }
      }
    }, error => console.log(error));

    this.selectedMaterials = [];
  }

  onSubmitAddOrderForm(): void {
    if (this.addOrderForm.invalid) {
      this.confirmationService.confirm({
        message: 'Te rog sa reverifici datele introduse!',
        header: 'Comanda invalida',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ok',
        acceptVisible: true,
        rejectVisible: false
      });

      return;
    }

    this.ordersService.addOrder(this.addOrderForm.value).subscribe(
      response => {
        console.log(response);
        this.isAddOrderFormSubmitted = true;
        this.router.navigate(['/orders']);
      },
      error => console.log(error)
    );
  }

  isAddOrderFormDirty(): boolean {
    return this.addOrderForm.dirty || this.addOrderForm.value.material.name !== '';
  }

  onPrepayamentUpdate(prepayament: number): void {
    this.addOrderForm.get('prepayment').patchValue(prepayament);
    this.calculatetotalPriceLeftVat(prepayament);
  }

  filterBanks(event) {
    this.filteredBanks = [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.banks.length; i++) {
        const bank = this.banks[i];
        if (bank.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.filteredBanks.push(bank);
        }
    }
  }

  onAddEntry(): void {
    const entries = this.addOrderForm.get('entries') as FormArray;

    entries.push(new FormGroup({
      dimension: new FormGroup({
        length: new FormControl(0, Validators.required),
        width: new FormControl(0, Validators.required)
      }),
      profiling: new FormGroup({
        l1: new FormControl(0, Validators.required),
        l2: new FormControl(0, Validators.required),
        istg: new FormControl(0, Validators.required),
        idr: new FormControl(0, Validators.required)
      }),
      drainer: new FormGroup({
        l1: new FormControl(0, Validators.required),
        l2: new FormControl(0, Validators.required),
        istg: new FormControl(0, Validators.required),
        idr: new FormControl(0, Validators.required)
      }),
      piecesNumber: new FormControl(0, Validators.required),
      cutting: new FormControl({ value: 0, disabled: true }),
      profilingSum: new FormControl({ value: 0, disabled: true }),
      drainerSum: new FormControl({ value: 0, disabled: true }),
      area: new FormControl({ value: 0, disabled: true })
    }));

    const index = entries.length - 1;
    entries.at(index).get('dimension').valueChanges.subscribe(val => {
      const piecesNumber = entries.at(index).get('piecesNumber').value;
      entries.at(index).get('cutting').patchValue((val.length + val.width) * piecesNumber);
      entries.at(index).get('area').patchValue((val.length * val.width * piecesNumber) / 10000);
    });
    entries.at(index).get('piecesNumber').valueChanges.subscribe(val => {
      const length = entries.at(index).get('dimension').get('length').value;
      const width = entries.at(index).get('dimension').get('width').value;
      entries.at(index).get('cutting').patchValue((length + width) * val);
      entries.at(index).get('area').patchValue((length * width * val) / 10000);

      const profiling = entries.at(index).get('profiling').value;
      entries.at(index).get('profilingSum').patchValue((profiling.l1 + profiling.l2 + profiling.istg + profiling.idr) * val);
      const drainer = entries.at(index).get('drainer').value;
      entries.at(index).get('drainerSum').patchValue((drainer.l1 + drainer.l2 + drainer.istg + drainer.idr) * val);
    });
    entries.at(index).get('profiling').valueChanges.subscribe(val => {
      const piecesNumber = entries.at(index).get('piecesNumber').value;
      entries.at(index).get('profilingSum').patchValue((val.l1 + val.l2 + val.istg + val.idr) * piecesNumber);
    });
    entries.at(index).get('drainer').valueChanges.subscribe(val => {
      const piecesNumber = entries.at(index).get('piecesNumber').value;
      entries.at(index).get('drainerSum').patchValue((val.l1 + val.l2 + val.istg + val.idr) * piecesNumber);
    });

    const entriesTotal = this.addOrderForm.get('entriesTotal') as FormGroup;
    // totalPiecesNumber
    entries.at(index).get('piecesNumber').valueChanges.subscribe(val => {
      let totalPiecesNumber = 0;
      for (let i = 0; i <= entries.length - 1; i++) {
        totalPiecesNumber += entries.at(i).get('piecesNumber').value;
      }
      entriesTotal.get('totalPiecesNumber').patchValue(totalPiecesNumber);
    });
    // totalCuttings
    entries.at(index).get('cutting').valueChanges.subscribe(val => {
      let totalCuttings = 0;
      for (let i = 0; i <= entries.length - 1; i++) {
        totalCuttings += entries.at(i).get('cutting').value;
      }
      entriesTotal.get('totalCuttings').patchValue(totalCuttings / 100);
    });
    // totalProfiling
    entries.at(index).get('profilingSum').valueChanges.subscribe(val => {
      let totalProfiling = 0;
      for (let i = 0; i <= entries.length - 1; i++) {
        totalProfiling += entries.at(i).get('profilingSum').value;
      }
      entriesTotal.get('totalProfiling').patchValue(totalProfiling / 100);
    });
    // totalDraining
    entries.at(index).get('drainerSum').valueChanges.subscribe(val => {
      let totalDraining = 0;
      for (let i = 0; i <= entries.length - 1; i++) {
        totalDraining += entries.at(i).get('drainerSum').value;
      }
      entriesTotal.get('totalDraining').patchValue(totalDraining / 100);
    });
    // totalArea
    entries.at(index).get('area').valueChanges.subscribe(val => {
      let totalArea = 0;
      for (let i = 0; i <= entries.length - 1; i++) {
        totalArea += entries.at(i).get('area').value;
      }
      entriesTotal.get('totalArea').patchValue(totalArea);
    });
  }

  onDeleteEntry(index: number): void {
    const entries = this.addOrderForm.get('entries') as FormArray;
    entries.removeAt(index);

    const entriesTotal = this.addOrderForm.get('entriesTotal') as FormGroup;
    // totalPiecesNumber
    let totalPiecesNumber = 0;
    for (let i = 0; i <= entries.length - 1; i++) {
      totalPiecesNumber += entries.at(i).get('piecesNumber').value;
    }
    entriesTotal.get('totalPiecesNumber').patchValue(totalPiecesNumber);
    // totalCuttings
    let totalCuttings = 0;
    for (let i = 0; i <= entries.length - 1; i++) {
      totalCuttings += entries.at(i).get('cutting').value;
    }
    entriesTotal.get('totalCuttings').patchValue(totalCuttings / 100);
    // totalProfiling
    let totalProfiling = 0;
    for (let i = 0; i <= entries.length - 1; i++) {
      totalProfiling += entries.at(i).get('profilingSum').value;
    }
    entriesTotal.get('totalProfiling').patchValue(totalProfiling / 100);
    // totalDraining
    let totalDraining = 0;
    for (let i = 0; i <= entries.length - 1; i++) {
      totalDraining += entries.at(i).get('drainerSum').value;
    }
    entriesTotal.get('totalDraining').patchValue(totalDraining / 100);
    // totalArea
    let totalArea = 0;
    for (let i = 0; i <= entries.length - 1; i++) {
      totalArea += entries.at(i).get('area').value;
    }
    entriesTotal.get('totalArea').patchValue(totalArea);
  }

  onMoveToTarget(event: any): void {
    this.addOrderForm.get('material').patchValue(event.items[0]);
  }

  private calculateWorkmanshipFinishPrice(workmanshipFinishType: string): void {
    const workmanshipFinishPrice =
      this.addOrderForm.get('entriesTotal').get('totalArea').value * this.workmanshipPrices['taiat'] +
      this.addOrderForm.get('entriesTotal').get('totalProfiling').value * this.workmanshipPrices[workmanshipFinishType] +
      this.addOrderForm.get('entriesTotal').get('totalDraining').value * this.workmanshipPrices['picurator'] +
      this.workmanshipPrices['decupajeLavoare'] * this.addOrderForm.get('workmanship').get('decupajeLavoare').value +
      this.workmanshipPrices['decupajePeCurb'] * this.addOrderForm.get('workmanship').get('decupajePeCurb').value +
      this.workmanshipPrices['gauriCarota'] * this.addOrderForm.get('workmanship').get('gauriCarota').value +
      this.workmanshipPrices['lipireAdaos'] * this.addOrderForm.get('workmanship').get('lipireAdaos').value +
      this.workmanshipPrices['canalAntiderapant'] * this.addOrderForm.get('workmanship').get('canalAntiderapant').value;
    this.addOrderForm.get('workmanshipFinishPrice').patchValue(workmanshipFinishPrice.toFixed(2));
  }

  private calculatetotalPrice(): void {
    const totalPrice = +this.addOrderForm.value.materialTotalPrice + +this.addOrderForm.value.workmanshipFinishPrice;
    this.addOrderForm.get('totalPrice').patchValue(totalPrice.toFixed(2));
  }

  private calculatetotalPriceVat(): void {
    const totalPriceVat = this.addOrderForm.value.totalPrice * 1.19;
    this.addOrderForm.get('totalPriceVat').patchValue(+totalPriceVat.toFixed(2));
  }

  private calculateMaterialTotalPrice(): void {
    const materialTotalPrice = this.addOrderForm.get('entriesTotal').get('totalArea').value * this.addOrderForm.value.material.price;
    this.addOrderForm.get('materialTotalPrice').patchValue(materialTotalPrice.toFixed(2));
  }

  private calculatetotalPriceLeftVat(prepayament: number): void {
    const totalPriceVat = this.addOrderForm.get('totalPriceVat').value;
    this.addOrderForm.get('totalPriceLeftVat').patchValue(totalPriceVat - prepayament);
  }

}
