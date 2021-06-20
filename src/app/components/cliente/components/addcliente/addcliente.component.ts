import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css'],
})
export class AddclienteComponent implements OnInit {
  form!: FormGroup;
  public cliente: Cliente;
  public status: string;
  public save_cliente;
  public clientes: Cliente[] = [];
  messageClient;

  constructor(
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private authService: AuthService,
  ) {
    this.cliente = new Cliente('', '', 0, '', '');
    this.buildForm();
  }

  ngOnInit(): void { this.getClientes(); }

  getClientes() {
    let company = this.authService.getUID();
    this._clienteService.getClientes().subscribe(
      response => { if (response.clientes) { this.clientes = response.clientes; } },
      error => { console.log(<any>error); }
    )
  }

  checkClient(nombre) {
    if (this.clientes.find(cliente => cliente.nombre.toUpperCase().normalize() === nombre.toUpperCase().normalize())) {
      let message = alert("El cliente ya existe");
      this.messageClient = false;
    } else { this.messageClient = true; }
  }

  onSubmit(form) {
    this.cliente = this.form.value;
    if (this.clientes.length > 0) { this.checkClient(this.cliente.nombre); }
    else { this.messageClient = true; };
    this.cliente.company = this.authService.getUID();
    if (this.messageClient) {
      this.status = 'loading';
      if (this.form.valid) {
        this.cliente = this.form.value;
        this.cliente.company = this.authService.getUID();
        this._clienteService.saveCliente(this.cliente).subscribe(
          response => {
            this.save_cliente = response.cliente;
            this.status = 'succes';
            form.reset();
          },
          error => { console.log(<any>error); }
        );
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
    });
  }

}
