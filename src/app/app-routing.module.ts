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
import { AddSaleComponent } from './components/sales/components/add-sale/add-sale.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminGuard } from './admin.guard';
import { WelcomeComponent } from './components/index/welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: NavigationComponent,
        children: [
            {
                path: '',
                redirectTo: 'index',
                canActivate: [AdminGuard],
                pathMatch: 'full',
            },
            {
                path: 'index',
                component: IndexComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'incidencias',
                component: IncidenciasComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'add-sale',
                component: AddSaleComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'productos',
                component: LayoutProductsComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'presupuestator',
                component: PresupuestarComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'clientes',
                component: ClientesComponent,
                canActivate: [AdminGuard],
                // loadChildren: () => import('./components/cliente/cliente.module').then(m => m.ClienteModule)
            },
            {
                path: 'balance',
                component: BalanceComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'preferences',
                component: PreferencesComponent,
                canActivate: [AdminGuard],
            }
        ],
    },

    { path: 'login', component: LoginComponent },

    { path: 'register', component: RegisterComponent },

    { path: 'welcome', component: WelcomeComponent },

    { path: '**', component: LoginComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
