import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/authService/auth.service';
import { HomeService } from 'src/app/services/homeService/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _HomeService: HomeService
  ) {}
  user: any;
  userInfo: any = this._AuthService.user.getValue();
  imgSrc: string = 'http://localhost:3000/proFile/';

  ngOnInit(): void {
    this._AuthService.user.subscribe(() => {
      this.user = this.userInfo;
      console.log(this.user);
    });
    this.getPost();
    this.getToken();
    // console.log(this.user.img);
    if (this.user.img != '') {
      (<HTMLImageElement>document.getElementById('profileStatic')).src =
        this.imgSrc + this.user.img;
    }
  }
  happyToken: any;
  userId: any;
  getToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode = jwtDecode(token);
    this.happyToken = decode;
    this.userId = this.happyToken.userId;
  }
  img: any;
  formPost: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    image: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),

  });
  formUpdatePost: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    image: new FormControl(null, Validators.required),
  });
  choosePhoto(event: any) {
    this.img = event.target.files[0];
  }
  //  function posts
  // add post
  errPost: string = '';
  addPost() {
    let title = (<HTMLInputElement>document.getElementById('title')).value;
    let price = (<HTMLInputElement>document.getElementById('price')).value;

    let formData = new FormData();
    formData.append('image', this.img);
    formData.append('title', title);
    formData.append('price', price);

    this._HomeService.addPost(formData).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.getPost();
      } else {
        this.errPost = res.message;
      }
    });
  }
  // get post
  data: any[] = [];
  errGetPost: string = '';
  getPost() {
    this._HomeService.getPostForOneUser().subscribe((res) => {
      console.log(res);

      if (res.message == 'success') {
        this.errGetPost = '';
        this.data = res.post;
      } else {
        this.errGetPost = res.message;
      }
    });
  }
  // delete post
  deletePost(_id: string) {
    let data = { _id: _id };
    this._HomeService.deletePost(data).subscribe((res) => {
      if (res.message == 'success') {
        this.getPost();
        this.data = [];
      }
    });
  }
  // update post
  idPost: string = '';
  getIdPost(id: string) {
    this.idPost = id;
  }
  updatePost() {
    let title = (<HTMLInputElement>document.getElementById('titleUpdate'))
      .value;
    let formData = new FormData();
    formData.append('image', this.img);
    formData.append('title', this.formUpdatePost.value.title);
    formData.append('_id', this.idPost);
    this._HomeService.updatePOst(formData).subscribe((res) => {
      console.log(res);
    });
  }
  /*****************/
  formSettingImg: FormGroup = new FormGroup({
    profile_Pic: new FormControl(''),
    createdBy: new FormControl(''),
  });
  changeProfilePic() {
    const fileMe = new FormData();
    fileMe.append('profile_Pic', this.img);
    fileMe.append('createdBy', this.userId);
    this._AuthService.proFilePic(fileMe).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.getToken();
        this._AuthService.logOutFromApp();
      }
    });
  }

  sold(id: string) {
   
    let sold = (<HTMLElement>document.getElementById('sold')).id;
    let data = {
      _id: id,
      sold: sold,
    };
    this._HomeService.soldPost(data).subscribe((res) => {
      if(res.message == 'success'){
        this.getPost()

      }
    });
  }
  unSold(id: string) {
   
    let unSold = (<HTMLElement>document.getElementById('unSold')).id;
    let data = {
      _id: id,
      sold: unSold,
    };
    this._HomeService.soldPost(data).subscribe((res) => { 
          if(res.message == 'success'){
        this.getPost()

      }
    });
  }
}
