import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message = "New here? Create a free account!";
  messageArray: string[] = [];
  typedMessage = "";
  submitted = false; // add a submitted property and set it to false
  file:any = null;
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder,private _router:Router, private http: HttpClient) {}

  registrationForm = new FormGroup ({
    username: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
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
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.log('No file selected!');
      return;
    }
    const formData = new FormData();
    formData.append('pImage', this.selectedFile);
    this.http.post('http://localhost:3000/users/register', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  get userData(){
    return this.registrationForm.controls;
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
  submitRegisterForm(registrationForm:FormGroup) {
        this.submitted = true; // set submitted to true when the form is submitted
        this.uploadFile();
    }

}
