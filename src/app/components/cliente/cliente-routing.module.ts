import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { ClientesComponent } from './components/clientes/clientes.component';


const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent
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