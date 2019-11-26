import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlAuth: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private _token: string = 'AIzaSyA5E1vPymBA2YTYvG8Z3-bASZKfwJDQQds';

  user: UserModel;
  userToken: string;
  userName: string;

  constructor( private _http: HttpClient) { 
    this.readToken ();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login ( user: UserModel ) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };
    return this._http.post(`${ this._urlAuth }signInWithPassword?key=${ this._token }`, authData)
          .pipe( map( resp => {
            this.saveToken(resp['idToken'], resp['email']);
            return resp;
          }));
  }

  register ( user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this._http.post(`${ this._urlAuth }signUp?key=${ this._token }`, authData)
          .pipe( map( resp => {
            this.saveToken(resp['idToken'], resp['email']);
            return resp;
          }));
  }

  saveToken ( idToken: string, nameUser: string ) {
    this.userToken = idToken;
    this.userName = nameUser;
    localStorage.setItem('token', idToken);
    localStorage.setItem('userName', nameUser);
  }
  readToken () {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
      this.userName = localStorage.getItem('userName');
    } else {
      this.userToken = '';
      this.userName = '';
    }

    return this.userToken;
  }
  isAuthenticated(): boolean {

    if ( this.userToken.length > 2 ) {
      return true;
    } else {
      return false;
    }

  }
}
