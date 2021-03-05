import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { UploadService } from '../../../../services/upload.service';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales/sales.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css'],
  providers: [VentaService, ClienteService, UploadService]
})
export class AddSaleComponent implements OnInit {
  form!: FormGroup;
  public venta: Venta;
  public cliente: Cliente;
  public status: string;
  public nombreCliente: string;
  public clientes: Cliente[];
  saleType: string[] = ['Venta particular', 'Productos de la lista'];
  optionSale: string;
  pedido;

  constructor(
    private formBuilder: FormBuilder,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private authService: AuthService,
  ) {
    this.venta = new Venta('', '', '', null, '', 0, 0, false,'');
    this.buildForm();
  }

  get clienteField() {
    return this.form.get('cliente');
  }

  get montoField() {
    return this.form.get('monto');
  }

  get dateField() {
    return this.form.get('fecha');
  }

  get precioField(){
    return this.form.get('precio');
  }

  get cantidadField() {
    return this.form.get('cantidad');
  }

  ngOnInit(): void {
    this.buildForm();
    this.pedido = this.form.get('pedido') as FormArray;
    this.addNewProductRow();
    this.getClientes();
  }

  _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filterValue));
  }

  getClientes() {
    let company = this.authService.getUID();
    this._clienteService.getClientesCompany(company).subscribe(
      response => {
        if (response.clientesFiltrados) {
          this.clientes = response.clientesFiltrados;
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
    // console.log(this.form.value);
    let company = this.authService.getUID();
    this.status = 'loading';
    if (this.form.valid) {
      this.venta = this.form.value;
      this.venta.company = company;
      this.venta.pedido = JSON.stringify(this.venta.pedido);
      this.venta.saldo = this.venta.monto;
      console.log(this.venta);
      this._ventaService.saveVenta(this.venta).subscribe(
        response => {
          this.status = 'succes';
          form.reset();
          this.ngOnInit();
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
      pedido: this.formBuilder.array([]),
      descripcion: [''],
      monto: [, Validators.required],
      saldo: [],
      entregado: [false],
    });
  }

  addNewProductRow() {
    const pedidos = (this.form.get('pedido')as FormArray);
    pedidos.push(this.formBuilder.group({
      producto: ['', Validators.required],
      precio: [, Validators.required],
      cantidad: [],
      total: [],
    }));
  }

  removePedido(index) {
    this.pedido.removeAt(index);
  }

  getSaleType(value) {
    this.optionSale = value;
    console.log(this.optionSale);
  }

  getControls(){
    return (this.form.get('pedido') as FormArray).controls;
  }

}


