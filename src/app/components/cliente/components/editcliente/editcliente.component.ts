import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { UploadService } from '../../../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-editcliente',
  templateUrl: '../addcliente/addcliente.component.html',
  styleUrls: ['./editcliente.component.css'],
  providers: [ClienteService, UploadService]
})

export class EditclienteComponent implements OnInit {
  form!: FormGroup;
  public cliente: Cliente;
  public clientes: Cliente[];
  public status: string;
  public save_cliente;
  messageClient;

  constructor(
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getCliente(this.data._id);
    });
  }

  getCliente(id) {
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form) {
    this.cliente = this.form.value;
    this.checkClient(this.cliente.nombre);
    if (this.messageClient) {
      this.status = 'loading';
      if (this.form.valid) {
        this._clienteService.updateCliente(this.cliente).subscribe(
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


  checkClient(nombre) {
    if (this.clientes.find(cliente => cliente.nombre.toUpperCase().normalize() === nombre.toUpperCase().normalize())) {
      let message = alert("El cliente ya existe");
      this.messageClient = false;
    } else {
      this.messageClient = true;
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
