import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    lastName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    Phone: new FormControl(null, [
      Validators.required,

      Validators.maxLength(11),
    ]),
  });
  ngOnInit(): void {}
   
  registerFun() {
    this._AuthService.register(this.registerForm.value).subscribe((res) => {
      if (res.msg == 'email already exits') {
        
        (<HTMLElement>document.getElementById('errPar')).style.display = 'flex';
        setTimeout(() => {
          (<HTMLElement>document.getElementById('errPar')).style.display =
            'none';
        }, 3000);
      } else {
        console.log('hello');
        this._Router.navigate(['/login'])
      }
    });
  }
}
