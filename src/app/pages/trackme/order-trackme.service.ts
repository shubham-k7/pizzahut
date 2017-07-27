import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class OrderTrackMeService {
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
	getOrderDetails(orderNum: number): Observable<any> {
		var url = 'http://uat.prtouch.com/analytics/order_tracking/';
		let headers = new Headers({'content-type': 'application/json'});
		var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
		// headers.append('Authorization', token);
		let options = new RequestOptions({ headers: headers});
		var payload = JSON.stringify({awb: orderNum.toString()});
		console.log(payload);
		return this.http.post(url,payload).map(this.extractData).catch(this.handleError);
	}
}