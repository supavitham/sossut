import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs";
import { GeoService } from '../../shared/services/geo.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() sosCaseKey: string = "fjdvdv";

  lat: number;
  lng: number;
  location: number[];
  markers: any;
  subscription: any;
  lt: Observable<any[]>
  notification: Observable<any>;
  notify: number[];
  sub: any; 
  sosCaseID: string


  constructor(private authService: AuthService, private afDb: AngularFireDatabase, private geo: GeoService, private route: ActivatedRoute) {
    this.sosCaseID = route.snapshot.paramMap.get('id');
    console.log("Detail :" + route.snapshot.params['id']);
    this.notification = afDb.object("/SOS_Case/" + this.sosCaseID).valueChanges();
    this.lt = afDb.list("/SOS_Case/" + this.sosCaseID + "/location").valueChanges()
    this.lt.subscribe(
      obj => {
        this.location = obj;
       // console.log(obj);
        this.getUserLocation();
      }
    );
  }
  receiveSosCaseKey(event) {
    this.sosCaseID = event
    console.log("Detail11 :" + event);
  }


  ngOnInit() {
    this.subscription = this.geo.hits
      .subscribe(hits => this.markers = hits)
    // this.sub = this.route.data
    // .subscribe(v => console.log(v));


    this.notification.subscribe(
      obj => {
        this.notify = obj
        console.log(obj);
      }
    );


  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = this.location[0] //position.coords.latitude;
        this.lng = this.location[1] //position.coords.longitude;
        /* this.lat = firebase.database().ref().child('lat')
         this.lng = firebase.database().ref().child('lon')*/
        this.geo.getLocations(500, [this.lat, this.lng])
      });
    }
  }

}


