angular.module('app', [
  'app.controllers'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        controller: 'AppCtrl',
        templateUrl: 'assets/templates/app/index.html'
      });
  });
