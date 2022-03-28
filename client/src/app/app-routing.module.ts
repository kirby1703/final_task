import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { AuthGurad } from './shared/layouts/classes/auth.guard';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },

  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGurad], children: [
      {path: 'overview', component: OverviewPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
