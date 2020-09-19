import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasComponent } from './components/ventass/ventas/ventas.component';
import { AddventaComponent } from './components/ventass/addventa/addventa.component';
import { EditventaComponent } from './components/ventass/editventa/editventa.component';
import { DetailventaComponent } from './components/ventass/detailventa/detailventa.component';
import { ErrorComponent } from './components/error/error.component';
import { AddproductoComponent } from './components/productos/addproducto/addproducto.component';
import { EditproductoComponent } from './components/productos/editproducto/editproducto.component';
import { DetailproductoComponent } from './components/productos/detailproducto/detailproducto.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { AddegresoComponent } from './components/egreso/addegreso/addegreso.component';
import { DetailegresoComponent } from './components/egreso/detailegreso/detailegreso.component';
import { EditegresoComponent } from './components/egreso/editegreso/editegreso.component';
import { EgresosComponent } from './components/egreso/egresos/egresos.component';
import { AddclienteComponent } from './components/cliente/addcliente/addcliente.component';
import { DetailclienteComponent } from './components/cliente/detailcliente/detailcliente.component';
import { EditclienteComponent } from './components/cliente/editcliente/editcliente.component';
import { ClientesComponent } from './components/cliente/clientes/clientes.component';
import { AddMaterialComponent } from './components/presupuestator/add-material/add-material.component';
import { EditMaterialComponent } from './components/presupuestator/edit-material/edit-material.component';
import { PresupuestarComponent } from './components/presupuestator/presupuestar/presupuestar.component';
import { IndexComponent } from './components/index/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './components/preferences/edit-preferences/edit-preferences.component';
import { CalculadoraComponent } from './components/presupuestator/calculadora/calculadora.component';

const config = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    AddventaComponent,
    EditventaComponent,
    DetailventaComponent,
    ErrorComponent,
    AddproductoComponent,
    EditproductoComponent,
    DetailproductoComponent,
    ProductosComponent,
    AddegresoComponent,
    DetailegresoComponent,
    EditegresoComponent,
    EgresosComponent,
    AddclienteComponent,
    DetailclienteComponent,
    EditclienteComponent,
    ClientesComponent,
    AddMaterialComponent,
    EditMaterialComponent,
    PresupuestarComponent,
    IndexComponent,
    LoginComponent,
    IncidenciasComponent,
    PreferencesComponent,
    AddPreferencesComponent,
    EditPreferencesComponent,
    CalculadoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
