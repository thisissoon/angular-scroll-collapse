import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollCollapseModule } from '@thisissoon/angular-scroll-collapse';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [BrowserModule, ScrollCollapseModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
