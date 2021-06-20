import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddproductoComponent } from '../addproducto/addproducto.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditproductoComponent } from '../editproducto/editproducto.component';
import { DetailproductoComponent } from '../detailproducto/detailproducto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})

export class ProductosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'categoria', 'precio'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public products: Producto[] = [];
  public productsFiltered: any;
  public isConfirm: boolean;
  public product: Producto;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    public dialog: MatDialog,
  ) {
    this.isConfirm = false;
  }

  ngAfterViewInit() {
    this.getProducts();
  }

  getProducts() {
    this._productoService.getProducts().subscribe(
      response => {
        if (response.productosFiltrados) {
          this.products = response.productosFiltrados;
          this.dataSource = new MatTableDataSource(response.productosFiltrados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => { console.log(<any>error); }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  add() {
    const dialogRef = this.dialog.open(AddproductoComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  delete(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productoService.deleteProducto(id).subscribe(
        response => { this.ngAfterViewInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }


  edit(id) {
    const dialogRef = this.dialog.open(EditproductoComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  view(id) {
    const dialogRef = this.dialog.open(DetailproductoComponent, { data: { _id: id } });
    dialogRef.afterClosed().subscribe(result => { this.ngAfterViewInit(); });
  }

  reloadComponent() {
    this._router.navigateByUrl('/add-producto', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/productos']);
    });
  }

}
