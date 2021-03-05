import { Component, OnInit, Inject } from '@angular/core';
import { Egreso } from '../../../../models/egreso';
import { EgresoService } from '../../../../services/egreso.service';
import { UploadService } from '../../../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-editegress',
  templateUrl: '../addegress/addegress.component.html',
  styleUrls: ['./editegress.component.css'],
  providers: [EgresoService, UploadService, AuthService]
})

export class EditegressComponent implements OnInit {
  form!: FormGroup;
  public egreso: Egreso;
  public status: string;
  public filesToUpload: Array<File>;
  public save_egreso;

  constructor(
    private formBuilder: FormBuilder,
    private _egresoService: EgresoService,
    private _route: ActivatedRoute,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void { this.getegreso(); }

  getegreso() {
    this._route.params.subscribe(params => {
      this._egresoService.getEgreso(this.data._id).subscribe(
        response => {
          this.egreso = response.egreso;
          this.form.patchValue(response.egreso)
        },
        error => { console.log(<any>error); }
      )
    })
  }

  onSubmit(form) {
    this.egreso = this.form.value;
    this.egreso.company = this.authService.getUID();
    this._egresoService.updateEgreso(this.egreso).subscribe(
      response => {
        if (response.egreso) {
          this.save_egreso = response.egreso;
          this.status = 'succes';
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
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