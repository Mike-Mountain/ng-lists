import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../../../shared/ui/services/loading.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: UntypedFormGroup | undefined;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  register() {
    if (this.form) {
      if (!this.form.value.password === this.form.value.confirmPassword) {
        alert('Passwords do not match!')
      }
      this.loadingService.openLoader();
      const {email, username, password} = this.form.value;
    }
  }

}
