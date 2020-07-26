import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  
  faEdit = faEdit;

  public clientes : Cliente[];
  public url: string;
  public confirm: boolean;
  public cliente: Cliente;
  

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
    
   }


  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(){
    this._clienteService.getClientes().subscribe(
      response => {
        if(response.clientes){
          this.clientes = response.clientes;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  reloadComponent(){
    this._router.navigateByUrl('/add-cliente', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/']);
          }); 
  }

/* 
  setConfirm(confirm){
    this.confirm = this.cliente.entregado;
  } */

}

