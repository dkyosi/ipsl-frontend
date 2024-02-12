import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  debtors: Array<any> = [];

  next: any;
  previous: any;
  count: any;

  isFecthingDebtors: boolean = false;
  fetchDebtorsError: string = "";

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getDebtors()
  }

  getDebtors() {
    this.isFecthingDebtors = true
    this.mainService.mainGetCalls("/users").subscribe(response => {
      console.log(response)
      let data: any = response;
      this.debtors = data;

      this.debtors.sort((a, b) => { return <any>new Date(b.name) - <any>new Date(a.name); })

      this.debtors = this.debtors.slice(0, 5);
      
      this.isFecthingDebtors = false
    }, err => {
      this.isFecthingDebtors = false
      this.fetchDebtorsError = "Failed to communicate with the server. Please try again."
    })
  }

}
