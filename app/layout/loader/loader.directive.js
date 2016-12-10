(function() {
    'use strict';

    angular
        .module('app.loader')
        .directive('loader', loader);

    function loader() {

        var directive = {
            bindToController: true,
            controller: LoaderController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/loader/loader.directive.html',
            link: link,
            restrict: 'E',
            scope: {
                canShow: '='
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }

    }

    LoaderController.$inject = [];
    /* @ngInject */
    function LoaderController () {
        
    }
})();