import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { Global } from '../../../../services/global';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddventaComponent } from '../../../ventass/components/addventa/addventa.component';
import { MatDialog } from '@angular/material/dialog';
import { AddegresoComponent } from 'src/app/components/egreso/addegreso/addegreso.component';

@Component({
  selector: 'app-incidencias-table',
  templateUrl: './incidencias-table.component.html',
  styleUrls: ['./incidencias-table.component.css'],
  providers: [VentaService]
})

export class IncidenciasTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Venta>;
  ventas!: Venta[];
  url;
  ventasFiltered;
  loadMore = "esperando";

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _ventaService: VentaService,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
  }

  ngAfterViewInit() {
    this.getLatestSales();
  }

  getLatestSales(){
    this._ventaService.getVentas()
    .subscribe(data => {
      this.ventas = data.ventas.slice(0,20);
    })
  }

  getAllSales(){
    this.loadMore = "cargando";
    this._ventaService.getVentas()
    .subscribe(data => {
      this.ventas = data.ventas;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddventaComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngAfterViewInit();
    });
  }

  openDialogEgreso() {
    const dialogRef = this.dialog.open(AddegresoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.ngAfterViewInit();
    });

  }

  searchSale(param){
    this.ventasFiltered = this.ventas.filter(venta => venta.cliente.toUpperCase().includes(param.toUpperCase()));
  }

  cleanSale(){
    this.ventasFiltered = null;
    (<HTMLInputElement>document.getElementById('searcher')).value = '';
  }
  

}
