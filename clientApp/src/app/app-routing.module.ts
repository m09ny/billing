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
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: { resolvedOrdersData: OrderResolverService },
    canActivate: [AuthGuard]
  },
  { path: 'orders/add', component: AddOrderComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'contracts', component: ContractsComponent, canActivate: [AuthGuard] },
  {
    path: 'materials',
    component: MaterialsComponent,
    resolve: { resolvedMaterialsData: MaterialResolverService },
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
