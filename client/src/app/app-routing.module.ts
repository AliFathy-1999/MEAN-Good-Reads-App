import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { TestHomeComponent } from './test-home/test-home.component';
import { AuthGuard } from './services/auth.guard';
import { AdminBookComponent } from './components/admin-book/admin-book.component';
import { CrudBookComponent } from './components/crud-book/crud-book.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'admin',component:LoginComponent},
  {path:'home',component:TestHomeComponent, canActivate:[AuthGuard]},
  {path:'book',component:AdminBookComponent},
  {path:'crud',component:CrudBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
