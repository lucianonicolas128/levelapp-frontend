import { Component, OnInit, Inject } from '@angular/core';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-detailegress',
  templateUrl: './detailegress.component.html',
  styleUrls: ['./detailegress.component.css'],
  providers: [EgresoService]
})
export class DetailegressComponent implements OnInit {
  public url: string;
  public egreso: Egreso;
  public confirm: boolean;

  constructor(
    private _egresoService: EgresoService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailegressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.url = Global.url;
    this.confirm = false
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getEgreso(this.data._id);
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
