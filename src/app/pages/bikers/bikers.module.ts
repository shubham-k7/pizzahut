import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './bikers.routing';
import { AgmCoreModule } from '@agm/core';


import { BikersComponent } from './bikers.component';
import { BikerMapService } from './biker-map.service';
import { NguiMapModule } from '@ngui/map';
import { OrderOnMapService } from '../dashboard/order-on-map.service';

import { MdSelectModule,MdInputModule,MdCardModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    routing,
    MdCardModule,
    AgmCoreModule,
    NguiMapModule
  ],
  declarations: [
    BikersComponent
  ],
  providers: [
               BikerMapService,
               OrderOnMapService
               ]
})
export class BikersModule {}
  