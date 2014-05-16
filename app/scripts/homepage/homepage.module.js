'use strict';

angular
  .module('myApp.homepage', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/homepage/homepage.html',
        controller: 'HomepageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
