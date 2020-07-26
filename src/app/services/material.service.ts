import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Material } from '../models/material';
import { Global } from './global';


@Injectable()
export class MaterialService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular';
    }

    saveMaterial(material: Material): Observable<any>{
        let params = JSON.stringify(material);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/save-material', params, {headers: headers});
    }

    getMateriales(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'materials', {headers: headers});
    }

    getMaterial(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'material/'+id, {headers: headers});
    }

    deleteMaterial(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'material/'+id, {headers: headers});
    }

    updateMaterial(material): Observable<any>{
        let params = JSON.stringify(material);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'material/'+material._id, params, {headers: headers});
    }
}