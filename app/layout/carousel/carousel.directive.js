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

    CarouselController.$inject = ['jQuery', '$scope', '$timeout', '$interval'];
    /* @ngInject */
    function CarouselController(jQuery, $scope, $timeout, $interval) {

        var vm = this;

        activate();

        function activate() {
            $scope.$watch('vm.slides', function (value) {
                $timeout(function () {
                    jQuery('.slider').slider();
                }, 300);
            });
        }

    }
})();