import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  private authStatus = new BehaviorSubject<boolean>(this.auth.isLoggedIn());

  loggedIn = this.authStatus.asObservable();

  constructor(private auth: AuthenticationService) { }

  updateAuthStatus(value: boolean) {
    this.authStatus.next(value);
  }

}
