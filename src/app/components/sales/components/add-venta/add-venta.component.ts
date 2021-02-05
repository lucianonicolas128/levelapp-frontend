import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { UploadService } from '../../../../services/upload.service';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css'],
  providers: [VentaService, ClienteService, UploadService]
})
export class AddVentaComponent implements OnInit {
  form!: FormGroup;
  public venta: Venta;
  public cliente: Cliente;
  public status: string;
  public nombreCliente: string;
  public clientes: Cliente[];

  constructor(
    private formBuilder: FormBuilder,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
  ) {
    this.venta = new Venta('', '', '', '', '', 0, 0, false);
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filterValue));
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

  getCliente(id) {
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
        this.nombreCliente = response.cliente.nombre;
      }
    )
  }

  onSubmit(form) {
    this.status = 'loading';
    if (this.form.valid) {
      this.venta = this.form.value;
      this._ventaService.saveVenta(this.venta).subscribe(
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

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],
      pedido: [''],
      descripcion: [''],
      monto: [, Validators.required],
      saldo: [],
      entregado: [false],
    });
  }

  get clienteField(){
    return this.form.get('cliente');
  }
}


