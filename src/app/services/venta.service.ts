import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Venta } from '../models/venta';
import { Global } from './global';

@Injectable()
export class VentaService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular';
    }

    saveVenta(venta: Venta): Observable<any>{
        let params = JSON.stringify(venta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-venta', params, {headers: headers});
    }

    getVentas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'ventas', {headers: headers});
    }

    getVenta(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'venta/'+id, {headers: headers});
    }

    deleteVenta(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'venta/'+id, {headers: headers});
    }

    updateVenta(venta): Observable<any>{
        let params = JSON.stringify(venta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'venta/'+venta._id, params, {headers: headers});
    }
}