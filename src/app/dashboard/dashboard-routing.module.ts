import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ViewDebtorComponent } from './view-debtor/view-debtor.component';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomePageComponent },
      { path: 'debtors/:id', component: ViewDebtorComponent },
      { path: 'add-debtor', component: AddDebtorComponent },
      { path: 'my-listings', component: HomePageComponent },
      { path: 'all-debtors', component: HomePageComponent },
      { path: 'payments', component: HomePageComponent },
      { path: 'subscriptions', component: HomePageComponent },
      { path: 'settings', component: HomePageComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
