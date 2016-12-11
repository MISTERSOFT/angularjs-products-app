(function() {
'use strict';

    angular
        .module('app.products')
        .controller('EditProductController', EditProductController);

    EditProductController.$inject = [
        '$q',
        'productsService',
        'toastService',
        '$routeParams'
    ];
    function EditProductController($q, productsService, toastService,
    $routeParams) {
        var vm = this;
        
        // members
        vm.product = {};
        vm.noErrors = false;
        vm.inputMessages = {
            price: {
                error: 'Bad price synthax',
                success: 'Good'
            },
            url: {
                error: 'Put a valid URL',
                success: 'Good'
            }
        };
        vm.urlRegexPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        vm.priceRegexPattern = /^\d+(.\d{1,2})?$/;
        vm.canShowLoader = true;

        // methods
        vm.updateProduct = updateProduct;

        activate();

        ////////////////

        function activate() {
            var promises = [
                getProduct($routeParams.id)
            ];

            $q.all(promises).then(function () {
                vm.canShowLoader = false;
            });
        }

        function getProduct(id) {
            return productsService.getProductById(id).then(function (response) {
                if (response.success) {
                    vm.product = response.result;
                    console.log(vm.product);
                }
                return vm.product;
            });
        }

        function isValidForm() {
            vm.noErrors = true;
            // Check price
            if (!vm.priceRegexPattern.test(vm.product.price)) {
                vm.noErrors = false;
            }
            // Check if URLs are valid
            if ((!vm.urlRegexPattern.test(vm.product.image) && vm.product.image !== '') || (!vm.urlRegexPattern.test(vm.product.thumb) && vm.product.thumb !== '')) {
                vm.noErrors = false;
            }
            return vm.noErrors;
        }

        function updateProduct() {
            if (isValidForm()) {
                productsService.updateProduct(vm.product).then(function (response) {
                    if (response.success) {
                        toastService.toast('Product successfully updated');
                    }
                    else {
                        toastService.toast('An error has occurred, product cannot be updated');
                    }
                });
            }
            else {
                toastService.toast('You try to send an invalid form');
            }
        }
    }
})();