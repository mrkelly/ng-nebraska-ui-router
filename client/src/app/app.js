angular.module('app', [
  'app.controllers'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        controller: 'AppCtrl',
        templateUrl: 'assets/templates/app/index.html'
      })
        .state('app.state1', {
          url: '/state1',
          controller: 'State1Ctrl',
          templateUrl: 'assets/templates/app/state1.html'
        })
        .state('app.state2', {
          url: '/state2',
          controller: 'State2Ctrl',
          templateUrl: 'assets/templates/app/state2.html'
        })
        .state('app.state3', {
          url: '/state3',
          controller: 'State3Ctrl',
          templateUrl: 'assets/templates/app/state3.html'
        });


  });
