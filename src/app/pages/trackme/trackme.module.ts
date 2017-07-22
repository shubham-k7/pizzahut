import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trackme.routing';
import { AgmCoreModule } from '@agm/core';


import { TrackMe } from './trackme.component';
import { BikerInOutService } from './biker-in-out.service';
import { BikerMapService } from './biker-map.service';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    routing,
    MdCardModule,
    AgmCoreModule
  ],
  declarations: [
    TrackMe
  ],
  providers: [BikerInOutService,BikerMapService]
})
export class TrackMeModule {}
