import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import {ListDisplayCardComponent} from "../../shared";



@NgModule({
  declarations: [
    DashboardContainerComponent
  ],
    imports: [
        CommonModule,
        ListDisplayCardComponent
    ]
})
export class DashboardModule { }
