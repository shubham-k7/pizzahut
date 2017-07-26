import { Routes, RouterModule }  from '@angular/router';

import { StoreViewComponent } from './store-view.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: StoreViewComponent
  }
];

export const routing = RouterModule.forChild(routes);
