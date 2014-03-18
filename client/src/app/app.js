angular.module('app', [
  'app.controllers'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        controller: 'AppCtrl',
        templateUrl: 'assets/templates/app/index.html',
        data: {
          appTitle: 'Angular UI Router'
        }
      })
        .state('app.state1', {
          url: '/state1',
          controller: 'State1Ctrl',
          templateUrl: 'assets/templates/app/state1.html',
          data : {
            stateTitle: 'State 1'
          }
        })
        .state('app.state2', {
          url: '/state2',
          controller: 'State2Ctrl',
          templateUrl: 'assets/templates/app/state2.html',
          data : {
            stateTitle: 'State 2'
          }
        })
        .state('app.state3', {
          url: '/state3',
          controller: 'State3Ctrl',
          templateUrl: 'assets/templates/app/state3.html',
          data : {
            appTitle: 'Angular UI Router (The Real Deal)',
            stateTitle: 'State 3'
          }
        });


  });
