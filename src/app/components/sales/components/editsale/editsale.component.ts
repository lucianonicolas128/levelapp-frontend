import { Component, OnInit, Inject } from '@angular/core';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { faSync } from 'node_modules/@fortawesome/free-solid-svg-icons/faSync'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-editsale',
  templateUrl: './editsale.component.html',
  // templateUrl: '../add-venta/add-venta.component.html',
  styleUrls: ['./editsale.component.css'],
  providers: [VentaService, ClienteService, UploadService]
})
export class EditsaleComponent implements OnInit {
  form!: FormGroup;
  public venta: Venta;
  public cliente: Cliente;
  public status: string;
  public filesToUpload: Array<File>;
  public save_venta;
  public _ID_: string;
  public nombreCliente: string;
  public clientes: Cliente[];

  constructor(
    private formBuilder: FormBuilder,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private authService: AuthService,
    public dialogRef: MatDialogRef<EditsaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => { this.getVenta(this.data._id); });
    this.getClientes();
  }

  getClientes() {
    let company = this.authService.getUID();
    this._clienteService.getClientes().subscribe(
      response => { if (response.clientes) { this.clientes = response.clientesFiltrados; } },
      error => { console.log(<any>error); }
    )
  }


  getVenta(id) {
    this._ventaService.getVenta(id).subscribe(
      response => { this.venta = response.venta; },
      error => { console.log(<any>error); }
    )
  }

  onSubmit(form) {
    if (this.venta.entregado) { this.venta.saldo = 0; }
    let company = this.authService.getUID();
    this.status = 'loading';
    this.venta.company = company;
    if (this.venta) {
      this._ventaService.updateVenta(this.venta).subscribe(
        response => {
          this.status = 'succes';
          form.reset();
        })
    } else { this.status = 'failed'; }
  }


  actualizarCliente() {
    this.getClientes();
    console.log("Lista de clientes actualizada");
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],
      pedido: [''],
      descripcion: [''],
      monto: [, Validators.required],
      saldo: [],
      entregado: [],
    });
  }

  get clienteField() { return this.form.get('cliente'); }

}
