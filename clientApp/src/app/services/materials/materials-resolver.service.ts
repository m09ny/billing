import { Material } from './../../models/material';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MaterialsService } from './materials.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialsResolverService {

  constructor(private materialsService: MaterialsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Material[]> | Promise<Material[]> {
    return this.materialsService.getMaterials();
  }

}
