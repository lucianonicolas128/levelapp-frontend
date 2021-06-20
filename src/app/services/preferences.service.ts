import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Preferences } from '../models/preferences';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PreferencesService {
    public company: string;

    constructor(
        private _http: HttpClient
    ) {
        this.company = localStorage.getItem('TOKEN');
    }

    savePreferences(preferences: Preferences): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(preferences);
        return this._http.post(`${environment.url_api}save-preferences`, params, { headers: headers });
    }

    getPreferences(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}preferences/${id}`, { headers: headers });
    }

    getPreferenceses(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}preferences`, { headers: headers });
    }

    deletePreferences(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}preferences/${id}`, { headers: headers });
    }

    updatePreferences(preferences): Observable<any> {
        let params = JSON.stringify(preferences);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}preferences/${preferences._id}`, params, { headers: headers });
    }
}