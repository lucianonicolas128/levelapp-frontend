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
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  setEntrega(venta) {
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
