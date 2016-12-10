(function () {
    'use strict';

    angular
        .module('app.home')
        .service('homeService', homeService);

    homeService.$inject = ['$http', 'toastService'];
    function homeService($http, toastService) {

        var service = {
            getProducts: getProducts
        };

        return service;

        ////////////////

        function getProducts() {
            return $http
                .get('http://localhost:3001/products')
                .then(success)
                .catch(error);
        }

        function success(response) {
            toastService.toast('Les produits ont bien été récupéré');
            return response.data;
        }

        function error(e) {
            toastService.toast('Erreur, les products n\'ont pas été récupéré');
            console.log('From homeService : ', e);
        }
    }
})();