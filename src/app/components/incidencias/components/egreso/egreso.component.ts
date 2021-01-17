import { 
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Egreso } from 'src/app/models/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { Global } from '../../../../services/global';
import { MatDialog } from '@angular/material/dialog';
import { DetailegresoComponent } from 'src/app/components/egreso/detailegreso/detailegreso.component';
// import { DetailventaComponent } from 'src/app/components/ventass/components/detailventa/detailventa.component';
// import { EditventaComponent } from 'src/app/components/ventass/components/editventa/editventa.component';


export interface DialogData {
  _id: string;
}


@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css'],
  providers: [EgresoService]
})
export class EgresoComponent implements OnInit {

  @Input() egreso!: Egreso;
  @Output() ventaClicked: EventEmitter<any> = new EventEmitter();

  url;
  save_egreso;

  constructor(
    private egresoService: EgresoService,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
   }

  ngOnInit(): void {
  }


  viewSale(id){
    const dialogRef = this.dialog.open(DetailegresoComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}
