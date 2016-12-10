(function () {
    'use strict';

    angular
        .module('app.carousel')
        .directive('carousel', carousel);

    function carousel() {

        var directive = {
            bindToController: true,
            controller: CarouselController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/carousel/carousel.directive.html',
            link: link,
            restrict: 'E',
            scope: {
                slides: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    CarouselController.$inject = ['jQuery'];
    /* @ngInject */
    function CarouselController(jQuery) {

        var vm = this;

        // members
        vm.carouselOptions = {
            time_constant: 300,
            full_width: true,
            indicators: true,
            no_wrap: true // TODO : A voir
        };


        activate();

        function activate() {
            jQuery('.carousel').carousel(vm.carouselOptions);
        }

    }
})();