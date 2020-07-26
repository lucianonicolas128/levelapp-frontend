import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detailproducto',
  templateUrl: './detailproducto.component.html',
  styleUrls: ['./detailproducto.component.css'],
  providers: [ProductoService]
})
export class DetailproductoComponent implements OnInit {
  public url: string;
  public producto: Producto;
  public confirm: boolean;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
      this.url = Global.url;
      this.confirm = false
    }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProducto(id);
    });
  }

  
  getProducto(id){
    this._productoService.getProducto(id).subscribe(
      response => {
        this.producto = response.producto;
      }
    )
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }

  deleteProducto(id){
    this._productoService.deleteProducto(id).subscribe(
      response => {
        this._router.navigate(['/productos']);
      },
      error => {
        console.log(<any>error)
      }
    )
  }

}
