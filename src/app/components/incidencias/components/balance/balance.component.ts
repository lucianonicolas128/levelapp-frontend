import { Component, OnInit } from '@angular/core';
import { VentasComponent } from '../../../ventass/components/ventas/ventas.component';
import { Venta } from 'src/app/models/venta';
import { Egreso } from '../../../../models/egreso';
import { VentaService } from '../../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EgresoService } from '../../../../services/egreso.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [VentaService, EgresoService],
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
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.month[0] = "Ene"; 
    this.month[1] = "Feb";
    this.month[2] = "Mar";
    this.month[3] = "Abr";
    this.month[4] = "May";
    this.month[5] = "Jun";
    this.month[6] = "Jul";
    this.month[7] = "Ago";
    this.month[8] = "Sep";
    this.month[9] = "Oct";
    this.month[10] = "Nov";
    this.month[11] = "Dic";
  }

  ngOnInit(): void {
    this.filterYear(new Date().getFullYear());
  }

  filterYear(year) {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventas) {
          this.filtradoBalance(response.ventas, this.mesesIngreso, this.sumaVentasTotal, this.sumaVentasMensual, year);
          this.sumaVentasTotal = response.ventas.reduce((acc, obj) => acc + obj.monto, 0);
          let ventasFiltradasMensual = response.ventas.filter(venta => new Date(venta.fecha).getMonth() === new Date().getMonth());
          this.sumaVentasMensual = ventasFiltradasMensual.reduce((acc, obj) => acc + obj.monto, 0);
        }
      }
    )
    this._egresoService.getEgresos().subscribe(
      response => {
        if (response.egresos) {
          this.filtradoBalance(response.egresos, this.mesesEgreso, this.sumaEgresosTotal, this.sumaEgresosMensual, year);
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
    // sumaTotal = incidencia.reduce((acc, obj) => acc + obj.monto, 0);
    // let ventasFiltradasMensual = incidencia.filter(venta => new Date(venta.fecha).getMonth() === new Date().getMonth());
    // sumaMensual = ventasFiltradasMensual.reduce((acc, obj) => acc + obj.monto, 0);
  }

  

}
