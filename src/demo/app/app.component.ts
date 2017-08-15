import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  highlight = false;

  onScrollCollapseChange(scrollCollapse: boolean) {
    this.highlight = scrollCollapse;
  }
}
