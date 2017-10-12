(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name yeomanAppApp.ValidateOnlyNumber
   * @description
   * # ValidateOnlyNumber
   * Factory in the yeomanAppApp.
   */
  angular.module('yeomanApp')
    .factory('ValidateOnlyNumber', validateOnlyNumber);

  function validateOnlyNumber() {

    return {
      validateNumber: validateNumber
    };

    function validateNumber(value) {
      var str = value || '';
      return str.replace(/\D/g, '');
    }
  }

})();
