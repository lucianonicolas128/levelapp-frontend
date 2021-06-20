import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddproductoComponent } from './components/addproducto/addproducto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EditproductoComponent } from './components/editproducto/editproducto.component';
import { DetailproductoComponent } from './components/detailproducto/detailproducto.component';
import { LayoutProductsComponent } from './components/layout-products/layout-products.component';


@NgModule({
  declarations: [
    AddproductoComponent,
    ProductosComponent,
    EditproductoComponent,
    DetailproductoComponent,
    LayoutProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductosComponent,
    EditproductoComponent
  ]
})
export class ProductsModule {

}