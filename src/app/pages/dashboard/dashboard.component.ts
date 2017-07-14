import {Component,ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import { ChartsComponent } from './charts/charts.component'; 
import { SmartTables } from './smartTables/smartTables.component';
// import { SmartTablesService } from './smartTables.service';
// -----Providers-----
import { ChartDataService } from './charts/chart-data.service';
// -----Highcharts Imports-----
declare var require: any;
import { ChartComponent } from 'angular2-highcharts';
var Highcharts = require('highcharts/highcharts');
var HighchartsMore = require('highcharts/highcharts-more');
var HighchartsDrilldown = require('highcharts/modules/drilldown');
var HighchartsExporting = require('highcharts/modules/exporting.src');
var HighchartsExportData = require('highcharts/modules/export-data.src');
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
// -----MaterialDesign Imports-----
import { DateAdapter } from '@angular/material';
import { DateLocale } from 'md2';
import { Month } from '../../../assets/month';

import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  	constructor(private myDate: DateLocale,
  				private chartDataService: ChartDataService) {
  		this.myDate.months = Month;
  		this.myDate.locale = 'en-IN';
  	 	// this.children = new Map<string,any>();
  	}
  	lat: number = 28.4674579;
  	lng: number = 77.0822735;
  	getChartData(event: any,chartid: string): void {
		var comp=this,t;
		var x = chartid.split('-').slice(0,2);
		var kpi_name = x[0];
		var version_id = x[1];
		t = this.kpilist[kpi_name][chartid]._drilldowns.length;
		var list = this.kpilist[kpi_name][chartid]._drilldowns.slice(1,t+1);
		list.push(event.point.name);
		let chartConfigs = this.kpilist[kpi_name][chartid];
		var shallowCopy = { ...chartConfigs,_chart:  null,_filteredDivisions: null };
		// PAYLOAD for charts, name is a list of filters for charts
		var payload = {
				name: list,
				series_name: event.point.series.name,
				report_type: t.toString(),
				chartName: chartid,
				version_ids: [version_id],
				kpi_id: kpi_name,
				/*dftype: (chartConfigs._selectedvalue!==null)?chartConfigs._selectedvalue.id: 0,
				mon: chartConfigs._mon,
				sDate: chartConfigs._sDate,
				eDate: chartConfigs._eDate,
				divisions: chartConfigs._divisions,
				filter: chartConfigs._filter*/
				chartConfigs: shallowCopy
			};
		this.chartDataService.getChartData(payload).subscribe(series => {
			var chart;
			chart = comp.kpilist[payload.kpi_id][chartid]._chart;
			chart.hideLoading();
			if(event.points)
			{
				chart.addSingleSeriesAsDrilldown(event.point,series[0]);
				comp.drilldownsAdded++;
				if(comp.drilldownsAdded===event.points.length) {
					comp.drilldownsAdded=0;
					chart.applyDrilldown();
					if(chart.insertedTable)
						chart.viewData();
					comp.kpilist[payload.kpi_id][chartid]._drilldowns.push(payload.name.slice(-1)[0]);
				}
				// console.log(comp.drilldowns);
			}
		},
		(err) => {
			alert(err);
			this.kpilist[payload.kpi_id][payload.chartName]._chart.hideLoading();
		});
	}
	chartInit(kpi_name: string,conf: any): string{
		// Do NOT REMOVE this. 
		var comp = this;        
		// It's used inside chart confs to access ChartComponent instance
		var data = eval('(' + conf + ')');
		let prevConfig = this.kpilist[kpi_name][data.chart.name];
		if(prevConfig) {
			this.kpilist[kpi_name][data.chart.name] = {...prevConfig,_chart: null};
		}
		else{
			this.kpilist[kpi_name][data.chart.name] = {	
													_chart:  null,
													_drilldowns: ['All'],
													_selectedvalue: null,
													_maxDate: null,
													_mon: null,
													_sDate: null,
													_eDate: null,
													_divisions: null,
													_filteredDivisions: null,
													_filter: null
												};									
		}
		// console.log(this.kpilist);
		var chart = new Highcharts.Chart(data);
		this.kpilist[kpi_name][data.chart.name]._chart = chart;
		chart.options.drilldown.activeDataLabelStyle = { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
		chart.options.drilldown.activeAxisLabelStyle = { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
		chart.options.drilldown.drillUpButton = {
				relativeTo: 'chart',
				position: {
					align: "right",
					y: 6,
					x: -50
				},
				theme: {
					fill: 'white',
					'stroke-width': 1,
					stroke: 'silver',
					opacity: 0.5,
					r: 0,
					states: {
						hover: {
							fill: '#41739D',
							style: {
								color: "white"
							},
							opacity: 1
						},
						select: {
							stroke: '#039',
							fill: '#bada55'
						}
					}
				}
			};
		return data.chart.name;
	}
	/**
	  *	Deprecated as of 2017-07-07
	  * This was used during Drilldown and refresh,
	  * however it is deprecated in Non-Drilldown Sirwala Chart.
	  */
	getDrilldownChart(chartid: string,source: any) {
		let x = chartid.split('-'),
			kpi_name = x[0],
			version = x[1],
			chartConfigs = this.kpilist[kpi_name][chartid],
			check = null,
			chart = chartConfigs._chart;
			chart.showLoading("Fetching Data...");
		if(chart.insertedTable && chart.insertedTableID)
			check = chart.insertedTableID;

		var shallowCopy = { ...chartConfigs,_chart:  null,_filteredDivisions: null };
		var payload = {	kpi_id: kpi_name,
						version_ids: [x[1]],
						report_type: "0",
						name: [],
						series_name:  null,
						chartConfigs: shallowCopy
			};
		this.chartDataService.getDrilldownChart(payload).subscribe(data => {
			var series = data[0].data;
			var chartid = this.chartInit(kpi_name,data[0].conf);
			var chart = this.kpilist[kpi_name][chartid]._chart;
			if(source==="datepicker")
				this.kpilist[kpi_name][chartid]._drilldowns = chartConfigs._drilldowns;
			for(var i =0; i <series.length;i++)
				chart.addSeries(series[i]);
			if(check){
				chart.insertedTable=true;
				chart.insertedTableID = check;
				chart.hideData();
				chart.viewData();
			}
		},
		(err) => {
			alert(err);
			chartConfigs._chart.hideLoading();
		}
		);
	}
	/*setFilterflag(chartid: string) {
		setTimeout(()=>{
			let kpi_name = chartid.split('-')[0],
				chartConfigs = this.kpilist[kpi_name][chartid];
			chartConfigs._filter = null;
			console.log(chartConfigs);
			if(chartConfigs._selectedvalue && chartConfigs._selectedvalue.id!==0 && (chartConfigs._mon || chartConfigs._eDate || chartConfigs._sDate))
			{
				console.log("1");
				chartConfigs._filter = 1;
			}
			else if(chartConfigs._divisions && chartConfigs._divisions.length!==0)
			{
				console.log("2");
				console.log(chartConfigs._divisions.length);
				chartConfigs._filter = 1;

			}
			else {
				chartConfigs._filter = null;
			}
		},300);
	}*/
	check(event: any,chartid: string) {
		console.log(event);
		let kpi_name = chartid.split('-')[0];
		console.log(this.kpilist[kpi_name][chartid]._divisions);
		// this.getNonDrilldownChart([],chartid);
	}
	getCharts(kpi: any) {
		this.chartDataService.getCharts(kpi).subscribe(data => {
			// for each chart in data, Init chart, add Mapping to chart, add series to chart
			for(var chart of data){
				var chartid = this.chartInit(kpi.kpi_name,chart.conf);
				for(var i =0; i<chart.data.length;i++){
					this.kpilist[kpi.kpi_name][chartid]._chart.addSeries(chart.data[i]);
				}
			}
			console.log(this.kpilist);
		},
		(err) => {
			alert(err);
		});
	}
	
	getKPIs() {
		this.chartDataService.getKPIs().subscribe(res => {
			var kpis = res['data'],name;
			this.kpis = kpis;
			// console.log(kpis);
			// for each kpi, create kpilist map, getCharts for each KPI. filter charts on kpi.version
			for(var kpi of kpis){
				this.getCharts(kpi);
				this.kpilist[kpi.kpi_name] = new Map<string,any>();
		   }
		},
		(err)=>{
			alert(err);
		});
	}
	update(filter: any) {
		// console.log(JSON.stringify(filter));
		this.chartDataService.getCharts(filter).subscribe((data) => {

		});
	}
	
	filterDivisions(event,kpi_name: string,version: string) {
		var chartid = kpi_name+'-'+version,
			query = event.query,
			filtered : any[] = [];
		/*this.chartFilterService.getFilteredResults(query).subscribe(filtered => {
			this.kpilist[kpi_name][chartid]._filteredDivisions = filtered;
		},
		(err) => {
			alert(err);
		});*/
		for(let i = 0; i < this.division.length; i++) {
            let country = this.division[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filter._filteredDivisions = filtered;
	}
	division = [{name: "India", type: "Country"},
				 {name: "East", type: "Zone"},	
				 {name: "Assam", type: "State"},
				 {name: "Ex.guwahati", type: "City"},
				 {name: "GUW", type: "DC"}]
	selection(event) {
		if(!event){
			this.filter._mon = null;
			this.filter._sDate = null;
			this.filter._eDate = null;
			this.filter._maxDate = null;
		}
		switch((event && event.id))
		{
			case 1:
				this.filter._sDate = null;
				this.filter._eDate = null;
				this.filter._maxDate = null;
				break;
			case 2:
				this.filter._mon = null;
				break;
		}
	}
	setGlobalMaxDate() {
		this.MAX_DATE = new Date();
	}
	setMaxDate() {
		var temp_date = this.filter._sDate;
		var temp2 = new Date();
		var temp = new Date(temp_date);
		temp.setDate(temp.getDate() + 31);
		this.filter._maxDate = (temp>temp2)?temp2:temp;
	}
	updateChild(event) {
		var shallowCopy;
		if(this.filter && this.filter._mon) {
			shallowCopy = {...this.filter,
				_mon: new Date(this.filter._mon).toLocaleDateString('en-US')};//.toLocaleString('en-IN');
		}
		else
			shallowCopy = this.filter;
		console.log(JSON.stringify(shallowCopy));
		this.children['table']._child.update(shallowCopy);
	}
	
	MAX_DATE = new Date();
	filter = {
		_selectedvalue: null,
		_maxDate: null,
		_mon: null,
		_sDate: null,
		_eDate: null,
		_divisions: null,
		_filteredDivisions: null,
		_filter: null,
	}
	kpis: any;
	drilldownsAdded: any;
	kpilist: Map<string,any> = new Map<string,any>();
  	children: Map<string,any> = new Map<string,any>();
  	options = [
		{id: 1, value: 'Month'},
		{id: 2, value: 'Range'}
	];
  	@ViewChild('table') table: SmartTables;
  	ngOnInit() {
  		this.children['table'] = {_child: this.table};
  		this.getKPIs()
  	}
}
