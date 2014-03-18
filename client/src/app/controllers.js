angular.module('app.controllers', [ ])
  .controller('AppCtrl', function ($scope, $state, authentication){
    $scope.logout = function logout () {
      authentication.logout();
    };
  })
  .controller('State1Ctrl', function ($scope, $stateParams){

  })
  .controller('State2Ctrl', function ($scope, $stateParams){

  })
  .controller('State3Ctrl', function ($scope, $stateParams, content){
    $scope.content = content;
  });
