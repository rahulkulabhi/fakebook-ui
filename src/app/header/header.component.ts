import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CheckAuthService } from '../services/check-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() appTitle: string;
  @Input() sideBarFlag: boolean;
  @Output() menuToggled = new EventEmitter<boolean>();

  menuOpen: boolean = false;
  showAuthMenu: boolean;

  constructor(
    private checkAuth: CheckAuthService,
    private auth: AuthenticationService,
    private router: Router
    ) {
    this.menuOpen = this.sideBarFlag;
  }

  ngOnInit(): void {
    this.checkAuth.loggedIn.subscribe(
      value => {
        this.showAuthMenu = value;
      }
    );
  }

  menuToggle(): void {
    this.menuOpen = !this.sideBarFlag;
    this.menuToggled.emit(this.menuOpen);
  }

  goto(path: string) {
    if (this.sideBarFlag === true) {
      this.menuToggle();
    }
    this.router.navigate([path]);
  }

  logout() {
    this.auth.removeToken();
    this.checkAuth.updateAuthStatus(false);
    if (this.sideBarFlag === true) {
      this.menuToggle();
    }
    this.router.navigate(['/auth/login']);
  }

}
