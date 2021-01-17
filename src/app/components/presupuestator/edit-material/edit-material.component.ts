import { Component, OnInit, Inject } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { UploadService } from 'src/app/services/upload.service';
import { Material } from '../../../models/material';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-edit-material',
  templateUrl: '../add-material/add-material.component.html',
  styleUrls: ['./edit-material.component.css'],
  providers: [MaterialService, UploadService]
})
export class EditMaterialComponent implements OnInit {

  public title: string;
  public material: Material;
  public status: string;
  public save_material;
  public url: string;

  constructor(
    private _materialService: MaterialService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = "Editar material";
    this.url = Global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getMaterial(this.data._id);
    });
  }

  
  getMaterial(id){
    this._materialService.getMaterial(id).subscribe(
      response => {
        this.material = response.material;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  onSubmit(form){
    
    //Guardar los datos
    this._materialService.updateMaterial(this.material).subscribe(
      response =>{
        if(response.material){
          this.save_material = response.material;
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


}
