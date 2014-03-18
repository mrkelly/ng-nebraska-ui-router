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
        .state('app.invalid', {
          url: '/invalid',
          templateUrl: 'assets/templates/app/invalid.html'
        })
        .state('app.state1', {
          url: '/state1/{simplePathVar}',
          controller: 'State1Ctrl',
          templateUrl: 'assets/templates/app/state1.html',
          data : {
            stateTitle: 'State 1'
          }
        })
        .state('app.state2', {
          url: '/state2/{regexPathVar:[0-9a-fA-F]{1,8}}',
          controller: 'State2Ctrl',
          templateUrl: 'assets/templates/app/state2.html',
          data : {
            stateTitle: 'State 2'
          }
        })
        .state('app.state3', {
          url: '/state3?param1&param2',
          controller: 'State3Ctrl',
          templateUrl: 'assets/templates/app/state3.html',
          data : {
            stateTitle: 'State 3'
          }
        });


  });
