# Angular Scroll Collapse
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

A simple lightweight library for [Angular (2/4+)][angular] with no other dependencies that detects scroll direction and adds a `sn-scrolling-up` or `sn-scrolling-down` class to the element. The library can also detect when the user has scrolled passed the element and apply a `sn-affix` class. Useful for make a element sticky when the user has scrolled beyond it. This library can will also apply `sn-minimise` class after the user has scrolled beyond the height of the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


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


## Examples

### Scroll direction

```html
<nav class="foo" snScrollCollapse>
  ...
</nav>
```

```css
.foo {
  left: 0;
  height : 100px;
  position: fixed;
  right: 0;
  top: 0;
  transition: all .35s ease-in-out;
}

.foo.sn-scrolling-down {
  transform: translateY(-100px);
}

.foo.sn-scrolling-up {
  transform: translateY(0);
}
```

### Affix mode

In this scenario the nav element will have the class `sn-affix` added when the user scrolls past the header element and the nav is at the top of the viewport.

```html
<header>...</header>
<nav class="foo" snScrollCollapse>
  ...
</nav>
```

```css
.foo.sn-affix {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}
```


### Minimise mode

In this scenario the nav element will have the class `sn-minimise` added when the user scrolls 100px (the original height of the element) down the page.

```html
<header class="foo" snScrollCollapse>
  ...
</header>
```

```css
.foo {
  left: 0;
  height: 100px;
  position
  right: 0;
  top: 0;
}

.foo.sn-minimise {
  height: 50px;
}
```

### Specify debounce time (default: 100ms)

```html
<header class="foo" snScrollCollapse [debounce]="500">
  ...
</header>
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[travis-badge]: https://travis-ci.org/thisissoon/angular-scroll-collapse.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-scroll-collapse
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-scroll-collapse/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-scroll-collapse?branch=master
[angular]: https://angular.io/
