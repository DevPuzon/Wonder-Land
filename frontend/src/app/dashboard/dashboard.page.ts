import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  sideBar ="/assets/pages/home-sidebar.png";
  constructor(
    private router :Router,) { }

  ngOnInit() {
  }
  
  onChangeItem(item){
    this.sideBar = `/assets/pages/${item}-sidebar.png`;
    
    this.router.navigate(['dashboard',item]);
  }
}
