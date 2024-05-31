import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthenticationService) {

  }

  onSubmit() {
    // console.log('Username:', this.loginData.username);
    // console.log('Password:', this.loginData.password);
    this.auth.login(this.loginData.username, this.loginData.password);
  }
}
