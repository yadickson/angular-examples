(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name yeomanAppApp.directive:onlyNumber
   * @description
   * # onlyNumber
   */
  angular.module('yeomanApp')
    .directive('onlyNumber', onlyNumberDirective);

  function onlyNumberDirective() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: postLink
    };

    function postLink(scope, element, attrs, ngModel) {

      element.val(attrs.default || ngModel.value || '');

      element.bind('propertychange keyup paste', onChange);
      //DOM -> MODEL
      ngModel.$parsers.unshift(onUpdate);
      //MODEL -> DOM
      ngModel.$formatters.unshift(onUpdate);

      function onChange() {
        this.value = validNumber(this.value);
      }

      function onUpdate(value) {
        return validNumber(value);
      }

      function validNumber(value) {
        var str = value || '';
        return str.replace(/\D/g, '');
      }

    }

  };

})();
