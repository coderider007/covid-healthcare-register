import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    private authenticationService: AuthenticationService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
    this.commonService.loginEvent
    .subscribe((data: boolean) => {
      console.log('Login Event: ' + data);
      this.isLoggedIn = this.authenticationService.isUserLoggedIn();
      console.log('menu ->' + this.isLoggedIn);
    });
  }

  handleLogout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
  }

}
