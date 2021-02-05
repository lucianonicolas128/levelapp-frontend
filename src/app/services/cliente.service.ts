import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente';
import { Global } from './global';
import { environment } from '../../environments/environment'

@Injectable()
export class ClienteService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular';
    }

    saveCliente(cliente: Cliente): Observable<any>{
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(`${environment.url_api}save-cliente`, params,  {headers: headers});
    }

    getClientes(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'clientes', {headers: headers});
    }

    getCliente(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'cliente/'+id, {headers: headers});
    }

    deleteCliente(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'cliente/'+id, {headers: headers});
    }

    updateCliente(cliente): Observable<any>{
        let params = JSON.stringify(cliente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'cliente/'+cliente._id, params, {headers: headers});
    }
}