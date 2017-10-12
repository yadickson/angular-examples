(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name yeomanAppApp.Keyboard
   * @description
   * # Keyboard
   * Factory in the yeomanAppApp.
   */
  angular.module('yeomanApp')
    .factory('Keyboard', keyboard);

  function keyboard() {

    return {
      isCtrlA: isCtrlA,
      isCtrlC: isCtrlC,
      isCtrlX: isCtrlX,
      isCtrlV: isCtrlV,
      isCtrlKeys: isCtrlKeys,
      isNavegationKey: isNavegationKey,
      isClearKey: isClearKey,
      isDotKey: isDotKey,
      isSeparator: isSeparator,
      isNumericKey: isNumericKey,
      isOnlyNumber: isOnlyNumber,
      isDecimalNumber: isDecimalNumber
    };

    function isCtrlA(e) {
      var ctrl = String.fromCharCode(e.which || e.charCode || e.keyCode).toUpperCase();
      var code = (ctrl === 'A' && e.ctrlKey === true);
      var key = ($.inArray(e.key, ["a", "A"]) !== -1 && e.ctrlKey === true);
      return key || code;
    }

    function isCtrlC(e) {
      var ctrl = String.fromCharCode(e.which || e.charCode || e.keyCode).toUpperCase();
      var code = (ctrl === 'C' && e.ctrlKey === true);
      var key = ($.inArray(e.key, ["c", "C"]) !== -1 && e.ctrlKey === true);
      return key || code;
    }

    function isCtrlX(e) {
      var ctrl = String.fromCharCode(e.which || e.charCode || e.keyCode).toUpperCase();
      var code = (ctrl === 'X' && e.ctrlKey === true);
      var key = ($.inArray(e.key, ["x", "X"]) !== -1 && e.ctrlKey === true);
      return key || code;
    }

    function isCtrlV(e) {
      var ctrl = String.fromCharCode(e.which || e.charCode || e.keyCode).toUpperCase();
      var code = (ctrl === 'V' && e.ctrlKey === true);
      var key = ($.inArray(e.key, ["v", "V"]) !== -1 && e.ctrlKey === true);
      return key || code;
    }

    function isCtrlKeys(e) {
      return isCtrlA(e) || isCtrlC(e) || isCtrlX(e) || isCtrlV(e);
    }

    function isNavegationKey(e) {
      var ctrl = e.which || e.charCode || e.keyCode;
      var code = ($.inArray(ctrl, [37, 39, 40, 38, 9]) !== -1);
      var key = ($.inArray(e.key, ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Tab"]) !== -1);
      return key || code;
    }

    function isClearKey(e) {
      var ctrl = e.which || e.charCode || e.keyCode;
      var code = ($.inArray(ctrl, [46, 8]) !== -1);
      var key = ($.inArray(e.key, ["Delete", "Backspace"]) !== -1);
      return key || code;
    }

    function isDotKey(e) {
      var ctrl = e.which || e.charCode || e.keyCode;
      var code = ($.inArray(ctrl, [110, 190]) !== -1);
      var key = (e.key === ".");
      return key || code;
    }

    function isSeparator(e) {
      var ctrl = e.which || e.charCode || e.keyCode;
      var code = ($.inArray(ctrl, [109, 189]) !== -1);
      var key = (e.key === "-");
      return key || code;
    }

    function isNumericKey(e) {
      var ctrl = e.which || e.charCode || e.keyCode;
      var code = ((ctrl >= 48 && ctrl <= 57) || (ctrl >= 96 && ctrl <= 105));
      var key = ($.inArray(e.key, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) !== -1);
      return key || code;
    }

    function isOnlyNumber(e) {
      return isNumericKey(e) || isNavegationKey(e) || isClearKey(e);
    }

    function isDecimalNumber(e) {
      return isOnlyNumber(e) || isDotKey(e);
    }

  }

})();
