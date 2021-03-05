import { Component, Input, Output, EventEmitter, OnInit, } from '@angular/core';
import { Egreso } from 'src/app/models/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailegressComponent } from 'src/app/components/egress/components/detailegress/detailegress.component';
import { EditegressComponent } from '../editegress/editegress.component';
import { Router } from '@angular/router';

export interface DialogData { _id: string; }
@Component({
  selector: 'app-egress',
  templateUrl: './egress.component.html',
  styleUrls: ['./egress.component.css'],
  providers: [EgresoService]
})
export class EgressComponent implements OnInit {
  @Input() egreso!: Egreso;
  @Output() egressClicked: EventEmitter<any> = new EventEmitter();
  save_egreso;

  constructor(
    private egresoService: EgresoService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void { this.egressClicked; }

  viewSale(id) {
    const dialogRef = this.dialog.open(DetailegressComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  edit(id) {
    const dialogRef = this.dialog.open(EditegressComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); })
  }

  delete(id) {
    let message = confirm("Desea eliminar este Egreso?");
    if (message) {
      this.egresoService.deleteEgreso(id).subscribe(
        // response => { this.router.navigate(['./i']); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Egreso no eliminado'); }
  }

}
