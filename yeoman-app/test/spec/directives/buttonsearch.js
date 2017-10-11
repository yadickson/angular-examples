(function() {
  'use strict';

  describe('Directive: ngButtonSearch', function() {

    beforeEach(angular.mock.module('yeomanApp'));

    var element,
      scope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    it('Check empty text', inject(function($compile) {
      element = angular.element('<ng-button-search></ng-button-search>');
      element = $compile(element)(scope);
      expect(element.text()).to.empty;
    }));

    it('Check child', inject(function($compile) {
      element = angular.element('<ng-button-search></ng-button-search>');
      element = $compile(element)(scope);
      expect(element.children().attr('class')).to.equal('glyphicon glyphicon-search');
    }));

  });

})();
