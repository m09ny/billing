import { Component, OnInit, ViewEncapsulation, enableProdMode } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MenuItem, SelectItem, ConfirmationService } from 'primeng/api';
import { validateConfig } from '@angular/router/src/config';
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
    clientMetadata: new FormGroup({
      society: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('', Validators.required),
      cfRo: new FormControl('', Validators.required),
      rc: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
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

    entries.at(index).get('cutting').valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onDeleteEntry(index: number): void {
    const entries = this.addOrderForm.get('entries') as FormArray;
    entries.removeAt(index);
  }

}
