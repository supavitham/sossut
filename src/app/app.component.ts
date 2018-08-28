import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sossut';
  date = Date.now();
  onClicklogin(){
    console.log("dsf");
  }
  constructor(private db: AngularFireDatabase){}
  
}
