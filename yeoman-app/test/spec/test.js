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

      var moduleApp = module('yeomanApp');

      it('Check application module mock', function() {
        expect(moduleApp).to.exist;
        expect(moduleApp).to.not.null;
      });
    });

  });
})();
