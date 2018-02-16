import {
  Directive, ElementRef, HostListener, HostBinding,
  EventEmitter, Input, Output, AfterContentInit, OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/bufferCount';

import { Viewport, Direction } from './shared';
import * as eventData from './shared/event-data';
import * as classes from './shared/classes';

/**
 * A simple lightweight library for Angular with no other dependencies
 * that detects scroll direction and adds a `sn-scrolling-up` or
 * `sn-scrolling-down` class to the element. The library can also detect when
 * the user has scrolled passed the element and apply a `sn-affix` class.
 * Useful for make a element sticky when the user has scrolled beyond it.
 * This library can will also apply `sn-minimise` class after the user has
 * scrolled beyond the height of the element.
 *
 * @example
 * ```
 * <p snScrollCollapse>Amet tempor excepteur occaecat nulla.</p>
 * ```
 *
 * @export
 * @class ScrollCollapseDirective
 */
@Directive({
  selector: '[scrollCollapse], [snScrollCollapse]'
})
export class ScrollCollapseDirective implements AfterContentInit, OnDestroy {
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
   * Observable that returns the size of the viewport
   *
   * @type {Subject<Viewport>}
   * @memberof ScrollCollapseDirective
   */
  public viewport$ = new Subject<Viewport>();
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
   * @default 100
   * @memberof ScrollCollapseDirective
   */
  @Input()
  public debounce = 100;
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
   * @memberof ScrollCollapseDirective
   */
  constructor(private el: ElementRef) { }
  /**
   * Subscribe to `viewport$` observable which
   * will call event handler
   *
   * @memberof ScrollCollapseDirective
   */
  public ngAfterContentInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    this.originalTop = el.offsetTop;
    this.originalHeight = el.offsetHeight;
    this.viewport$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(this.debounce)
      .bufferCount(2, 1)
      .subscribe((events: Viewport[]) => {
        this.calculateScrollDirection(events);
        this.calculateMinimiseMode(events[1]);
        this.calculateAffixMode(events[1]);
      });
  }
  /**
   * On window scroll/resize/load events
   * emit next `viewport$` observable value
   *
   * @param {number} height
   * @param {number} width
   * @param {number} scrollY
   * @param {number} scrollX
   * @memberof ScrollCollapseDirective
   */
  @HostListener(eventData.eventLoad, eventData.eventPathLoadScroll)
  @HostListener(eventData.eventScroll, eventData.eventPathLoadScroll)
  @HostListener(eventData.eventResize, eventData.eventPathResize)
  public eventHandler(
    height: number,
    width: number,
    scrollY: number,
    scrollX: number
  ): void {
    const viewport: Viewport = { height, width, scrollY, scrollX };
    this.viewport$.next(viewport);
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
