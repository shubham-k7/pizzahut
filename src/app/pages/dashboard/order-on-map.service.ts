import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class OrderOnMapService {
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
	getOrders(payload: any): Observable<any> {
		var url = 'http://phd.prtouch.com/analytics/';
		let headers = new Headers();
		var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
		headers.append('Authorization', 'umuotmdkm4v9l7p52xm4aidiar1cbq0q');
		let options = new RequestOptions({ headers: headers});
		payload = JSON.stringify(payload);
		return Observable.interval(60000).startWith(0).switchMap(() => {
			return this.http.post(url,payload).map(this.extractData).catch(this.handleError);
		});
	}
}
