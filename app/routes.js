(function() {
    'use strict';

    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = ['$routeProvider'];
    function routesConfig($routeProvider) {

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'app/home/home.controller.html'
            })
            .when('/products', {
                controller: 'ProductsController',
                controllerAs: 'vm',
                templateUrl: 'app/products/products.controller.html'
            })
            .when('/products/edit/:id', {
                controller: 'EditProductController',
                controllerAs: 'vm',
                templateUrl: 'app/products/edit/edit-product.controller.html'
            })
            .when('/products/add', {
                controller: 'AddProductController',
                controllerAs: 'vm',
                templateUrl: 'app/products/add/add-product.controller.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    }
})();