import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registrationForm: FormGroup;
  passwordsMatch: boolean = false;
  registrationProcessing: boolean = false;
  registrationError: string = "";
  successMessage: string = "";
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required,])],
      password: ['', Validators.compose([Validators.required,])],
      passwordConfirmation: ['', Validators.compose([Validators.required,])],
      termsConditions: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
  }

  get f() { return this.registrationForm.controls }

  createAccount() {

    this.submitted = true
    this.registrationError = "";
    this.successMessage = "";

    if (this.registrationForm.invalid || !this.passwordsMatch) {
      return
    }

    this.registrationProcessing = true

    let postData = {
      "username": 'kminchelle',
      "password": '0lelplR',
    }

    return this.authService.authServerCalls(postData, '/auth/login').subscribe(results => {

      let data: any = results

      this.registrationProcessing = false

      this.successMessage = "Your account has been created successfully. Login with your credentials."

      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['/main'])
      }, 2000);


    }, err => {
      this.registrationProcessing = false

      if (err.status == 400) {
          this.registrationError = "Failed to register"
      } else if (err.status == 500) {
        this.registrationError = "Failed to communicate with the server. Please try again later."
      }

    })

  }

  comparePasswords(event:any) {
    let password = this.f.password.value;
    let passConf = this.f.passwordConfirmation.value;
    this.passwordsMatch = this.authService.comparePasswords(password, passConf);
  }


}
