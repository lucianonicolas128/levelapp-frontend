import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { EditproductoComponent } from '../editproducto/editproducto.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailproductoComponent } from '../detailproducto/detailproducto.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-item-producto',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ProductoService]
})
export class ItemComponent implements OnInit {
  @Input() product!: Producto;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  public products: Producto[];

  constructor(
    private _productoService: ProductoService,
    private _authService: AuthService,
    public dialog: MatDialog,
    public _router: Router
  ) { }

  ngOnInit(): void {
    this.productClicked;
  }

  getProducts() {
    let company = this._authService.getUID();
    this._productoService.getProducts(company)
      .subscribe(
        response => { this.products = response.productos; }
      )
  }

  editProduct(id) {
    const dialogRef = this.dialog.open(EditproductoComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  viewProduct(id) {
    const dialogRef = this.dialog.open(DetailproductoComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // this.ngOnInit();
    });
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productoService.deleteProducto(id).subscribe(
        response => { location.reload(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminad'); }
  }

}
