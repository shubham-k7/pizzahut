declare var comp: any;
export const conf = {
	chart: {
		name: 'delivery-time',
		type: 'column',
		renderTo: 'delivery-time',
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
					console.log(e);
					var chartid = this.pointer.options.chart.name;
					console.log(comp);
					comp.getChartDataPH(e, chartid);
				}
			},
			drillupall: function(e) {
				this.hideData();
				let temp = this.options.chart.name.split('-'),
					kpi_name = temp[0],
					chartid = temp[1];
				comp.kpilist[kpi_name][this.options.chart.name]._drilldowns.pop();
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
		enabled: true
	},
	plotOptions: {
		series: {
			borderWidth: 0,
			dataLabels: {
				enabled: true,
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
				maxWidth: 1000
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
}
