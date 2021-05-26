import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-detailproducto',
  templateUrl: './detailproducto.component.html',
  styleUrls: ['./detailproducto.component.css'],
  providers: [ProductoService]
})
export class DetailproductoComponent implements OnInit {
  public product!: Producto;
  public confirm: boolean;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<DetailproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { this.confirm = false }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto() {
    this._route.params.subscribe(response => {
      this._productoService.getProducto(this.data._id).subscribe(
        data => {
          this.product = data.producto;
        },
        error => { console.log(<any>error); }
      )
    })
  }

  setConfirm(confirm) { this.confirm = confirm; }

  deleteProducto(id) {
    this._productoService.deleteProducto(id).subscribe(
      response => { this._router.navigate(['/productos']); },
      error => { console.log(<any>error) }
    )
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productoService.deleteProducto(id).subscribe(
        response => {
          this.dialogRef.close()
        },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminad'); }
  }

}
