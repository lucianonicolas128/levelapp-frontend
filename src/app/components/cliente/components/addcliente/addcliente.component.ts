import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';

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
  public clientes: Cliente[];
  auxClient: Cliente[];
  messageClient;

  constructor(

    private _clienteService: ClienteService,
    private _uploadService: UploadService
  ) {
    this.title = "Nuevo Cliente";
    this.cliente = new Cliente('', '', 0, '',);
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientes) {
          this.clientes = response.clientes;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  checkClient(nombre) {
    if (this.clientes.find(cliente => cliente.nombre.toUpperCase().normalize() === nombre.toUpperCase().normalize())) {
      let message = alert("El cliente ya existe");
      this.messageClient = false;
    } else {
      this.messageClient = true;
    }
  }

  onSubmit(form) {
    this.checkClient(this.cliente.nombre);

    if (this.messageClient) {
      this.status = 'loading';
      //Guardar los datos
      this._clienteService.saveCliente(this.cliente).subscribe(
        response => {
          if (response.cliente) {
            if (this.clientes.filter(cliente => cliente.nombre != response.cliente.nombre)) {
              this.save_cliente = response.cliente;
              this.status = 'succes';
              /* window.location.reload(); */
              form.reset();
            }
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      this.status = 'failed';
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
