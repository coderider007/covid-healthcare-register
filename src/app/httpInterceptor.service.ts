import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './login/auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    chrbaseuri: string = environment.chrbaseuri;

    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('LoggedIn = ' + this.authenticationService.isUserLoggedIn());
        console.log('URL = ' + req.url);
        console.log('URL = ' + this.chrbaseuri);
        console.log('URL = ' + req.url.indexOf(this.chrbaseuri));
        if (this.authenticationService.isUserLoggedIn()
            && req.url.indexOf(this.chrbaseuri) !== -1
            && AuthenticationService.username !== undefined) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${window.btoa(AuthenticationService.username + ':' + AuthenticationService.password)}`
                })
            });
            console.log('Auth Header Added.');
            return next.handle(authReq);
        } else {
            console.log('Auth Header Not Added.');
            return next.handle(req);
        }
    }
}