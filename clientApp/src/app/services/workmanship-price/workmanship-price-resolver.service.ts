import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WorkmanshipPriceService } from './workmanship-price.service';
import { Injectable } from '@angular/core';
import { WorkmanshipPrice } from 'src/app/models/workmanship-price';

@Injectable({
  providedIn: 'root'
})
export class WorkmanshipPriceResolverService {

  constructor(private workmanshipPriceService: WorkmanshipPriceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkmanshipPrice[]> | Promise<WorkmanshipPrice[]> {
    return this.workmanshipPriceService.getWorkmanshipPrices();
  }

}
