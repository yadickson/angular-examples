(function() {
  'use strict';

  describe('Check application', function() {

    describe('Yeoman Application', function() {

      var moduleApp = angular.module('yeomanApp');

      it('Check application module', function() {
        expect(moduleApp).to.exist;
        expect(moduleApp).to.not.null;
      });
    });

    describe('Yeoman Application Dependencies', function() {

      var dependencies = angular.module('yeomanApp').requires;

      it('Check ui-route', function() {
        expect(dependencies).to.be.an('array').that.includes('ui.router');
      });
    });

    describe('Yeoman Application Mock', function() {

      var moduleApp = angular.mock.module('yeomanApp');

      it('Check application module mock', function() {
        expect(moduleApp).to.exist;
        expect(moduleApp).to.not.null;
      });
    });

    describe('Yeoman Application Controller', function() {

      beforeEach(angular.mock.module('yeomanApp'));

      var MainCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
          $scope: scope
          // place here mocked dependencies
        });
      }));

      it('Check MainCtrl', function() {
        expect(MainCtrl).to.exist;
      });
    });

  });
})();
