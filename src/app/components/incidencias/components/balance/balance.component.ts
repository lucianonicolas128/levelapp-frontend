import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EgresoService } from '../../../../services/egreso.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  public sumaVentasMensual;
  public sumaVentasTotal;
  public mesesIngreso = new Array();
  public mesesEgreso = new Array();
  public mesesBalance = new Array();
  sumaEgresosTotal;
  sumaEgresosMensual;
  month = new Array();

  constructor(
    private _ventaService: VentaService,
    private _egresoService: EgresoService,
  ) {
    this.month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  }

  ngOnInit(): void {
    this.filterYear(new Date().getFullYear());
  }

  filterYear(year) {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventasFiltrados) {
          this.filtradoBalance(response.ventasFiltrados, this.mesesIngreso, this.sumaVentasTotal, this.sumaVentasMensual, year);
          this.sumaVentasTotal = response.ventasFiltrados.reduce((acc, obj) => acc + obj.monto, 0);
          let ventasFiltradasMensual = response.ventasFiltrados.filter(venta => new Date(venta.fecha).getMonth() === new Date().getMonth());
          this.sumaVentasMensual = ventasFiltradasMensual.reduce((acc, obj) => acc + obj.monto, 0);
        }
      }
    )
    this._egresoService.getEgresos().subscribe(
      response => {
        if (response.egresosFiltrados) {
          this.filtradoBalance(response.egresosFiltrados, this.mesesEgreso, this.sumaEgresosTotal, this.sumaEgresosMensual, year);
        }
      }
    )
  }

  private filtradoBalance(incidencia, meses, sumaTotal, sumaMensual, year) {
    let sumador;
    let filtrado;
    for (let i = 0; i < 12; i++) {
      filtrado = incidencia.filter(
        venta =>
          new Date(venta.fecha).getMonth() == i && new Date(venta.fecha).getFullYear() == year
      );
      sumador = filtrado.reduce((acc, obj,) => acc + obj.monto, 0);
      meses[i] = sumador;
    }
  }

}
