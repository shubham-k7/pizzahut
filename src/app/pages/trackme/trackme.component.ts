import { Component,ViewChild } from '@angular/core';

@Component({
	selector: 'trackme',
	templateUrl: './trackme.html',
	styleUrls: ['./trackme.scss']
})
export class TrackMe {
	order: any = {};	
	constructor() {
		this.order = {
			chk_number: 7336,
			consignee: 'Rao',
			con_num: 784,
			biker_name: 'SF1 SF Rider 1',
			store: 'SFL024-01 - SFL024-01 - Thakur village',
			destination: 'c303 gayathri avenue ASHA NAGAR KANDIVALI EAST MUMBAI',
			type: 'COD',
			amount: 784.7
		}
	}
}