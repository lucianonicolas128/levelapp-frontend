import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styleUrls: ['./addproducto.component.css'],
  providers: [ProductoService, UploadService]
})
export class AddproductoComponent implements OnInit {

  public title: string;
  public producto: Producto;
  public status: string;
  public filesToUpload: Array<File>;
  public save_producto;
  public url: string;

  constructor(
    private _productoService: ProductoService,
    private _uploadService: UploadService
  ) {
    this.title = "Agregar producto";
    this.producto = new Producto('','','','',0,0,'');
    this.url = Global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    
    //Guardar los datos
    this._productoService.saveProducto(this.producto).subscribe(
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

        }
        else{
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
