import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
AuthService
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  successMessage: string = '';
  message = "New here? Create a free account!";
  messageArray: string[] = [];
  typedMessage = "";
  submitted = false; // add a submitted property and set it to false
  file:any = null;
  error:string = '';
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder,private _router:Router, private http: HttpClient, private _AuthService :AuthService) {

  }

  registrationForm = new FormGroup ({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
    lastName: new FormControl(null, [ Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator.bind(this)]),
    confirmPassword: new FormControl(null, [Validators.required, this.matchConfirmPassword.bind(this)]),
  })

  // Custom validator function for password field
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&*]/;
    if (control.value && !regex.test(control.value)) {
      return { pattern: true };
    }
    return null;
  }

  matchConfirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value ? { 'passwordMismatch': true } : null;
  }


  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  ngOnInit() {
    // Split the message into an array of characters
    this.messageArray = this.message.split('');

    // Add each character to the typed message at a regular interval
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < this.messageArray.length) {
        this.typedMessage += this.messageArray[i];
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

  }

  // custom validator function
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // submit form function
  submitRegisterForm(registrationForm: FormGroup) {
    this.submitted = true;
    if(this.file != null){
    const formData = new FormData();
    formData.append('firstName', registrationForm.get('firstName')?.value);
    formData.append('lastName', registrationForm.get('lastName')?.value);
    formData.append('email', registrationForm.get('email')?.value);
    formData.append('password', registrationForm.get('password')?.value);
    formData.append('confirmPassword', registrationForm.get('confirmPassword')?.value);
    formData.append('userName', registrationForm.get('userName')?.value);
    formData.append('pImage', this.file[0]);
    
    this._AuthService.register(formData).subscribe(
      (res) => {
        
        if (res.message === 'User registered successfully') {
          this.successMessage = 'Signed up successfully!';
          this.registrationForm.reset();
        }

      },
      (error: HttpErrorResponse) => {
        console.error('Error status code:', error.status);
        console.error('Error message:', error.message);
        
      }
    );
  }
  }

}
