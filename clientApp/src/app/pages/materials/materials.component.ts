import { SelectItem } from 'primeng/api';
import { Material } from './../../models/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialsService } from 'src/app/services/materials/materials.service';

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

  constructor(private materialsService: MaterialsService) {
  }

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

    this.materialsService.getMaterials().subscribe(materials => {
      this.materials = materials;

      this.types = materials
      .map(m => m.type)
      .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
      .map(t => {
        return { label: t, value: t };
      });

      this.surfaces = materials
      .map(m => m.surface)
      .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
      .map(s => {
        return { label: s, value: s };
      });

      this.finishes = materials
      .map(m => m.finish)
      .filter((val, index, array) => !array.filter((v, i) => JSON.stringify(val) === JSON.stringify(v) && i < index).length)
      .map(f => {
        return { label: f, value: f };
      });
    });
  }

  onMaterialAdd(): void {

  }

  onMaterialEdit(material: Material) {

  }

  onMaterialDelete(material: Material) {

  }

}
