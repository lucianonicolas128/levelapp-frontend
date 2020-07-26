import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { faSync } from 'node_modules/@fortawesome/free-solid-svg-icons/faSync'

@Component({
  selector: 'app-editventa',
  templateUrl: '../addventa/addventa.component.html',
  styleUrls: ['./editventa.component.css'],
  providers: [VentaService, ClienteService, UploadService]
})
export class EditventaComponent implements OnInit {
  public faSync = faSync;

  public title: string;
  public venta: Venta;
  public cliente: Cliente;
  public status: string;
  public filesToUpload: Array<File>;
  public save_venta;
  public url: string;
  
  public _ID_: string;
  public nombreCliente: string;

  public clientes: Cliente[];

  constructor(
    private _ventaService: VentaService,
    private _uploadService: UploadService,
    private _clienteService: ClienteService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.title = "Editar venta";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getVenta(id);
    });
    
    this.getClientes();
    
  }

  getClientes(){
    this._clienteService.getClientes().subscribe(
      response => {
        if(response.clientes){
          this.clientes = response.clientes;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  getVenta(id){
    this._ventaService.getVenta(id).subscribe(
      response => {
        this.venta = response.venta;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  
  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
      }
    )
  }

  onSubmit(form){
    if(this.venta.entregado){
      this.venta.saldo = 0;
    }
    
    //Guardar los datos
    this._ventaService.updateVenta(this.venta).subscribe(
      response =>{
        if(response.venta){
          this.save_venta = response.venta;
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

  
  actualizarCliente(){
    this.getClientes();
    console.log("Lista de clientes actualizada");
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
