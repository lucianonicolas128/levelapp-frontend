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
import { DetailegressComponent } from 'src/app/components/egress/components/detailegress/detailegress.component';

export interface DialogData {_id: string;}
@Component({
  selector: 'app-egress',
  templateUrl: './egress.component.html',
  styleUrls: ['./egress.component.css'],
  providers: [EgresoService]
})
export class EgressComponent implements OnInit {

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
    const dialogRef = this.dialog.open(DetailegressComponent, {
      data: { _id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}
