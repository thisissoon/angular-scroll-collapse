import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import {
  debounceTime,
  takeUntil,
  bufferCount,
  map,
  startWith,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { WINDOW } from '@thisissoon/angular-inviewport';

import { Viewport, Direction } from './shared';
import * as eventData from './shared/event-data';
import * as classes from './shared/classes';

/**
 * A simple lightweight library for Angular that detects scroll direction
 * and adds a `sn-scrolling-up` or `sn-scrolling-down` class to the element.
 * The library can also detect when the user has scrolled passed the element
 * and apply a `sn-affix` class. Useful for make a element sticky when the
 * user has scrolled beyond it. This library can will also apply `sn-minimise`
 * class after the user has scrolled beyond the height of the element.
 *
 * @example
 * ```html
 * <p snScrollCollapse [debounce]="0">Amet tempor excepteur occaecat nulla.</p>
 * ```
 * @dynamic
 */
@Directive({
  selector: '[snScrollCollapse]',
})
export class ScrollCollapseDirective implements AfterViewInit, OnDestroy {
  /**
   * The last scroll direction
   */
  scrollDirection: Direction;
  /**
   * Emits scroll direction on scroll or window resize.
   */
  @Output()
  scrollDirectionChange = new EventEmitter<Direction>();
  /**
   * Original offsetTop of element
   */
  originalTop = 0;
  /**
   * Original offsetHeight of element
   */
  originalHeight: number;
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   */
  private ngUnsubscribe$ = new Subject<void>();
  /**
   * Amount of time in ms to wait for other scroll events
   * before running event handler
   */
  @Input()
  debounce = 0;
  /**
   * Number of pixels before the elements originalTop
   * position is scroll to that the sn-affix class will be applied.
   * This value will need to take into account elements which become
   * fixed above this element while scrolling as they reduce
   * the height of the document and the pageYOffset number.
   */
  @Input()
  yOffset = 0;
  /**
   * Returns true if last scroll direction is UP
   */
  @HostBinding(classes.directionUpClass)
  get isScrollingUp(): boolean {
    return this.scrollDirection === Direction.UP;
  }
  /**
   * Returns true if last scroll direction is DOWN
   */
  @HostBinding(classes.directionDownClass)
  get isScrollingDown(): boolean {
    return this.scrollDirection === Direction.DOWN;
  }
  /**
   * Returns true if the user has scrolled pass the original `offsetTop`
   * position of the element.
   */
  @HostBinding(classes.affixClass)
  affixMode = false;
  /**
   * Emits affix boolean on scroll or window resize.
   */
  @Output()
  affixChange = new EventEmitter<Boolean>();
  /**
   * Returns true if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   */
  @HostBinding(classes.minimiseClass)
  minimiseMode = false;
  /**
   * Emits affix boolean on scroll or window resize.
   */
  @Output()
  minimiseChange = new EventEmitter<Boolean>();
  /**
   * Creates an instance of ScrollCollapseDirect
   */
  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window,
  ) {}
  /**
   * Subscribe to window resize events as an observable
   * will calculate directive values
   */
  ngAfterViewInit() {
    this.getOriginalTopAndHeight();
    const resizeSubject = fromEvent(this.window, eventData.eventResize);
    const scrollSubject = fromEvent(this.window, eventData.eventScroll);
    this.ngZone.runOutsideAngular(() => {
      scrollSubject
        .pipe(
          startWith(null),
          map(() => this.getViewport()),
          bufferCount(2, 1),
          distinctUntilChanged(),
          // Do not apply debounce operator if debounce is set to 0
          this.debounce ? debounceTime(this.debounce) : tap(),
          takeUntil(this.ngUnsubscribe$),
        )
        .subscribe((events: Viewport[]) =>
          this.ngZone.run(() => this.onScrollEvent(events)),
        );

      resizeSubject
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          this.debounce ? debounceTime(this.debounce) : tap(),
        )
        .subscribe(() => this.ngZone.run(() => this.onResizeEvent()));
    });
  }
  /**
   * trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  /**
   * Get original element position and height to base
   * other calculations from.
   */
  getOriginalTopAndHeight() {
    const el: HTMLElement = this.el.nativeElement;
    // Check if `getBoundingClientRect` is a function in case running
    // in an platform without the DOM
    if (typeof el.getBoundingClientRect === 'function') {
      const elBounds = el.getBoundingClientRect();
      this.originalTop = elBounds.top + this.window.pageYOffset;
    }
    this.originalHeight = el.offsetHeight;
  }
  /**
   * Event handler for scroll events
   * Calculates values scroll direction, affix and
   * minimise properties
   */
  onScrollEvent([previousEvent, currentEvent]: Viewport[]) {
    this.calculateScrollDirection([previousEvent, currentEvent]);
    this.calculateMinimiseMode(currentEvent);
    this.calculateAffixMode(currentEvent);
    this.cdRef.detectChanges();
  }
  /**
   * Remove minimise, affix and scrolling states and recalulate
   * element offsetTop and offsetHeight
   */
  onResizeEvent() {
    const scrollDirection = this.scrollDirection;
    const affixMode = this.affixMode;
    const minimiseMode = this.minimiseMode;
    this.affixMode = false;
    this.minimiseMode = false;
    this.scrollDirection = null;
    this.cdRef.detectChanges();
    this.getOriginalTopAndHeight();
    this.scrollDirection = scrollDirection;
    this.affixMode = affixMode;
    this.minimiseMode = minimiseMode;
  }
  /**
   * Calculate last scroll direction by comparing y scroll position
   * of last two values of `viewport$` observable
   */
  calculateScrollDirection(events: Viewport[]) {
    const pastEvent = events[0];
    const currentEvent = events[1];
    const noScrollChange = pastEvent.pageYOffset === currentEvent.pageYOffset;
    if (noScrollChange) {
      return;
    }
    const newScrollDirection =
      pastEvent.pageYOffset > currentEvent.pageYOffset
        ? Direction.UP
        : Direction.DOWN;
    if (this.scrollDirection !== newScrollDirection) {
      this.scrollDirection = newScrollDirection;
      this.scrollDirectionChange.emit(this.scrollDirection);
    }
  }
  /**
   * Calculate if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   */
  calculateMinimiseMode(viewport: Viewport) {
    const newMinimiseMode =
      viewport.pageYOffset >= this.originalHeight + this.originalTop;
    if (this.minimiseMode !== newMinimiseMode) {
      this.minimiseMode = newMinimiseMode;
      this.minimiseChange.emit(this.minimiseMode);
    }
  }
  /**
   * Calculate if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   */
  calculateAffixMode(viewport: Viewport) {
    const newAffixMode =
      viewport.pageYOffset >= this.originalTop - this.yOffset;
    if (this.affixMode !== newAffixMode) {
      this.affixMode = newAffixMode;
      this.affixChange.emit(this.affixMode);
    }
  }
  /**
   * Return current viewport values
   */
  getViewport(): Viewport {
    return {
      height: this.window.innerHeight,
      width: this.window.innerWidth,
      pageYOffset: this.window.pageYOffset,
      pageXOffset: this.window.pageXOffset,
    };
  }
}
