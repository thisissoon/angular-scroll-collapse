'use strict';

describe('sn.smartNav', function (){

  var element, $scope, $rootScope, $document, $window, isolatedScope;

  beforeEach(module('sn.smartNav'));

  describe('element at top of page', function (){

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();

      $window = $injector.get('$window');

      $document = $injector.get('$document');
      $document[0] = {
        body: {
          scrollTop: 0
        }
      }

      element = '<nav sn-smart-nav style="height: 160px"></nav>';

      element = $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.isolateScope();

    }));

    afterEach(function(){
      $rootScope.$broadcast('$destroy');
    });

    it('should add "scrolling-down" class', function(){
      $document[0].body.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('scrolling-down')).toBe(false);

      $document[0].body.scrollTop = 100;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('scrolling-down')).toBe(true);
    });

    it('should add "scrolling-up" class', function(){
      $document[0].documentElement = {
        scrollTop: 0
      };
      $document[0].body = undefined;

      $document[0].documentElement.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');

      $document[0].documentElement.scrollTop = 100;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('scrolling-up')).toBe(false);

      $document[0].documentElement.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('scrolling-up')).toBe(true);
    });

    it('should add "minimised-mode" class', function(){
      $document[0].body.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('minimised-mode')).toBe(false);

      $document[0].body.scrollTop = 200;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('minimised-mode')).toBe(true);
    });

  });

  describe('element not at top of page', function (){

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();

      $window = $injector.get('$window');

      $document = $injector.get('$document');
      $document[0] = {
        body: {
          scrollTop: 0
        }
      }

      element = '<nav sn-smart-nav style="height: 160px; margin-top: 200px;"></nav>';

      element = $compile(element)($scope);
      $scope.$digest();

    }));

    it('should add "affix" class', function(){
      element[0].getBoundingClientRect = function(){
        return {
          top: 100
        }
      };
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('affix')).toBe(false);

      element[0].getBoundingClientRect = function(){
        return {
          top: -200
        }
      };
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass('affix')).toBe(true);
    });

  });


});
