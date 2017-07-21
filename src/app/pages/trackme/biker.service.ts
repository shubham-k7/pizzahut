import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class BikerService {
	constructor(private http: Http){ }

	private extractData(res: Response) {
		let body = res.json();
		console.log(body);
		return body || { };
	}
	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
	getBikers(payload: any){
		var url = 'http://phd.prtouch.com/analytics/biker_cur_loc/';
		let headers = new Headers({'content-type': 'application/json'});
		/*var token = JSON.parse(sessionStorage.getItem('currentUser'))['data']['auth_key'];
		token = "Token " + token;
		headers.append('Authorization', token);*/
		let options = new RequestOptions({ headers: headers});
		let var1 = {sc_code: "SFL054-01"};
		// payload = ;
		// return Observable.interval(60000).startWith(0).switchMap(() => {
		// 	return this.http.post(url,JSON.stringify(var1),options).map(this.extractData).catch(this.handleError);
		// });
		console.log(JSON.stringify(var1));
		return this.http.post(url,JSON.stringify(var1)).map(this.extractData).catch(this.handleError);
	}
}