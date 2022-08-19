import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./components";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../../environments/environment";
import {AkitaNgDevtools} from "@datorama/akita-ngdevtools";
import {AkitaNgRouterStoreModule} from "@datorama/akita-ng-router-store";
import {MaterialModule} from "../modules";
import { DashHeaderComponent } from './components/dash-header/dash-header.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [LayoutComponent, DashHeaderComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    LayoutComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    AkitaNgDevtools,
    AkitaNgRouterStoreModule,
    HttpClientModule,
  ]
})
export class CoreModule { }
