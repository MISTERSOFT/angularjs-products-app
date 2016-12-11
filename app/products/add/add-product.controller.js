(function() {
'use strict';

    angular
        .module('app.products')
        .controller('AddProductController', AddProductController);

    AddProductController.$inject = [
        'productsService',
        'toastService',
        '$location'
    ];
    function AddProductController(productsService, toastService, $location) {
        var vm = this;
        
        // members
        vm.newProduct = {
            color: '',
            department: '',
            image: '',
            thumb: '',
            material: '',
            price: '',
            title: '',
            description: ''
        };
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
        vm.canShowLoader = false;

        // methods
        vm.save = save;

        activate();

        ////////////////

        function activate() { }

        function isValidForm() {
            vm.noErrors = true;
            // Check price
            if (!vm.priceRegexPattern.test(vm.newProduct.price)) {
                vm.noErrors = false;
            }
            // Check if URLs are valid
            if ((!vm.urlRegexPattern.test(vm.newProduct.image) && vm.newProduct.image !== '') || (!vm.urlRegexPattern.test(vm.newProduct.thumb) && vm.newProduct.thumb !== '')) {
                vm.noErrors = false;
            }
            return vm.noErrors;
        }

        function save() {
            if (isValidForm()) {
                vm.canShowLoader = true;
                productsService.addProduct(vm.newProduct).then(function(response) {
                    vm.canShowLoader = false;
                    if (response.success) {
                        toastService.toast('New product successfully saved !');
                        $location.path('/products');
                    }
                });
            }
            else {
                toastService.toast('You try to send an invalid form');
            }
        }
    }
})();