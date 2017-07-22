import { Component } from '@angular/core';
import { BikerInOutService } from './biker-in-out.service';
import { BikerMapService } from './biker-map.service';
@Component({
	selector: 'trackme',
	templateUrl: './trackme.html',
	styleUrls: ['./trackme.scss']
})
export class TrackMe {
	constructor(private bioService: BikerInOutService,
				private bmService: BikerMapService) {}
	options: any;
	overlays: any[];
	inBikerList: any[];
	outBikerList: any[];

  	lat: number;
  	lng: number;
  	bikersM: any[] = [];
	ngOnInit(){
		this.SCcode = JSON.parse(sessionStorage.getItem('currentUser'))['response']['sc_code'];
		this.getBikerIOList();
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
	SCcode: string;
	getBikerIOList() {
		this.bioService.getBikers(JSON.stringify({sc_code: this.SCcode}))
		.subscribe(result => {
			this.inBikerList = result['data']['in'];
			this.outBikerList = result['data']['out'];
		},
		(err) => {
			console.log(err);
		});
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
