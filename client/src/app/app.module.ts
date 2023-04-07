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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
      HttpInterceptorProviders,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
