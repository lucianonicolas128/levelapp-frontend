import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../models/egreso';
import { EgresoService } from '../../../services/egreso.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css'],
  providers: [EgresoService]
})
export class EgresosComponent implements OnInit {

  public egresos: Egreso[];
  public url: string;
  public confirm: boolean;
  public egreso: Egreso;

  public montoEgresos: Array<Egreso[]>;
  public sumaEgresos: number;

  public saldoEgresos: number;

  public ultimaSemana: number;
  public ultimoMes: number;
  public sumaEgresosMensual: number;

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
    this.egresosMensuales();
  }

  getEgreso() {
    this._egresoService.getEgresos().subscribe(
      response => {
        if (response.egresos) {
          this.egresos = response.egresos;

          this.sumaEgresos = response.egresos.reduce((acc, obj) => acc + obj.monto, 0);

          this.ultimaSemana = this.sumaEgresos - 23700 - 12000 - 36100 - 43050;
          this.ultimoMes = this.sumaEgresos - 12200 - 23500 - 79150;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  
  egresosMensuales() {
    this._egresoService.getEgresos().subscribe(
      response => {
        let sumador;

        if (response.egresos) {
          let egresosFiltrados = this.egresos.filter(egreso => new Date(egreso.fecha).getMonth() == new Date().getMonth());
          sumador = egresosFiltrados.reduce((acc, obj,) => acc + obj.monto, 0);
        }
        this.sumaEgresosMensual = sumador;
        console.log(sumador);
      }
    )
  }


  deleteEgreso(id) {
    let message = confirm("Desea eliminar esta venta?");
    if (message) {
      this._egresoService.deleteEgreso(id).subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Venta no eliminada');
    }
  }


  reloadComponent() {
    this._router.navigateByUrl('/add-egreso', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/']);
    });
  }

  /* 
    setConfirm(confirm){
      this.confirm = this.egreso.entregado;
    } */

}

