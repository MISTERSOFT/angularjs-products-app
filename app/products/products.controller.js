(function() {
'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$q', 'productsService', 'toastService'];
    function ProductsController($q, productsService, toastService) {
        var vm = this;
        
        vm.products = [];

        activate();

        ////////////////

        function activate() {
            var promises = [
                getProducts()
            ];

            $q.all(promises).then(function() {
                toastService.toast('Products page loaded');
            });
        }

        function getProducts() {
            return productsService.getProducts().then(function(response) {
                if (response.success) {
                    vm.products = response.result;
                }
                return vm.products;
            });
        } 
    }
})();