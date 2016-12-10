(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [];
    function DashboardController() {
        var vm = this;

        vm.title = "dashboard";

        activate();

        ////////////////

        function activate() { }
    }
})();