import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AdminBookComponent } from './components/admin-book/admin-book.component';
import { CrudBookComponent } from './components/crud-book/crud-book.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { BooksComponent } from './components/users-modules/books-page/books/books.component';
import { BookDetailsComponent } from './components/users-modules/books-page/book-details/book-details.component';
import { AuthorCardsComponent } from './components/users-modules/author-page/author-cards/author-cards.component';
import { AuthorDetailsComponent } from './components/users-modules/author-page/author-details/author-details.component';
import { CategoryCardsComponent } from './components/users-modules/category-page/category-cards/category-cards.component';
import { CategoryComponent } from './components/users-modules/category-page/category/category.component';
import { UserTableComponent } from './components/users-modules/user-profile-page/user-table/user-table.component';
import { ReadComponent } from './components/users-modules/user-profile-page/read/read.component';
import { CurrentlyReadingComponent } from './components/users-modules/user-profile-page/currently-reading/currently-reading.component';
import { WantToReadComponent } from './components/users-modules/user-profile-page/want-to-read/want-to-read.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'home', component: TestHomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/books', component: AdminBookComponent },
  { path: 'crud', component: CrudBookComponent },
  { path: 'author', component: AuthorsTableComponent },
  { path: 'categories', component: CategoriesTableComponent },
  { path: 'books', component: BooksComponent },
  { path: 'user/book/:id', component: BookDetailsComponent },
  { path: 'user/authors', component: AuthorCardsComponent },
  { path: 'user/author', component: AuthorDetailsComponent },
  { path: 'user/categories', component: CategoryCardsComponent },
  { path: 'user/category', component: CategoryComponent },
  { path: 'user/profile', component: UserTableComponent },
  { path: 'read', component: ReadComponent },
  { path: 'current-reading', component: CurrentlyReadingComponent },
  { path: 'want-to-read', component: WantToReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
