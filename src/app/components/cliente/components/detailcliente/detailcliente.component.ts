import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VentaService } from '../../../../services/venta.service';
import { Venta } from '../../../../models/venta'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faPhoneAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons'

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-detailcliente',
  templateUrl: './detailcliente.component.html',
  styleUrls: ['./detailcliente.component.css'],
  providers: [VentaService, ClienteService]
})
export class DetailclienteComponent implements OnInit {
  public url: string;
  public cliente: Cliente;
  public confirm: boolean;
  public ventas: Venta[];
  public comprasCliente: Venta[];
  public venta: Venta;

  faPhone = faPhoneAlt;
  faMap = faMapMarker;

  constructor(
    private _clienteService: ClienteService,
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.url = Global.url;
    this.confirm = false
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getCliente(this.data._id);
    });
  }

  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response.cliente;
        this.getVentas(); 
      }
    )
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }

  deleteCliente(id){
    this._clienteService.deleteCliente(id).subscribe(
      response => {
        this._router.navigate(['/clientes']);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  
  getVentas(){
    this._ventaService.getVentas().subscribe(
      response => {
        if(response.ventas){
          this.ventas = response.ventas;

          /* FILTRAMOS TODAS LAS COMPRAS DE ESTE CLIENTE */
          this.comprasCliente = this.ventas.filter(venta => venta.cliente == this.cliente.nombre);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  deleteVenta(id){
    this._ventaService.deleteVenta(id).subscribe(
      response => {
        this._router.navigate(['/ventas']);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

}
