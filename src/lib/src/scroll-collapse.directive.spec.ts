import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, SimpleChanges } from '@angular/core';
import { ScrollCollapseDirective } from './scroll-collapse.directive';

describe('ScrollCollapseDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: ScrollCollapseDirective;

  beforeEach(() => {
    node = document.createElement('p');
    el = new ElementRef(node);
    directive = new ScrollCollapseDirective(el);
    directive.ngOnInit();
  });

  describe('element in viewport', () => {
    it('should return true for `isScrollCollapse` property', () => {
      expect(directive).toBeTruthy();
    });
    });
  });

});
