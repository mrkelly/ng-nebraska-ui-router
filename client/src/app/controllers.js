angular.module('app.controllers', [ ])
  .controller('State1Ctrl', function ($scope){
    $scope.title = "State 1";
    $scope.content = "Now we have 3 sibling states.";
  })
  .controller('State2Ctrl', function ($scope){
    $scope.title = "State 2";
    $scope.content = "This is what we can get with the AngularJS router.";
  })
  .controller('State3Ctrl', function ($scope){
    $scope.title = "State 3";
    $scope.content = "We still have to duplicated code for the navigation and page container.";
  });
