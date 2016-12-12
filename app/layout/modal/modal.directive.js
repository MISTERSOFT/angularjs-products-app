(function () {
    'use strict';

    angular
        .module('app.modal')
        .directive('modalbox', modalbox);

    function modalbox() {
        var directive = {
            bindToController: true,
            controller: ModalBoxController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/modal/modal.directive.html',
            link: link,
            transclude: true,
            restrict: 'A',
            scope: {
                modalId: '=',
                modalTitle: '=',
                modalContent: '=',
                modalButtonsConfig: '=',
                productId: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            console.log(element);
            element.on('click', function (e) {
                e.preventDefault();
                jQuery('.modal').modal({
                    ready: function (modal, trigger) {
                        console.log('Modal Ready');
                        console.log(modal, trigger);
                    },
                    complete: function () {
                        console.log('Modal Complete');
                    }
                });
            });
        }
    }

    ModalBoxController.$inject = ['$scope'];
    /* @ngInject */
    function ModalBoxController($scope) {
        /**
         * Buttons configurations exemple
         */
        // [
        //     {
        //         text: 'OK',
        //         wavesColor: 'grey',
        //         callback: function() {}
        //     }
        // ];
        var vm = this;

        // methods
        vm.done = done;

        activate();

        function activate() {
            $scope.$watch('vm.modalButtonsConfig', function (value) {
                if (value) {
                    for (var i = 0; i < vm.modalButtonsConfig.length; i++) {
                        fillEmptyPropertyButtonsConfig(i, 'text', 'Default Text Button');
                        fillEmptyPropertyButtonsConfig(i, 'wavesColor', 'grey');
                        fillEmptyPropertyButtonsConfig(i, 'callback', function (v) {return;});
                    }
                }
            });
        }

        function fillEmptyPropertyButtonsConfig(index, propertyName, value) {
            if (!vm.modalButtonsConfig[index].hasOwnProperty(propertyName)) {
                vm.modalButtonsConfig[i][propertyName] = value;
            }
        }

        function done(callback) {
            // console.log('callback ', callback);
            callback(vm.productId);
        }
    }
})();