import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


import { AuthenticationService } from 'src/app/services/authentication.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private checkAuth: CheckAuthService,
    private router: Router,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    // console.log('is loggedin: ', this.auth.isLoggedIn());
  }

  onLogin() {
    this.ls.updateStatus(true);
    if (!this.loginForm.valid) {
      this.ls.updateStatus(false);
      //  magic code to handle validation
    } else {
      this.auth.loginService(this.loginForm.value).subscribe(
        (response: any) => {
          // console.log(response);
          if(response.success === true) {
            this.ls.updateStatus(false);
            this.openSnackBar(response.message, 'close');
            localStorage.setItem('token', response.token);
            this.checkAuth.updateAuthStatus(true);
            this.router.navigate(['/post']);
          }
        },
        (err) => {
          //console.error('Errors:', err);
          this.ls.updateStatus(false);
          this.openSnackBar(err.error.message, 'close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
