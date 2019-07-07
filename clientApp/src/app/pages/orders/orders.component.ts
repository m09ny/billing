import { ConfirmationService } from 'primeng/api';
import { PrintDirective } from './../../directives/print/print.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from './../../models/order';
import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { PrintableContractComponent } from 'src/app/directives/printable-contract/printable-contract.component';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  @ViewChild(PrintDirective, {static: true}) appPrintHost: PrintDirective;

  ordersTableCols: any[];

  orders: Order[];

  displayPrintDialog = false;

  currentPrintOrderId: number;

  componentRef: ComponentRef<PrintableContractComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {

    this.ordersTableCols = [
      { field: 'id', header: 'Numar comanda' },
      { field: 'clientMetadata.society', header: 'Societatea' },
      { field: 'clientMetadata.tel', header: 'Numar telefon' },
      { field: 'totalPrice', header: 'Total pret cu T.V.A.' },
      { field: 'creationDate', header: 'Data crearii' }
    ];

    this.route.data.subscribe(
      data => { this.orders = data.resolvedOrdersData; },
      error => console.log(error)
    );

  }

  onOrderShow(orderId: number): void {
    this.router.navigate(['/orders', 'view', orderId]);
  }

  onOrderPrint(order: Order): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PrintableContractComponent);
    const viewContainerRef = this.appPrintHost.viewContainerRef;
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as PrintableContractComponent;
    instance.order = order;

    this.currentPrintOrderId = order.id;
    this.displayPrintDialog = true;
  }

  onDialogAccept(): void {
    this.componentRef.destroy();
    this.displayPrintDialog = false;
  }

  onDialogClose(): void {
    this.componentRef.destroy();
    this.displayPrintDialog = false;
  }

}
