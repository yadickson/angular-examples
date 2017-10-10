(function() {
  'use strict';

  angular
    .module('yeomanApp', [
      'ui.router'
    ]);

  angular
    .module('yeomanApp')
    .config(mainConfig);

  angular
    .module('yeomanApp')
    .controller('MainCtrl', mainController);


  function mainConfig() {}

  function mainController() {}

})();
