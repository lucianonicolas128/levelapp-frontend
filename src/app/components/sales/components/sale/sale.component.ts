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
import { Router } from '@angular/router';
import { DetailventaComponent } from '../detailventa/detailventa.component';
import { EditsaleComponent } from '../editsale/editsale.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  providers: [VentaService]
})
export class SaleComponent implements OnInit {

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
    if (message) {
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

  viewSale(id) {
    const dialogRef = this.dialog.open(DetailventaComponent, {
      data: { _id: id }
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
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/incidencias']);
          });
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Venta no eliminada');
    }
  }

  editSale(id) {
    const dialogRef = this.dialog.open(EditsaleComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
