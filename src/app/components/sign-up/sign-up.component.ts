import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signup={
    name:"",
    lastname:"",
    user:"",
    password:"",
    confirmpassword:""
    }
  constructor(private db: AngularFireDatabase,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }
  sendSingup(signup) {
    console.log("SignUp Method...");
    console.log("Name="+this.signup.name);
    this.db.list("signup").push(this.signup);
    
    }

}
