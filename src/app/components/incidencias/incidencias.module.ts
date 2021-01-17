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
import { AddventaComponent } from '../ventass/components/addventa/addventa.component';
import { AddclienteComponent } from '../cliente/components/addcliente/addcliente.component';
import { VentasModule } from '../ventass/ventas.module';
import { EgresoComponent } from './components/egreso/egreso.component';
import { EgresosComponent } from './components/egresos/egresos.component';



@NgModule({
  declarations: [
    BalanceComponent,
    IncidenciasComponent,
    IncidenciasTableComponent,
    VentaComponent,
    EgresoComponent,
    EgresosComponent,
    // ItemComponent
  ],
  imports: [
    CommonModule,
    IncidenciasRoutingModule,
    MaterialModule,
    FormsModule,
    ProductsModule,
    VentasModule
  ]
})
export class IncidenciasModule {

}