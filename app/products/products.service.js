(function () {
    'use strict';

    angular
        .module('app.products')
        .service('productsService', productsService);

    productsService.$inject = ['$http', 'toastService'];
    function productsService($http, toastService) {

        var url = 'http://localhost:3001/products/';

        var service = {
            getProducts: getProducts,
            getProductById: getProductById,
            updateProduct: updateProduct,
            addProduct: addProduct,
            deleteProduct: deleteProduct
        };

        return service;

        ////////////////

        function success(response) {
            return response.data;
        }

        function error(e) {
            toastService.toast('An error has occurred during product(s) loading');
            console.log('From productsService : ', e);
        }

        function getProducts() {
            return $http
                .get(url)
                .then(success)
                .catch(error);
        }

        function getProductById(id) {
            return $http
                .get(url + id)
                .then(success)
                .catch(error);
        }

        function updateProduct(product) {
            return $http
                .put(url, product)
                .then(success)
                .catch(function (e) {
                    toastService.toast('An error has occured, not able to update the product');
                    console.log('From productsService : ', e);
                });
        }

        function addProduct(product) {
            return $http
                .post(url, product)
                .then(success)
                .catch(function(e) {
                    toastService.toast('An error has occured, not able to save the new product');
                    console.log('From productsService : ', e);
                });
        }

        function deleteProduct(productId) {
            var id = productId.replace('products/', '');
            return $http
                .delete(url + id)
                .then(success)
                .catch(function(e) {
                    toastService.toast('An error has occured, not able to delete the product');
                    console.log('From productsService : ', e);
                });
        }
    }
})();