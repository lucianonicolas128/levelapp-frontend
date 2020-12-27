import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { BalanceComponent } from './components/balance/balance.component';
import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { IncidenciasTableComponent } from './components/incidencias-table/incidencias-table.component';
import { VentaComponent } from './components/venta/venta.component';
import { ProductsModule } from '../productos/products.module';
import { ProductosComponent } from '../productos/components/productos/productos.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { ItemComponent } from '../productos/components/item/item.component';
import { AddventaComponent } from '../ventass/addventa/addventa.component';



@NgModule({
  declarations: [
    BalanceComponent,
    IncidenciasComponent,
    IncidenciasTableComponent,
    VentaComponent,
    ProductosComponent,
    AddventaComponent
    // ItemComponent
  ],
  imports: [
    CommonModule,
    IncidenciasRoutingModule,
    MaterialModule,
    FormsModule,
    ProductsModule
  ]
})
export class IncidenciasModule {

}