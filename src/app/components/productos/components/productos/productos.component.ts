import { Component, AfterViewInit } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddproductoComponent } from '../addproducto/addproducto.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})

export class ProductosComponent implements AfterViewInit {
  public products: Producto[] = [];
  public url: string;
  public productsFiltered: any;
  public isConfirm: boolean;
  public product: Producto;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.isConfirm = false;
  }

  ngAfterViewInit() {
    this.getProducts();
  }

  getProducts() {
    let company = this.authService.getUID();
    this._productoService.getProducts(company).subscribe(
      response => {
        if (response.productosFiltrados) { this.products = response.productosFiltrados; }
      },
      error => { console.log(<any>error); }
    )
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddproductoComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngAfterViewInit();
    });
  }

  searchProduct(param) {
    this.productsFiltered = this.products.filter(producto => producto.nombre.toUpperCase().includes(param.toUpperCase()));
  }

  cleanProducts() {
    this.productsFiltered = null;
    (<HTMLInputElement>document.getElementById('searcher')).value = '';
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productoService.deleteProducto(id).subscribe(
        response => { this.ngAfterViewInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }

  reloadComponent() {
    this._router.navigateByUrl('/add-producto', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/productos']);
    });
  }

}
