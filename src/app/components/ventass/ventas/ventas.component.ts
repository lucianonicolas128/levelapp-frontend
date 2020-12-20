import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { $ } from '../../../../../node_modules/jquery/dist/jquery.min.js';
import { faSync } from 'node_modules/@fortawesome/free-solid-svg-icons/faSync';
// import { getClientes } from '../../cliente/clientes/clientes';
import { IndexComponent } from '../../index/index/index.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentaService, ClienteService],
  'changeDetection': ChangeDetectionStrategy.Default
})
export class VentasComponent implements OnInit {
  public faSync = faSync;
  faEdit = faEdit;

  public ventas: Venta[];
  public url: string;
  public confirm: boolean;
  public venta: Venta;
  public save_venta;
  public status: string;
  public indexComponent: IndexComponent;

  /* VARIABLES DE FILTRADO DE VENTAS */
  public ventaSinEntregar: Venta[];
  public filtrado: string = "todo";

  /* VARIABLES PARA CONTROLAR EL BALANCE DE VENTAS */
  public sumaVentas: number;
  public saldoVentas: number;
  public ultimaSemana: number;
  public ultimoMes: number;

  /* VARIABLES PARA INTENTAR RECONOCER EL CLIENTE Y NOMBRARLO */
  public cliente: Cliente;
  public clientes: Cliente[];
  public nombre;
  public _id_;
  public telefono: string;
  public direccion: string;

  public comprasCliente: Venta[];
  public arrayAnio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12];

  constructor(
    private _clienteService: ClienteService,
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    this.getVentas();
    this.getClientes();
  }

  getVentas() {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventas) {
          this.ventas = response.ventas;
          this.ventaSinEntregar = this.ventas.filter(venta => venta.entregado == false);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setEntrega(venta) {
    if (!venta.entregado) {
      venta.entregado = true;
      venta.saldo = 0;
    } else {
      venta.entregado = false;
      venta.saldo = venta.monto;
    }

    this._ventaService.updateVenta(venta).subscribe(
      response => {
        this.save_venta = venta;
      }
    )
    this.ngOnInit();
  }

  deleteSale(id) {
    let message = confirm("Desea eliminar esta venta?");
    if (message) {
      this._ventaService.deleteVenta(id).subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Venta no eliminada');
    }
  }

  editVenta(id) {
    this.getVenta(id);
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientes) {
          this.clientes = response.clientes;

          /* RECORREMOS LOS CLIENTES PARA CAPTURAR EL TELEFONO Y LA DIRECCION */
          // response.clientes.forEach(cliente => {
          //   if (this.venta.cliente == cliente.nombre) {
          //     this.telefono = cliente.telefono;
          //     this.direccion = cliente.direccion;
          //   }
          // })
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getVenta(id) {
    this._ventaService.getVenta(id).subscribe(
      response => {
        this.venta = response.venta;
        this.getVentas();
        let prueba = new Date(this.venta.fecha);
      }
    )
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  actualizarFiltrado(valor) {
    this.filtrado = valor;
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

  onSubmit(form) {
    this.venta.saldo = this.venta.monto;
    //Guardar los datos
    this._ventaService.updateVenta(this.venta).subscribe(
      response => {
        if (response.venta) {

          this.save_venta = response.venta;
          this.status = 'succes';
          form.reset();
          this.ngOnInit();
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}