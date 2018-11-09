import { Component, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
export class Users {
  public email: string = "";

}
export class SosCase {
  public read: boolean = true;
  public key: string = "";
  public studentID: string = "";
  public date: number;
}
@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.css']
})
export class MaincomponentComponent implements OnDestroy {
  // @Output() sosCaseKeyEven = new EventEmitter<string>();
  date = Date.now();
  mobileQuery: MediaQueryList;

  notification: Observable<any[]>;
  private _mobileQueryListener: () => void;
  emailtitle: String = "";
  soscase: SosCase[] = new Array();
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: Router,
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    afDb.object<String>(`users/${this.authService.authInfo$.value.$uid}/profile/email`).valueChanges().subscribe(u => {
      this.emailtitle = u
      console.log("User : " + u);

    })
    afDb.list<SosCase>("SOS_Case").snapshotChanges().subscribe(noti => {
      this.soscase = []

      noti.forEach(n => {
        n.payload.val().key = n.payload.key
        const s: SosCase = n.payload.val()
        s.key = n.payload.key
        this.soscase.push(s)

      })
      this.soscase.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)

    })

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  onClickSignOut() {
    console.log('signOut')
    this.authService.logout();
  }


}