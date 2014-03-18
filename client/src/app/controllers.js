angular.module('app.controllers', [ ])
  .controller('AppCtrl', function ($scope, $log){
    $scope.title = "Angular UI Router";
    $scope.content = "This is about as simple as it gets, one root state.";

  });
