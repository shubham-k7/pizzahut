import { Component,Input,ViewChild } from '@angular/core';
import { TrackMeService } from './trackme.service';
import { OrderTrackMeService } from './order-trackme.service';

@Component({
	selector: 'trackme',
	templateUrl: './trackme.html',
	styleUrls: ['./trackme.scss']
})
export class TrackMe {
	order: any = {};
	@Input() order_num: number;
	constructor(private trackMeService: TrackMeService,
				private orderTracker: OrderTrackMeService) {
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
	check(event: any, val: any) {
		console.log(event);
		console.log(event);
	}

	onMapReady(map) {
		this.map = map;
		console.log("map initialised");
	}
	map: google.maps.Map;
	ngOnInit() {
		// this.orderTracker.getOrderDetails(this.order_num).subscribe(res => {
		// 	this.order = res['order_details'];
		// })
    	// this.trackMeService.getOrders({sc_code: this.SCcode})
    	// 	.subscribe(res => {
    	// 		this.mapOptions.center = new google.maps.LatLng(Number(res.center.latitude),Number(res.center.longitude));
    	// 		this.points = [];
    	// 		for(let co of res.lat_long)
    	// 		{
    	// 			let pt = new google.maps.LatLng(co.latitude,co.longitude);
    	// 			this.points.push(pt);
    	// 		}
    	// });
	}
}