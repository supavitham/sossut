import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
export class SosCase {
  public read: boolean = true;
  public key: string = "";
  public studentID: string = "";
  public date: number;
}
@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  notification: Observable<any[]>;
  private _mobileQueryListener: () => void;
  numNoti: number = 0;
  soscase: SosCase[] = new Array();
  displayedColumns: string[] = ['studentID','subname','lastname','event','click'];
  
  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: Router,
    private afDb: AngularFireDatabase
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    afDb.list<SosCase>("SOS_Case").snapshotChanges().subscribe(noti =>{
      this.soscase = new Array();
      noti.forEach(n=>{
        n.payload.val().key = n.payload.key
        const s:SosCase = n.payload.val()
        s.key = n.payload.key
        this.soscase.push(s)
        
       this.soscase.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
        
      })
      this.soscase.forEach(n=>{
      //  console.log("read : "+ n.date)
      })

      
    })

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }
  onClickNotification(noti : SosCase) {
    console.log(noti) 
    noti.read = true;
    this.afDb.object<SosCase>("SOS_Case/"+noti.key).update(noti)
   
    this.route.navigate(['/home/Detail', noti.key]);
  }

}
