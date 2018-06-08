# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.3.0"></a>
# [3.3.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v3.2.0...v3.3.0) (2018-06-08)


### Features

* **scroll-collapse:** emit affix and minimise events ([0ee19b8](https://github.com/thisissoon/angular-scroll-collapse/commit/0ee19b8))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v3.1.0...v3.2.0) (2018-06-07)


### Features

* **scroll-collapse:** emit scroll direction events ([80c6eee](https://github.com/thisissoon/angular-scroll-collapse/commit/80c6eee))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v3.0.1...v3.1.0) (2018-06-06)


### Features

* **scroll directive:** add yOffset input to class setting functions ([1336f0b](https://github.com/thisissoon/angular-scroll-collapse/commit/1336f0b))
* **yOffset:** remove yOffset logic from minimise mode calc ([92959db](https://github.com/thisissoon/angular-scroll-collapse/commit/92959db))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/thisissoon/angular-scroll-collapse/compare/v3.0.0...v3.0.1) (2018-05-31)


### Bug Fixes

* **scroll direction calculate:** add logic for no scroll change ([a4e23a1](https://github.com/thisissoon/angular-scroll-collapse/commit/a4e23a1))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v2.0.0...v3.0.0) (2018-05-29)


### Features

* **scroll-collapse:** adding angular 6 support ([e1d785e](https://github.com/thisissoon/angular-scroll-collapse/commit/e1d785e))


### BREAKING CHANGES

* **scroll-collapse:** Updated peer dependencies to rxjs 6.x and @thisissoon/angular-inviewport 3.x



<a name="2.0.0"></a>
# [2.0.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v2.0.0-rc.2...v2.0.0) (2018-02-19)



<a name="2.0.0-rc.2"></a>
# [2.0.0-rc.2](https://github.com/thisissoon/angular-scroll-collapse/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2018-02-19)


### Bug Fixes

* **ScrollCollapse:** fixed issue where affix would not be calculated in nested element with position ([7507dd4](https://github.com/thisissoon/angular-scroll-collapse/commit/7507dd4))



<a name="2.0.0-rc.1"></a>
# [2.0.0-rc.1](https://github.com/thisissoon/angular-scroll-collapse/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2018-02-19)


### Bug Fixes

* **ScrollCollapse:** factor in element offsetTop when calculating minimise mode ([303b819](https://github.com/thisissoon/angular-scroll-collapse/commit/303b819))



<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v1.2.1...v2.0.0-rc.0) (2018-02-19)


### Bug Fixes

* **ScrollCollapse:** remove [scrollCollapse] selector ([7e76d44](https://github.com/thisissoon/angular-scroll-collapse/commit/7e76d44))
* **ScrollCollapse:** remove debounce operator when set to 0 for rubber band scrolling ([5a5e4e2](https://github.com/thisissoon/angular-scroll-collapse/commit/5a5e4e2))


### Features

* **ScrollCollapse:** change default debounce time to 0ms ([7d90b49](https://github.com/thisissoon/angular-scroll-collapse/commit/7d90b49))


### Performance Improvements

* **ScrollCollapse:** Use fromEvent observable instead of HostBinding for scroll and resize events ([1348ee5](https://github.com/thisissoon/angular-scroll-collapse/commit/1348ee5))


### BREAKING CHANGES

* **ScrollCollapse:** Set default debounce time to 0ms
* **ScrollCollapse:** removed [scrollCollapse ]selector as only [snScrollCollapse] should be used
* **ScrollCollapse:** @thisissoon/angular-inviewport module has been added as a peer dependency as
directive now uses WindowRef service



<a name="1.2.1"></a>
## [1.2.1](https://github.com/thisissoon/angular-scroll-collapse/compare/v1.2.0...v1.2.1) (2017-12-04)


### Bug Fixes

* **build:** generate correct metadata needed for ng-language-service ([0b56342](https://github.com/thisissoon/angular-scroll-collapse/commit/0b56342))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v1.2.0-rc.0...v1.2.0) (2017-12-01)



<a name="1.2.0-rc.0"></a>
# [1.2.0-rc.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v1.1.0...v1.2.0-rc.0) (2017-12-01)


### Features

* **build:** Move build and dev environment to angular cli and ng-packagr ([cbc473c](https://github.com/thisissoon/angular-scroll-collapse/commit/cbc473c))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v1.0.0...v1.1.0) (2017-08-25)


### Features

* **ScrollCollapse:** update directive selector so it matches [snScrollCollapse] ([e375ceb](https://github.com/thisissoon/angular-scroll-collapse/commit/e375ceb)), closes [#16](https://github.com/thisissoon/angular-scroll-collapse/issues/16)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/thisissoon/angular-scroll-collapse/compare/v0.2.1...v1.0.0) (2017-08-16)


### Features

* **affix:** implemented detection for when user has scrolled passed element ([59bf911](https://github.com/thisissoon/angular-scroll-collapse/commit/59bf911))
* **minimise:** implemented detection for scrolling past element height assuming element is fixed at ([5d33ca7](https://github.com/thisissoon/angular-scroll-collapse/commit/5d33ca7))
* **scrollingDirection:** reimplemented scrolling direction detection ([4856c3c](https://github.com/thisissoon/angular-scroll-collapse/commit/4856c3c))



## Changes in 0.2.1

 * @edwardoparearyee: Fix: Include sourcemaps (#13)

## Changes in 0.2.0

 * @edwardoparearyee: Feature: Prefix css class names (#10)

## Changes in 0.1.1

 * @edwardoparearyee: Fix: position from top (#9)
 * @edwardoparearyee: Fix: remove isolated scope from directive (#8)

## Changes in 0.1.0

 * @edwardoparearyee: Feature: add affix mode (#6)

## Changes in 0.0.2

 * @edwardoparearyee: Fix: Error in docs (#4)

## Changes in 0.0.1

 * @edwardoparearyee: First release
