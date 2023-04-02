import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AuthorsTableComponent},
  {path:'categories',component:CategoriesPopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
