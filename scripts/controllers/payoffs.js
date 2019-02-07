'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('PayoffsCtrl', function ($scope, $mdToast, stkHttpService) {
        $scope.initPayoffsInformation = function() {
            var stkService = stkHttpService.getPayoffsInformation();
            stkService.then(function (data) {
                if(data) {
                    $scope.bankaccountName = data.data[0].holderName;
                    $scope.bank = data.data[0].bank;
                    $scope.iban = data.data[0].iban;
                    $scope.bic = data.data[0].bic;
                    $scope.paypalemail = data.data[0].paypalemail;
                }
            });
        };

        $scope.submitPayoffsInformation = function(isValid,holderName,bank,iban,bic,paypalemail) {
            if(isValid) {
                var payoffInformationData = {};
                payoffInformationData.holderName = holderName;
                payoffInformationData.bank = bank;
                payoffInformationData.iban = iban;
                payoffInformationData.bic = bic;
                payoffInformationData.paypalemail = paypalemail;

                if(payoffInformationData) {
                    var stkService = stkHttpService.postPayoffsInformation(payoffInformationData);
                    stkService.then(function(data1) {
                        if(data1.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 2500,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_payoffsInformation_alert_1.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    });
                }
            }
        };

        $scope.payAmount = function() {
            if($scope.amount) {
                var stkService = stkHttpService.postPayAmount($scope.amount,$scope.payoffOptions);
                stkService.then(function (data) {
                    if(data.data === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 2500,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_payoffok_alert_1.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 2500,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_payoffok_alert_0.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });
            } else {
                $mdToast.show({
                    theme       : 'success-toast',
                    hideDelay   : 2500,
                    position    : 'top',
                    controller  : 'ToastCtrl',
                    templateUrl : 'views/toasts/toast_payoff_alert_0.html',
                    toastClass  : 'md-success-toast-theme'
                });
            }
        };

        $scope.initPayoffs = function() {
            var stkService = stkHttpService.getPayments();
            stkService.then(function (data) {
                $scope.nextPayoff = data.nextPayoff;
                $scope.sum = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.sum);
                if(data.data.length > 0) {
                    console.log(data);
                    $scope.payoffs = data.data;


                    for(var index = 0;index < $scope.payoffs.length;index++) {
                        if($scope.payoffs[index].amount) {
                            $scope.payoffs[index].amount = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.payoffs[index].amount);
                        }
                    }

                } else {
                    $scope.payoffMessage = 'Keine Auszahlungen vorhanden.';
                }
            });
        };

        $scope.exportCSV = function() {
            alert('CSV Export');
        };
    });