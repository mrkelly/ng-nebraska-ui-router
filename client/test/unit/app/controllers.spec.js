describe('App', function() {

  var expect = chai.expect;
  var controller, scope;

  describe('Controllers', function() {
    beforeEach(
      module(
        'app.controllers'
      )
    );

    describe('AppCtrl', function() {
      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller("AppCtrl", {
          $scope: scope
        });
      }));

      describe('setup', function () {
        it('should be able to instantiate the controller', function () {
          expect(controller).to.be.ok;
        });
      });
    });
  });
});
