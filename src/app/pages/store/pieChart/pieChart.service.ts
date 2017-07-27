import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider,private http: Http) {
  }
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
  getData(): Observable<any> {
	let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
	let url = 'http://phd.prtouch.com/analytics/quick_details/';
	let var1 = {sc_code: "SFL054-01"};
	return Observable.interval(60000).startWith(0).switchMap(() => {
	  return this.http.post(url,JSON.stringify(var1)).map(this.extractData).catch(this.handleError);
	});
  }
}
	/*[
	  {
		color: pieColor,
		description: 'Pending',
		stats: '3',
		icon: 'person',
		percent: 52
	  }, {
		color: pieColor,
		description: 'OFD',
		stats: '12',
		icon: 'money',
		percent: 52
	  }, {
		color: pieColor,
		description: 'Delivered',
		stats: '25',
		icon: 'face',
		percent: 52
	  }, {
		color: pieColor,
		description: 'Avg Delivery Time',
		stats: '32 Min',
		icon: 'refresh',
		percent: 52
	  }
	];*/
