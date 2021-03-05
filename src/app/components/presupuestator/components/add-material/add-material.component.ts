import { Component, OnInit } from '@angular/core';
import { Material } from '../../../../models/material'
import { MaterialService } from 'src/app/services/material.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';


@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css'],
  providers: [MaterialService, UploadService]
})
export class AddMaterialComponent implements OnInit {
  public title: string;
  public status: string;
  public material: Material;
  public save_material;
  public url: string;

  constructor(
    private _materialService: MaterialService,
    private _uploadService: UploadService
  ) {
    this.title = "Nuevo material";
    this.material = new Material('','',0,'','');
    this.url = Global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._materialService.saveMaterial(this.material).subscribe(
      response => {
        if(response.material){
          this.save_material = response.material;
          this.status = 'succes';
          form.reset();
        } else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any> error);
      }
    );
  }

}
