import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css'],
  providers: [VentaService],
})
export class IncidenciasComponent implements OnInit {
  public ventas: Venta[];
  public filtrado: string = "todo";
  public incidencia: string = "ventas";
  public bloque: string = "productos";

  public sumaVentas: number;
  public saldoVentas: number;
  public ultimaSemana: number;
  public ultimoMes: number;

  constructor(
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getVentas();
    this.ingresoSemanal();
  }

  actualizarFiltrado(valor) {
    this.filtrado = valor;
  }

  getVentas() {
    let company = this.authService.getUID();
    this._ventaService.getVentasCompany(company).subscribe(
      response => {
        if (response.ventasFiltrados) {
          this.ventas = response.ventasFiltrados;
          this.sumaVentas = this.ventas.reduce((acc, obj) => acc + obj.monto, 0);
          this.saldoVentas = this.ventas.reduce((acc, obj) => acc + obj.saldo, 0);
        }
      },
      error => { console.log(<any>error); }
    )
  }

  seleccionarIncidencia(incidencia) {
    this.incidencia = incidencia;
  }

  seleccionarBloque(bloque) {
    this.bloque = bloque;
  }

  ingresoSemanal() {
    let company = this.authService.getUID();
    let semanaActual = new Date().getWeekNumber;
    this._ventaService.getVentasCompany(company).subscribe(
      response => {
        let sumaSemana;
        if (response.ventasFiltrados) {
          let ventasFiltradasPorSemana = response.ventasFiltrados
          .filter(venta => (new Date(venta.fecha).getWeekNumber()) === new Date().getWeekNumber());
          sumaSemana = ventasFiltradasPorSemana.reduce((acc, obj) => acc + obj.monto, 0);
          this.ultimaSemana = sumaSemana;

        }
      }
    )
  }


}
