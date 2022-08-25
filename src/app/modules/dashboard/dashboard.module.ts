import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import {ListDisplayCardComponent, SpinnerComponent} from "../../shared";
import { ListDetailsComponent } from './components/list-details/list-details.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import { CreateListComponent } from './components/create-list/create-list.component';



@NgModule({
  declarations: [
    DashboardContainerComponent,
    ListDetailsComponent,
    CreateListComponent
  ],
    imports: [
        CommonModule,
        ListDisplayCardComponent,
        RouterModule,
        SpinnerComponent,
        MaterialModule,
        FormsModule
    ]
})
export class DashboardModule { }
