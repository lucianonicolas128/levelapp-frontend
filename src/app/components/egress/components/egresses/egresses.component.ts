import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddegressComponent } from 'src/app/components/egress/components/addegress/addegress.component';
import { AddVentaComponent } from 'src/app/components/sales/components/add-venta/add-venta.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-egresses',
  templateUrl: './egresses.component.html',
  styleUrls: ['./egresses.component.css'],
  providers: [EgresoService, AuthService]
})
export class EgressesComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Egreso>;
  egresos: Egreso[] = [];
  egresosFiltered;
  loadMore = "esperando";
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _egresoService: EgresoService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngAfterViewInit(): void { this.getEgressCompany(); }

  getLatestEgresos() {
    this._egresoService.getEgresos()
      .subscribe(data => { this.egresos = data.egresos.slice(0, 10); })
  }

  getEgressCompany() {
    let company = this.authService.getUID();
    this._egresoService.getEgresosCompany(company).subscribe(
      response => { if (response.egresosFiltrados) { this.egresos = response.egresosFiltrados; } })
  }

  addCompany() {
    let company = this.authService.getUID();
    console.log(company);
    this.getEgresos();
    this.egresos.forEach(egreso => {
      egreso.company = company;
      this._egresoService.updateEgreso(egreso).subscribe(
        response => { console.log(); },
        error => { console.log(<any>error); }
      );
    });
  }

  getEgresos() {
    this._egresoService.getEgresos().subscribe(
      response => { if (response.egresos) { this.egresos = response.egresos; this.addCompany() }; },
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

}
