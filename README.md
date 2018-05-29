# Angular Scroll Collapse
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Commitizen friendly][commitizen-badge]][commitizen]

A simple lightweight library for [Angular][angular] that detects scroll direction and adds a `sn-scrolling-up` or `sn-scrolling-down` class to the element. The library can also detect when the user has scrolled passed the element and apply a `sn-affix` class. Useful for make a element sticky when the user has scrolled beyond it. This library can will also apply `sn-minimise` class after the user has scrolled beyond the height of the element.

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0][apfv5].


## Install

### via NPM

`npm i @thisissoon/{angular-scroll-collapse,angular-inviewport} --save`

### via Yarn

`yarn add @thisissoon/angular-scroll-collapse @thisissoon/angular-inviewport`

`app.module.ts`
```ts
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';
import { ScrollCollapseModule } from '@thisissoon/angular-scroll-collapse';

@NgModule({
  imports: [
    InViewportModule.forRoot([
      { provide: WindowRef, useFactory: () => window }
    ]),
    ScrollCollapseModule
  ]
})
export class AppModule { }
```

`yarn add @thisissoon/angular-scroll-collapse @thisissoon/angular-inviewport`

`app.server.module.ts`
```ts
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { ScrollCollapseModule } from '@thisissoon/angular-scroll-collapse';

@NgModule({
  imports: [
    InViewportModule.forRoot(), // No need to provide WindowRef for server module
    ScrollCollapseModule
  ]
})
export class AppServerModule { }
```


## Examples

A working example can be found inside [/src](https://github.com/thisissoon/angular-scroll-collapse/tree/master/src) folder.

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

### Specify debounce time (default: 0ms)

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

Run `ng test` to execute the unit tests via [Karma][karma].

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor][protractor].

## Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README][angular-cli-readme].


[travis-badge]: https://travis-ci.org/thisissoon/angular-scroll-collapse.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-scroll-collapse
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-scroll-collapse/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-scroll-collapse?branch=master
[angular]: https://angular.io/
[commitizen]:http://commitizen.github.io/cz-cli/
[commitizen-badge]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]:https://github.com/conventional-changelog/conventional-changelog
[standard-version]:https://github.com/conventional-changelog/standard-version
[Karma]:https://karma-runner.github.io
[Protractor]:http://www.protractortest.org/
[angular-cli]:https://github.com/angular/angular-cli
[angular-cli-readme]:https://github.com/angular/angular-cli/blob/master/README.md
[apfv5]:https://goo.gl/jB3GVv
