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
import { HttpClientModule } from '@angular/common/http';
import { NavbarHomeComponent } from './components/navbar-home/navbar-home.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { FormsModule } from '@angular/forms';
import { AuthorsPopupComponent } from './components/authors-popup/authors-popup.component';
import { CategoriesPopupComponent } from './components/categories-popup/categories-popup.component';

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
    CategoriesPopupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
