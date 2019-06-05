import { Observable } from 'rxjs/internal/Observable';
import { MaterialsService } from 'src/app/services/materials/materials.service';
import { Material } from './../../models/material';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MaterialResolverService implements Resolve<Material[]> {

  constructor(private materialsService: MaterialsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Material[]> | Promise<Material[]> {
    return this.materialsService.getMaterials();
  }
}
