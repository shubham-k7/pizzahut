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
	map: google.maps.Map;
	constructor(private trackMeService: TrackMeService,
				private orderTracker: OrderTrackMeService) {
		this.order = {
			picked: {
				time: '',
				color: ''
			},
			at_gate: {
				time: '',
				color: ''
			},
			delivered: {
				time: '',
				color: ''
			},
			viewed: {
				time: '',
				color: ''
			},
			ships: {
				order_number: 7336,
				consignee_name: 'Rao',
				consignee_number: 784,
				biker_name: 'SF1 SF Rider 1',
				store: 'SFL024-01 - SFL024-01 - Thakur village',
				consignee_address: 'c303 gayathri avenue ASHA NAGAR KANDIVALI EAST MUMBAI',
				product_type: 'COD',
				declared_value: 784.7
			}
		};
	}
	ngOnInit() {
		
	}
	update() {
		this.orderTracker.getOrderDetails(this.order_num)
			.subscribe(res => {
				this.order = res;
			},
			(err) => {
				console.error(err);
		});
	}
	onMapReady(map) {
		this.map = map;
	}
}