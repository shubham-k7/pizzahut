import {Component} from '@angular/core';

@Component({
  selector: 'trackme',
  templateUrl: './trackme.html',
  styleUrls: ['./trackme.scss']
})
export class TrackMe {
	constructor() {}
	options: any;
    
    overlays: any[];
    ngOnInit(){
    	this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
        
    }
}
