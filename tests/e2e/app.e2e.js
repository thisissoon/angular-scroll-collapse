'use strict';
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   myApp.e2e
 * @module myApp.e2e
 * @author SOON_
 */
angular.module('myApp.e2e', ['myApp', 'ngMockE2E'])
/**
 * @method run
 * @param  {Service} $httpBackend
 */
.run([
  '$httpBackend',
  function ($httpBackend) {

    $httpBackend.whenGET(/partials\/.*/).passThrough();

  }
]);
