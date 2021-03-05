import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserI } from '../../../models/user.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  registerFOrm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required]
    })
  }

  register(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/login']);
      })
    }
  }

  // onRegister(form: UserI){
  //   console.log('Form', form);
  //   this.authService
  //   .loginByEmail(form)
  //   .then(res =>{
  //       console.log('Succefully', res);
  //       this._route.navigate(['/'])
  //   })
  //   .catch(err => console.log('Error', err));
  // }

}
