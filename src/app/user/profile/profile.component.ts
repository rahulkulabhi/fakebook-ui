import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token: string = localStorage.getItem('token');
  userData: any;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.userData = this.auth.getPayloadFromToken(this.token);
    // console.log(this.userData);
  }

}
