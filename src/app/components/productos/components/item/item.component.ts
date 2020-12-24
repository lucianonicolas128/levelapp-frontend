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

  constructor(
    private _productoService: ProductoService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
