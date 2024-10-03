import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  isAdmin = false; 
  
  constructor(private auth: AuthenticationService) {

  }

  ngOnInit(): void {
      this.isAdmin = this.auth.getRole() == "ADMIN";
  }
}
