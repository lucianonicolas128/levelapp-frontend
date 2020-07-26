import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Egreso } from '../models/egreso';
import { Global } from './global';


@Injectable()
export class EgresoService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular';
    }

    saveEgreso(egreso: Egreso): Observable<any>{
        let params = JSON.stringify(egreso);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/save-egreso', params, {headers: headers});
    }

    getEgresos(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'egresos', {headers: headers});
    }

    getEgreso(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'egreso/'+id, {headers: headers});
    }

    deleteEgreso(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'egreso/'+id, {headers: headers});
    }

    updateEgreso(egreso): Observable<any>{
        let params = JSON.stringify(egreso);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'egreso/'+egreso._id, params, {headers: headers});
    }
}