import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddclienteComponent } from '../addcliente/addcliente.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditclienteComponent } from '../editcliente/editcliente.component';
import { DetailclienteComponent } from '../detailcliente/detailcliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'telefono', 'direccion'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public clientes: Cliente[] = [];
  public clientesFiltered: any;
  public confirm: boolean;
  public cliente: Cliente;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    public dialog: MatDialog
  ) { this.confirm = false; }

  ngOnInit(): void { this.getClientes(); }

  getCliente(id) {
    this._clienteService.getCliente(id).subscribe(
      response => { this.cliente = response.cliente; }
    )
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientesFiltrados) {
          this.clientes = response.clientesFiltrados
          this.dataSource = new MatTableDataSource(response.clientesFiltrados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        };
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  add() {
    const dialogRef = this.dialog.open(AddclienteComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  delete(id) {
    let message = confirm("Desea eliminar este Cliente?");
    if (message) {
      this._clienteService.deleteCliente(id).subscribe(
        response => { this.ngOnInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Cliente no eliminado'); }
  }

  edit(id) {
    const dialogRef = this.dialog.open(EditclienteComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  view(id) {
    const dialogRef = this.dialog.open(DetailclienteComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}

