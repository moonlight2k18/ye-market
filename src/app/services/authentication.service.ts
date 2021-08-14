import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] },
  ];

  public isAuthenticated: boolean = false;
  public userAuthenticated;
  public token: string;

  constructor() { }

  public login(username: string, password: string) {
    let user = undefined;

    this.users.forEach(element => {
      if (element.username == username && element.password == password) {
        user = element;
      }
    });

    if (user) {
      this.token = btoa(JSON.stringify({
        username: user.username,
        roles: user.roles
      }));

      this.userAuthenticated = user;
      this.isAuthenticated = true;
    } 
    else {
      this.userAuthenticated = undefined;
      this.isAuthenticated = false;
    }

  }

  public isAdmin() {
    if (this.isAuthenticated && this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
      return true;
    }
    return false;
  }

  public saveAuthenticatedUser() {
    if (this.userAuthenticated) {
      localStorage.setItem('authToken', this.token);
    }
  }

  public loadAuthenticatedUserFromLocalStorage() {
    let t = localStorage.getItem('authToken');

    if (t) {
      let u = JSON.parse(atob(t));

      this.userAuthenticated = {
        username: u.username, roles: u.roles
      }
      this.isAuthenticated = true;
      this.token = t; 
    }

  }

  public removeTokenFromLocalStorage(){
    if(this.token){
      localStorage.removeItem("authToken");
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
      this.token = undefined;
    }
  }

}
