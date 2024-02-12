import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.css']
})
export class AddDebtorComponent implements OnInit {

  debtForm: FormGroup;

  submitted: boolean = false;
  savingError: string = "";
  successMessage: string = "";
  isProcessing: boolean = false;

  debtor: any;

  constructor(private mainService: MainService, private formBuilder: FormBuilder, private router: Router) {
    this.debtForm = this.formBuilder.group({
      debtorName: ['', Validators.compose([Validators.required])],
      debtorPhoneNumber: ['', Validators.compose([Validators.required])],
      debtorEmailAdress: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      termsConditions: ['', Validators.compose([Validators.required])],
    })
  }

  get f() { return this.debtForm.controls }

  ngOnInit(): void {
  }

  saveDebtor() {
    this.submitted = true
    this.savingError = ""
    this.successMessage = ""

    if (this.debtForm.invalid) {
      return
    }

    let postData = {
      name: this.f.debtorName.value,
      phone: this.f.debtorPhoneNumber.value,
      email: this.f.debtorEmailAdress.value,
      username: this.f.username.value,
      address: {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      }
    }

    return this.mainService.mainPostCalls(postData, '/users/').subscribe(results => {

      let data: any = results;
      console.log('saved', data)
      this.debtor = data

      this.isProcessing = false;

      this.router.navigateByUrl('/main/dashboard', { state: { debtor: this.debtor } });

    }, err => {
      this.isProcessing = false;

      if (err.status == 400) {
        this.savingError = "You have entered incorrect data.";
      } else {
        this.savingError = "Failed to communicate with the server. Please try again later.";
      }

    })

  }

}
