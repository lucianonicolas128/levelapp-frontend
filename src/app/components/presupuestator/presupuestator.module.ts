import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { EditMaterialComponent } from './components/edit-material/edit-material.component';
import { PresupuestarComponent } from './components/presupuestar/presupuestar.component';

@NgModule({
  declarations: [
      AddMaterialComponent,
      CalculadoraComponent,
      EditMaterialComponent,
      PresupuestarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddMaterialComponent,
    CalculadoraComponent,
    EditMaterialComponent,
    PresupuestarComponent
  ]
})
export class PresupuestatorModule { }
