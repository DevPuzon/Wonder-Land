import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.page.html',
  styleUrls: ['./assessment.page.scss'],
})
export class AssessmentPage implements OnInit {

  iframe 
  constructor(
    public sanitizer: DomSanitizer,) { }

  ngOnInit() {
    var params = new URL(location.href).searchParams; 
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(params.get('q'));   
  }

}
