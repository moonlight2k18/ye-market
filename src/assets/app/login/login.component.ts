import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onLogin(f){
    this.authService.login(f.username, f.password);
    
    console.error(this.authService.isAuthenticated, f.username, f.password)

    if(this.authService.isAuthenticated){
      this.authService.saveAuthenticatedUser();
      this.router.navigateByUrl('');
    }


  }
}
