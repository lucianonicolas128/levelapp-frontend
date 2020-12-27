import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { AddproductoComponent } from './components/addproducto/addproducto.component';
import { MatTableDataSource } from '@angular/material/table';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  declarations: [
    // BalanceComponent,
    // IncidenciasComponent,
    // IncidenciasTableComponent,
    // VentaComponent,
    AddproductoComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    
  ],
  exports: [
    // ProductsModule
    ItemComponent
  ]
})
export class ProductsModule {

}