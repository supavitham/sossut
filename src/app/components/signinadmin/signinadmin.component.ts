import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../../shared/services/auth.service';
import { Router } from "@angular/router";
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Observable } from "rxjs";

@Component({
  selector: 'app-signinadmin',
  templateUrl: './signinadmin.component.html',
  styleUrls: ['./signinadmin.component.css']
})
export class SigninadminComponent implements OnInit {
  form: FormGroup;
  Items: Observable<any[]>;
  id :any;
  i :any;
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private afDb: AngularFireDatabase) { 
    this.Items = afDb.list('idcard').valueChanges()
    this.Items.forEach(id => {
      this.id = id
    });
  
    this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
}
  ngOnInit() {
  }
  
   sendSingin() {
     const value = this.form.value;
    if (this.form.invalid) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }else if(value.email != "admin@gmail.com" && value.password != "sut123456"){
      alert("invalid account !");
    }
    else{
    
    const val = this.form.value;
    console.log(val.email)

    this.authService.login(val.email, val.password)
      .subscribe(() => {      
        alert(val.email + ' เข้าสู่ระบบสำเร็จ')
        this.router.navigate(['signidcard'])
      },
        err => alert(err.message)
      );
    }
  }

}
