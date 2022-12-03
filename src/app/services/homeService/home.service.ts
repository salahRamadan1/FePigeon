import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}
  // http://localhost:3000/post?page=1
  baseUrl: string = 'http://localhost:3000';
  token: any = localStorage.getItem('userToken');
  // function posts
  // get post
  getPosts(number: string = '1'): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/post?page=${number}`, {
      headers: { token: this.token },
    });
  }
  // love post
  lovePost(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/post/LovePost', obj, {
      headers: { token: this.token },
    });
  }
  // add post
  addPost(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/post', obj, {
      headers: { token: this.token },
    });
  }
  // delete post
  deletePost(obj: any): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + '/post', { body: obj });
  }
  // update post
  updatePOst(obj: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + '/post', { body: obj });
  }
  // get one posts for user
  getPostForOneUser(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/post/getPostUser', {
      headers: { token: this.token },
    });
  }
  /***********************/
  //  sold
  soldPost(obj: any): Observable<any> {
    return this._HttpClient.patch(this.baseUrl + '/post', obj, {
      headers: { token: this.token },
    });
  }
}
