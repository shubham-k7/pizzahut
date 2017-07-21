import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trackme.routing';

import { GMapModule } from 'primeng/primeng';
import { TrackMe } from './trackme.component';
import { BikerService } from './biker.service';
import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    routing,
    MdCardModule,
    GMapModule,
  ],
  declarations: [
    TrackMe
  ],
  providers: [BikerService]
})
export class TrackMeModule {}
