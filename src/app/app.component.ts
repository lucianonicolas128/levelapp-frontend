import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {VentasComponent } from './components/ventass/ventas/ventas.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'level-app';
  faEdit = faEdit;
  public ventas : VentasComponent;
}
