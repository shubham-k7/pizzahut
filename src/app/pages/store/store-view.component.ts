import { Component,ViewChild } from '@angular/core';
import { BikerInOutService } from './biker-in-out.service';
import { SmartTablesService } from '../dashboard/smartTables/smartTables.service';

import { SmartTables } from '../dashboard/smartTables/smartTables.component';

@Component({
	selector: 'store-view',
	templateUrl: './store-view.html',
	styleUrls: ['./store-view.scss']
})
export class StoreViewComponent {
	constructor(private bioService: BikerInOutService,
				private btableService: SmartTablesService) {}
	inBikerList: any[];
	outBikerList: any[];
	@ViewChild('table') table: SmartTables;
	ngOnInit(){
		this.SCcode = JSON.parse(sessionStorage.getItem('currentUser'))['response']['sc_code'];
		this.getBikerIOList();
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
}
