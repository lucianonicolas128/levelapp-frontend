import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css'],
  providers: [ClienteService, UploadService]
})
export class AddclienteComponent implements OnInit {

  public title: string;
  public cliente: Cliente;
  public status: string;
  public filesToUpload: Array<File>;
  public save_cliente;
  public url: string;
  public clientes : Cliente[];

  constructor(
    
    private _clienteService: ClienteService,
    private _uploadService: UploadService
  ) {
    this.title = "Nuevo Cliente";
    this.cliente = new Cliente('','',0,'',);
    this.url = Global.url;
   }

  ngOnInit(): void {
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
  
  onSubmit(form){

    this.getClientes();
    
    //Guardar los datos
    this._clienteService.saveCliente(this.cliente).subscribe(
      response =>{

        if(response.cliente){

          if(this.clientes.filter(cliente => cliente.nombre != response.cliente.nombre)){
            this.save_cliente = response.cliente;
            this.status = 'succes';
            /* window.location.reload(); */
            form.reset();
          }

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
