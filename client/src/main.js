angular.module('main', [
  'templates-main',
  'ngResource',
  'ui.router',
  'security',
  'app'
])

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/state1");
  })

  .run(function ($log, $state, $rootScope, $stateParams) {
    // putting state into $rootScope so that these services are available in views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $log.info("Application running.");
  });
