(function() {
  'use strict';

  describe('Controller: HomeCtrl', function() {
    describe('maybe a bit more context here', function() {

      // load the controller's module
      beforeEach(angular.mock.module('yeomanApp'));

      var HomeCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        HomeCtrl = $controller('HomeCtrl', {
          $scope: scope
          // place here mocked dependencies
        });
      }));

      it('should attach a list of awesomeThings to the scope', function() {
        expect(HomeCtrl.awesomeThings).to.be.an('array');
        expect(HomeCtrl.awesomeThings).to.have.lengthOf(3);
      });
    });
  });
})();
