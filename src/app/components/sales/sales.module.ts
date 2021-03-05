import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModule } from '../cliente/cliente.module';
import { AddVentaComponent } from './components/add-venta/add-venta.component';
import { DetailventaComponent } from './components/detailventa/detailventa.component';
import { EditsaleComponent } from './components/editsale/editsale.component';
import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { SaleComponent } from './components/sale/sale.component';
import { AddSaleComponent } from './components/add-sale/add-sale.component';

@NgModule({
  declarations: [
    AddVentaComponent,
    DetailventaComponent,
    EditsaleComponent,
    SalesTableComponent,
    SaleComponent,
    AddSaleComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ClienteModule,
    ReactiveFormsModule,
    ClienteModule,
  ],
  exports: [
    AddVentaComponent,
    DetailventaComponent,
    EditsaleComponent,
    SalesTableComponent,
    SaleComponent,
  ]
})
export class SalesModule { }
