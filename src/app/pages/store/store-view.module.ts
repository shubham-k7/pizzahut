import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './store-view.routing';
import { AgmCoreModule } from '@agm/core';
import { NgaModule } from '../../theme/nga.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTables,StatusViewComponent } from '../dashboard/smartTables/smartTables.component';
import { SmartTablesService } from '../dashboard/smartTables/smartTables.service';
import { StoreViewComponent } from './store-view.component';
import { BikerInOutService } from './biker-in-out.service';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    MdCardModule,
    AgmCoreModule,
    Ng2SmartTableModule
  ],
  entryComponents: [StatusViewComponent],
  declarations: [
    StoreViewComponent,
    SmartTables,
    StatusViewComponent,
    PieChart
  ],
  providers: [BikerInOutService,SmartTablesService,PieChartService]
})
export class StoreViewModule {}
