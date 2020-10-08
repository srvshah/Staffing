import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MvLogin } from './login.model';
import { Router } from '@angular/router';
import {UtilityService} from './../../core/services/utility.service';

@Component({
  selector: 'zen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = null;
  errorMessageType: any = {
    invForm: 'Invalid form!',
    invLogin: 'Invalid username or password!'
  };
  loginForm: FormGroup;
  login: MvLogin = {} as MvLogin;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private us: UtilityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin(): void {
    if (this.username.errors || this.password.errors){
      this.errorMessage = this.errorMessageType.invForm;
    }
    else {
      this.login.username = this.username.value.trim();
      this.login.password = this.password.value.trim();

      this.loginService.getLogin(this.login).subscribe(res => {
        if (res && res.personId){
          this.us.openSnackBar('Logged in success', 'success');
          this.router.navigate(['/user-detail', res.personId]);
        }
        else {
          this.errorMessage = this.errorMessageType.invLogin;
        }
      });
    }

  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

 
}