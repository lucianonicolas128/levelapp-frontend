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

  public ventas : Venta[];
  public url: string;
  public confirm: boolean;
  public venta: Venta;

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

  getVentas(){
    this._ventaService.getVentas().subscribe(
      response => {
        if(response.ventas){
          this.ventas = response.ventas;

          this.ventaSinEntregar = this.ventas.filter(venta => venta.entregado == false);
          

          /* Con este metodo sumamos los ingresos totales, donde acc es una bandera y obj el parametro del objeto de ventas */ 
          this.sumaVentas = this.ventas.reduce((
            acc,
            obj,
          ) => acc + obj.monto,
          0);

          /* Con este metodo sumamos los saldos totales, donde acc es una bandera y obj el parametro del objeto de ventas */
          this.saldoVentas = this.ventas.reduce((
            acc,
            obj,
          ) => acc + obj.saldo,
          0);

          this.ultimaSemana = this.sumaVentas - 33140 - 28350 -68910 -44550 -21680 - 95610 - 28740 - 63140;
          this.ultimoMes = this.sumaVentas - 33140 - 259100;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setEntrega(id){
        this.venta.entregado = true;
  }
  
  setConfirm(confirm){
    this.confirm = confirm;      
  }
  
  getClientes(){
    this._clienteService.getClientes().subscribe(
      response => {
        if(response.clientes){
          this.clientes = response.clientes;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  
  getVenta(id){
    this._ventaService.getVenta(id).subscribe(
      response => {
        this.venta = response.venta;
        
      this.getCliente(this.venta.cliente);
      /* this.recorrerClientes(this.cliente); */
      }
    )
  }
  
  getCliente(id){
    this._clienteService.getCliente(id).subscribe(
      response => {
        this.nombre = response.cliente.nombre;
      }
    )
  }

  reloadComponent(){
    this._router.navigateByUrl('/add-venta', { skipLocationChange: true }).then(() => {
            this._router.navigate(['']);
          }); 
  }

  actualizarFiltrado(valor){
    this.filtrado = valor;
  }

/* 
  click(){
    $('.modal-backdrop').modal('hide');
  } */


}
