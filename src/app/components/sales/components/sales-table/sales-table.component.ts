import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddVentaComponent } from '../add-venta/add-venta.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css'],
  providers: [VentaService]
})

export class SalesTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Venta>;
  ventas: Venta[] = [];
  ventasFiltered;
  loadMore = "esperando";
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private _ventaService: VentaService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() { this.getLatestSales(); }

  getLatestSales() {
    let company = this.authService.getUID();
    this._ventaService.getVentasCompany(company)
      .subscribe(response => { this.ventas = response.ventasFiltrados.slice(0, 20); })
  }

  addCompany() {
    let company = this.authService.getUID();
    console.log(company);
    this.ventas.forEach(venta => {
      venta.company = company;
      this._ventaService.updateVenta(venta).subscribe(
        response => { console.log(); },
        error => { console.log(<any>error); }
      );
    });
  }

  getSales() {
    this._ventaService.getVentas().subscribe(response => { this.ventas = response.ventas; this.addCompany(); })
  }

  getAllSales() {
    let company = this.authService.getUID();
    this.loadMore = "cargando";
    this._ventaService.getVentasCompany(company)
      .subscribe(response => { this.ventas = response.ventasFiltrados; })
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
