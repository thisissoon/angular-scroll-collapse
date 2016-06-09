'use strict';
/**
 * Module that detects the last scroll direction and
 * current scroll position to then add classes for
 * when the user is scrolling up or down the page
 * to show/hide the nav when scrolling in any particular
 * direction. Also when the user has scrolled beyond the
 * height of header adds a class to allow the nav to be
 * minimized or hidden.
 *
 * When the user has scrolled down the page the class
 * `scrolling-down` will be added, when scrolling up
 * `scrolling-up`. If the user has scrolled beyond the
 * height of the nav the class `minimised-mode`.
 *
 * If the element is at the top of the viewport or above
 * it then the class `affix` will be added. This is useful
 * for making an element sticky when user has scrolled to it
 *
 * @module   sn.smartNav
 * @main     sn.smartNav
 * @author   SOON_
 */
angular.module('sn.smartNav', [

])
/**
 * @example
 *  `<nav sn-smart-nav></nav>`
 * @class   snSmartNav
 * @param   {Service} $window   : Angular.js wrapper for window Object
 * @param   {Service} $document : Angular.js wrapper for document Object
 */
.directive('snSmartNav',[
  '$window',
  '$document',
  function ($window, $document){
    return {
      restrict: 'A',
      scope: {},
      link: function($scope, $element){
        /**
         * The last recorded scrollTop position
         * @private
         * @property lastScrollTop
         * @type     {Number}
         */
        var lastScrollTop = 0;
        /**
         * True if the last scroll direction was down the page
         * @private
         * @property scrollingDown
         * @type     {Boolean}
         */
        var scrollingDown = false;
        /**
         * @method isScrollingDown
         * @private
         * @param  {Number}  currentScrollTop
         * @return {Boolean} True if last scroll direction is down
         */
        var isScrollingDown = function isScrollingDown(currentScrollTop){
          return currentScrollTop > lastScrollTop;
        };
        /**
         * @method isScrollingUp
         * @private
         * @param  {Number}  currentScrollTop
         * @return {Boolean} True if last scroll direction is up
         */
        var isScrollingUp = function isScrollingUp(currentScrollTop){
          return currentScrollTop < lastScrollTop;
        };
        /**
         * Calulate the current scroll direction and add relevent classes
         * @private
         * @method calScrollDir
         * @param  {Number} scrollTop
         */
        var calScrollDir = function calScrollDir(scrollTop){
          if ( scrollingDown && isScrollingUp(scrollTop) ) {
            scrollingDown = false;
            $element.removeClass('scrolling-down');
            $element.addClass('scrolling-up');
          } else if ( !scrollingDown && isScrollingDown(scrollTop) ){
            scrollingDown = true;
            $element.removeClass('scrolling-up');
            $element.addClass('scrolling-down');
          }
        };
        /**
         * Calulate if the user has scrolled beyond the height of the element
         * @private
         * @method calMinimisedMode
         * @param  {Number}  scrollTop
         */
        var calMinimisedMode = function calMinimisedMode(scrollTop){
          if (scrollTop > $element[0].offsetHeight) {
            $element.addClass('minimised-mode');
          } else {
            $element.removeClass('minimised-mode');
          }
        };
        /**
         * Calulate if the element is at top or above viewport
         * so we can 'affix' it to top of the viewport.
         * @private
         * @method calAffixedMode
         */
        var calAffixedMode = function calAffixedMode(){
          var positionFromTop = $element[0].getBoundingClientRect().top;
          if (positionFromTop <= 0 ) {
            $element.addClass('affix');
          } else {
            $element.removeClass('affix');
          }
        };
        /**
         * window `scroll` event handler.
         * Gets the current scroll postion and calulates
         * scroll direction and whether to enable minimise mode
         * @private
         * @method onScroll
         */
        var onScroll = function onScroll() {
          var doc = $document[0].documentElement,
              body = $document[0].body,
              scrollTop = ( (doc && doc.scrollTop) || (body && body.scrollTop) || 0 );

          calScrollDir(scrollTop);
          calMinimisedMode(scrollTop);
          calAffixedMode();

          lastScrollTop = scrollTop;
        };
        /**
         * Clear event listeners
         * @method onDestroy
         */
        var onDestroy = function onDestroy(){
          angular.element($window).off('scroll', onScroll);
        };

        $scope.$on('$destroy', onDestroy);
        angular.element($window).on('scroll', onScroll);
      }
    };
  }
]);
