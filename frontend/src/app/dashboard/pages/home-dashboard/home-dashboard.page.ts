import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.page.html',
  styleUrls: ['./home-dashboard.page.scss'],
})
export class HomeDashboardPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
 
}
