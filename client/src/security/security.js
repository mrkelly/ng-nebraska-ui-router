angular.module('security', [
  'security.authentication.services',
  'security.authorization.services',
  'security.controllers',
  'security.interceptors',
  'security.services'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.login', {
        url: '/login?redirect',
        templateUrl: 'assets/templates/security/login/index.html',
        controller: 'LoginCtrl'
      });
  })
  .run(function ($api) {
    $api.add({
      resource: 'login',
      url: '/login',
      params: {},
      methods: {
        'login' : {
          method: 'POST'
        },
        'current' : {
          method: 'GET'
        }
      },
      unnatural: true
    });

    $api.add({
      resource: 'logout',
      url: '/logout',
      params: {},
      methods: {
        'logout' : {
          method: 'POST'
        }
      },
      unnatural: true
    });
  });
