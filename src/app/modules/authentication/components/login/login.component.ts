import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../../../shared/ui/services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: UntypedFormGroup | undefined;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.form) {
      this.loadingService.openLoader();
    }
  }
}
