import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { AuthGuard } from './login/auth.guard';

import { AgmCoreModule } from '@agm/core';
import { NguiMapModule } from '@ngui/map';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzpgH7DwowdnmBLbST7MgN5JqerU7oB8w'
    }),
    NguiMapModule.forRoot({apiUrl: 
      'https://maps.google.com/maps/api/js?key=AIzaSyAzpgH7DwowdnmBLbST7MgN5JqerU7oB8w&libraries=visualization'})
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,AuthGuard
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
