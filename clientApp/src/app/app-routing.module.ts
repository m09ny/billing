import { OrderResolverService } from './services/orders/order-resolver.service';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { MaterialResolverService } from './services/materials/material-resolver.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent, resolve: { resolvedOrdersData: OrderResolverService } },
  { path: 'orders/add', component: AddOrderComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'materials', component: MaterialsComponent, resolve: { resolvedMaterialsData: MaterialResolverService } },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
