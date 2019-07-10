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
      /* let the route pass if the user did not change the form inputs or
      if the user wants to submit the form*/
      if (!component.isAddOrderFormDirty() || component.isAddOrderFormSubmitted) {
        return true;
      }

      /* ask the user if he is sure that he wants to leave the route and wait for his answer.
      The answer will be awaited because Angular subscribes to the returned Observable */
      const confirmation = new Subject<boolean>();

      this.confirmationService.confirm({
        message: 'Vei pierde toate informatiile introduse. Esti sigur ca vrei sa schimbi pagina?',
        header: 'Confirmare',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Da',
        rejectLabel: 'Nu',
        acceptVisible: true,
        rejectVisible: true,
        accept: () => { confirmation.next(true); },
        reject: () => { confirmation.next(false); }
      });

      return confirmation.asObservable();
    }

}
