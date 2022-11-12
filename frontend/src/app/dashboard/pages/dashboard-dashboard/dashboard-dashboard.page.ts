import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-dashboard',
  templateUrl: './dashboard-dashboard.page.html',
  styleUrls: ['./dashboard-dashboard.page.scss'],
})
export class DashboardDashboardPage implements OnInit {
 
  constructor(private router : Router) { }

  ngOnInit() { 
  }
 

  onLecture(f){
    this.router.navigateByUrl("/dashboard/lecture?q="+f);
  }

}
