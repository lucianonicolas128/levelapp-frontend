import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Venta } from 'src/app/models/venta';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  public url: string;
  private sales: Venta[] = [];
  private arrSales = new BehaviorSubject<Venta[]>([]);

  arrSales$ = this.arrSales.asObservable();

  constructor() { }

  addSale(venta: Venta){
    this.sales = [ ...this.sales, venta];
    this.arrSales.next(this.sales);
  }
}
