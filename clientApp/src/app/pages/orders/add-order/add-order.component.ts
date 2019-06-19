import { OrdersService } from '../../../services/orders/orders.service';
import { Material } from '../../../models/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddOrderComponent implements OnInit {

  stepItems: MenuItem[];

  activeIndex = 0;

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
      totalPiecesNumber: new FormControl({value: 0, disabled: true}),
      totalCuttings: new FormControl({value: 0, disabled: true}),
      totalProfiling: new FormControl({value: 0, disabled: true}),
      totalDraining: new FormControl({value: 0, disabled: true}),
      totalArea: new FormControl({value: 0, disabled: true})
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
      tel: new FormControl('', Validators.required),
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
    semibastonWorkmanshipPrice: new FormControl('', Validators.required),
    semibastonTotalPrice: new FormControl('', Validators.required),
    semibastonTotalPriceVat: new FormControl('', Validators.required),
    bizotWorkmanshipPrice: new FormControl('', Validators.required),
    bizotTotalPrice: new FormControl('', Validators.required),
    bizotTotalPriceVat: new FormControl('', Validators.required),
    materialTotalPrice: new FormControl('', Validators.required),
    totalPrice: new FormControl('', Validators.required)
  });

  constructor(private ordersService: OrdersService, private router: Router, private route: ActivatedRoute) { }

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
          this.calculateSemibastonWorkmanshipPrice();
          this.calculateBizotWorkmanshipPrice();
          this.calculateSemibastonTotalPrice();
          this.calculateSemibastonTotalPriceVat();
          this.calculateBizotTotalPrice();
          this.calculateBizotTotalPriceVat();
          this.calculateMaterialTotalPrice();
          this.calculateTotalPrice();
          this.activeIndex = 4;
        }
      }
    ];

    this.route.data.subscribe(data => { this.materials = data.resolvedMaterialsData; });

    this.selectedMaterials = [];
  }

  onSubmitAddOrderForm(): void {
    this.ordersService.addOrder(this.addOrderForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );

    this.router.navigate(['/orders']);
  }

  isAddOrderFormDirty(): boolean {
    return this.addOrderForm.dirty || this.addOrderForm.value.material.name !== '';
  }

  onAddEntry(): void {
    const entries = this.addOrderForm.get('entries') as FormArray;

    entries.push(new FormGroup({
      dimensions: new FormGroup({
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
      cutting: new FormControl({value: 0, disabled: true}),
      profilingSum: new FormControl({value: 0, disabled: true}),
      drainerSum: new FormControl({value: 0, disabled: true}),
      area: new FormControl({value: 0, disabled: true})
    }));

    const index = entries.length - 1;
    entries.at(index).get('dimensions').valueChanges.subscribe(val => {
      const piecesNumber = entries.at(index).get('piecesNumber').value;
      entries.at(index).get('cutting').patchValue((val.length + val.width) * piecesNumber);
      entries.at(index).get('area').patchValue((val.length * val.width * piecesNumber) / 10000);
    });
    entries.at(index).get('piecesNumber').valueChanges.subscribe(val => {
      const length = entries.at(index).get('dimensions').get('length').value;
      const width = entries.at(index).get('dimensions').get('width').value;
      entries.at(index).get('cutting').patchValue((length + width) * val);
      entries.at(index).get('area').patchValue((length * width * val) / 10000);
    });
    entries.at(index).get('profiling').valueChanges.subscribe(val => {
      entries.at(index).get('profilingSum').patchValue(val.l1 + val.l2 + val.istg + val.idr);
    });
    entries.at(index).get('drainer').valueChanges.subscribe(val => {
      entries.at(index).get('drainerSum').patchValue(val.l1 + val.l2 + val.istg + val.idr);
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

  // TBD
  private calculateSemibastonWorkmanshipPrice(): void {
    const semibastonWorkmanshipPrice = 0;
    this.addOrderForm.get('semibastonWorkmanshipPrice').patchValue(semibastonWorkmanshipPrice);
  }

  // TBD
  private calculateBizotWorkmanshipPrice(): void {
    const bizotWorkmanshipPrice = 0;
    this.addOrderForm.get('bizotWorkmanshipPrice').patchValue(bizotWorkmanshipPrice);
  }

  private calculateSemibastonTotalPrice(): void {
    const semibastonTotalPrice = this.addOrderForm.value.materialTotalPrice + this.addOrderForm.value.semibastonWorkmanshipPrice;
    this.addOrderForm.get('semibastonTotalPrice').patchValue(semibastonTotalPrice);
  }

  private calculateSemibastonTotalPriceVat(): void {
    const semibastonTotalPriceVat = this.addOrderForm.value.semibastonTotalPrice * 1.19;
    this.addOrderForm.get('semibastonTotalPriceVat').patchValue(semibastonTotalPriceVat);
  }

  private calculateBizotTotalPrice(): void {
    const bizotTotalPrice = this.addOrderForm.value.materialTotalPrice + this.addOrderForm.value.bizotWorkmanshipPrice;
    this.addOrderForm.get('bizotTotalPrice').patchValue(bizotTotalPrice);
  }

  private calculateBizotTotalPriceVat(): void {
    const bizotTotalPriceVat = this.addOrderForm.value.bizotTotalPrice * 1.19;
    this.addOrderForm.get('bizotTotalPriceVat').patchValue(bizotTotalPriceVat);
  }

  private calculateMaterialTotalPrice(): void {
    const materialTotalPrice = this.addOrderForm.get('entriesTotal').get('totalArea').value * this.addOrderForm.value.material.price;
    this.addOrderForm.get('materialTotalPrice').patchValue(materialTotalPrice);
  }

  // TBD
  private calculateTotalPrice(): void {
    const totalPrice = 0;
    this.addOrderForm.get('totalPrice').patchValue(totalPrice);
  }

}
