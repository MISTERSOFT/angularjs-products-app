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
                    vm.slides = response.result.slice(0, vm.getOnlyXProducts);
                    console.log(vm.slides);
                }
                return vm.slides;
            });
        }
    }
})();