import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Global } from '../../../../services/global';
import { EditproductoComponent } from '../editproducto/editproducto.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailproductoComponent } from '../detailproducto/detailproducto.component';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-item-producto',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ProductoService]
})
export class ItemComponent implements OnInit {

  @Input() producto!: Producto;
  @Output() productoClicked: EventEmitter<any> = new EventEmitter();

  url;
  productos: Producto[];

  constructor(
    private _productoService: ProductoService,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    // this.getProducts();
    this.productoClicked;
  }

  getProducts(){
    this._productoService.getProductos()
    .subscribe(
      response => {
        this.productos = response.productos;
      }
    )
  }

  editProduct(id){
    const dialogRef = this.dialog.open(EditproductoComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  viewProduct(id){
    const dialogRef = this.dialog.open(DetailproductoComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
