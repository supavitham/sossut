import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
export class SosCase {
  public read: boolean = true;
  public key: string = "";
  public studentID: string = "";
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent implements OnInit {
  date = Date.now();
  mobileQuery: MediaQueryList;
  notification: Observable<any[]>;
  soscase: SosCase[] = new Array();
  barcolor = "#d77624";
  delay: boolean = true
  check = false;
  click = false;
  i: number;
  count = "0"
  constructor(private authService: AuthService, private afDb: AngularFireDatabase, private router: Router, ) {
    afDb.list<SosCase>("SOS_Case").snapshotChanges().subscribe(noti => {
      const temp = new Array();
      noti.forEach(n => {
        n.payload.val().key = n.payload.key
        const s: SosCase = n.payload.val()
        s.key = n.payload.key
        temp.push(s)
        if (noti.length == temp.length) {
          if (temp.length != this.soscase.length) {
            if (this.check) {
              this.count = "infinite";
            } else {
              this.check = true;
            }
          }
          this.soscase = temp
        }

      })
    })

  }

  ngOnInit() {}
  
  clickSEE() {
    this.count = "0";
    this.router.navigate(['/home/NotificationBar']);
    return this.click;
  }


}
