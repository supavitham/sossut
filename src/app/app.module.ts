import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimefirstPipe } from './timefirst.pipe';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DetailComponent } from './components/detail/detail.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { MatButtonModule, MatListModule,MatTableModule, MatRippleModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularFireModule } from 'angularfire2';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgmCoreModule } from '@agm/core';
import { ChartModule } from 'angular2-chartjs';
import { SigninadminComponent } from './components/signinadmin/signinadmin.component';
import { SignidcardComponent } from './components/signidcard/signidcard.component';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';

import 'chart.piecelabel.js';

export const firebaseConfig = environment.firebaseConfig;
@NgModule({
  declarations: [
    AppComponent,
    TimefirstPipe,
    SignUpComponent,
    SignInComponent,
    DetailComponent,
    NotificationComponent,
    NotificationBarComponent,
    WelcomeComponent,
    SigninadminComponent,
    SignidcardComponent,
    DashboardComponent,
    MaincomponentComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    MatTableModule,
    MatMenuModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
