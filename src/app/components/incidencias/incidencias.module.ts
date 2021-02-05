import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { BalanceComponent } from './components/balance/balance.component';
import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { ProductsModule } from '../productos/products.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModule } from '../cliente/cliente.module';
import { SalesModule } from '../sales/sales.module';
import { EgressModule } from '../egress/egress.module';



@NgModule({
  declarations: [
    BalanceComponent,
    IncidenciasComponent,
  ],
  imports: [
    CommonModule,
    IncidenciasRoutingModule,
    MaterialModule,
    FormsModule,
    ProductsModule,
    SalesModule,
    ReactiveFormsModule,
    FormsModule,
    ClienteModule,
    SalesModule,
    EgressModule,
  ]
})
export class IncidenciasModule {}