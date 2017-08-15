import {
  Directive, ElementRef, HostListener, HostBinding,
  EventEmitter, Input, Output, OnInit, OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/bufferCount';

import { Viewport } from './viewport.interface';
import { Direction } from './direction.enum';
import * as eventData from './event-data';
import * as classes from './classes';

/**
 * A simple lightweight library for Angular 2/4+ with no other dependencies
 * that detects scroll direction and adds a `sn-scrolling-up` or
 * `sn-scrolling-down` class to the element. The library can also detect when
 * the user has scrolled passed the element and apply a `sn-affix` class.
 * Useful for make a element sticky when the user has scrolled beyond it. This
 * library can will also apply `sn-minimize` class after the user has scrolled
 * beyond the height of the element.
 *
 * @example
 * ```
 * <p scrollCollapse>Amet tempor excepteur occaecat nulla.</p>
 * ```
 *
 * @export
 * @class ScrollCollapseDirective
 */
@Directive({
  selector: '[scrollCollapse]'
})
export class ScrollCollapseDirective implements OnInit, OnDestroy {
  /**
   * The last scroll direction
   *
   * @private
   * @type {Direction}
   * @memberof ScrollCollapseDirective
   */
  private scrollDirection: Direction;
  /**
   * Observable that returns the size of the viewport
   *
   * @private
   * @type {Subject<Viewport>}
   * @memberof ScrollCollapseDirective
   */
  private viewport$ = new Subject<Viewport>();
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
  public ngOnInit(): void {
    this.viewport$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(this.debounce)
      .bufferCount(2, 1)
      .subscribe((events: Viewport[]) => this.calculateScrollDirection(events));
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
   * Calculate scrollCollapse status and emit event
   * when viewport status has changed
   *
   * @param {Viewport} viewport
   * @memberof ScrollCollapseDirective
   */
  public calculateScrollDirection(events: Viewport[]): void {
    const pastEvent = events[0];
    const currentEvent = events[1];
    this.scrollDirection = (pastEvent.scrollY > currentEvent.scrollY) ?
      Direction.UP : Direction.DOWN;
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
