import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { routing } from 'src/app/app.routing';
import { VentasComponent } from '../ventas/ventas.component';
import { $ } from '../../../../../node_modules/jquery/dist/jquery.min.js';
import { faSync } from 'node_modules/@fortawesome/free-solid-svg-icons/faSync';

@Component({
  selector: 'app-addventa',
  templateUrl: './addventa.component.html',
  styleUrls: ['./addventa.component.css'],
  providers: [VentaService, ClienteService, UploadService]
})

export class AddventaComponent implements OnInit {
  public faSync = faSync;

  public title: string;
  public venta: Venta;
  public cliente: Cliente;
  public status: string;
  public filesToUpload: Array<File>;
  public save_venta;
  public url: string;  

  public nombreCliente: string;

  public clientes: Cliente[];

  constructor(
    private _ventaService: VentaService,
    private _uploadService: UploadService,
    private _clienteService: ClienteService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title ="Nueva venta";
    this.venta = new Venta('','','','','',0,0,false);
    this.url = Global.url;
    
  }

  ngOnInit(): void {
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
  
  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
        this.nombreCliente = response.cliente.nombre;
      }
    )
  }

  onSubmit(form){
    
    this.venta.saldo = this.venta.monto;

    //Guardar los datos
    this._ventaService.saveVenta(this.venta).subscribe(
      response =>{
        if(response.venta){
          
          this.save_venta = response.venta;
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

  actualizarCliente(){
    this.getClientes();
    console.log("Lista de clientes actualizada");
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}


