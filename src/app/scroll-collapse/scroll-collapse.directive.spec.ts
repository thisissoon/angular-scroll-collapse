import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, SimpleChanges } from '@angular/core';
import { WindowRef } from '@thisissoon/angular-inviewport';

import { ScrollCollapseDirective } from './scroll-collapse.directive';
import { Direction } from './shared/direction.enum';

describe('ScrollCollapseDirective', () => {
  let node: HTMLElement;
  let el: ElementRef;
  let directive: ScrollCollapseDirective;
  let ngZone;
  let windowRef;

  beforeEach(() => {
    node = document.createElement('p');
    el = new ElementRef(node);
    ngZone = {
      run: jasmine.createSpy('run').and.callFake(fn => fn()),
      runOutsideAngular: jasmine
        .createSpy('runOutsideAngular')
        .and.callFake(fn => fn())
    };
    windowRef = {
      triggerEvent: null,
      scrollX: 0,
      scrollY: 0,
      innerWidth: 1366,
      innerHeight: 768,
      addEventListener: (name, fn) => (windowRef.triggerEvent = fn),
      removeEventListener: () => null
    };
    directive = new ScrollCollapseDirective(el, ngZone, windowRef);
    directive.ngAfterViewInit();
  });

  describe('scroll event', () => {
    it(
      'should call event handler',
      fakeAsync(() => {
        const spy = spyOn(directive, 'onScrollOrResizeEvent').and.callThrough();
        const events = [
          { scrollX: 0, scrollY: 0, width: 1366, height: 768 },
          { scrollX: 0, scrollY: 50, width: 1366, height: 768 }
        ];
        directive.debounce = 100;
        directive.ngAfterViewInit();
        windowRef.triggerEvent();
        tick(50);
        expect(spy).not.toHaveBeenCalled();
        windowRef.scrollY = 50;
        windowRef.triggerEvent();
        tick(100);
        expect(spy).toHaveBeenCalledWith(events);
        expect(directive.isScrollingUp).toBeFalsy();
        expect(directive.isScrollingDown).toBeTruthy();

        windowRef.scrollY = 0;
        windowRef.triggerEvent();
        tick(100);
        expect(spy.calls.mostRecent().args).toEqual([events.reverse()]);
        expect(directive.isScrollingUp).toBeTruthy();
        expect(directive.isScrollingDown).toBeFalsy();
      })
    );

    it('should remove event handler on destroy', () => {
      const spy = spyOn(directive, 'onScrollOrResizeEvent').and.callThrough();
      directive.ngOnDestroy();
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
    it('should not reassign scroll direction if no scroll change', () => {
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 200, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 100, width: 1266, height: 768 }
      ]);
      expect(directive.isScrollingUp).toBeTruthy();
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 100, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 100, width: 1366, height: 768 }
      ]);
      expect(directive.isScrollingUp).toBeTruthy();

      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 100, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 200, width: 1266, height: 768 }
      ]);
      expect(directive.isScrollingDown).toBeTruthy();
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 200, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 200, width: 1366, height: 768 }
      ]);
      expect(directive.isScrollingDown).toBeTruthy();
    });
    it('should emit scroll direction event on scroll', () => {
      const spy = spyOn(directive.scrollDirectionChange, 'emit');
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 0, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 100, width: 1266, height: 768 }
      ]);
      expect(spy).toHaveBeenCalledWith(Direction.DOWN);
      spy.calls.reset();
      directive.calculateScrollDirection([
        { scrollX: 0, scrollY: 100, width: 1266, height: 768 },
        { scrollX: 0, scrollY: 0, width: 1266, height: 768 }
      ]);
      expect(spy).toHaveBeenCalledWith(Direction.UP);
    });
  });

  describe('minimise mode', () => {
    it('should calculate minimise mode and emit event', () => {
      const spy = spyOn(directive.minimiseChange, 'emit');
      directive.originalHeight = 100;

      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 0,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeFalsy();
      expect(spy).toHaveBeenCalledWith(false);
      spy.calls.reset();

      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 200,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(true);
      spy.calls.reset();

      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 99,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeFalsy();
      expect(spy).toHaveBeenCalledWith(false);
    });

    it('should factor in element offsetTop when calculating minimise mode', () => {
      directive.originalHeight = 100;
      directive.originalTop = 100;
      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 0,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeFalsy();

      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 200,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeTruthy();

      directive.calculateMinimiseMode({
        scrollX: 0,
        scrollY: 199,
        width: 1366,
        height: 768
      });
      expect(directive.minimiseMode).toBeFalsy();
    });
  });

  describe('affix mode', () => {
    it('should calculate affix mode and emit event', () => {
      const spy = spyOn(directive.affixChange, 'emit');
      directive.originalTop = 100;

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 0,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeFalsy();
      expect(spy).toHaveBeenCalledWith(false);
      spy.calls.reset();

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 200,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(true);
      spy.calls.reset();

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 99,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeFalsy();
      expect(spy).toHaveBeenCalledWith(false);
    });

    it('should factor in yOffset property when calculating affix mode', () => {
      directive.originalHeight = 100;
      directive.originalTop = 500;
      directive.yOffset = 200;
      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 0,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeFalsy();

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 200,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeFalsy();

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 300,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeTruthy();

      directive.calculateAffixMode({
        scrollX: 0,
        scrollY: 299,
        width: 1366,
        height: 768
      });
      expect(directive.affixMode).toBeFalsy();
    });
  });
});
