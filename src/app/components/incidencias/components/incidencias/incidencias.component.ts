import { Component, OnInit } from '@angular/core';
import { VentasComponent } from '../../../ventass/components/ventas/ventas.component';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css'],
  providers: [VentaService],
})
export class IncidenciasComponent implements OnInit {

  public ventas : Venta[];
  public filtrado: string = "todo";
  public incidencia: string = "ventas";
  public bloque: string = "productos";
  public mayo: number = 33140;
  public junio: number = 259100;
  public julio: number = 213358;

  
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
    this.ingresoSemanal();
  }

  
  actualizarFiltrado(valor){
    this.filtrado = valor;
  }

  getVentas(){
    this._ventaService.getVentas().subscribe(
      response => {
        if(response.ventas){
          this.ventas = response.ventas;
          /* Con este metodo sumamos los ingresos totales, donde acc es una bandera y obj el parametro del objeto de ventas */ 
          this.sumaVentas = this.ventas.reduce((
            acc,
            obj,
          ) => acc + obj.monto,
          0);
          /* Con este metodo sumamos los saldos totales, donde acc es una bandera y obj el parametro del objeto de ventas */
          this.saldoVentas = this.ventas.reduce((
            acc,
            obj,
          ) => acc + obj.saldo,
          0);
          // this.ultimaSemana = this.sumaVentas - 33140 - 28350 -68910 -44550 -21680 - 95610 - 28740 - 63140 - 121478 - 55100 - 60050;
          this.ultimoMes = this.sumaVentas - this.mayo - this.junio - this.julio;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  seleccionarIncidencia(incidencia){
    this.incidencia = incidencia;
  }

  seleccionarBloque(bloque){
    this.bloque = bloque;
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


}
