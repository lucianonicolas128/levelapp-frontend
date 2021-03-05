import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { UploadService } from '../../../../services/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addegress',
  templateUrl: './addegress.component.html',
  styleUrls: ['./addegress.component.css'],
  providers: [EgresoService, UploadService, AuthService]
})
export class AddegressComponent implements OnInit {
  form!: FormGroup;
  public egreso: Egreso;
  public status: string;
  public save_egreso;

  constructor(
    private _egresoService: EgresoService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.egreso = new Egreso('','','','','',0, '');
    this.buildForm();
  }

  ngOnInit(): void { }

  onSubmit(form){
    this.status = 'loading';
    this.egreso = this.form.value;
    this.egreso.company =  this.authService.getUID();
    this._egresoService.saveEgreso(this.egreso).subscribe(
      response =>{
        if(response.egreso){
          this.save_egreso = response.egreso;
          this.status = 'succes';
          form.reset();
        }else{ this.status = 'failed'; }
      },
      error =>{ console.log(<any> error); }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      fecha: ['', Validators.required],
      proveedor: ['', Validators.required],
      pedido: ['',],
      descripcion: [''],
      monto: [, Validators.required],
    });
  }

}
