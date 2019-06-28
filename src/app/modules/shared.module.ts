import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { WidgetsModule } from './widgets.module';
import { AuthService } from '../services/auth.service';
import { TokenInterceptor, ErrorInterceptor } from '../interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WidgetsModule
  ],
  exports: [
    WidgetsModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
}) export class SharedModule { };
