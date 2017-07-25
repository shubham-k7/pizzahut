import { Component,Input,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

import { ViewCell } from 'ng2-smart-table';
@Component({
	selector: 'status-view',
	template: `
		<div style="border-radius: 10px; text-align: center;" [style.background-color]="color" [style.color]="textColor">{{value}}</div>
	`
})
export class StatusViewComponent implements ViewCell,OnInit {
	@Input() value: string;
	color: string;
	textColor: string;
	ngOnInit() {
		if(this.value==='Rider Notified')
		{
			this.color = '#5cb85c';
			this.textColor = '#FFFFFF';
		}
		else if(this.value==='Delivered')
		{
			this.color = '#00FF00';

		}
		else if(this.value==='At Gate')
		{
			this.color = '#f0ad4e';
		}
		else if(this.value==='Viewed')
		{
			this.color = '#dc6767';
			this.textColor = '#FFFFFF';
		}
		else if(this.value==='Picked')
		{
			this.color = '#5bc0de';
			this.textColor = '#FFFFFF';
		}
	}
}
/*
valuePrepareFunction: (value) => {
					if(value==='Rider Notified')
						return `<div style="background-color: #5cb85c">{{value}}</div>`;
					else if(value==='Delivered')
						return '<div style="background-color: #00FF00">{{value}}</div>';
					else if(value==='')
						return '{{value}}';
					else
						return '{{value}}';
				}*/
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
			perPage: 10
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
				type: 'custom',
				renderComponent: StatusViewComponent
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
