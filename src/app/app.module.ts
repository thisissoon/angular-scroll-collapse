import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { ScrollCollapseModule } from './scroll-collapse';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, InViewportModule, ScrollCollapseModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
