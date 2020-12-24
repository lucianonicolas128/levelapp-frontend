import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { AddventaComponent } from '../ventass/addventa/addventa.component';
import { IncidenciasTableComponent } from './components/incidencias-table/incidencias-table.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'add-venta',
        component: AddventaComponent
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
export class IncidenciasRoutingModule {}