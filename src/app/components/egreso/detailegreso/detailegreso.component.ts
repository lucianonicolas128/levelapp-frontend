import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../models/egreso';
import { EgresoService } from '../../../services/egreso.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detailegreso',
  templateUrl: './detailegreso.component.html',
  styleUrls: ['./detailegreso.component.css'],
  providers: [EgresoService]
})
export class DetailegresoComponent implements OnInit {
  public url: string;
  public egreso: Egreso;
  public confirm: boolean;

  constructor(
    private _egresoService: EgresoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getEgreso(id);
    });
  }

  getEgreso(id){
    this._egresoService.getEgreso(id).subscribe(
      response => {
        this.egreso = response.egreso;
      }
    )
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }

  deleteEgreso(id){
    this._egresoService.deleteEgreso(id).subscribe(
      response => {
        this._router.navigate(['/egresos']);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

}
