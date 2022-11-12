import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.page.html',
  styleUrls: ['./lecture.page.scss'],
})
export class LecturePage implements OnInit {

  page = ""
  pages =[ 
    "/assets/pages/dashboard-dashboard-1.png",
    "/assets/pages/dashboard-dashboard-2.png",
    "/assets/pages/dashboard-dashboard-3.png",
  ]
  constructor(private router : Router) { 
    this.page = this.pages[0];
  }

  ngOnInit() {
  }

  pagei=0;
  onNextPage(){ 
    this.pagei++;
    this.page = this.pages[this.pagei];
    // for(var i = 0 ; i < 3;i++){
    //   console.log(this.pagei+1,i,this.pagei+1 == i);
    //   if(this.pagei+1 == i){
    //     document.getElementById("cc-"+(i).toString()).style.display = "grid";
    //   }else{
    //     document.getElementById("cc-"+(i).toString()).style.display = "none";
    //   }
    // }
    if(this.pagei == 1){
      document.getElementById("cc-1").style.display ="none";
      document.getElementById("cc-2").style.display ="grid";
      document.getElementById("cc-3").style.display ="none";
    }if(this.pagei == 2){
      document.getElementById("cc-1").style.display ="none";
      document.getElementById("cc-2").style.display ="none";
      document.getElementById("cc-3").style.display ="grid";
    }
    if(this.pagei == 3){
      document.getElementById("cc-1").style.display ="none";
      document.getElementById("cc-1").style.display ="grid";
      document.getElementById("cc-1").style.display ="none";
      this.onAssessment();
    }
  }
 
  onAssessment(){
    var params = new URL(location.href).searchParams; 
    this.router.navigateByUrl("/assessment?q="+params.get('q'));
  }
}
