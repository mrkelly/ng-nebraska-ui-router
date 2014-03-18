angular.module('app', [
  'app.controllers'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('state1', {
        url: '/state1',
        controller: 'State1Ctrl',
        templateUrl: 'assets/templates/app/state1.html'
      })
      .state('state2', {
        url: '/state2',
        controller: 'State2Ctrl',
        templateUrl: 'assets/templates/app/state2.html'
      })
      .state('state3', {
        url: '/state3',
        controller: 'State3Ctrl',
        templateUrl: 'assets/templates/app/state3.html'
      });

  });
