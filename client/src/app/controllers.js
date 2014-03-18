angular.module('app.controllers', [ ])
  .controller('AppCtrl', function ($scope){
    $scope.state3Content = "We have nested scope!";
  })
  .controller('State1Ctrl', function ($scope){
    $scope.title = "State 1";
    $scope.content = "Now we have 3 children states and one parent state";
  })
  .controller('State2Ctrl', function ($scope){
    $scope.title = "State 2";
    $scope.content = "We've removed the nav duplication";
  })
  .controller('State3Ctrl', function ($scope){
    $scope.title = "State 3";
    $scope.content = $scope.state3Content;
  });
