import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { AddproductoComponent } from './components/addproducto/addproducto.component';
import { MatTableDataSource } from '@angular/material/table';
import { ItemComponent } from './components/item/item.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EditproductoComponent } from './components/editproducto/editproducto.component';
import { ProductComponent } from './components/product/product.component';
import { DetailproductoComponent } from './components/detailproducto/detailproducto.component';
import { LayoutProductsComponent } from './components/layout-products/layout-products.component';


@NgModule({
  declarations: [
    // BalanceComponent,
    // IncidenciasComponent,
    // IncidenciasTableComponent,
    // VentaComponent,
    AddproductoComponent,
    ItemComponent,
    ProductosComponent,
    EditproductoComponent,
    ProductComponent,
    DetailproductoComponent,
    LayoutProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    
  ],
  exports: [
    // ProductsModule
    ItemComponent,
    ProductosComponent,
    EditproductoComponent
  ]
})
export class ProductsModule {

}