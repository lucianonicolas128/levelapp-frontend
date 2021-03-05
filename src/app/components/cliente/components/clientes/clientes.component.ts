import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddclienteComponent } from '../addcliente/addcliente.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService, AuthService]
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = [];
  public clientesFiltered: Cliente[];
  public url: string;
  public confirm: boolean;
  public cliente: Cliente;

  constructor(
    private _clienteService: ClienteService,
    private authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog
  ) { this.confirm = false; }

  ngOnInit(): void { this.getClientesCompany(); }

  getCliente(id) {
    this._clienteService.getCliente(id).subscribe(
      response => { this.cliente = response.cliente; }
    )
  }

  addCompany() {
    let company = this.authService.getUID();
    this.getClientesCompany();
    console.log(this.clientes);
    this.clientes.forEach(cliente => {
      cliente.company = company;
      this._clienteService.updateCliente(cliente).subscribe(
        response => { },
        error => { console.log(<any>error); }
      );
    });
  }

  getClientesCompany() {
    let company = this.authService.getUID();
    this._clienteService.getClientesCompany(company).subscribe(
      response => {
        if (response.clientesFiltrados) { this.clientes = response.clientesFiltrados; }
      }
    )
  }

  addClient() {
    const dialogRef = this.dialog.open(AddclienteComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  searchClient(param) {
    this.clientesFiltered = this.clientes.filter(cliente => cliente.nombre.toUpperCase().normalize().includes(param.toUpperCase().normalize()));
  }

  cleanSearcher() {
    this.clientesFiltered = null;
    (<HTMLInputElement>document.getElementById('searcher')).value = '';
  }

  deleteClient(id) {
    let message = confirm("Desea eliminar este Cliente?");
    if (message) {
      this._clienteService.deleteCliente(id).subscribe(
        response => { this.ngOnInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Cliente no eliminado'); }
  }

  reloadComponent() {
    this._router.navigateByUrl('/add-cliente', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/']);
    });
  }

}

