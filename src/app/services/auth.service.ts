import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Global } from './global';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public url: string;
    public userData: Observable<firebase.User>;

    constructor(
        private afAuth: AngularFireAuth,
        private _http: HttpClient
    ) {
        this.userData = afAuth.authState;
        this.url = Global.url;
    }

    createUser(email: string, password: string) {
        // this.saveCompany(this.getUID());
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    login(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    getUID() {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) { uid = user.uid; }
        return uid;
    }

    logOut() {
        return this.afAuth.signOut();
    }

    hasUser() {
        return this.afAuth.authState;
    }
}
