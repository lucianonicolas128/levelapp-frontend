import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editcliente',
  templateUrl: '../addcliente/addcliente.component.html',
  styleUrls: ['./editcliente.component.css'],
  providers: [ClienteService, UploadService]
})
export class EditclienteComponent implements OnInit {

  public title: string;
  public cliente: Cliente;
  public status: string;
  public filesToUpload: Array<File>;
  public save_cliente;
  public url: string;

  constructor(
    private _clienteService: ClienteService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar cliente";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getCliente(id);
    });
  }

  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    
    //Guardar los datos
    this._clienteService.updateCliente(this.cliente).subscribe(
      response =>{
        if(response.cliente){
          this.save_cliente = response.cliente;
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
