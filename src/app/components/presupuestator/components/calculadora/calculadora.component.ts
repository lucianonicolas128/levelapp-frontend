import { Component, OnInit, Inject } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { Material } from '../../../../models/material';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  providers: [MaterialService]
})
export class CalculadoraComponent implements OnInit {


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
    public dialogRef: MatDialogRef<CalculadoraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    this.getMaterial(this.data._id);
  }


  getMaterial(id){
    this._materialService.getMaterial(id).subscribe(
      response => {
        this.material = response.material;
        this.price = response.material.price;
      }
    )
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

}
