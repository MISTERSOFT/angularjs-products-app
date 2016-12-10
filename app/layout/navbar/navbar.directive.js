(function() {
    'use strict';

    angular
        .module('app.navbar')
        .directive('navbar', navbar);

    navbar.$inject = [];
    function navbar() {
        
        var directive = {
            bindToController: true,
            controller: NavbarController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/navbar/navbar.directive.html',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }

    }

    NavbarController.$inject = ['$rootScope', '$location'];
    /* @ngInject */
    function NavbarController ($rootScope, $location) {
        var vm = this;

        // members
        vm.currentUrl = '';
        
        // methods
        vm.isDashboard = isDashboard;
        vm.isProducts = isProducts;


        activate();


        function activate() {
            getCurrentUrl();
            $rootScope.$on('routeChangeSuccess', function() {
                getCurrentUrl();
            });
        }

        function getCurrentUrl() {
            vm.currentUrl = $location.url();
        }

        function isDashboard() {
            return vm.currentUrl === '/';
        }

        function isProducts() {
            return vm.currentUrl === '/products';
        }
    }
})();