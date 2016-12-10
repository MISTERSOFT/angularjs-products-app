(function () {
    'use strict';

    angular
        .module('app.toast')
        .service('toastService', toastService);

    toastService.$inject = ['Materialize'];
    function toastService(Materialize) {

        var toastTimeout = 5000;

        var service = {
            toast: toast
        };

        return service;

        ////////////////

        function toast(message) {
            Materialize.toast(message, toastTimeout);
        }

    }
})();