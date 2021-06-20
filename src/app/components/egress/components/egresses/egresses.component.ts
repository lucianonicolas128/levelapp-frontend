import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddVentaComponent } from 'src/app/components/sales/components/add-venta/add-venta.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditegressComponent } from '../editegress/editegress.component';
import { DetailegressComponent } from '../detailegress/detailegress.component';

@Component({
  selector: 'app-egresses',
  templateUrl: './egresses.component.html',
  styleUrls: ['./egresses.component.css'],
  providers: [EgresoService]
})
export class EgressesComponent implements AfterViewInit {
  displayedColumns: string[] = ['fecha', 'nombre', 'pedido', 'precio'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Egreso>;
  egresos: Egreso[] = [];
  egresosFiltered;
  loadMore = "esperando";

  constructor(
    private _egresoService: EgresoService,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void { this.getEgress(); }

  getLatestEgresos() {
    this._egresoService.getEgresos()
      .subscribe(data => { this.egresos = data.egresos.slice(0, 10); })
  }

  getEgress() {
    this._egresoService.getEgresos().subscribe(
      response => {
        if (response.egresosFiltrados) {
          this.egresos = response.egresosFiltrados;
          this.dataSource = new MatTableDataSource(response.egresosFiltrados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }

  getEgresos() {
    this._egresoService.getEgresos().subscribe(
      response => { if (response.egresos) this.egresos = response.egresos; }
    )
  }

  getAllEgresos() {
    this.loadMore = "cargando";
    this._egresoService.getEgresos()
      .subscribe(data => { this.egresos = data.egresos; })
    if (this.dataSource) { this.dataSource.sort = this.sort; }
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

  edit(id) {
    const dialogRef = this.dialog.open(EditegressComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  view(id) {
    const dialogRef = this.dialog.open(DetailegressComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  delete(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._egresoService.deleteEgreso(id).subscribe(
        response => { this.ngAfterViewInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }


}
