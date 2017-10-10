(function() {
  'use strict';

  angular
    .module('yeomanAppApp', ['ui.router']);

  angular
    .module('yeomanAppApp').config(yeomanAppAppConfig);

  angular
    .module('yeomanAppApp')
    .controller('MainCtrl', yeomanAppAppCtrl);


  function yeomanAppAppConfig() {}

  function yeomanAppAppCtrl() {}

})();
