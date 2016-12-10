(function() {
    'use strict';

    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = ['$routeProvider', '$locationProvider'];
    function routesConfig($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('#');

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'app/home/home.controller.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    }
})();