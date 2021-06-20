import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VentaService } from '../../../../services/venta.service';
import { Venta } from '../../../../models/venta'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-detailcliente',
  templateUrl: './detailcliente.component.html',
  styleUrls: ['./detailcliente.component.css'],
})
export class DetailclienteComponent implements OnInit {
  public cliente: Cliente;
  public confirm: boolean;
  public ventas: Venta[];
  public comprasCliente: Venta[];
  public venta: Venta;

  constructor(
    private authService: AuthService,
    private _clienteService: ClienteService,
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { this.confirm = false }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getCliente(this.data._id);
    });
  }

  getCliente(id) {
    this._route.params.subscribe(response => {
      this._clienteService.getCliente(id).subscribe(
        response => {
          this.cliente = response.cliente;
          this.getVentas();
        })
    })
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  deleteCliente(id) {
    this._clienteService.deleteCliente(id).subscribe(
      response => { this._router.navigate(['/clientes']); },
      error => { console.log(<any>error) }
    )
  }

  getVentas() {
    let company = this.authService.getUID();
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventasFiltrados) {
          this.ventas = response.ventasFiltrados;
          this.comprasCliente = this.ventas.filter(venta => venta.cliente == this.cliente.nombre);
        }
      },
      error => { console.log(<any>error); }
    )
  }

  deleteVenta(id) {
    this._ventaService.deleteVenta(id).subscribe(
      response => { this._router.navigate(['/incidencias']); },
      error => { console.log(<any>error) }
    )
  }

}
