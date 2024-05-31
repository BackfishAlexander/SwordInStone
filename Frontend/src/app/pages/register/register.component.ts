import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthenticationService) {

  }

  onSubmit() {
    // console.log('Username:', this.registerData.username);
    // console.log('Password:', this.registerData.password);
    this.auth.register(this.registerData.username, this.registerData.password);
  }
}
