import { Routes, RouterModule } from '@angular/router';

import { BikersComponent } from './bikers.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: BikersComponent
  }
];

export const routing = RouterModule.forChild(routes);
