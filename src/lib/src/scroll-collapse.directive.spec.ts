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
    directive.ngAfterContentInit();
  });

  describe('scroll event', () => {
    it('should emit event value', fakeAsync(() => {
      let spy = spyOn(directive.viewport$, 'next').and.callThrough();
      directive.eventHandler(768, 1366, 0, 0);
      tick(100);
      directive.eventHandler(768, 1366, 200, 0);
      tick(100);
      expect(spy).toHaveBeenCalledWith({
        width: 1366,
        height: 768,
        scrollY: 200,
        scrollX: 0
      });
      expect(directive.isScrollingUp).toBeFalsy();
      expect(directive.isScrollingDown).toBeTruthy();
    }));

    it('should remove event handler on destroy', () => {
      let spy = spyOn(directive, 'calculateScrollDirection');
      directive.ngOnDestroy();
      directive.eventHandler(768, 1366, 200, 0);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('scroll direction', () => {
    it('should calculate scroll direction', () => {
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 0, width: 1366, height: 768 },
        { scrollX: 0, scrollY: 200, width: 1366, height: 768 }
      ]);
      expect(directive.isScrollingDown).toBeTruthy();

      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 200, width: 1366, height: 768 },
        { scrollX: 0, scrollY: 300, width: 1366, height: 768 }
      ]);
      expect(directive.isScrollingDown).toBeTruthy();

      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 200, width: 1366, height: 768 },
        { scrollX: 0, scrollY: 100, width: 1366, height: 768 }
      ]);
      expect(directive.isScrollingDown).toBeFalsy();
    });

  });

  describe('minimise mode', () => {
    it('should calculate minimise mode', () => {
      directive.originalHeight = 100;
      directive.calculateMinimiseMode({ scrollX: 0, scrollY: 0, width: 1366, height: 768 });
      expect(directive.minimiseMode).toBeFalsy();

      directive.calculateMinimiseMode({ scrollX: 0, scrollY: 200, width: 1366, height: 768 });
      expect(directive.minimiseMode).toBeTruthy();

      directive.calculateMinimiseMode({ scrollX: 0, scrollY: 99, width: 1366, height: 768 });
      expect(directive.minimiseMode).toBeFalsy();
    });
  });

  describe('affix mode', () => {
    it('should calculate affix mode', () => {
      directive.originalTop = 100;
      directive.calculateAffixMode({ scrollX: 0, scrollY: 0, width: 1366, height: 768 });
      expect(directive.affixMode).toBeFalsy();

      directive.calculateAffixMode({ scrollX: 0, scrollY: 200, width: 1366, height: 768 });
      expect(directive.affixMode).toBeTruthy();

      directive.calculateAffixMode({ scrollX: 0, scrollY: 99, width: 1366, height: 768 });
      expect(directive.affixMode).toBeFalsy();
    });
  });
});
