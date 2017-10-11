(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name yeomanAppApp.directive:ButtonSearch
   * @description
   * # ButtonSearch
   */
  angular.module('yeomanApp')
    .directive('ngButtonSearch', function() {
      return {
        template: '<span class="glyphicon glyphicon-search"></span>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {

        }
      };
    });

})();
