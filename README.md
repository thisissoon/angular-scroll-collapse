# Angular Scroll Collapse
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

A simple lightweight library for [Angular (2/4+)][angular] with no other dependencies that detects scroll direction and adds a `sn-scrolling-up` or `sn-scrolling-down` class to the element. The library can also detect when the user has scrolled passed the element and apply a `sn-affix` class. Useful for make a element sticky when the user has scrolled beyond it. This library can will also apply `sn-minimize` class after the user has scrolled beyond the height of the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


## Install

`npm i @thisissoon/angular-scroll-collapse --save`

`app.module.ts`
```ts
import { ScrollCollapseModule } from '@thisissoon/angular-scroll-collapse';

@NgModule({
  imports: [
    ScrollCollapseModule
  ]
})
export class AppModule { }
```


## Example

### Just using classes

```html
<p class="foo" scrollCollapse>Amet tempor excepteur occaecat nulla.</p>
```

```css
.foo {
  transition: transform .35s ease-out;
}

.foo.sn-viewport-out {
  transform: translateY(-30px);
}

.foo.sn-viewport-in {
  transform: translateY(0);
}
```

### Using events

```html
<p class="foo" scrollCollapse (onScrollCollapseChange)="onScrollCollapseChange($event)">
  Amet tempor excepteur occaecat nulla.
</p>
```

```ts
export class AppComponent {
  highlight = false;

  onScrollCollapseChange(scrollCollapse: boolean) {
    this.highlight = scrollCollapse;
  }
}
```

```css
.highlight {
  background-color: yellow;
}
```

### Specify debounce time (default: 100ms)

```html
<p class="foo" scrollCollapse [debounce]="500">
  Amet tempor excepteur occaecat nulla.
</p>
```

[travis-badge]: https://travis-ci.org/thisissoon/angular-scroll-collapse.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-scroll-collapse
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-scroll-collapse/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-scroll-collapse?branch=master
[angular]: https://angular.io/
