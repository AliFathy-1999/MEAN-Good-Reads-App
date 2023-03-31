import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationCardsComponentComponent } from './components/registration-cards-component/registration-cards-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationCardsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }