import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor( private _auth: AuthService, private _router: Router ) { }

  ngOnInit() {

    this.userName = this._auth.userName;
  }

  logout() {

    this._auth.logout();
    this._router.navigateByUrl('/login');

  }

}
