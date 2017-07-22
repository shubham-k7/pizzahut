import { Component } from '@angular/core';
import { BikerMapService } from './biker-map.service';
@Component({
	selector: 'bikers',
	templateUrl: './bikers.html',
	styleUrls: ['./bikers.scss']
})
export class BikersComponent {
	constructor(private bmService: BikerMapService) {}
	lat: number;
  	lng: number;
  	bikersM: any[] = [];
	SCcode: string;
	ngOnInit(){
		this.SCcode = JSON.parse(sessionStorage.getItem('currentUser'))['response']['sc_code'];
		this.getBikerM();
		// this.inBikerList = [{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"},
		// 					{emp_code: "125",reach_time: "35 mins",distance: "5 Km",store_name: "Kandivali"}];
	}
	getBikerM() {
		this.bmService.getBikers(JSON.stringify({sc_code: this.SCcode}))
		.subscribe(result => {
			this.bikersM = result['data'];
			this.lat = result['store']['store_lat'];
			this.lng = result['store']['store_lng'];
		},
		(err) => {
			console.error(err);
		});
	}
}
