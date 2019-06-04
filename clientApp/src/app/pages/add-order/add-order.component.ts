import { Component, OnInit, ViewEncapsulation, enableProdMode } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MenuItem, SelectItem, ConfirmationService } from 'primeng/api';
import { take, map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddOrderComponent implements OnInit {

  stepItems: MenuItem[];

  activeIndex = 0;

  addOrderForm = new FormGroup({
    entries: new FormArray([]),
    entriesTotal: new FormGroup({
      totalPiecesNumber: new FormControl({value: 0, disabled: true}),
      totalCuttings: new FormControl({value: 0, disabled: true}),
      totalProfiling: new FormControl({value: 0, disabled: true}),
      totalDraining: new FormControl({value: 0, disabled: true}),
      totalArea: new FormControl({value: 0, disabled: true})
    }),
    clientMetadata: new FormGroup({
      society: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('', Validators.required),
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
    })
  });

  constructor() { }

  ngOnInit() {
    this.stepItems = [
      {
        label: 'Intrari',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Informatii client',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Finalizare comanda',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }

  onSubmitAddOrderForm(): void {

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

}
