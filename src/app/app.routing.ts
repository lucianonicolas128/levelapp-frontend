import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from './components/index/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IncidenciasComponent } from './components/incidencias/components/incidencias/incidencias.component';
import { ProductosComponent } from './components/productos/components/productos/productos.component';
import { EditproductoComponent } from './components/productos/components/editproducto/editproducto.component';
import { AddventaComponent } from './components/ventass/addventa/addventa.component';
import { EditventaComponent } from './components/ventass/editventa/editventa.component';


const appRoutes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children:[
            {
                path: 'incidencias',
                component: IncidenciasComponent,
                // children: [
                //     {
                //         path: 'add-venta',
                //         component: AddventaComponent
                //     },
                //     {
                //         path: 'edit-venta',
                //         component: EditventaComponent
                //     },
                // ]
            },
            {
                path: 'add-venta',
                component: AddventaComponent
            }
            // {
            //     path: 'productos',
            //     component: ProductosComponent,
            //     children: [
            //         {
            //             path: 'edit',
            //             component: EditproductoComponent
            //         }
            //     ]
            // }
        ]
    },

    { path: '**', component: IndexComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);