import { Routes, RouterModule } from '@angular/router';

import { TrackMe } from './trackme.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TrackMe
  }
];

export const routing = RouterModule.forChild(routes);
