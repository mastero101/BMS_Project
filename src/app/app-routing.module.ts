import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PanelComponent } from './panel/panel.component';
import { MessagesComponent } from './messages/messages.component';
import { Register_postgredbComponent } from './register_postgredb/register_postgredb.component';
import { RegisterComponentesComponent } from './register-componentes/register-componentes.component';
import { ListComponentsComponent } from './list-components/list-components.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]  },
  { path: 'register_postgre', component: Register_postgredbComponent, canActivate: [AuthGuard]  },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard]},
  { path: 'register_componentes', component: RegisterComponentesComponent, canActivate: [AuthGuard]},
  { path: 'list_components', component: ListComponentsComponent},
  { path: 'monitor', component: MonitorComponent},
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
