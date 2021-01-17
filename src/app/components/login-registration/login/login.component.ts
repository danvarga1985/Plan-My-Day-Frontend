import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserHttpService } from 'src/app/services/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User;
  emailNotValidEmail: boolean;
  emailNotRegisteredOrIncorrectPassword: boolean;
  emailNotValidEmailMessage = 'Invalid email address!';
  emailNotRegisteredOrIncorrectPasswordMessage = 'Not registered email address or incorrect password!';
  emailNotValidEmailOrNotRegisteredMessage = 'Not valid or not registered email address';

  constructor(private userService: UserHttpService, private router: Router) {
    this.user = {
      email: '',
      password: '',
      onlyActiveProjects: false
    },
      this.emailNotRegisteredOrIncorrectPassword = false;
    this.emailNotValidEmail = false;
  }

  submit(): void {
    this.emailNotValidEmail = false;
    this.emailNotRegisteredOrIncorrectPassword = false;
    if (!this.isEmailValid()) {
      this.emailNotValidEmail = true;
    } else {
      this.userService.loginUser(this.user).then(() => {

        this.router.navigate(['']);
      }).catch(() => {
        this.emailNotRegisteredOrIncorrectPassword = true;
      });
    }
  }

  isEmailValid(): boolean {
    // tslint:disable-next-line: max-line-length
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.user.email !== '' && emailRegexp.test(this.user.email);
  }

  resetPassword(): void {
    /* if (this.user.email === '') {
      this.emailNotValidEmail = true;
    } else {
      this.userService.getExistingEmail({ email: this.user.email }).then(() => {
        this.router.navigate(['/reset-password']);
      }).catch(() => {
        this.emailNotRegisteredOrIncorrectPassword = true;
      });
    } */
  }
}
