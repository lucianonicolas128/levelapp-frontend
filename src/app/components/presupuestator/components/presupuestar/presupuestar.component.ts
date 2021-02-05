import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { Material } from '../../../../models/material';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { AddMaterialComponent } from '../add-material/add-material.component';
import { EditMaterialComponent } from '../edit-material/edit-material.component';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.component.html',
  styleUrls: ['./presupuestar.component.css'],
  providers: [MaterialService]
})
export class PresupuestarComponent implements OnInit {
  public materiales: Material[];
  public url: string;
  public confirm: boolean;
  public material: Material;
  
  public price: number;
  public cost: number;
  public ancho: number;
  public alto: number;

  
  public save_material;
  public status: string;

  constructor(
    private _materialService: MaterialService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
    this.confirm = false;
   }

  ngOnInit(): void {
    this.getMaterials();
  }

  openCalculadora(id) {
    const dialogRef = this.dialog.open(CalculadoraComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  addMaterial(){
    const dialogRef = this.dialog.open(AddMaterialComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  getMaterials(){
    this._materialService.getMateriales().subscribe(
      response => {
        if(response.materiales){
          this.materiales = response.materiales;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  deleteMaterial(id){
    let message = confirm("Desea eliminar este material?");
        if(message){
          this._materialService.deleteMaterial(id).subscribe(
            response => {
              this.ngOnInit();
            },
            error => {
              console.log(<any>error);
            }
          )
        } else{
          console.log('Material no eliminada');
        }    
  }

  editMaterial(id){
    const dialogRef = this.dialog.open(EditMaterialComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
    // this._materialService.getMaterial(id).subscribe(
    //   response => {
    //     this.material = response.material;
    //     this.price = response.material.price;
    //   }
    // )
  }

  calcular(){
    let laca = 0;
    let corte = 0;

    if((<HTMLInputElement>document.getElementById("laca")).checked){
      laca = 250;
      console.log('laca');
    }
    
    if((<HTMLInputElement>document.getElementById("corte")).checked){
      corte = 250;
      console.log('corte');
    }
    

    /* Asignamos los valores tomados de los input de ancho y alto */
    let ancho = Number((<HTMLInputElement>document.getElementById("ancho")).value);
    let alto = Number((<HTMLInputElement>document.getElementById("alto")).value);
    
    this.cost = (ancho/100) * (alto/100) * (this.material.price + laca + corte);

    if(this.cost < (this.material.price / 10)){
      this.cost = this.cost * 2.7;
    }else if(this.cost < (this.material.price / 3)){
      this.cost = this.cost * 2.5;
    } else{
      this.cost = this.cost * 2.3;
    }

  }

  cleanAndUpdate(){
    (<HTMLInputElement>document.getElementById('ancho')).value = '';
    (<HTMLInputElement>document.getElementById('alto')).value = '';
    (<HTMLInputElement>document.getElementById('cost')).value = '';
    this.cost = null;
    this.ngOnInit();

  }

  
  onSubmit(form){
    this._materialService.updateMaterial(this.material).subscribe(
      response => {
        if(response.material){
          this.save_material = response.material;
          this.status = 'succes';
          form.reset();
          this.ngOnInit();
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