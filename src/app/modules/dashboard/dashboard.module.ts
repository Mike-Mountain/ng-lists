import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import {ListDisplayCardComponent, SpinnerComponent} from "../../shared";
import { ListDetailsComponent } from './components/list-details/list-details.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    DashboardContainerComponent,
    ListDetailsComponent
  ],
  imports: [
    CommonModule,
    ListDisplayCardComponent,
    RouterModule,
    SpinnerComponent
  ]
})
export class DashboardModule { }
