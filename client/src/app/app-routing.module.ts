import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
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
=======
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AuthorsTableComponent},
  {path:'categories',component:CategoriesPopupComponent}
>>>>>>> a0f18f00090b5719da4c21bf63b0723e0c7575c0
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
