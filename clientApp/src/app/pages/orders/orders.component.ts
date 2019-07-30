import { OrdersService } from './../../services/orders/orders.service';
import { AuthService } from './../../services/auth/auth.service';
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

  displayDeleteDialog = false;

  currentPrintOrderId: number;

  currentDeleteOrderId: number;

  componentRef: ComponentRef<PrintableContractComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ordersService: OrdersService,
    private authService: AuthService
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

  onOrderDelete(orderId: number): void {
    this.currentDeleteOrderId = orderId;
    this.displayDeleteDialog = true;
  }

  onPrintDialogAccept(): void {
    this.componentRef.destroy();
    this.displayPrintDialog = false;
  }

  onPrintDialogClose(): void {
    this.componentRef.destroy();
    this.displayPrintDialog = false;
  }

  onDeleteDialogAccept(): void {
    this.ordersService.deleteOrder(this.currentDeleteOrderId).subscribe(
      response => {
        console.log(response);
        this.displayDeleteDialog = false;
        this.refreshTable();
      },
      error => console.log(error)
    );
  }

  private refreshTable(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    },
    error => console.log(error));
  }

}
