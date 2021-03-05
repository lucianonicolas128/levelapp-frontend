import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { UploadService } from '../../../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
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
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { this.buildForm(); }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._clienteService.getCliente(this.data._id)
        .subscribe(cliente => {
          this.cliente = cliente.cliente;
          this.form.patchValue(cliente.cliente);
        })
    })
  }

  onSubmit(form) {
    let company = this.authService.getUID();
    this.cliente = this.form.value;
    this.cliente.company = company;
    if (this.form.valid) {
      this.status = 'loading';
      if (this.cliente) {
        this._clienteService.updateCliente(this.cliente).subscribe(
          response => { this.status = 'succes'; },
          error => { console.log(<any>error); }
        );
      }
    }
  }

  checkClient(nombre) {
    if (this.clientes.find(cliente => cliente.nombre.toUpperCase().normalize() === nombre.toUpperCase().normalize())) {
      let message = alert("El cliente ya existe");
      this.messageClient = false;
    } else { this.messageClient = true; }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [],
      nombre: [, Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
      company: [''],
    });
  }

  get idField() { return this.form.get('_id'); }

  get nombreField() { return this.form.get('nombre'); }

  get telefonoField() { return this.form.get('telefono'); }

  get direccionField() { return this.form.get('direccion'); }

}
