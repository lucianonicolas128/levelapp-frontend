import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Material } from '../models/material';
import { Global } from './global';
import { environment } from 'src/environments/environment';


@Injectable()
export class MaterialService{
    public company: string;

    constructor(
        private _http: HttpClient
    ) {
        this.company = localStorage.getItem('TOKEN');
    }

    saveMaterial(material: Material): Observable<any>{
        let params = JSON.stringify(material);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(`${environment.url_api}save-material`, params, {headers: headers});
    }

    getMateriales(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}materials`, {headers: headers});
    }

    getMaterial(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}material/${id}`, {headers: headers});
    }

    deleteMaterial(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}material/${id}`, {headers: headers});
    }

    updateMaterial(material): Observable<any>{
        let params = JSON.stringify(material);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}material/${material._id}`, params, {headers: headers});
    }
}