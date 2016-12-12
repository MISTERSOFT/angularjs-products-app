(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'homeService', 'toastService'];
    function HomeController($q, homeService, toastService) {
        var vm = this;

        vm.title = "Home";
        vm.slides = [];
        vm.getOnlyXProducts = 5; 

        activate();

        ////////////////

        function activate() {
            var promises = [
                getProductsForCarousel()
            ];

            $q.all(promises).then(function() {
                toastService.toast('Home loaded');
            });
        }

        function getProductsForCarousel() {
            return homeService.getProducts().then(function(response) {
                if (response.success) {
                    // Take only X products for the array
                    vm.slides = response.result.slice(0, vm.getOnlyXProducts);

                    // Format ID because we will us them as URL | We don't need it elsewhere
                    for (var i = 0; i < vm.slides.length; i++) {
                        vm.slides[i]._id = formatUrl(vm.slides[i]._id);
                    }
                }
                return vm.slides;
            });
        }

        function formatUrl(productId) {
            return productId.replace('/', '/edit/');
        }
    }
})();