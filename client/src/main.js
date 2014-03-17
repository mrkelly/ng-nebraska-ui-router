angular.module('main', [
  'templates-main',
  'ui.router',
  'app'
])

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  })

  .run(function ($log, $state, $rootScope, $stateParams) {
    // putting state into $rootScope so that these services are available in views
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $log.info("Application running.");
  });
