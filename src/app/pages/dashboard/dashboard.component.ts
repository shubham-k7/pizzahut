import {Component,ViewChild,Inject,ElementRef} from '@angular/core';
import {PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { Observable } from 'rxjs/Rx';
import { DOCUMENT } from '@angular/platform-browser';
// -----Child Components-----
import { SmartTables } from './smartTables/smartTables.component';
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
import { conf } from '../../../assets/column';
// -----MaterialDesign Imports-----
import { DateAdapter } from '@angular/material';
import { DateLocale } from 'md2';
import { Month } from '../../../assets/month';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
	constructor(@Inject(DOCUMENT) private document: any,
				private pageScrollService: PageScrollService,
				private myDate: DateLocale,
				private chartDataService: ChartDataService) {
		this.myDate.months = Month;
		this.myDate.locale = 'en-IN';
	}

	@ViewChild('basicContainer')
	public basicContainer: ElementRef;

	@ViewChild('complexContainer')
	public complexContainer: ElementRef;

	lat: number = 28.4674579;
	lng: number = 77.0822735;
	getChartDataPH(event: any,chartid: string): void {
		var comp=this,t;
		t = this.chartlist[chartid]._drilldowns.length;
		var list = this.chartlist[chartid]._drilldowns.slice(1,t+1);
		list.push(event.point.name);
		let chartConfigs = this.chartlist[chartid];
		var shallowCopy = { ...chartConfigs,_chart:  null,_filteredDivisions: null };
		// PAYLOAD for charts, name is a list of filters for charts
		var payload = {
				search_string: [event.point.name],
				report_type: t.toString(),
				series_name: [event.point.series.name],
				chartConfigs: shallowCopy
			};
		console.log(event);
		this.chartDataService.getChartData(chartid,payload).subscribe(singleSeries => {
			var chart;
			chart = comp.chartlist[chartid]._chart;
			chart.hideLoading();
			if(event.points)
			{
				comp.series[event.point.series.name]={point: event.point,series: singleSeries};
				comp.drilldownsAdded++;
				if(comp.drilldownsAdded===event.points.length) {
					var order = [];
					for(let series of event.target.series) {
						order.push(series.name);
					}
					for(let o of order) {
						chart.addSingleSeriesAsDrilldown(comp.series[o].point,comp.series[o].series.data[0]);
					}
					comp.drilldownsAdded=0;
					comp.series = {};
					chart.applyDrilldown();
					if(chart.insertedTable)
						chart.viewData();
					comp.chartlist[chartid]._drilldowns.push(payload.search_string[0]);
				}
			}
		},
		(err) => {
			alert(err);
			this.chartlist[chartid]._chart.hideLoading();
		});
	}
	/*chartInit(kpi_name: string,conf: any): string{
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
	}*/
	/**
	  *	Deprecated as of 2017-07-07
	  * This was used during Drilldown and refresh,
	  * however it is deprecated in Non-Drilldown Sirwala Chart.
	  */
	getDrilldownChart(chartid: string,source: any) {
		let x = chartid.split('-'),
			kpi_name = x[0],
			version = x[1],
			chartConfigs = this.chartlist[chartid],
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
			var chartid = this.chartInitPH(kpi_name);
			var chart = this.chartlist[chartid]._chart;
			if(source==="datepicker")
				this.chartlist[chartid]._drilldowns = chartConfigs._drilldowns;
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
	/*check(event: any,chartid: string) {
		console.log(event);
		let kpi_name = chartid.split('-')[0];
		console.log(this.kpilist[kpi_name][chartid]._divisions);
	}*/
	/*getCharts(kpi: any) {
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
	}*/
	
	/*getKPIs() {
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
	}*/
	update(filter: any) {
		// console.log(JSON.stringify(filter));
		this.chartDataService.getCharts(filter).subscribe((data) => {

		});
	}
	
	/*filterDivisions(event,kpi_name: string,version: string) {
		var chartid = kpi_name+'-'+version,
			query = event.query,
			filtered : any[] = [];
		this.chartFilterService.getFilteredResults(query).subscribe(filtered => {
			this.kpilist[kpi_name][chartid]._filteredDivisions = filtered;
		},
		(err) => {
			alert(err);
		});
		for(let i = 0; i < this.division.length; i++) {
			let country = this.division[i];
			if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(country);
			}
		}
		this.filter._filteredDivisions = filtered;
	}*/
	division = [{name: "India", type: "Country"},
				 {name: "East", type: "Zone"},	
				 {name: "Assam", type: "State"},
				 {name: "Ex.guwahati", type: "City"},
				 {name: "GUW", type: "DC"}]
	/*selection(event) {
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
	}*/
	setGlobalMaxDate() {
		this.MAX_DATE = new Date();
	}
	/*setMaxDate() {
		var temp_date = this.filter._sDate;
		var temp2 = new Date();
		var temp = new Date(temp_date);
		temp.setDate(temp.getDate() + 31);
		this.filter._maxDate = (temp>temp2)?temp2:temp;
	}*/
	/*updateChild(event) {
		var shallowCopy;
		if(this.filter && this.filter._mon) {
			shallowCopy = {...this.filter,
				_mon: new Date(this.filter._mon).toLocaleDateString('en-US')};//.toLocaleString('en-IN');
		}
		else
			shallowCopy = this.filter;
		this.children['table']._child.update(shallowCopy);
	}
	*/
	/*filter = {
		_selectedvalue: null,
		_maxDate: null,
		_mon: null,
		_sDate: null,
		_eDate: null,
		_divisions: null,
		_filteredDivisions: null,
		_filter: null,
	}*/

	chartInitPH(chartid: string): string{
		// Do NOT REMOVE this. 
		var comp = this;
		var conf = {
			chart: {
				name: '',
				type: 'column',
				renderTo: '',
				zoomType: 'x',
				panning: true,
				panKey: 'shift',
				resetZoomButton: {
					position: {
						align: 'center',
						verticalAlign: 'top',
						x: -20,
						y: 10
					},
					relativeTo: 'chart',
					theme: {
						fill: 'white',
						stroke: 'silver',
						r: 0,
						states: {
							hover: {
								fill: '#41739D',
								style: {
									color: 'white'
								}
							}
						}
					}
				},
				events: {
					drilldown: function(e) {
						if (!e.seriesOptions) {
							var chart = this;
							chart.showLoading('Fetching Data ...');
							var chartid = this.pointer.options.chart.name;
							comp.getChartDataPH(e, chartid);
						}
					},
					drillupall: function(e) {
						this.hideData();
						comp.chartlist[this.options.chart.name]._drilldowns.pop();
					}
				}
			},
			title: {
				text: null
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				title: {
					text: 'Time (mins)'
				}
			},
			legend: {
				enabled: true,
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true,
						format: '{y}'
					}
				},
				column: {
					events: {
						legendItemClick: function() {
							return true;
						}
					}
				}
			},
			series: [],
			drilldown: {
				allowPointDrilldown: false,
				series: []
			},
			responsive: {
				rules: [{
					condition: {
						maxWidth: 600
					},
					chartOptions: {
						legend: {
							align: 'center',
							verticalAlign: 'bottom',
							layout: 'horizontal'
						},
						yAxis: {
							labels: {
								align: 'left',
								x: 0,
								y: -5
							},
							title: {
								text: null
							}
						},
						subtitle: {
							text: null
						},
						credits: {
							enabled: false
						}
					}
				}]
			}
		};
		// It's used inside chart confs to access ChartComponent instance
		conf.chart.name = chartid;
		conf.chart.renderTo = chartid;
		conf.plotOptions.series.dataLabels.format = (chartid==='delivery-time')? '{y} min' : '{y}';
		conf.yAxis.title.text = (chartid==='delivery-time') ? 'Time (Mins)' : 'Count';
		let prevConfig = this.chartlist[chartid];
		if(prevConfig) {
			this.chartlist[chartid] = {...prevConfig,_chart: null};
		}
		else{
			this.chartlist[chartid] = {	
										_chart: null,
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
		// console.log(conf);
		var chart = new Highcharts.Chart(conf);
		this.chartlist[chartid]._chart = chart;
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
		return chartid;
	}
	MAX_DATE = new Date();
	drilldownsAdded: any;
	series: any = {};
	chartlist: Map<string,any> = new Map<string,any>();
	options = [
		{id: 1, value: 'Month'},
		{id: 2, value: 'Range'}
	];
	getPHChart(chartid: string) {
		let payload = {report_type: 0,search_string: []};
		this.chartDataService.getPHChart(chartid,payload)
			.subscribe(series => {
				var id = this.chartInitPH(chartid);
				for(var i=0; i<series.data.length;i++){
					this.chartlist[id]._chart.addSeries(series.data[i]);
				}
			},
			(err) => {
				alert(err);
			});
	}
	
	ngOnInit() {
		this.drilldownsAdded = 0;
		this.getPHChart("delivery-time");
		this.getPHChart('order-stats');
	}
}
