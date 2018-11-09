import { NgModule } from '@angular/core';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DetailComponent } from './components/detail/detail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { SigninadminComponent } from './components/signinadmin/signinadmin.component';
import { SignidcardComponent } from './components/signidcard/signidcard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { from } from 'rxjs';
const appRoutes: Routes = [
  {path:'home',component: MaincomponentComponent,
  children:[
  { path: 'notification', component: NotificationComponent },
  { path: 'NotificationBar', component: NotificationBarComponent },
  { path: 'Detail/:id', component: DetailComponent },
  
  { path: 'dashboard', component: DashboardComponent },
  
  { path: '', redirectTo: '/home/notification', pathMatch: 'full' }
  ]
},
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signinadmin', component: SigninadminComponent },
  { path: 'signidcard', component: SignidcardComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
