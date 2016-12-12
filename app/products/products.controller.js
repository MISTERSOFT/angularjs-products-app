(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = [
        '$q',
        'productsService',
        'toastService'
    ];
    function ProductsController($q, productsService, toastService) {
        var vm = this;

        // members
        vm.products = []; // When we are on route: /products
        vm.canShowLoader = true;
        vm.modal = {
            id: 'deleteModal',
            title: 'Confirmation',
            content: 'Are you sure that you want to delete this product ?',
            btnsConfig: [
                {
                    text: 'No',
                    wavesColor: 'green',
                    callback: deleteCanceled
                },
                {
                    text: 'Yes',
                    wavesColor: 'red',
                    callback: deleteProduct
                }
            ]
        };

        // methods
        vm.deleteProduct = deleteProduct;
        vm.formatUrl = formatUrl;

        activate();

        ////////////////

        function activate() {
            var promises;

            promises = [getProducts()];

            $q.all(promises).then(function () {
                vm.canShowLoader = false;
            });
        }

        function getProducts() {
            return productsService.getProducts().then(function (response) {
                if (response.success) {
                    vm.products = response.result;
                }
                return vm.products;
            });
        }

        function formatUrl(productId) {
            return productId.replace('/', '/edit/');
        }

        function deleteProduct(productId) {
            vm.canShowLoader = true;
            productsService.deleteProduct(productId).then(function (response) {
                vm.canShowLoader = false;
                if (response.success) {
                    toastService.toast('Product successfully deleted !');
                    for (var i = 0; i < vm.products.length; i++) {
                        if (vm.products[i]._id === productId) {
                            vm.products.splice(i, 1);
                        }
                    }
                }
                return null;
            });
        }

        function deleteCanceled() {
            toastService.toast('Delete canceled !');
        }
    }
})();