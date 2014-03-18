angular.module('security.authorization.services', [ ])

  // This service provides guard methods to protect application states.
  // You can add them as resolves to states to require an admin user
  // before allowing a state change to complete
  .provider('authorization', {

    requireAuthenticatedUser: [
      'authorization',
      function (authorization) {
        return authorization.requireAuthenticatedUser();
      }
    ],

    requireAdminUser: [
      'authorization',
      function (authorization) {
        return authorization.requireAdminUser();
      }
    ],

    $get: function ($injector, authentication, securityContext) {
      
      var service = {
        // Require that there is an authenticated user
        // (use this in a state resolve to prevent non-authenticated users from entering that state)
        requireAuthenticatedUser: function () {
          var queue = $injector.get('retryQueue');

          return authentication.requestCurrentUser()
            .then(function (userInfo) {
              if ( !securityContext.authenticated ) {
                return queue.pushRetryFn('unauthenticated-client', function () {
                  return service.requireAuthenticatedUser();
                });
              }
            });
        },

        requireAdminUser: function () {
          var queue = $injector.get('retryQueue');

          return authentication.requestCurrentUser()
            .then(function (userInfo) {
              if ( !userInfo.user || !userInfo.user.admin ) {
                return queue.pushRetryFn('unauthorized-client', service.requireAdminUser);
              }
            });
        }

      };

      return service;
    }
  });