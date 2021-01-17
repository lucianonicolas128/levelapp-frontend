import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { Global } from '../../../../services/global';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { AddegresoComponent } from '../../../egresoss/components/addegreso/addegreso.component';
import { MatDialog } from '@angular/material/dialog';
import { AddegresoComponent } from 'src/app/components/egreso/addegreso/addegreso.component';
import { AddventaComponent } from 'src/app/components/ventass/components/addventa/addventa.component';


@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css'],
  providers: [EgresoService]
})
export class EgresosComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Egreso>;

  egresos!: Egreso[];
  url;
  egresosFiltered;
  loadMore = "esperando";

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _egresoService: EgresoService,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
  }


  ngAfterViewInit(): void {
    this.getLatestEgresos();
  }

  getLatestEgresos(){
    this._egresoService.getEgresos()
      .subscribe(data => {
        this.egresos = data.egresos.slice(0,10);
        // this.dataSource = new MatTableDataSource<Venta>(this.ventas);
        // console.log(this.ventas);
      })
  }

  getAllEgresos(){
    this.loadMore = "cargando";
    this._egresoService.getEgresos()
      .subscribe(data => {
        this.egresos = data.egresos;
        // this.dataSource = new MatTableDataSource<Venta>(this.ventas);
        // console.log(this.ventas);
      })
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
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

}
