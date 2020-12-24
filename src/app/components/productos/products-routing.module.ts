import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { ProductosComponent } from './components/productos/productos.component';


const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      {
        path: 'products',
        component: ProductosComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule {}