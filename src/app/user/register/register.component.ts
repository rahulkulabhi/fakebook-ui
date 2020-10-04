import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.ls.updateStatus(true);
    if (!this.registerForm.valid) {
      this.ls.updateStatus(false);
      // magic code to handle validation
    } else {
      this.auth.registerService(this.registerForm.value).subscribe(
        (response: any) => {
            // console.log(response);
            if(response.success === true) {
              this.ls.updateStatus(false);
              this.openSnackBar(response.message, 'close');
              this.router.navigate(['/auth/login']);
            }
        },
        err => {
          // console.log(err);
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
