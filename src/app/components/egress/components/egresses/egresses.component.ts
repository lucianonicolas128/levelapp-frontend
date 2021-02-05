import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { Global } from '../../../../services/global';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddVentaComponent } from 'src/app/components/sales/components/add-venta/add-venta.component';


@Component({
  selector: 'app-egresses',
  templateUrl: './egresses.component.html',
  styleUrls: ['./egresses.component.css'],
  providers: [EgresoService]
})
export class EgressesComponent implements AfterViewInit {

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
      })
  }

  getAllEgresos(){
    this.loadMore = "cargando";
    this._egresoService.getEgresos()
      .subscribe(data => {
        this.egresos = data.egresos;
      })
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddVentaComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngAfterViewInit();
    });
  }

  openDialogEgreso() {
    const dialogRef = this.dialog.open(AddegressComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.ngAfterViewInit();
    });

  }

}
