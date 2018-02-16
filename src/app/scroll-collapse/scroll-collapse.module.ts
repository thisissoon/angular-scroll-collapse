import { NgModule } from '@angular/core';

import { ScrollCollapseDirective } from './scroll-collapse.directive';

/**
 * A simple lightweight library for with no other dependencies
 * that detects scroll direction and adds a 'sn-scrolling-up' or
 * 'sn-scrolling-down' class to the element. The library can also detect
 * when the user has scrolled passed the element and apply a 'sn-affix'
 * class. Useful for make a element sticky when the user has scrolled
 * beyond it. This library can will also apply 'sn-minimise' class after
 * the user has scrolled beyond the height of the element
 *
 * @export
 * @class ScrollCollapseModule
 */
@NgModule({
  declarations: [ScrollCollapseDirective],
  exports: [ScrollCollapseDirective]
})
export class ScrollCollapseModule { }
