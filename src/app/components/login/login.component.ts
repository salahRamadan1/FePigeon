import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });
  ngOnInit(): void {}
  conFirm: string = '';
  loginFun() {
    this._AuthService.login(this.loginForm.value).subscribe((res) => {
      if (res.message == 'email or password incorrect') {
        (<HTMLElement>document.getElementById('errPar')).style.display = 'flex';
        setTimeout(() => {
          (<HTMLElement>document.getElementById('errPar')).style.display =
            'none';
        }, 3000);
      } else if (res.msg == ' chick your email to confirm your email ') {
        this.conFirm = res.msg;
      } else {
        localStorage.setItem('userToken', res.token);
        this._Router.navigate(['/home']);
        this._AuthService.setUser();
      }
    });
  }
}
