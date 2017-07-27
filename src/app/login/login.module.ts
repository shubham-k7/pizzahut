import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { Login } from './login.component';
import { routing } from './login.routing';

import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { MdProgressSpinnerModule,MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    MdProgressSpinnerModule,
    MdSnackBarModule
  ],
  declarations: [
    Login
  ],
  providers: [AuthenticationService,AuthGuard]
})
export class LoginModule {}
