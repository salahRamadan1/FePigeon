import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  issLoggedIn: boolean = false;

  ngOnInit(): void {
    this._AuthService.user.subscribe(() => {
      if (this._AuthService.user.getValue()!= null) {
        this.issLoggedIn = true;
      }else{
        this.issLoggedIn = false
      }
    });
  }



  logOut(){
    this._AuthService.logOutFromApp()
  }
}
