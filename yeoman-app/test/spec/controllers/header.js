(function() {
  'use strict';

  describe('Controller: HeaderCtrl', function() {
    describe('maybe a bit more context here', function() {

      // load the controller's module
      beforeEach(module('yeomanApp'));

      var HeaderCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        HeaderCtrl = $controller('HeaderCtrl', {
          $scope: scope
          // place here mocked dependencies
        });
      }));

      it('should attach a list of awesomeThings to the scope', function() {
        expect(HeaderCtrl.awesomeThings).to.be.an('array');
        expect(HeaderCtrl.awesomeThings).to.have.lengthOf(3);
      });
    });
  });
})();
