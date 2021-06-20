import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Egreso } from '../models/egreso';
import { Global } from './global';
import { environment } from '../../environments/environment'


@Injectable()
export class EgresoService{
    public company: string;

    constructor(
        private _http: HttpClient
    ) {
        this.company = localStorage.getItem('TOKEN');
    }

    saveEgreso(egreso: Egreso): Observable<any>{
        let params = JSON.stringify(egreso);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${environment.url_api}save-egreso`, params, {headers: headers});
    }

    getEgresos(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}egresos/${this.company}`, {headers: headers});
    }

    getEgreso(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}egreso/${id}`, {headers: headers});
    }

    deleteEgreso(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}egreso/${id}`, {headers: headers});
    }

    updateEgreso(egreso): Observable<any>{
        let params = JSON.stringify(egreso);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}egreso/${egreso._id}`, params, {headers: headers});
    }
}