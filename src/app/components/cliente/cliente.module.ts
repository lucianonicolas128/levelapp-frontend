import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddclienteComponent } from './components/addcliente/addcliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetailclienteComponent } from './components/detailcliente/detailcliente.component';
import { EditclienteComponent } from './components/editcliente/editcliente.component';
import { ClienteComponent } from './components/cliente/cliente.component';



@NgModule({
  declarations: [
      AddclienteComponent,
      ClientesComponent,
      DetailclienteComponent,
      EditclienteComponent,
      ClienteComponent,
      EditclienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddclienteComponent,
    EditclienteComponent,
    DetailclienteComponent,
    ClientesComponent,
  ]
})
export class ClienteModule { }
