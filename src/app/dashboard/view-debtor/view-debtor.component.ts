import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-view-debtor',
  templateUrl: './view-debtor.component.html',
  styleUrls: ['./view-debtor.component.css']
})
export class ViewDebtorComponent implements OnInit {

  debtorId:any
  debtor:any
  fetchDebtorsError: string = "";
  isFecthingDebtors: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private mainService: MainService) { 
    this.route.params.subscribe((params: Params) => {
      this.debtorId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getDebtor()
  }

  getDebtor() {
    console.log('debtor id',this.debtorId)
    this.isFecthingDebtors = true
    if(!this.debtorId) return
    this.mainService.mainGetCalls("/users?id=" + this.debtorId).subscribe(response => {
      let data: any = response;
      this.debtor = data[0]
      console.log(data)
      this.isFecthingDebtors = false
    }, err => {
      this.isFecthingDebtors = false
      this.fetchDebtorsError = "Failed to communicate with the server. Please try again."
    })
  }

}
