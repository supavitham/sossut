import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from "rxjs";
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']

})

export class SignUpComponent implements OnInit {
  form: FormGroup;
  profilePath: AngularFireObject<any>;

  userItem: Observable<any>;
  Items: Observable<any[]>;
  id: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private afDb: AngularFireDatabase) {
    this.userItem = afDb.object(`users/${this.authService.authInfo$.value.$uid}/profile/email`).valueChanges()


    //ดึงเลขบัตรประชาขน
    this.Items = afDb.list(`information/${this.authService.authInfo$.value.$uid}/personnel/idcard`).valueChanges()
    this.Items.forEach(id => {
      this.id = id
      console.log(id)
    });


    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      idcard: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  checkPersonID(personID: string) {
    console.log(personID)
    this.afDb.list('/information', ref => ref.orderByChild('idcard').equalTo(personID)).valueChanges().subscribe(
      obj => {
        if (obj != null && obj.length != 0) {
          console.log(obj)
          this.reg()
        } else {
          alert('บัตรประชาชนไม่มีในระบบ')

        }
      });

  }

  sendSingup() {
    if (this.form.invalid) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    else {
      //ส่งเลขบัตรประชาชนไปเช็ค
      this.checkPersonID(this.form.value.idcard)
    }
  }
  reg() {
    //แสดงเลขบัตรประชาชน object
    var ref = firebase.database().ref("idcard");
    ref.once('value').then(function (snapshot) {
      console.log(snapshot.val());
    });

    const val = this.form.value;
    console.log(val.email)


    this.authService.signUp(val.email, val.password)
      .subscribe(
        () => {
          // insert Data to DB
          this.insertDB();
          alert('User created successfully !');
          this.router.navigateByUrl('/signin');
        },
        err => alert(err)
      );


  }

  insertDB() {

    this.profilePath = this.afDb.object(`users/${this.authService.authInfo$.value.$uid}/profile`);

    const val = this.form.value;
    this.profilePath.set({
      name: val.name,
      lastname: val.lastname,
      idcard: val.idcard,
      email: val.email,
      password: val.password

    });
  }

}






