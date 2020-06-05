import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static username: string;
  public static password: string;

  // BASE_PATH: 'http://localhost:8080'
  chrbaseuri = environment.chrbaseuri;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';


  constructor(private http: HttpClient) {

  }

  authenticationService(username: string, password: string) {
    return this.http.get(this.chrbaseuri + '/basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password) }, responseType: 'text' }).pipe(map((res) => {
        AuthenticationService.username = username;
        AuthenticationService.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    AuthenticationService.username = null;
    AuthenticationService.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return (user !== null);
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return (user === null) ? '' : user;
  }
}
