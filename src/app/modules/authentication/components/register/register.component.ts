import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {FirebaseAuthService} from "../../../../shared";
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
              private firebaseAuth: FirebaseAuthService,
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
      this.firebaseAuth.register(email, username, password).subscribe(() => {
        this.router.navigate(['/']).then(() => this.loadingService.closeLoader());
      })
    }
  }

}
