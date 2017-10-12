(function() {
  'use strict';

  describe('Directive: onlyNumber', function() {

    beforeEach(angular.mock.module('yeomanApp'));

    var element,
      scope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    it('Check only-number value by default', inject(function($compile) {
      element = angular.element('<input type="text" ng-model="numericValue" only-number></input>');
      element = $compile(element)(scope);
      expect(element.val()).to.empty;
    }));

    it('Check only-number keyup event', inject(function($compile) {
      element = angular.element('<input type="text" ng-model="numericValue" only-number></input>');
      element = $compile(element)(scope);
      var event = angular.element.Event("keyup");
      event.key = '1';
      element.trigger(event);
      expect(element.val()).to.empty;
    }));

    it('Check only-number paste event', inject(function($compile) {
      element = angular.element('<input type="text" ng-model="numericValue" only-number></input>');
      element = $compile(element)(scope);
      var event = angular.element.Event("paste");
      element.trigger(event);
      expect(element.val()).to.empty;
    }));

    it('Check only-number propertychange event', inject(function($compile) {
      element = angular.element('<input type="text" ng-model="numericValue" only-number></input><p>{{numericValue}}</p>');
      element = $compile(element)(scope);
      var event = angular.element.Event("propertychange");
      element.trigger(event);
      expect(element.val()).to.empty;
    }));

  });

})();
