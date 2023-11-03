import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: ListUserComponent
  },
  { 
    path: 'login',
    component: LoginComponent 
  },
  {
    path : '',
    component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
