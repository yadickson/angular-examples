(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name yeomanAppApp.controller:HomeCtrl
     * @description
     * # HomeCtrl
     * Controller of the yeomanAppApp
     */
    angular
        .module('yeomanApp')
        .controller('HomeCtrl', function() {
            this.numericValue = '0';
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        });


})();