import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { VentasComponent } from './components/ventass/ventas/ventas.component';
import { AddventaComponent } from './components/ventass/addventa/addventa.component';
import { EditventaComponent } from './components/ventass/editventa/editventa.component';
import { DetailventaComponent } from './components/ventass/detailventa/detailventa.component';
import { ErrorComponent } from './components/error/error.component';

import { ProductosComponent } from './components/productos/productos/productos.component';
import { AddproductoComponent } from './components/productos/addproducto/addproducto.component';
import { EditproductoComponent } from './components/productos/editproducto/editproducto.component';
import { DetailproductoComponent } from './components/productos/detailproducto/detailproducto.component';

import { EgresosComponent } from './components/egreso/egresos/egresos.component';
import { AddegresoComponent } from './components/egreso/addegreso/addegreso.component';
import { EditegresoComponent } from './components/egreso/editegreso/editegreso.component';
import { DetailegresoComponent } from './components/egreso/detailegreso/detailegreso.component';

import { ClientesComponent } from './components/cliente/clientes/clientes.component';
import { AddclienteComponent } from './components/cliente/addcliente/addcliente.component';
import { EditclienteComponent } from './components/cliente/editcliente/editcliente.component';
import { DetailclienteComponent } from './components/cliente/detailcliente/detailcliente.component';

import { PresupuestarComponent } from './components/presupuestator/presupuestar/presupuestar.component';
import { AddMaterialComponent } from './components/presupuestator/add-material/add-material.component';
import { EditMaterialComponent } from './components/presupuestator/edit-material/edit-material.component';

import { IndexComponent } from './components/index/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';

const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    /* {path: 'add-venta', component: AddventaComponent}, */
    /* {path: 'ventas', component: VentasComponent}, */
    {path: 'editar-venta/:id', component: EditventaComponent},
    {path: 'venta/:id', component: DetailventaComponent},

    /* {path: 'productos', component: ProductosComponent}, */
    /* {path: 'agregar-producto', component: AddproductoComponent}, */
    {path: 'editar-producto/:id', component: EditproductoComponent},
    {path: 'producto/:id', component: DetailproductoComponent},
    
    /* {path: 'add-egreso', component: AddegresoComponent}, */
    /* {path: 'egresos', component: EgresosComponent}, */
    {path: 'editar-egreso/:id', component: EditegresoComponent},
    {path: 'egreso/:id', component: DetailegresoComponent},
    
    /* {path: 'add-cliente', component: AddclienteComponent}, */
    /* {path: 'clientes', component: ClientesComponent}, */
    {path: 'editar-cliente/:id', component: EditclienteComponent},
    {path: 'cliente/:id', component: DetailclienteComponent},

    {path: 'material/:id', component: PresupuestarComponent},
    {path: 'add-material/:id', component: AddMaterialComponent},
    {path: 'editar-material/:id', component: EditMaterialComponent},

    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: IndexComponent},

    {path: 'asd', component: PresupuestarComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);