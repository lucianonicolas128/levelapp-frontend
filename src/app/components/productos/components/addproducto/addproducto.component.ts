import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { UploadService } from '../../../../services/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styleUrls: ['./addproducto.component.css'],
  providers: [ProductoService, UploadService, AuthService]
})
export class AddproductoComponent implements OnInit {
  formProduct!: FormGroup;
  public product: Producto;
  public status: string;
  public save_producto;

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private _uploadService: UploadService,
    private authService: AuthService,
  ) {
    this.product = new Producto('', '', '', '', null, null, '', '');
    this.buildForm();
  }

  ngOnInit(): void { }

  onSubmit(form) {
    this.status = 'loading';
    let company = this.authService.getUID();
    this.product = this.formProduct.value;
    this.product.company = company;
    this._productoService.saveProducto(this.product).subscribe(
      response => {
        if (response.producto) {
          this.save_producto = response.producto;
          this.status = 'succes';
          form.reset();
        }
        else { this.status = 'failed'; }
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
      precio: ['', Validators.required],
    });
  }
}
