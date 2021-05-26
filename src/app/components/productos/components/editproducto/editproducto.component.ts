import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-editproducto',
  templateUrl: '../addproducto/addproducto.component.html',
  styleUrls: ['./editproducto.component.css'],
  providers: [ProductoService, AuthService]
})

export class EditproductoComponent implements OnInit {
  formProduct!: FormGroup;
  public product: Producto;
  public status: string;
  public save_producto;

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getProducto();
    this.buildForm();
  }

  getProducto() {
    this._route.params.subscribe(response => {
      this._productoService.getProducto(this.data._id).subscribe(
        data => {
          this.product = data.producto;
          this.formProduct.patchValue(data.producto);
        },
        error => { console.log(<any>error); }
      )
    })
  }

  onSubmit(form) {
    let company = this.authService.getUID();
    this.product = this.formProduct.value;
    this.product.company = company;
    this._productoService.updateProducto(this.product).subscribe(
      response => {
        if (response.producto) {
          this.save_producto = response.producto;
          this.status = 'succes';
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  private buildForm() {
    this.formProduct = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: [''],
      costo: [''],
      precio: [''],
    });
  }

}
