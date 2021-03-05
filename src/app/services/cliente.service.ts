import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment'

@Injectable()
export class ClienteService {
    constructor(private _http: HttpClient) { }

    testService() {
        return 'Probando el servicio de angular';
    }

    saveCliente(cliente: Cliente): Observable<any> {
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${environment.url_api}save-cliente`, params, { headers: headers });
    }

    getClientes(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}clientes`, { headers: headers });
    }

    getClientesCompany(company): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}clientes/${company}`, { headers: headers });
    }

    getCliente(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}cliente/${id}`, { headers: headers });
    }

    deleteCliente(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}cliente/${id}`, { headers: headers });
    }

    updateCliente(cliente): Observable<any> {
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}cliente/${cliente._id}`, params, { headers: headers });
    }
}