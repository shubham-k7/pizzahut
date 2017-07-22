import { Component,Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

	@Input() filter: any;
	query: string = '';
	dataTable: any = {title: "Biker"};
	settings = {
		actions: false,
		pager: {
			perPage: 4
		},
		columns: {
			order_number: {
				title: 'Order',
				type: 'number',
			},
			biker_name: {
				title: 'Biker',
				type: 'string'
			},
			customer_name: {
				title: 'Customer',
				type: 'string'
			},
			created_time: {
				title: 'Date/Time',
				valuePrepareFunction: (value) => {
					return new Date(value).toLocaleString('en-IN')
				}
			},
			status: {
				title: 'Status',
				type: 'string'
			}
		}
	};

	source: LocalDataSource = new LocalDataSource();
	today: Date;
	yesterday: Date;
	constructor(private service: SmartTablesService) {
		this.today = new Date();
		this.yesterday = new Date();
		this.yesterday.setDate(this.yesterday.getDate()-1);
		var payload = {from_date: this.yesterday.toISOString().substr(0,10),to_date: this.today.toISOString().substr(0,10)};
		this.service.getTableData(payload).subscribe((data) => {
		this.source.load(data.data.data);
		});
		}
		update(filter: any) {
		// console.log(JSON.stringify(filter));
		this.service.getTableData(filter).subscribe((data) => {
		  this.source.load(data.data.data);
		});
		}
		onDeleteConfirm(event): void {
		if (window.confirm('Are you sure you want to delete?')) {
		  event.confirm.resolve();
		} else {
		  event.confirm.reject();
		}
	}
}
