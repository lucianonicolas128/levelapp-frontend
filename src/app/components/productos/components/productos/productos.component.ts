import { Component, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Producto>;
  productos: Producto[] = [];
  url;
  productsFiltered;

  public confirm: boolean;
  public producto: Producto;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngAfterViewInit() {
    this.getProductsCompany();
    // this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(
      response => {
        if (response.productos) {
          this.productos = response.productos;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getProductsCompany() {
    let company = this.authService.getUID();
    this._productoService.getProductsCompany(company).subscribe(
      response => {
        if (response.productosFiltrados) { this.productos = response.productosFiltrados; }
      })
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddproductoComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngAfterViewInit();
    });
  }

  searchProduct(param) {
    this.productsFiltered = this.productos.filter(producto => producto.nombre.toUpperCase().includes(param.toUpperCase()));
  }

  cleanProducts() {
    this.productsFiltered = null;
    (<HTMLInputElement>document.getElementById('searcher')).value = '';
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productoService.deleteProducto(id).subscribe(
        response => {
          this.ngAfterViewInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Producto no eliminado');
    }
  }

  reloadComponent() {
    this._router.navigateByUrl('/add-producto', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/productos']);
    });
  }

}
