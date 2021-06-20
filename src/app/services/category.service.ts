import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment'
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    public company: string;

    constructor(
        private _http: HttpClient
    ) {
        this.company = localStorage.getItem('TOKEN');
    }

    testService() {
        return 'Probando el servicio de angular';
    }

    saveCategory(category: Category): Observable<any> {
        let params = JSON.stringify(category);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${environment.url_api}save-category`, params, { headers: headers });
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}categories`, { headers: headers });
    }

    getCategorysCompany(company): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}categorys/${company}`, { headers: headers });
    }

    getCategory(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url_api}category/${id}`, { headers: headers });
    }

    deleteCategory(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(`${environment.url_api}category/${id}`, { headers: headers });
    }

    updateCategory(category: Category): Observable<any> {
        let params = JSON.stringify(category);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(`${environment.url_api}category/${category._id}`, params, { headers: headers });
    }
}