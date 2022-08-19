import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../../../shared/ui/services/loading.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: UntypedFormGroup | undefined;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private authService: AuthenticationService,
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
      const {email, password} = this.form.value;
      this.authService.login(email, password).subscribe(() => {
        this.router.navigate(['/']).then(() => this.loadingService.closeLoader());
      })
    }
  }
}
