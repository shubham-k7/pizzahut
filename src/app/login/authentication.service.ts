import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    private isLoggedIn=false;
    constructor(public router: Router,private http: Http) {
        // set token if saved in session storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    login(username: string, password: string): Observable<boolean> {

        let headers = new Headers({'content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        return this.http.post('http://52.70.207.115:8087/api/authentication/token/',
         JSON.stringify({ username: username, password: password }),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if(response.json()['success']===true)
                {
                    let token = response.json()['data']['auth_key'];
                    sessionStorage.setItem('currentUser',
                        JSON.stringify({ data: response.json()['data']}));
                    // return true to indicate successful login
                    return true;
                }
                else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.isLoggedIn=false;
        this.router.navigate(['']);
    }
}