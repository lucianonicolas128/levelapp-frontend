import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../models/egreso';
import { EgresoService } from '../../../services/egreso.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { faSync } from 'node_modules/@fortawesome/free-solid-svg-icons/faSync';

@Component({
  selector: 'app-addegreso',
  templateUrl: './addegreso.component.html',
  styleUrls: ['./addegreso.component.css'],
  providers: [EgresoService, UploadService]
})
export class AddegresoComponent implements OnInit {
  public faSync = faSync;

  public title: string;
  public egreso: Egreso;
  public status: string;
  public filesToUpload: Array<File>;
  public save_egreso;
  public url: string;

  constructor(
    private _egresoService: EgresoService,
    private _uploadService: UploadService
  ) {
    this.title ="Nueva egreso" ;
    this.egreso = new Egreso('','','','','',0);
    this.url = Global.url;
  }

  ngOnInit(): void {
  }
  
  onSubmit(form){
    
    //Guardar los datos
    this._egresoService.saveEgreso(this.egreso).subscribe(
      response =>{
        if(response.egreso){
          this.save_egreso = response.egreso;
          this.status = 'succes';
          form.reset();
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
