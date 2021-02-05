import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editegress',
  templateUrl: '../addegress/addegress.component.html',
  styleUrls: ['./editegress.component.css'],
  providers: [EgresoService, UploadService]
})
export class EditegressComponent implements OnInit {

  public title: string;
  public egreso: Egreso;
  public status: string;
  public filesToUpload: Array<File>;
  public save_egreso;
  public url: string;

  constructor(
    private _egresoService: EgresoService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar egreso";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getegreso(id);
    });
  }

  getegreso(id){
    this._egresoService.getEgreso(id).subscribe(
      response => {
        this.egreso = response.egreso;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    
    //Guardar los datos
    this._egresoService.updateEgreso(this.egreso).subscribe(
      response =>{
        if(response.egreso){
          this.save_egreso = response.egreso;
          this.status = 'succes';
        }else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any> error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
