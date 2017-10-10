(function() {
  'use strict';

  describe('Controller: HomeCtrl', function() {
    describe('maybe a bit more context here', function() {

      var HomeCtrl;
      var scope;

      // load the controller's module
      beforeEach(function() {

        module('yeomanAppApp');

        inject(function($controller, $rootScope) {
          scope = $rootScope.$new();
          HomeCtrl = $controller('HomeCtrl', {
            $scope: scope
            // place here mocked dependencies
          });

        });
      });

      it('should attach a list of awesomeThings to the scope', function() {
        expect(HomeCtrl.awesomeThings.length).toBe(3);
      });
    });

  });
})();
