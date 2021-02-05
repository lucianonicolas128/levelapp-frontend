import { Component, OnInit, Inject } from '@angular/core';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-detailventa',
  templateUrl: './detailventa.component.html',
  styleUrls: ['./detailventa.component.css'],
  providers: [VentaService, ClienteService]
})

export class DetailventaComponent implements OnInit {
  
  public url: string;
  public venta: Venta;
  public confirm: boolean;
  public cliente: Cliente;
  public clientes: Cliente[];
  public ventas: Venta[];
  public comprasCliente: Venta[];

  public nombre: string;
  public telefono: string;
  public direccion: string;

  constructor(
    private _clienteService: ClienteService,
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailventaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.url = Global.url;
    this.confirm = false
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getVenta(this.data._id);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getVenta(id) {
    this._ventaService.getVenta(id).subscribe(
      response => {
        this.venta = response.venta;
        this.getClientes();
        this.getVentas();
      }
    )
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  deleteVenta(id) {
    this._ventaService.deleteVenta(id).subscribe(
      response => {
        this._router.navigate(['/ventas']);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientes) {
          this.clientes = response.clientes;

          /* RECORREMOS LOS CLIENTES PARA CAPTURAR EL TELEFONO Y LA DIRECCION */
          response.clientes.forEach(cliente => {
            if (this.venta.cliente == cliente.nombre) {
              this.telefono = cliente.telefono;
              this.direccion = cliente.direccion;
            }
          })
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
        this.nombre = response.cliente.nombre;
        this.telefono = response.cliente.telefono;
        this.direccion = response.cliente.direccion;
      }
    )
  }

  getVentas() {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventas) {
          this.ventas = response.ventas;

          /* FILTRAMOS TODAS LAS COMPRAS DE ESTE CLIENTE */
          this.comprasCliente = this.ventas.filter(venta => venta.cliente == this.venta.cliente);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


}
