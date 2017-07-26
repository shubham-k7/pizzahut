// -----Angular Imports-----
import { NgModule,Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
// -----Component Imports-----
import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';
// -----Highcharts Imports-----
import { ChartModule} from 'angular2-highcharts';
import { ChartComponent} from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
declare var require: any;
export function highchartsFactory() {
    const hc = require('highcharts');
    const hcm = require('highcharts/highcharts-more');
    const dd = require('highcharts/modules/drilldown');
    const hce = require('highcharts/modules/exporting');
    const hced = require('highcharts/modules/export-data.src');
    hcm(hc);
    dd(hc);
    hce(hc);
    hced(hc);
    return hc;
}
// -----Provider Imports-----
import { ChartDataService } from './chart-data.service';
// -----Applet Imports-----
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
import { Md2Module } from 'md2';
// -----GoogleMap Imports-----
import { NguiMapModule } from '@ngui/map';
import { OrderOnMapService } from './order-on-map.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    ChartModule,
    MdSelectModule,
    MdInputModule,
    Md2Module,
    MdCardModule,
    NguiMapModule
  ],
  declarations: [
    Dashboard
  ],
  providers: [
    ChartDataService,
    OrderOnMapService
    // CalendarService,
    // FeedService,
    // LineChartService,
    // PieChartService,
    // TodoService,
    // TrafficChartService,
    // UsersMapService
  ]
})
export class DashboardModule {}
