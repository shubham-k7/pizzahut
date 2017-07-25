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
		this.chartDataService.getChartData(chartid,payload).subscribe(singleSeries => {
			var chart;
			chart = comp.chartlist[chartid]._chart;
			chart.hideLoading();
			chart.yAxis[0].removePlotLine(event.point.series.name);
			if(event.points)
			{
				comp.series[event.point.series.name]={point: event.point,series: singleSeries};
				comp.drilldownsAdded++;
				if(comp.drilldownsAdded===event.points.length) {
					var order = [];
					for(let series of event.target.series) {
						order.push(series.name);
					}
					console.log(comp.series);
					for(let o of order) {
						chart.addSingleSeriesAsDrilldown(comp.series[o].point,comp.series[o].series.data[0]);
						chart.yAxis[0].addPlotLine({
						value: comp.series[o].series.data[0].average,
						color: 'red',
						width: 2,
						id: comp.series[o].series.data[0].name
						});
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
	check(event: any,chartid: string) {
		console.log(event);
	}
	update(event: any,chartid: string) {
		// console.log(JSON.stringify(filter));
		/*this.chartDataService.getCharts(filter).subscribe((data) => {
		
		});*/
		this.chartlist[chartid]._chart.showLoading();
		setTimeout(()=> {
			this.chartlist[chartid]._chart.hideLoading();
		},200);

	}
	division = [{name: "India", type: "Country"},
				 {name: "East", type: "Zone"},	
				 {name: "Assam", type: "State"},
				 {name: "Ex.guwahati", type: "City"},
				 {name: "GUW", type: "DC"}]
	selection(event,chartid: string) {
		if(!event){
			this.chartlist[chartid]._mon = null;
			this.chartlist[chartid]._eDate = null;
			this.chartlist[chartid]._sDate = null;
			this.chartlist[chartid]._maxDate = null;
			// this.getChart(chartid,"Selection");
		}
		switch((event && event.id))
		{
			case 1:
				this.chartlist[chartid]._sDate = null;
				this.chartlist[chartid]._eDate = null;
				this.chartlist[chartid]._maxDate = null;
				break;
			case 2:
				this.chartlist[chartid]._mon = null;
				break;
		}
	}
	setGlobalMaxDate() {
		this.MAX_DATE = new Date();
	}
	setMaxDate(chartid: string) {
		var temp_date = this.chartlist[chartid]._sDate;
		var temp2 = new Date();
		var temp = new Date(temp_date);
		temp.setDate(temp.getDate() + 31);
		this.chartlist[chartid]._maxDate = (temp>temp2)?temp2:temp;
	}
	
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
				type: 'category',
				labels: {
					style: { "color": "#003300", "textDecoration": "!none","text-transform": "uppercase" }
				}
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
		// conf. = (chartid==='delivery-time') ? {title: {text: 'Time (Mins)'},labels: {format: '{value} Min'}} : {text: 'Count'};
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
					this.chartlist[id]._chart.yAxis[0].addPlotLine({
						value: series.data[i].average,
						color: 'red',
						width: 2,
						id: series.data[i].name
					});
				}
			},
			(err) => {
				alert(err);
			});
	}
	
	ngOnInit() {
		this.drilldownsAdded = 0;
		this.MAX_DATE = new Date();
		this.getPHChart("delivery-time");
		this.getPHChart('order-stats');
	}
}
