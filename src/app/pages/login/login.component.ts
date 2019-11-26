import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor( private _authService: AuthService, private _router: Router ) {
    this.user = new UserModel();
  }

  ngOnInit() {
  }

  login( forma: NgForm ) {
    console.log(forma)
    if ( forma.invalid ) {
      return;
    };

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Please wait...'
    });
    Swal.showLoading();

    this._authService.login(this.user)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();
        this._router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Authentication failed',
          text: err.error.error.message
        });
      });
  }

}
