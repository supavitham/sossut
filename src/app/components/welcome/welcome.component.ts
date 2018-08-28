import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  date = Date.now();
  onClicklogin(){
    console.log("dsf");
  }
  constructor() { }

  ngOnInit() {
  }

}
