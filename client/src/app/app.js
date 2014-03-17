angular.module('app', [
  'app.controllers'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'assets/templates/app/index.html'
      });
  });
