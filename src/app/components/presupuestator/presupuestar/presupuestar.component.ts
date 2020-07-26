import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { Material } from '../../../models/material';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


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

  constructor(
    private _materialService: MaterialService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
   }

  ngOnInit(): void {
  }

  getMaterial(){
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

}
