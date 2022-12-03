import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';

import { HomeService } from 'src/app/services/homeService/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _HomeService: HomeService,
    private _AuthService: AuthService
  ) {}
  imgSrcProFile: string = 'http://localhost:3000/proFile/';
  imgSrc: string = 'http://localhost:3000/postPhoto/';

  // form add comment
  formComment: FormGroup = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  user: any;
  ngOnInit(): void {
    this.getPosts();
    this.user = this._AuthService.user.getValue();
  }
  data: any = [];
  // get posts
  noyFoundData: any = [];
  getPosts() {
    this._HomeService.getPosts().subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.data = res.post;
      } 
      if(res.post.length < 0){
        this.noyFoundData = res.message;
      }
    });
  }

  _id: string = '';
  // love post
  lovePostFromUser(_id: string) {
    let data = { _id: _id };
    this._HomeService.lovePost(data).subscribe((res) => {
      if (res.message == 'push') {
        (<HTMLElement>document.getElementById('liked')).style.display = 'flex';
        setTimeout(() => {
          this.getPosts();
        }, 1000);
      } else if (res.message == 'pull') {
        (<HTMLElement>document.getElementById('unLiked')).style.display =
          'flex';
        setTimeout(() => {
          this.getPosts();
        }, 1000);
      }
    });
  }

  //  get idPost  as add comment
  idPOst: string = '';
  errComment: string = '';
  getIdPost(id: string) {
    this.idPOst = id;
    console.log(this.idPOst);
  }
}
