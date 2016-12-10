(function () {
    'use strict';

    angular
        .module('app.euro', [])
        .filter('euro', euro);

    function euro() {
        return euroFilter;

        ////////////////

        function euroFilter(price) {
            return price.replace('.', ',') + ' €';
        }
    }
})();