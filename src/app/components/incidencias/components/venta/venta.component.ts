import { 
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
 } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { Global } from '../../../../services/global';
import { MatDialog } from '@angular/material/dialog';
import { DetailventaComponent } from 'src/app/components/ventass/components/detailventa/detailventa.component';
import { EditventaComponent } from 'src/app/components/ventass/components/editventa/editventa.component';
import { Router } from '@angular/router';


export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [VentaService]
})
export class VentaComponent implements OnInit {

  @Input() venta!: Venta;
  @Output() ventaClicked: EventEmitter<any> = new EventEmitter();

  url;
  save_venta;

  constructor(
    private _ventaService: VentaService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  setEntrega(venta) {
    let message = confirm("Ha entregado el producto?");
    if(message){
      if (!venta.entregado) {
        venta.entregado = true;
        venta.saldo = 0;
      } else {
        venta.entregado = false;
        venta.saldo = venta.monto;
      }
  
      this._ventaService.updateVenta(venta).subscribe(
        response => {
          this.save_venta = venta;
        }
      )
      this.ngOnInit();
    }
  }

  viewSale(id){
    const dialogRef = this.dialog.open(DetailventaComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  deleteSale(id) {
    let message = confirm("Desea eliminar esta venta?");
    if (message) {
      this._ventaService.deleteVenta(id).subscribe(
        response => {
          // this.ngOnInit();

        this.router.navigate(['./incidencias']);
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Venta no eliminada');
    }
  }

  editSale(id){
    const dialogRef = this.dialog.open(EditventaComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  background(valor){
    if(!valor.entregado){
      let element = document.getElementById('sale');
      // element.classList.add("sin-entregar");
      console.log(element);
    }
  }

}
