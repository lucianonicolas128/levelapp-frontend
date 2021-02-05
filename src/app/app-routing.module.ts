import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IndexComponent } from './components/index/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IncidenciasComponent } from './components/incidencias/components/incidencias/incidencias.component';
import { LayoutProductsComponent } from './components/productos/components/layout-products/layout-products.component';
import { PresupuestarComponent } from './components/presupuestator/components/presupuestar/presupuestar.component';
import { ClientesComponent } from './components/cliente/components/clientes/clientes.component';
import { BalanceComponent } from './components/incidencias/components/balance/balance.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { AddVentaComponent } from './components/sales/components/add-venta/add-venta.component';


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
              component: AddVentaComponent
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
