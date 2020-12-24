import { 
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';

 import { Producto } from '../../../../models/producto'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: Producto;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
