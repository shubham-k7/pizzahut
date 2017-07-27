import { Component } from '@angular/core';
import { BikerMapService } from './biker-map.service';
import { NguiMapComponent } from '@ngui/map';
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
	}
	update(event: any) {
		console.log(event);
	}

    showInfoWindow(event: any) {
		let marker = event.target;
		marker.NguiMapComponent.openInfoWindow(
		'iw', // id of InfoWindow
		marker, // anchor for InfoWindow
		{ // local variables for InfoWindow
			lat: marker.getPosition().lat(),
			lng: marker.getPosition().lng(),
		}
		);
	}


	getBikerM() {
		this.bmService.getBikers(JSON.stringify({sc_code: this.SCcode}))
		.subscribe(result => {
			this.bikersM = result['data'];
			this.lat = result['store']['store_lat'];
			this.lng = result['store']['store_lng'];
			var latlong = new google.maps.LatLng(this.lat,this.lng);
		},
		(err) => {
			console.error(err);
		});
	}
}
