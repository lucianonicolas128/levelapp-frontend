import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Venta } from '../models/venta';
import { Global } from './global';
import { environment } from '../../environments/environment'
import { AuthService } from './auth.service';

@Injectable()
export class VentaService {
    public ventas: Venta[] = [];
    public company: string;

    constructor(
        private _http: HttpClient,
        private authService: AuthService,
    ) {
        this.company = localStorage.getItem('TOKEN');
    }

    saveVenta(venta: Venta): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(venta);
        return this._http.post(`${environment.url_api}save-venta`, params, { headers: headers });
    }

    getVentas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}ventas/${this.company}`)
    }

    getVenta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}venta/${id}`, { headers: headers });
    }

    deleteVenta(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}venta/${id}`, { headers: headers });
    }

    updateVenta(venta): Observable<any> {
        let params = JSON.stringify(venta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}venta/${venta._id}`, params, { headers: headers });
    }
}