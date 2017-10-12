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

  validateOnlyNumber.$inject = ['Keyboard'];

  function validateOnlyNumber(Keyboard) {

    return {
      validateNumber: validateNumber,
      validateKeyEvent: validateKeyEvent
    };

    function validateNumber(value) {
      var str = value || '';
      return str.replace(/\D/g, '');
    }

    function validateKeyEvent(event) {
      if (!Keyboard.isOnlyNumber(event) && !Keyboard.isCtrlKeys(event)) {
        console.log('fff');
        event.preventDefault();
        return false;
      }
    }
  }

})();
