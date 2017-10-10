(function() {
  'use strict';

  describe('Controller: HelpCtrl', function() {
    describe('maybe a bit more context here', function() {

      // load the controller's module
      beforeEach(module('yeomanApp'));

      var HelpCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        HelpCtrl = $controller('HelpCtrl', {
          $scope: scope
          // place here mocked dependencies
        });
      }));

      it('should attach a list of awesomeThings to the scope', function() {
        expect(HelpCtrl.awesomeThings).to.be.an('array');
        expect(HelpCtrl.awesomeThings).to.have.lengthOf(3);
      });
    });
  });
})();
