import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddVentaComponent } from '../add-venta/add-venta.component';
import { MatPaginator } from '@angular/material/paginator';
import { EditsaleComponent } from '../editsale/editsale.component';
import { DetailventaComponent } from '../detailventa/detailventa.component';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css'],
  providers: [VentaService]
})

export class SalesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['fecha', 'nombre', 'estado', 'precio'];
  dataSource: MatTableDataSource<Venta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ventas: Venta[] = [];
  ventasFiltered;
  loadMore = "esperando";
  save_venta;

  constructor(
    private _ventaService: VentaService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.getAllSales();
  }

  getLatestSales() {
    this._ventaService.getVentas()
      .subscribe(response => { this.ventas = response.ventasFiltrados.slice(0, 20); })
  }

  getAllSales() {
    this.loadMore = "cargando";
    this._ventaService.getVentas()
      .subscribe(response => {
        this.ventas = response.ventasFiltrados;
        this.dataSource = new MatTableDataSource(response.ventasFiltrados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => { console.log(<any>error); }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  delete(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._ventaService.deleteVenta(id).subscribe(
        response => { this.ngAfterViewInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }


  setEntrega(venta) {
    console.log('hola')
    let message = confirm("Ha entregado el producto?");
    if (message) {
      if (!venta.entregado) {
        venta.entregado = true;
        venta.saldo = 0;
        console.log(true)
      } else {
        venta.entregado = false;
        venta.saldo = venta.monto;
      }
      this._ventaService.updateVenta(venta).subscribe(
        response => { this.save_venta = venta; }
      )
      this.ngAfterViewInit();
    }
  }


  edit(id) {
    const dialogRef = this.dialog.open(EditsaleComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  view(id) {
    const dialogRef = this.dialog.open(DetailventaComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddVentaComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  openDialogEgreso() {
    const dialogRef = this.dialog.open(AddegressComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  searchSale(param) {
    this.ventasFiltered = this.ventas.filter(venta => venta.cliente.toUpperCase().includes(param.toUpperCase()));
  }

  cleanSale() {
    this.ventasFiltered = null;
    (<HTMLInputElement>document.getElementById('searcher')).value = '';
  }
}
