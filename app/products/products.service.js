(function () {
    'use strict';

    angular
        .module('app.products')
        .service('productsService', productsService);

    productsService.$inject = ['$http', 'toastService'];
    function productsService($http, toastService) {

        var service = {
            getProducts: getProducts,
            getProductById: getProductById
        };

        return service;

        ////////////////

        function getProducts() {
            return $http
                .get('http://localhost:3001/products')
                .then(success)
                .catch(error);
        }

        function getProductById(id) {
            return $http
                .get('http://localhost:3001/products/' + id)
                .then(success)
                .catch(error);
        }

        function success(response) {
            return response.data;
        }

        function error(e) {
            toastService.toast('Erreur lors du chargement d\'un ou plusieurs produits');
            console.log('From homeService : ', e);
        }
    }
})();