import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup; // declare the form group variable and initialize it to undefined
  message = "New here? Create a free account!";
  messageArray: string[] = [];
  typedMessage = "";
  submitted = false; // add a submitted property and set it to false
  
  constructor(private formBuilder: FormBuilder) {}

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

    // initialize the form group and set validation rules
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      fileUpload: [null, Validators.required]
    }, {
      validator: this.passwordMatchValidator // custom validator function to check if password and confirm password match
    });
  }

  // custom validator function
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // submit form function
  onSubmit() {
    this.submitted = true; // set submitted to true when the form is submitted
    console.log(this.registrationForm.value);
  }
}
