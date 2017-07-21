import { Component } from '@angular/core';
import { BikerService } from './biker.service';
@Component({
	selector: 'trackme',
	templateUrl: './trackme.html',
	styleUrls: ['./trackme.scss']
})
export class TrackMe {
	constructor(private bikerService: BikerService) {}
	options: any;
	overlays: any[];
	inBikerList: any[];
	outBikerList: any[];
	ngOnInit(){
		this.options = {
			center: {lat: 36.890257, lng: 30.707417},
			zoom: 12
			};
		this.SCcode = JSON.parse(sessionStorage.getItem('currentUser'))['data']['sc_code'];
		this.getBikers();
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
	SCcode: string;
	getBikers() {
		this.bikerService.getBikers(JSON.stringify({sc_code: this.SCcode}))
		.subscribe(result => {
			this.inBikerList = result['data']['in'];
			this.outBikerList = result['data']['out'];
		},
		(err) => {
			console.log(err);
		});
	}
}
