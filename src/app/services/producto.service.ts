import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';
import { Global } from './global';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ProductoService {
    constructor(private _http: HttpClient) { }

    testService() {
        return 'Probando el servicio de angular';
    }

    saveProducto(producto: Producto): Observable<any> {
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${environment.url_api}save-producto`, params, { headers: headers });
    }

    // getProductos(): Observable<any>{
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     return this._http.get(`${environment.url_api}productos`, {headers: headers});
    // }

    getProducts(company): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}productos/${company}`, { headers: headers });
    }

    getProducto(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}producto/${id}`, { headers: headers });
    }

    deleteProducto(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}producto/${id}`, { headers: headers });
    }

    updateProducto(producto): Observable<any> {
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}producto/${producto._id}`, params, { headers: headers });
    }
}