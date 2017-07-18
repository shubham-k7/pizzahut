import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { AgmCoreModule } from '@agm/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTables } from './smartTables';
import { SmartTablesService } from './smartTables/smartTables.service';
// import { ChartsComponent } from './charts/charts.component';

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
import { ChartDataService } from './charts/chart-data.service';
import { ChartFilterService } from './charts/chart-filter.service';
// -----Applet Imports-----
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
// import { DataListModule } from 'primeng/components/datalist/datalist';
import { GrowlModule } from 'primeng/components/growl/growl';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
import { Md2Module } from 'md2';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    ChartModule,
    AutoCompleteModule,
    GrowlModule,
    MdSelectModule,
    MdInputModule,
    Md2Module,
    MdCardModule,
    Ng2PageScrollModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzpgH7DwowdnmBLbST7MgN5JqerU7oB8w'
    })
  ],
  declarations: [
    Dashboard,
    SmartTables
  ],
  providers: [
    SmartTablesService,
    ChartDataService,
    ChartFilterService,
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
