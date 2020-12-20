import { Component, OnInit } from '@angular/core';
import { VentasComponent } from '../../ventass/ventas/ventas.component';
import { Venta } from 'src/app/models/venta';
import { Egreso } from '../../../models/egreso';
import { VentaService } from '../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EgresoService } from '../../../services/egreso.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [VentaService, EgresoService],
})
export class BalanceComponent implements OnInit {

  public ventas: Venta[];
  public egresos: Egreso[];

  public sumaVentasMensual;
  public sumaVentasTotal;
  public mesesIngreso = new Array();
  public mesesEgreso = new Array();
  public mesesBalance = new Array();
  public septiembre;

  constructor(
    private _ventaService: VentaService,
    private _egresoService: EgresoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.ingresosMensuales();
    this.egresosMensuales();
  }

  ingresosMensuales() {
    this._ventaService.getVentas().subscribe(
      response => {
        let sumador;
        let ventasFiltradas

        if (response.ventas) {
          for (let i = 0; i < 12; i++) {
            ventasFiltradas = response.ventas.filter(venta => new Date(venta.fecha).getMonth() == i);
            sumador = ventasFiltradas.reduce((acc, obj,) => acc + obj.monto, 0);
            this.mesesIngreso[i] = sumador;
          }

          this.sumaVentasTotal = response.ventas.reduce( (acc, obj) => acc + obj.monto, 0);
          let ventasFiltradasMensual = response.ventas.filter(venta => new Date(venta.fecha).getMonth() === new Date().getMonth());
          this.sumaVentasMensual = ventasFiltradasMensual.reduce((acc,obj) => acc + obj.monto, 0);
        }
      }
    )
  }

  egresosMensuales() {
    this._egresoService.getEgresos().subscribe(
      response => {
        let sumador;

        if (response.egresos) {
          for (let i = 0; i < 12; i++) {
            let egresosFiltradas = response.egresos.filter(egresos => new Date(egresos.fecha).getMonth() == i);

            sumador = egresosFiltradas.reduce((acc, obj,) => acc + obj.monto, 0);
            this.mesesEgreso[i] = sumador;
          }
        }
      }
    )
  }

}
