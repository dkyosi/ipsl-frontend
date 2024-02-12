import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDebtorComponent } from './view-debtor/view-debtor.component';
import { AddDebtorComponent } from './add-debtor/add-debtor.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HomePageComponent,
    ViewDebtorComponent,
    AddDebtorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class DashboardModule { }
