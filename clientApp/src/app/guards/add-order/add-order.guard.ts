import { ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddOrderComponent } from 'src/app/pages/orders/add-order/add-order.component';

@Injectable({
  providedIn: 'root'
})
export class AddOrderGuard implements CanDeactivate<AddOrderComponent> {

  constructor(private confirmationService: ConfirmationService) {}

  canDeactivate(
    component: AddOrderComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      const confirmation = new Subject<boolean>();

      if (component.isAddOrderFormDirty()) {
        this.confirmationService.confirm({
          message: 'Vei pierde toate informatiile introduse. Esti sigur ca vrei sa schimbi pagina?',
          header: 'Confirmare',
          icon: 'pi pi-exclamation-triangle',
          accept: () => { confirmation.next(true); },
          reject: () => { confirmation.next(false); }
        });
      }

      return confirmation.asObservable();
    }

}
