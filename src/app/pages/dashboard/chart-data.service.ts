import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class ChartDataService {
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

    getPHChart(id: string,payload: any): Observable<any> {
        var url = (id==='delivery-time') 
        ? 'http://phd.prtouch.com/analytics/delivery/' 
        : 'http://phd.prtouch.com/analytics/order/';
        return this.http.post(url,JSON.stringify(payload)).map(this.extractData).catch(this.handleError);
    }
    getKPIs(): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/kpi/';
        url = '';
        let headers = new Headers({'content-type': 'application/json'});
        var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
        headers.append('Authorization', token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(url,options).map(this.extractData).catch(this.handleError);
    }
    getCharts(kpi: any): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/inscan/report/';
        let headers = new Headers({'content-type': 'application/json'});
        var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
        headers.append('Authorization', token);
        let options = new RequestOptions({ headers: headers});
        let tempList = [];
        for(let version of kpi.versions){
            tempList.push(version.name);
        }
        var payload = JSON.stringify({kpi_id: kpi.kpi_name,version_ids: tempList,report_type: "0",name: [],series_name: "",chartConfigs: {_filter: null}});
        // console.log(payload);
        return this.http.post(url,payload,options).map(this.extractData).catch(this.handleError);
    }
    getDrilldownChart(payload: any): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/inscan/report/';
        let headers = new Headers({'content-type': 'application/json'});
        var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
        headers.append('Authorization', token);
        let options = new RequestOptions({ headers: headers});
        payload = JSON.stringify(payload); 
        // console.log(payload);
        return this.http.post(url,payload,options).map(this.extractData).catch(this.handleError);
    }

    getChartData(chartid: string,payload: any): Observable<any> {
        var url = (chartid==='delivery-time') 
        ? 'http://phd.prtouch.com/analytics/delivery/' 
        : 'http://phd.prtouch.com/analytics/order/';
        let headers = new Headers({'content-type': 'application/json'});
        var token = JSON.parse(sessionStorage.getItem('currentUser'))['response']['auth_key'];
        headers.append('Authorization', token);
        let options = new RequestOptions({ headers: headers});
        // console.log(JSON.stringify(payload));
        return this.http.post(url, JSON.stringify(payload)).map(this.extractData).catch(this.handleError);
    }

}