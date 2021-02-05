import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { IndexComponent } from './components/index/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IncidenciasComponent } from './components/incidencias/components/incidencias/incidencias.component';
import { LayoutProductsComponent } from './components/productos/components/layout-products/layout-products.component';
import { PresupuestarComponent } from './components/presupuestator/components/presupuestar/presupuestar.component';
import { ClientesComponent } from './components/cliente/components/clientes/clientes.component';
import { BalanceComponent } from './components/incidencias/components/balance/balance.component';
import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';


const appRoutes: Routes = [
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
                component: AddPreferencesComponent
            }
        ]
    },

    { path: '**', component: IndexComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);