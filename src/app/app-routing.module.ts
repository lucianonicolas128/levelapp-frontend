import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import { IndexComponent } from './components/index/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IncidenciasComponent } from './components/incidencias/components/incidencias/incidencias.component';
import { ProductosComponent } from './components/productos/components/productos/productos.component';
import { EditproductoComponent } from './components/productos/components/editproducto/editproducto.component';
import { AddventaComponent } from './components/ventass/components/addventa/addventa.component';
import { EditventaComponent } from './components/ventass/components/editventa/editventa.component';
import { LayoutProductsComponent } from './components/productos/components/layout-products/layout-products.component';
import { PresupuestarComponent } from './components/presupuestator/presupuestar/presupuestar.component';
import { ClientesComponent } from './components/cliente/components/clientes/clientes.component';
import { BalanceComponent } from './components/incidencias/components/balance/balance.component';
import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';
import { PreferencesComponent } from './components/preferences/preferences.component';


const routes: Routes = [
  {
      path: '',
      component: NavigationComponent,
      children: [
          {
              path: '',
              redirectTo: 'index',
              pathMatch: 'full',
          },
          {
              path: 'index',
              component: IndexComponent
          },
          {
              path: 'incidencias',
              component: IncidenciasComponent,
          },
          {
              path: 'add-venta',
              component: AddventaComponent
          },
          {
              path: 'productos',
              component: LayoutProductsComponent
          },
          {
              path: 'presupuestator',
              component: PresupuestarComponent
          },
          {
              path: 'clientes',
              component: ClientesComponent
              // loadChildren: () => import('./components/cliente/cliente.module').then(m => m.ClienteModule)
          },
          {
              path: 'balance',
              component: BalanceComponent
          },
          {
              path: 'preferences',
              component: PreferencesComponent
          }
      ]
  },

  { path: '**', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
