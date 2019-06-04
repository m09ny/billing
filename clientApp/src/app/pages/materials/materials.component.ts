import { EditableRow } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import { Material } from './../../models/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialsComponent implements OnInit {

  materialsTableCols: any[];

  materials: Material[];

  types: SelectItem[];

  surfaces: SelectItem[];

  finishes: SelectItem[];

  constructor() { }

  ngOnInit() {
    this.materialsTableCols = [
      { field: 'type', header: 'Tip' },
      { field: 'name', header: 'Denumirea' },
      { field: 'thickness', header: 'Grosime / cm' },
      { field: 'surface', header: 'TIPO DIM.' },
      { field: 'finish', header: 'Finisaj' },
      { field: 'price', header: 'Pret fara T.V.A.' },
      { field: 'priceVat', header: 'Pret cu T.V.A.' },
      { field: 'fullName', header: 'Material' },
      { field: 'price', header: 'Pret fara T.V.A.' }
    ];

    this.materials = [
      new Material(1, 'GRANIT', 'ALLURE ROYALE', 2,
      'LUSTRUIT', 'LASTRE', 838.13, 997.37),
      new Material(2, 'GRANIT', 'ALLUfsdfsdE', 2,
      'LUSTRUIT', 'Lfdsfsdfds', 43243, 942347),
    ];

    this.types = this.materials
      .map(m => m.type)
      .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
      .map(t => {
        return { label: t, value: t };
      });

    this.surfaces = this.materials
    .map(m => m.surface)
    .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
    .map(s => {
      return { label: s, value: s };
    });

    this.finishes = this.materials
    .map(m => m.finish)
    .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
    .map(f => {
      return { label: f, value: f };
    });
  }

  onRowEdit(material: Material) {

  }

  onRowDelete(material: Material) {

  }

}
