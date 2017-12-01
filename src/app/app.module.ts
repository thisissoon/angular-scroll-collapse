import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrollCollapseModule } from './scroll-collapse';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScrollCollapseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
