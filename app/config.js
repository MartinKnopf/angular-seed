'use strict';

angular
  .module('myApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'homepage/homepage.html',
        controller: 'HomepageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
