import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from "@angular/router";
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  Items: Observable<any[]>;
  id: any;
  i: any;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private authService: AuthService, private router: Router, private afDb: AngularFireDatabase) {
    this.Items = afDb.list(`information/${this.authService.authInfo$.value.$uid}/personnel`).valueChanges()
    this.Items.forEach(id => {
      this.id = id
      console.log(id)
    });
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit() {
  }

  sendSingin() {
    if (this.form.invalid) {
      console.log("กรุณากรอกข้อมูลให้ครบ");
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const val = this.form.value;
    console.log(val.email)
   /*  this.afAuth.auth.signInWithEmailAndPassword(val.email, val.password)
    .then(success => {
      console.log(success);
      this.router.navigate(['/home/'])
    }).catch(function (error) {
      console.log(error);

    }) */

     this.authService.login(val.email, val.password)
       .subscribe(() => {
         //alert(val.email + ' เข้าสู่ระบบสำเร็จ')
         this.router.navigate(['/home/'])
       },
         err => alert(err.message)
       );

  }

}
