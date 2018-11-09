import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from "rxjs";


@Component({
  selector: 'app-signidcard',
  templateUrl: './signidcard.component.html',
  styleUrls: ['./signidcard.component.css']
})
export class SignidcardComponent implements OnInit {
  form: FormGroup;
  profilePath: AngularFireObject<any>;

  userItem: Observable<any>;
  Items: Observable<any[]>;
  id: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private afDb: AngularFireDatabase) {
    //ดึงเลขบัตรประชาขน
    this.Items = afDb.list('information').valueChanges()
    this.Items.forEach(id => {
      this.id = id
    });


    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      idcard: ['', Validators.required],
    });
  }


  ngOnInit() {
  }


  sendSingidcard() {
    if (this.form.invalid) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    else{
      this.insertDB();
      alert('success !');
          this.router.navigateByUrl('welcome');
    }

  }

  insertDB() {

    const profilePath = this.afDb.list('information');
  // const profilePath = this.afDb.object('information').valueChanges()
  
    const val = this.form.value;
    profilePath.push ({
      name: val.name,
      lastname: val.lastname,
      idcard: val.idcard
      
    });
    
  }

}
