import { Component, OnInit } from '@angular/core';
import { VentasComponent } from '../../ventass/ventas/ventas.component';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../services/venta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [VentaService],
})
export class IndexComponent implements OnInit {

  public ventas : Venta[];
  public filtrado: string = "todo";
  public incidencia: string = "ventas";
  public bloque: string = "productos";
  public mayo: number = 33140;
  public junio: number = 259100;
  public julio: number = 213358;
  public agosto: number = 201005;

  
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
          this.ultimaSemana = this.sumaVentas - 33140 - 28350 -68910 -44550 -21680 - 95610 - 28740 - 63140 - 121478 - 55100 - 60050 - 39365 - 30375 - 19465 - 33100;
          this.ultimoMes = this.sumaVentas - this.mayo - this.junio - this.julio - this.agosto;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  ingresosMensuales(){

    let thisMonth = new Date().getMonth();

    this._ventaService.getVentas().subscribe(
      response => {
        
        let sumador;
        if(response.ventas){
          let ventasAux = response.ventas;
          
          let ventasFiltradas = this.ventas.filter(venta => new Date(venta.fecha).getMonth()  == thisMonth);

          sumador = ventasFiltradas.reduce((
            acc,
            obj,
          ) => 
            acc + obj.monto,
            
          0);

          
        }
        this.sumaVentasMensual = sumador;
        
      }
    )
    
  }


  seleccionarIncidencia(incidencia){
    this.incidencia = incidencia;
  }

  seleccionarBloque(bloque){
    this.bloque = bloque;
  }

}
