import { Component, OnInit } from '@angular/core';
import { VentasComponent } from '../../ventass/ventas/ventas.component';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Agregamos a la interface de Date el prototipo de funcion para tomar la semana
declare global {
  interface Date {
    getWeekNumber(): number;
  }
}

Date.prototype.getWeekNumber = function () {
  var d = new Date(+this);
  d.setDate(d.getDate() + 4 - (d.getDay()));
  return Math.ceil((((Number(d) - Number(new Date(d.getFullYear(), 0, 0))) / 8.64e7) + 1) / 7);
};

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [VentaService],
})

export class IndexComponent implements OnInit {

  public ventas: Venta[];
  public filtrado: string = "todo";
  public incidencia: string = "ventas";
  public bloque: string = "productos";
  public sumaVentasMensual;

  /* VARIABLES PARA CONTROLAR EL BALANCE DE VENTAS */
  public sumaVentas: number;
  public saldoVentas: number;
  public ultimaSemana: number;
  public ultimoMes: number;

  constructor(
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getVentas();
    this.ingresosMensuales();
    this.ingresoSemanal();
  }

  actualizarFiltrado(valor) {
    this.filtrado = valor;
  }

  getVentas() {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventas) {
          this.ventas = response.ventas;

          /* Con este metodo sumamos los ingresos totales, donde acc es una bandera y obj el parametro del objeto de ventas */
          this.sumaVentas = this.ventas.reduce((acc, obj,) => acc + obj.monto, 0);

          /* Con este metodo sumamos los saldos totales, donde acc es una bandera y obj el parametro del objeto de ventas */
          this.saldoVentas = this.ventas.reduce((acc, obj,) => acc + obj.saldo, 0);

          // this.ultimaSemana = this.sumaVentas - 33140 - 28350 - 68910 - 44550 - 21680 - 95610 - 28740 - 63140 - 121478 - 55100 - 60050 - 39365 - 30375 - 19465 - 33100 - 50110 - 39830 - 25068 - 69490 - 51400 - 46675 - 35480;
          // this.ultimoMes = this.sumaVentas - this.mayo - this.junio - this.julio - this.agosto;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  ingresoSemanal() {
    let semanaActual = new Date().getWeekNumber;
    this._ventaService.getVentas().subscribe(
      response => {
        let sumaSemana;
        // console.log(semanaActual);

        if (response.ventas) {

          let ventasFiltradasPorSemana = response.ventas.filter(venta => (new Date(venta.fecha).getWeekNumber()) === new Date().getWeekNumber());
          sumaSemana = ventasFiltradasPorSemana.reduce((acc, obj) => acc + obj.monto, 0);
          this.ultimaSemana = sumaSemana;

        }
      }
    )
  }

  ingresosMensuales() {
    this._ventaService.getVentas().subscribe(
      response => {
        let sumador;

        if (response.ventas) {
          let ventasFiltradas = response.ventas.filter(venta => new Date(venta.fecha).getMonth() == new Date().getMonth());
          sumador = ventasFiltradas.reduce((acc, obj,) => acc + obj.monto, 0);
        }
        this.sumaVentasMensual = sumador;
      }
    )
  }

  seleccionarIncidencia(incidencia) {
    this.incidencia = incidencia;
  }

  seleccionarBloque(bloque) {
    this.bloque = bloque;
  }

}
