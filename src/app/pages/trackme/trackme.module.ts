import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trackme.routing';

import { GMapModule } from 'primeng/primeng';
import { TrackMe } from './trackme.component';
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
  ]
})
export class TrackMeModule {}
