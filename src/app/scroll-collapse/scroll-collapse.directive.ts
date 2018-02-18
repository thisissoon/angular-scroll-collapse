import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {
  debounceTime,
  takeUntil,
  bufferCount,
  map,
  startWith
} from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { WindowRef } from '@thisissoon/angular-inviewport';

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
 * ```
 * <p snScrollCollapse [debounce]="0">Amet tempor excepteur occaecat nulla.</p>
 * ```
 *
 * @export
 * @class ScrollCollapseDirective
 */
@Directive({
  selector: '[snScrollCollapse]'
})
export class ScrollCollapseDirective implements AfterViewInit, OnDestroy {
  /**
   * The last scroll direction
   *
   * @private
   * @type {Direction}
   * @memberof ScrollCollapseDirective
   */
  private scrollDirection: Direction;
  /**
   * Original offsetTop of element
   *
   * @type {number}
   * @memberof ScrollCollapseDirective
   */
  public originalTop: number;
  /**
   * Original offsetHeight of element
   *
   * @type {number}
   * @memberof ScrollCollapseDirective
   */
  public originalHeight: number;
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   *
   * @type {Subject<void>}
   * @memberof ScrollCollapseDirective
   */
  private ngUnsubscribe$ = new Subject<void>();
  /**
   * Amount of time in ms to wait for other scroll events
   * before running event handler
   *
   * @type {number}
   * @default 0
   * @memberof ScrollCollapseDirective
   */
  @Input()
  public debounce = 0;
  /**
   * Returns true if last scroll direction is UP
   *
   * @readonly
   * @type {boolean}
   * @memberof ScrollCollapseDirective
   */
  @HostBinding(classes.directionUpClass)
  public get isScrollingUp(): boolean {
    return this.scrollDirection === Direction.UP;
  }
  /**
   * Returns true if last scroll direction is DOWN
   *
   * @readonly
   * @type {boolean}
   * @memberof ScrollCollapseDirective
   */
  @HostBinding(classes.directionDownClass)
  public get isScrollingDown(): boolean {
    return this.scrollDirection === Direction.DOWN;
  }
  /**
   * Returns true if the user has scrolled pass the original `offsetTop`
   * position of the element.
   *
   * @type {boolean}
   * @memberof ScrollCollapseDirective
   */
  @HostBinding(classes.affixClass)
  public affixMode = false;
  /**
   * Returns true if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   *
   * @type {boolean}
   * @memberof ScrollCollapseDirective
   */
  @HostBinding(classes.minimiseClass)
  public minimiseMode = false;
  /**
   * Creates an instance of ScrollCollapseDirective.
   * @param {ElementRef} el
   * @param {NgZone} ngZone
   * @memberof ScrollCollapseDirective
   */
  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private windowRef: WindowRef
  ) { }
  /**
   * Subscribe to window resize events as an observable
   * will calculate directive values
   *
   * @memberof ScrollCollapseDirective
   */
  public ngAfterViewInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    this.originalTop = el.offsetTop;
    this.originalHeight = el.offsetHeight;

    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent(this.windowRef as any, eventData.eventScroll),
        fromEvent(this.windowRef as any, eventData.eventResize)
      )
        .pipe(
          debounceTime(this.debounce),
          map(() => this.getViewport()),
          startWith(this.getViewport()),
          bufferCount(2, 1),
          takeUntil(this.ngUnsubscribe$)
        )
        .subscribe((events: Viewport[]) =>
          this.ngZone.run(() => this.onScrollOrResizeEvent(events))
        );
    });
  }
  /**
   * Event handler for scroll and resize events
   * Calculates values scroll direction, affix and
   * minimise properties
   *
   * @param {Viewport[]} events
   * @memberof ScrollCollapseDirective
   */
  public onScrollOrResizeEvent(events: Viewport[]): void {
    const previousEvent = events[0];
    const currentEvent = events[1];
    this.calculateScrollDirection(events);
    this.calculateMinimiseMode(currentEvent);
    this.calculateAffixMode(currentEvent);
  }
  /**
   * Calculate last scroll direction by comparing y scroll position
   * of last two values of `viewport$` observable
   *
   * @param {Viewport[]} events
   * @memberof ScrollCollapseDirective
   */
  public calculateScrollDirection(events: Viewport[]): void {
    const pastEvent = events[0];
    const currentEvent = events[1];
    this.scrollDirection = (pastEvent.scrollY > currentEvent.scrollY) ?
      Direction.UP : Direction.DOWN;
  }
  /**
   * Calculate if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   *
   * @param {Viewport} viewport
   * @memberof ScrollCollapseDirective
   */
  public calculateMinimiseMode(viewport: Viewport): void {
    this.minimiseMode = viewport.scrollY > this.originalHeight;
  }
  /**
   * Calculate if the user has scrolled pass the origin height of
   * the element assuming the element is fixed at the top of the page
   *
   * @param {Viewport} viewport
   * @memberof ScrollCollapseDirective
   */
  public calculateAffixMode(viewport: Viewport): void {
    this.affixMode = viewport.scrollY > this.originalTop;
  }
  /**
   * Return current viewport values
   *
   * @returns {Viewport}
   * @memberof ScrollCollapseDirective
   */
  public getViewport(): Viewport {
    return {
      height: this.windowRef.innerHeight,
      width: this.windowRef.innerWidth,
      scrollY: this.windowRef.scrollY,
      scrollX: this.windowRef.scrollX
    };
  }
  /**
   * trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   *
   * @memberof ScrollCollapseDirective
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
