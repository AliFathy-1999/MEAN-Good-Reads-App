import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationCardsComponentComponent } from './components/registration-cards-component/registration-cards-component.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarHomeComponent } from './components/navbar-home/navbar-home.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminBookComponent } from './components/admin-book/admin-book.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CrudBookComponent } from './components/crud-book/crud-book.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { AuthorsPopupComponent } from './components/authors-popup/authors-popup.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { HttpInterceptorProviders } from './Interceptors';
import { ToastrModule } from 'ngx-toastr';
import { BooksComponent } from './components/users-modules/books-page/books/books.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BooksHeaderComponent } from './components/users-modules/books-page/books-header/books-header.component';
import { BookDetailsComponent } from './components/users-modules/books-page/book-details/book-details.component';
import { BookReviewsComponent } from './components/users-modules/books-page/book-reviews/book-reviews.component';
import { AuthorCardsComponent } from './components/users-modules/author-page/author-cards/author-cards.component';
import { AuthorHeaderComponent } from './components/users-modules/author-page/author-header/author-header.component';
import { MatSliderModule } from '@angular/material/slider';
import { AuthorDetailsComponent } from './components/users-modules/author-page/author-details/author-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoryCardsComponent } from './components/users-modules/category-page/category-cards/category-cards.component';
import { CategoryComponent } from './components/users-modules/category-page/category/category.component';
import { CategoryHeaderComponent } from './components/users-modules/category-page/category-header/category-header.component';
import { UserTableComponent } from './components/users-modules/user-profile-page/user-table/user-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserNavbarComponent } from './components/users-modules/user-profile-page/user-navbar/user-navbar.component';
import { WantToReadComponent } from './components/users-modules/user-profile-page/want-to-read/want-to-read.component';
import { ReadComponent } from './components/users-modules/user-profile-page/read/read.component';
import { CurrentlyReadingComponent } from './components/users-modules/user-profile-page/currently-reading/currently-reading.component';
import { AllBooksComponent } from './components/users-modules/user-profile-page/all-books/all-books.component';
import { SpinerComponent } from './core/spiner/spiner.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
// import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationCardsComponentComponent,
    NavbarHomeComponent,
    AuthorsTableComponent,
    AuthorsPopupComponent,
    CategoriesPopupComponent,
    AdminBookComponent,
    CrudBookComponent,
    AdminBookComponent,
    CrudBookComponent,
    AuthorsTableComponent,
    AuthorsPopupComponent,
    TestHomeComponent,
    CategoriesTableComponent,
    BooksComponent,
    BooksHeaderComponent,
    BookDetailsComponent,
    BookReviewsComponent,
    AuthorCardsComponent,
    AuthorHeaderComponent,
    AuthorDetailsComponent,
    CategoryCardsComponent,
    CategoryComponent,
    CategoryHeaderComponent,
    UserTableComponent,
    UserNavbarComponent,
    WantToReadComponent,
    ReadComponent,
    CurrentlyReadingComponent,
    AllBooksComponent,
    SpinerComponent,
    NotFoundComponent,
    LoginAdminComponent,
    UserHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    CommonModule,
    MatCardModule,
    MatSliderModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    NgbModule,
    // StarRatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
    HttpInterceptorProviders,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
