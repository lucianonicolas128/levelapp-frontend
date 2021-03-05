import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetailclienteComponent } from '../detailcliente/detailcliente.component';
import { EditclienteComponent } from '../editcliente/editcliente.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
export interface DialogData { _id: string; }

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Input() cliente!: Cliente;
  @Output() clienteClicked: EventEmitter<any> = new EventEmitter();
  clientes: Cliente[];

  constructor(
    private _clienteService: ClienteService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { this.clienteClicked; }

  getClientes() {
    let company = this.authService.getUID();
    this._clienteService.getClientesCompany(company)
      .subscribe(response => { this.clientes = response.clientesFiltrados; })
  }

  editClient(id) {
    const dialogRef = this.dialog.open(EditclienteComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  viewClient(id) {
    const dialogRef = this.dialog.open(DetailclienteComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  deleteClient(id) {
    let message = confirm("Desea eliminar este Cliente?");
    if (message) {
      this._clienteService.deleteCliente(id).subscribe(
        response => { this.router.navigate(['./clientes']); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Cliente no eliminado'); }
  }

}
