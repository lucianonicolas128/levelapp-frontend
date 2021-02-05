import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css'],
  providers: [ClienteService, UploadService]
})
export class AddclienteComponent implements OnInit {
  form!: FormGroup;
  public cliente: Cliente;
  public status: string;
  public save_cliente;
  public clientes: Cliente[];
  auxClient: Cliente[];
  messageClient;

  constructor(
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private _uploadService: UploadService
  ) {
    this.cliente = new Cliente('', '', 0, '',);
    this.buildForm();
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
    this.cliente = this.form.value;
    this.checkClient(this.cliente.nombre);
    if (this.messageClient) {
      this.status = 'loading';
      if (this.form.valid) {
        this.cliente = this.form.value;
        this._clienteService.saveCliente(this.cliente).subscribe(
          response => {
              this.save_cliente = response.cliente;
              this.status = 'succes';
              form.reset();
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
    });
  }

}
