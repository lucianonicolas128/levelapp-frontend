import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editproducto',
  templateUrl: '../addproducto/addproducto.component.html',
  styleUrls: ['./editproducto.component.css'],
  providers: [ProductoService, UploadService]
})
export class EditproductoComponent implements OnInit {

  public title: string;
  public producto: Producto;
  public status: string;
  public filesToUpload: Array<File>;
  public save_producto;
  public url: string;

  constructor(
    private _productoService: ProductoService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar producto";
    this.url = Global.url;
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
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    
    //Guardar los datos
    this._productoService.updateProducto(this.producto).subscribe(
      response =>{
        if(response.producto){
          // Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image-album/"+response.producto._id, [], this.filesToUpload, 'image')
            .then((result:any)=>{
              this.status = 'succes';
              console.log(result);
              this.save_producto = result.producto;
              form.reset();
            });
          }else{
            this.save_producto = response.producto;
            this.status = 'succes';
            form.reset();
          }
/* 
          this.save_producto = response.producto;
          this.status = 'succes'; */
        }else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any> error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
