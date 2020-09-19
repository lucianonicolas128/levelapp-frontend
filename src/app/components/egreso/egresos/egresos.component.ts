import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../models/egreso';
import { EgresoService } from '../../../services/egreso.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css'],
  providers: [EgresoService]
})
export class EgresosComponent implements OnInit {

  faEdit = faEdit;

  public egresos : Egreso[];
  public url: string;
  public confirm: boolean;
  public egreso: Egreso;

  
  public montoEgresos : Array<Egreso[]>;
  public sumaEgresos: number;
  
  public saldoEgresos: number;

  public ultimaSemana: number;
  public ultimoMes: number;

  constructor(
    private _egresoService: EgresoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
    
   }


  ngOnInit(): void {
    this.getEgreso();
  }

  getEgreso(){
    this._egresoService.getEgresos().subscribe(
      response => {
        if(response.egresos){
          this.egresos = response.egresos;

          
          /* Con este metodo sumamos los ingresos totales, donde acc es una bandera y obj el parametro del objeto de ventas */   

          this.sumaEgresos = this.egresos.reduce((
            acc,
            obj,
          ) => acc + obj.monto,
          0);
          

          /* Con este metodo sumamos los saldos totales, donde acc es una bandera y obj el parametro del objeto de ventas */
          

          this.ultimaSemana = this.sumaEgresos - 23700 -12000 - 36100 - 43050;
          this.ultimoMes = this.sumaEgresos - 12200 - 23500 - 79150;

        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  deleteEgreso(id){
    let message = confirm("Desea eliminar esta venta?");
        if(message){
          this._egresoService.deleteEgreso(id).subscribe(
            response => {
              this.ngOnInit();
            },
            error => {
              console.log(<any>error);
            }
          )
        } else{
          console.log('Venta no eliminada');
        }    
  }

  
  reloadComponent(){
    this._router.navigateByUrl('/add-egreso', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/']);
          }); 
  }

/* 
  setConfirm(confirm){
    this.confirm = this.egreso.entregado;
  } */

}

