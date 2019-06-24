import { OrderResolverService } from './services/orders/order-resolver.service';
import { MaterialsResolverService } from './services/materials/materials-resolver.service';
import { OrdersResolverService } from './services/orders/orders-resolver.service';
import { AddOrderGuard } from './guards/add-order/add-order.guard';
import { WorkmanshipPricesComponent } from './pages/workmanship-prices/workmanship-prices.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ViewOrderComponent } from './pages/orders/view-order/view-order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrdersComponent,
        resolve: { resolvedOrdersData: OrdersResolverService }
      },
      {
        path: 'add',
        component: AddOrderComponent,
        resolve: { resolvedMaterialsData: MaterialsResolverService },
        canDeactivate: [AddOrderGuard]
      },
      {
        path: 'view/:id',
        component: ViewOrderComponent,
        resolve: { resolvedOrderData: OrderResolverService }
      }
    ]
  },
  {
    path: 'materials',
    component: MaterialsComponent,
    resolve: { resolvedMaterialsData: MaterialsResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'workmanship/prices',
    component: WorkmanshipPricesComponent,
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
