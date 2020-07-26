import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserI } from '../../../models/user.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private _route: Router
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  })

  ngOnInit(): void {
    
  }

  onLogin(form: UserI){
    console.log('Form', form);
    this.authSvc
    .loginByEmail(form)
    .then(res =>{
        console.log('Succefully', res);
        this._route.navigate(['/'])
    })
    .catch(err => console.log('Error', err));
  }

}
