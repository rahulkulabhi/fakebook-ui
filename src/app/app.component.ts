import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fakebook';

  sidebarOpened: boolean = false;
  showLoader: boolean = false;

  constructor(private ls: LoaderService) {
    // console.log(this.sidebarOpened);
  }

  toggledVal(eventVal): void {
    this.sidebarOpened = eventVal;
    // console.log(this.sidebarOpened);
  }

  ngOnInit() {
    this.ls.checkLoader.subscribe(
      (data: boolean) => {
        this.showLoader = data;
      }
    );
  }

}
