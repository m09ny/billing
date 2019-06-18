import { OrdersService } from './services/orders/orders.service';
import { MaterialsService } from './services/materials/materials.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './directives/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LoginComponent } from './pages/login/login.component';
import { WorkmanshipPricesComponent } from './pages/workmanship-prices/workmanship-prices.component';
import { AuthService } from './services/auth/auth.service';
import { WorkmanshipService } from './services/workmanship/workmanship.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OrdersComponent,
    ReportsComponent,
    ContractsComponent,
    AddOrderComponent,
    MaterialsComponent,
    LoginComponent,
    WorkmanshipPricesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    StepsModule,
    DropdownModule,
    PickListModule,
    DialogModule,
    CheckboxModule
  ],
  providers: [
    AuthService,
    MaterialsService,
    OrdersService,
    WorkmanshipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
