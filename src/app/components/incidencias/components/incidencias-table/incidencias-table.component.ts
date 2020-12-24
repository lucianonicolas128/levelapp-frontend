import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Venta } from '../../../../models/venta';
import { VentaService } from '../../../../services/venta.service';
import { Global } from '../../../../services/global';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _ventaService: VentaService,
  ) {
    this.url = Global.url;
  }

  ngAfterViewInit() {
    this._ventaService.getVentas()
      .subscribe(data => {
        this.ventas = data.ventas;
        this.dataSource = new MatTableDataSource<Venta>(this.ventas);
        // console.log(this.ventas);
      })
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

}
