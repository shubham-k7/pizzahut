import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing }       from './trackme.routing';

import { GMapModule } from 'primeng/primeng';
import { TrackMe } from './trackme.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GMapModule
  ],
  declarations: [
    TrackMe
  ]
})
export class TrackMeModule {}
