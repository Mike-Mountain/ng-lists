import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import { RegisterComponent, LoginComponent } from './components';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule {
}
