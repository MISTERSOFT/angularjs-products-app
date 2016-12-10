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
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: 'app/dashboard/dashboard.controller.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    }
})();