import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})
export class ProductosComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Producto>;
  productos!: Producto[];
  url;

  public confirm: boolean;
  public producto: Producto;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngAfterViewInit() {
    // this.getProductos();
    this._productoService.getProductos()
    .subscribe(data => {
      this.productos = data.productos;
      this.dataSource = new MatTableDataSource<Producto>(this.productos);
    })
  }

  getProductos(){
    this._productoService.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  
  // deleteProduct(id){
  //   let message = confirm("Desea eliminar este producto?");
  //       if(message){
  //         this._productoService.deleteProducto(id).subscribe(
  //           response => {
  //             this.ngOnInit();
  //           },
  //           error => {
  //             console.log(<any>error);
  //           }
  //         )
  //       } else{
  //         console.log('Producto no eliminado');
  //       }    
  // }
  
  reloadComponent(){
    this._router.navigateByUrl('/add-producto', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/productos']);
          }); 
  }
/* 
  setConfirm(confirm){
    this.confirm = this.productos.entregado;
  } */

}
