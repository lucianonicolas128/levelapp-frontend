import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddventaComponent } from './components/addventa/addventa.component';
import { DetailventaComponent } from './components/detailventa/detailventa.component';
import { EditventaComponent } from './components/editventa/editventa.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModule } from '../cliente/cliente.module';



@NgModule({
  declarations: [
    AddventaComponent,
    DetailventaComponent,
    EditventaComponent,
    VentasComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ClienteModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
