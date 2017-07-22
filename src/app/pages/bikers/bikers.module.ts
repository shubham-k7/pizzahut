import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './bikers.routing';
import { AgmCoreModule } from '@agm/core';


import { BikersComponent } from './bikers.component';
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
    BikersComponent
  ],
  providers: [BikerMapService]
})
export class BikersModule {}
