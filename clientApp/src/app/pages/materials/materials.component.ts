import { SelectItem } from 'primeng/api';
import { Material } from './../../models/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialsService } from 'src/app/services/materials/materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  displayAddMaterialDialog = false;

  displayEditMaterialDialog = false;

  addMaterialForm = new FormGroup({
    id: new FormControl(),
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    thickness: new FormControl(Validators.required),
    surface: new FormControl('', Validators.required),
    finish: new FormControl('', Validators.required),
    price: new FormControl(Validators.required),
    priceVat: new FormControl(Validators.required),
    fullName: new FormControl(Validators.required)
  });

  constructor(private materialsService: MaterialsService) {
  }

  ngOnInit() {
    this.materialsTableCols = [
      { field: 'type', header: 'Tip' },
      { field: 'name', header: 'Denumirea' },
      { field: 'thickness', header: 'Grosime (cm)' },
      { field: 'surface', header: 'TIPO DIM.' },
      { field: 'finish', header: 'Finisaj' },
      { field: 'price', header: 'Pret fara T.V.A.' },
      { field: 'priceVat', header: 'Pret cu T.V.A.' },
      { field: 'fullName', header: 'Material' },
      { field: 'price', header: 'Pret fara T.V.A.' }
    ];

    this.refreshTable();
  }

  onMaterialAdd(): void {
    this.displayAddMaterialDialog = true;
  }

  onMaterialEdit(material: Material) {
    this.displayEditMaterialDialog = true;
    this.addMaterialForm.setValue(material);
  }

  onMaterialDelete(material: Material) {
    this.materialsService.deleteMaterial(material.id).subscribe(
      response => {
        console.log(response);
        this.refreshTable();
      },
      error => console.log(error)
    );
  }

  onSubmitAddMaterialForm(): void {
    this.materialsService.addMaterial(this.addMaterialForm.value).subscribe(
      response => {
        console.log(response);
        this.refreshTable();
      },
      error => console.log(error)
    );

    this.displayAddMaterialDialog = false;
  }

  onSubmitEditMaterialForm(): void {
    this.materialsService.updateMaterial(this.addMaterialForm.value).subscribe(
      response => {
        console.log(response);
        this.refreshTable();
      },
      error => console.log(error)
    );

    this.displayEditMaterialDialog = false;
  }

  private refreshTable(): void {
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

}
