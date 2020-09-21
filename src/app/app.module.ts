import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ApiComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HttpClientJsonpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
