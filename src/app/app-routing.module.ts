import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  //{ path: 'forgot-password', component: ForgotPasswordComponent },
  //{ path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard]},
  //{ path: 'clientlist', component: ClientlistComponent, canActivate: [AuthGuard]},
  //{ path: 'clientlist2', component: Clientlist2Component, canActivate: [AuthGuard]},
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
