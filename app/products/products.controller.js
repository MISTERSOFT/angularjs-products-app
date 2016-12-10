(function() {
'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = [
        '$q',
        'productsService',
        'toastService',
        '$routeParams'
    ];
    function ProductsController($q, productsService, toastService,
    $routeParams) {
        var vm = this;
        
        vm.products = []; // When we are on route: /products
        vm.product = {}; // When we are on route : /products/XXXX
        vm.canShowLoader = true;

        activate();

        ////////////////

        function activate() {
            var promises;

            if ($routeParams.id) {
                promises = [getProduct($routeParams.id)];
            }
            else {
                promises = [getProducts()];
            }

            $q.all(promises).then(function() {
                toastService.toast('Product(s) page loaded');
                vm.canShowLoader = false;
            });
        }

        function getProducts() {
            return productsService.getProducts().then(function(response) {
                if (response.success) {
                    vm.products = response.result;
                    console.log(vm.products);
                }
                return vm.products;
            });
        }

        function getProduct(id) {
            return productsService.getProductById(id).then(function(response) {
                if (response.success) {
                    vm.product = response.result;
                    console.log(vm.product);
                }
                return vm.products;
            });
        }
    }
})();