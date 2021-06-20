import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserI } from '../../../models/user.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private _route: Router
  ) {
    this.buildForm();
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  })

  ngOnInit(): void {
    let uid = this.authSvc.getUID();
    console.log(uid)
    // if (uid != null) { this._route.navigate(['/dashboard']); }
    if (this.authSvc.hasUser) { this._route.navigate(['/dashboard']); }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authSvc.login(value.email, value.password)
        .then(() => {
          this._route.navigate(['/dashboard']);
          let uid = this.authSvc.getUID();
          localStorage.setItem('TOKEN', uid);
        })
        .catch(() => {
          alert('No es valido');
        })
    }
  }

}
