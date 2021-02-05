import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { EgressesComponent } from './components/egresses/egresses.component';
import { EgressComponent } from './components/egress/egress.component';
import { EditegressComponent } from './components/editegress/editegress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailegressComponent } from './components/detailegress/detailegress.component';
import { AddegressComponent } from './components/addegress/addegress.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        EgressesComponent,
        EgressComponent,
        EditegressComponent,
        DetailegressComponent,
        AddegressComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        EgressesComponent,
        EgressComponent,
        EditegressComponent,
    ]
})
export class EgressModule {

}