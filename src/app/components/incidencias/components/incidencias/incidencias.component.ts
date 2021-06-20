import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddSaleComponent } from 'src/app/components/sales/components/add-sale/add-sale.component';
import { AddVentaComponent } from 'src/app/components/sales/components/add-venta/add-venta.component';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../../../services/venta.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css'],
  providers: [VentaService],
})
export class IncidenciasComponent implements OnInit {
  public ventas: Venta[];
  public filtrado: string = "todo";
  public incidencia: string = "ventas";
  public bloque: string = "productos";

  public sumaVentas: number;
  public saldoVentas: number;
  public ultimaSemana: number;
  public ultimoMes: number;

  public isActive!: string;

  constructor(
    private _ventaService: VentaService,
    public dialog: MatDialog,
  ) {
    this.isActive = 'ventas';
  }

  ngOnInit(): void {
    this.getVentas();
    this.ingresoSemanal();
  }

  actualizarFiltrado(valor) {
    this.filtrado = valor;
  }

  getVentas() {
    this._ventaService.getVentas().subscribe(
      response => {
        if (response.ventasFiltrados) {
          this.ventas = response.ventasFiltrados;
          this.sumaVentas = this.ventas.reduce((acc, obj) => acc + obj.monto, 0);
          this.saldoVentas = this.ventas.reduce((acc, obj) => acc + obj.saldo, 0);
        }
      },
      error => { console.log(<any>error); }
    )
  }

  seleccionarIncidencia(incidencia) {
    this.incidencia = incidencia;
  }

  seleccionarBloque(bloque) {
    this.bloque = bloque;
  }

  ingresoSemanal() {
    let semanaActual = new Date().getWeekNumber;
    this._ventaService.getVentas().subscribe(
      response => {
        let sumaSemana;
        if (response.ventasFiltrados) {
          let ventasFiltradasPorSemana = response.ventasFiltrados
            .filter(venta => (new Date(venta.fecha).getWeekNumber()) === new Date().getWeekNumber());
          ventasFiltradasPorSemana = ventasFiltradasPorSemana.filter(venta => (new Date(venta.fecha).getFullYear()) === new Date().getFullYear());
          sumaSemana = ventasFiltradasPorSemana.reduce((acc, obj) => acc + obj.monto, 0);
          this.ultimaSemana = sumaSemana;

        }
      }
    )
  }

  // addSale() {
  //   const dialogRef = this.dialog.open(AddSaleComponent);
  //   dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  // }

  addSale() {
    const dialogRef = this.dialog.open(AddVentaComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  addEgress() {
    const dialogRef = this.dialog.open(AddegressComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  active(valor){
    this.isActive = valor;
  }

}
