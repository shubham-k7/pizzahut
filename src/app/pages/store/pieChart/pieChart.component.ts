import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';
import { colorHelper } from '../../../theme/theme.constants';
import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: Array<Object>;
  private _init = false;
  basic: any;

  constructor(private _pieChartService: PieChartService) {
    this.basic = {
      default: '#ffffff',
      defaultText: '#ffffff',
      border: '#dddddd',
      borderDark: '#aaaaaa',
    };
    //this._init = false;
  }

  ngAfterViewInit() {
     this._pieChartService.getData().subscribe(res => {
        this.charts=[];
      for(let chart of res) {
          let shallowCopy = {...chart,color: 'white'};
            this.charts.push({...chart,color: 'white'});
          }
      // if (!this._init) {
        this._loadPieCharts();
        this._updatePieCharts();
        this._init = true;
    });
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };
    jQuery('.pie-charts .chart').each(function(index, chart) {
      console.log();
      jQuery(chart).data('easyPieChart').update(24);
    });
  }
}
