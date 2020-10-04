import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-menus',
  templateUrl: './sidebar-menus.component.html',
  styleUrls: ['./sidebar-menus.component.css']
})
export class SidebarMenusComponent implements OnInit {

  @Input() sideBarFlag: boolean;
  @Output() menuToggled = new EventEmitter<boolean>();

  menuOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  closeSideBar() {
    // console.log('sidebase menu clicked');
    this.menuOpen = !this.sideBarFlag;
    this.menuToggled.emit(this.menuOpen);
  }

}
