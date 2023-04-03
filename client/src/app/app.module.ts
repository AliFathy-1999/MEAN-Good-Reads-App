import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationCardsComponentComponent } from './components/registration-cards-component/registration-cards-component.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarHomeComponent } from './components/navbar-home/navbar-home.component';
<<<<<<< HEAD
import { TestHomeComponent } from './test-home/test-home.component';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminBookComponent } from './components/admin-book/admin-book.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {CrudBookComponent } from './components/crud-book/crud-book.component';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



=======
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { FormsModule } from '@angular/forms';
import { AuthorsPopupComponent } from './components/authors-popup/authors-popup.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';
<<<<<<< HEAD
>>>>>>> a0f18f00090b5719da4c21bf63b0723e0c7575c0
=======
import { NgxPaginationModule } from 'ngx-pagination';
>>>>>>> cd21dbe (Add CRUD functions to Authors Table)

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationCardsComponentComponent,
    NavbarHomeComponent,
<<<<<<< HEAD
    TestHomeComponent,
    AdminBookComponent,
    CrudBookComponent,
=======
    AuthorsTableComponent,
    AuthorsPopupComponent,
    CategoriesPopupComponent

>>>>>>> a0f18f00090b5719da4c21bf63b0723e0c7575c0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
<<<<<<< HEAD
<<<<<<< HEAD
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}
=======
    FormsModule
=======
    FormsModule,
    NgxPaginationModule
>>>>>>> cd21dbe (Add CRUD functions to Authors Table)
  
>>>>>>> a0f18f00090b5719da4c21bf63b0723e0c7575c0
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
