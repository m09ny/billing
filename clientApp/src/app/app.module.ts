import { MaterialsService } from './services/materials/materials.service';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './directives/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { MaterialsComponent } from './pages/materials/materials.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OrdersComponent,
    ReportsComponent,
    ContractsComponent,
    AddOrderComponent,
    MaterialsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    StepsModule,
    DropdownModule
  ],
  providers: [
    MaterialsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
