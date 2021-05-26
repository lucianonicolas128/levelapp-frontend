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
import { ErrorComponent } from './components/error/error.component';
import { IndexComponent } from './components/index/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';

import { PreferencesComponent } from './components/preferences/preferences.component';
import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './components/preferences/edit-preferences/edit-preferences.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IncidenciasModule } from './components/incidencias/incidencias.module';

import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClienteModule } from './components/cliente/cliente.module';
import { SalesModule } from './components/sales/sales.module';
import { ProductsModule } from './components/productos/products.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PresupuestatorModule } from './components/presupuestator/presupuestator.module';
import { RegisterComponent } from './components/auth/register/register.component';

import * as firebase from 'firebase';
import { WelcomeComponent } from './components/index/welcome/welcome.component';
import { ProductComponent } from './components/products/components/product/product.component';
firebase.initializeApp(environment.firebase);

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
    ErrorComponent,
    IndexComponent,
    LoginComponent,
    PreferencesComponent,
    AddPreferencesComponent,
    EditPreferencesComponent,
    NavigationComponent,
    RegisterComponent,
    WelcomeComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    IncidenciasModule,
    ClienteModule,
    SalesModule,
    ProductsModule,

    PresupuestatorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
