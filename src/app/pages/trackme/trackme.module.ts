import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trackme.routing';
import { AgmCoreModule } from '@agm/core';
import { NgaModule } from '../../theme/nga.module';

import { TrackMe } from './trackme.component';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
import { NguiMapModule } from '@ngui/map';
import { TrackMeService } from './trackme.service';
import { OrderTrackMeService } from './order-trackme.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    MdCardModule,
    AgmCoreModule,
    NguiMapModule
  ],
  entryComponents: [],
  declarations: [
    TrackMe,
  ],
  providers: [TrackMeService,OrderTrackMeService]
})
export class TrackMeModule {}
