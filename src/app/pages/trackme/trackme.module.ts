import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trackme.routing';
import { AgmCoreModule } from '@agm/core';
import { NgaModule } from '../../theme/nga.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTables,StatusViewComponent } from '../dashboard/smartTables/smartTables.component';
import { SmartTablesService } from '../dashboard/smartTables/smartTables.service';
import { TrackMe } from './trackme.component';
import { BikerInOutService } from './biker-in-out.service';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
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
    TrackMe,
    SmartTables,
    StatusViewComponent
  ],
  providers: [BikerInOutService,SmartTablesService]
})
export class TrackMeModule {}
