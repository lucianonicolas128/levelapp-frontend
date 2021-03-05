import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../services/venta.service';
import { AuthService } from 'src/app/services/auth.service';

// Agregamos a la interface de Date el prototipo de funcion para tomar la semana
declare global {
  interface Date { getWeekNumber(): number; }
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
  public sumaVentas: number;
  public saldoVentas: number;
  public ultimaSemana: number;
  public ultimoMes: number;

  constructor(
    private _ventaService: VentaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getVentas();
    this.ingresosMensuales();
    this.ingresoSemanal();
    // console.log(this.authService.getUID())
  }

  actualizarFiltrado(valor) { this.filtrado = valor; }

  getVentas() {
    let company = this.authService.getUID();
    this._ventaService.getVentasCompany(company).subscribe(
      response => {
        if (response.ventasFiltrados) {
          this.ventas = response.ventasFiltrados;
          this.sumaVentas = this.ventas.reduce((acc, obj,) => acc + obj.monto, 0);
          this.saldoVentas = this.ventas.reduce((acc, obj,) => acc + obj.saldo, 0);
        }
      },
      error => { console.log(<any>error); }
    )
  }

  ingresoSemanal() {
    let company = this.authService.getUID();
    let semanaActual = new Date().getWeekNumber;
    this._ventaService.getVentasCompany(company).subscribe(
      response => {
        let sumaSemana;
        if (response.ventasFiltrados) {
          let ventasFiltradasPorSemana = response.ventasFiltrados.filter(venta => (new Date(venta.fecha).getWeekNumber()) === new Date().getWeekNumber());
          sumaSemana = ventasFiltradasPorSemana.reduce((acc, obj) => acc + obj.monto, 0);
          this.ultimaSemana = sumaSemana;

        }
      }
    )
  }

  ingresosMensuales() {
    let company = this.authService.getUID();
    this._ventaService.getVentasCompany(company).subscribe(
      response => {
        let sumador;
        if (response.ventasFiltrados) {
          let ventasFiltradas = response.ventasFiltrados.filter(venta => new Date(venta.fecha).getMonth() == new Date().getMonth());
          sumador = ventasFiltradas.reduce((acc, obj,) => acc + obj.monto, 0);
        }
        this.sumaVentasMensual = sumador;
      }
    )
  }

  seleccionarIncidencia(incidencia) { this.incidencia = incidencia; }

  seleccionarBloque(bloque) { this.bloque = bloque; }

}
