import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimefirstPipe } from './timefirst.pipe';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DetailComponent } from './components/detail/detail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {MatButtonModule} from '@angular/material/button';
import {Routes,RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { AngularFireModule} from 'angularfire2';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';


const appRoutes:Routes=[
  {path: 'signin', component: SignInComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'NotificationBar', component: NotificationBarComponent},
  {path: 'Detail', component: DetailComponent},
  {path: 'signup', component: SignUpComponent},
 // {path: '', component: WelcomeComponent}
  {path: '', redirectTo:'/welcome' , pathMatch:'full'}
  
];
@NgModule({
  declarations: [
    AppComponent,
    TimefirstPipe,
    SignUpComponent,
    SignInComponent,
    DetailComponent,
    NotificationComponent,
    NotificationBarComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
