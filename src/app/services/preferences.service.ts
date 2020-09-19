import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Preferences } from '../models/preferences';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class PreferencesService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    savePreferences(preferences: Preferences): Observable<any>{
        let params = JSON.stringify(preferences);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-preferences', params, {headers:headers});
    }

    getPreferences(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'preferences/'+id, {headers:headers});
    }

    deletePreferences(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'preferences/'+id, {headers:headers});
    }

    updatePreferences(preferences): Observable<any>{
        let params = JSON.stringify(preferences);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'preferences/'+preferences._id, params, {headers:headers});
    }
}