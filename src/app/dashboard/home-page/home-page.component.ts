import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  fetchDebtorsError: string = "";
  isFecthingDebtors: boolean = false;

  debtors: any = [];
  count: any;

  paidAmount: number = 0;
  amountOwed: number = 0;

  searchTerm: any;

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 4;

  added_debtor:any

  constructor(public mainService: MainService, private router: Router) { 
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.added_debtor = state.debtor;
      console.log('added user home',this.added_debtor)
    }
  }

  ngOnInit(): void {
    this.getDebtors()
  }

  getDebtors() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    this.isFecthingDebtors = true
    this.mainService.mainGetCalls(`/users?_start=${start}&_limit=${this.itemsPerPage}`).subscribe(response => {

      console.log(response)
      let data: any = response;

      this.debtors = data;
      this.count = data.length;
  
      this.isFecthingDebtors = false

      if(this.added_debtor){
        this.debtors.push(this.added_debtor)
      }

    }, err => {
      this.isFecthingDebtors = false
      this.fetchDebtorsError = "Failed to communicate with the server. Please try again."
    })
  }

  searchDebtor() {
    this.debtors = [];
    this.isFecthingDebtors = true
    if (!this.searchTerm) {
      this.getDebtors()
      return
    }
    console.log('searchterms',this.searchTerm)
    this.mainService.mainGetCalls("/users").subscribe(response => {

      let data: any = response;

      this.debtors = data.filter((user: any) => {
        return (
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });

      this.isFecthingDebtors = false
    }, err => {
      this.isFecthingDebtors = false
      this.fetchDebtorsError = "Failed to communicate with the server. Please try again."
    })
  }

  nextPage() {
    this.currentPage++;
    this.getDebtors();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDebtors();
    }
  }

  calculateTotalPages() {
    return this.totalPages;
  }

  viewDebtor(debtor: any) {
    let navigationExtras: NavigationExtras = {
      state: { data: { debtorId: debtor.id }, },
    };
    this.router.navigate(['/main/debtors/' + debtor.id], navigationExtras);
  }

}
