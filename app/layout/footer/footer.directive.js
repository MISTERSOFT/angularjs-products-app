(function() {
    'use strict';

    angular
        .module('app.footer')
        .directive('appFooter', appFooter);

    function appFooter() {

        var directive = {
            bindToController: true,
            controller: FooterController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/footer/footer.directive.html',
            link: link,
            restrict: 'E',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }

    }

    FooterController.$inject = [];
    /* @ngInject */
    function FooterController () {
        
    }
})();