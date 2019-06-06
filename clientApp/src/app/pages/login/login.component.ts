import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl(false, Validators.required)
  });

  rememberMe = false;

  showErrorMessage = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitUserLoginForm(): void {
    const user = this.userLoginForm.value;

    this.authService.login(user).subscribe(response => {
      /*
        If backend says the credentials are bad
      */
      if (response === false) {
        this.showErrorMessage = true;
        return;
      }
      /*
        Save current user
      */
      this.authService.currentUser = user;
      /*
        Save current user to broswer local storage
      */
      if (this.rememberMe) {
        this.authService.currentUserLocalStorage = user;
      }
      /*
        Check if the user wanted to navigate to a certain page and he was not logged in yet
        and route him where he wanted after succesfull login, if not default him to /orders
      */
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/orders']);
      }
    },
    error => console.log(error));
  }

}
