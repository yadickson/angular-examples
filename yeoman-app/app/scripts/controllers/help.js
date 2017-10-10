(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name yeomanAppApp.controller:HelpCtrl
   * @description
   * # HelpCtrl
   * Controller of the yeomanAppApp
   */
  angular
    .module('yeomanApp')
    .controller('HelpCtrl', helpController);

  function helpController() {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})();
