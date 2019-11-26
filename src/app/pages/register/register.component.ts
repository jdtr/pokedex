import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  confirmPassword: string;

  constructor( private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  register( forma: NgForm ) {
    console.log(forma);

    if ( forma.invalid ) {
      return;
    };

    this._authService.register(this.user)
      .subscribe( resp => {
        console.log(resp);
        this._router.navigateByUrl('/home/list');
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
