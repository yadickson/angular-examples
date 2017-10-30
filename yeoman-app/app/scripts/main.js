(function() {
    'use strict';

    angular
        .module('yeomanApp', [
            'ui.router',
            'angularYS.DirectiveOnlyNumber'
        ]);

    angular
        .module('yeomanApp')
        .config(mainConfig);

    angular
        .module('yeomanApp')
        .controller('MainCtrl', mainController);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root', {
                abstract: true,
                views: {
                    'header@': {
                        controller: 'HeaderCtrl',
                        templateUrl: 'views/header.html',
                        controllerAs: 'vm'
                    },
                    'main@': {},
                    'footer@': {
                        controller: 'FooterCtrl',
                        templateUrl: 'views/footer.html',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('home', {
                parent: 'root',
                url: '/home',
                views: {
                    'main@': {
                        controller: 'HomeCtrl',
                        templateUrl: 'views/home.html',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    }

    function mainController() {}

})();