'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('ContactCtrl', function ($scope, $location, stkHttpService, $mdToast) {
        $scope.sendMessage = function(isValid, name,email,nmessage) {
            if(isValid) {
                $scope.loading = true;

                var contact = {};
                contact.name = name;
                contact.email = email;
                contact.message = nmessage;

                var stkService = stkHttpService.sendMessage(contact);
                stkService.then(function(data) {
                    if(data.data === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_contact_alert_1.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                         theme       : 'error-toast',
                         hideDelay   : 3000,
                         position    : 'top',
                         controller  : 'ToastCtrl',
                         textContent : $scope.response.data,
                         templateUrl : 'views/toasts/toast_contact_alert_0.html',
                         toastClass  : 'md-error-toast-theme'
                         });
                    }
                });

                $scope.loading = false;
            }
        };
    });