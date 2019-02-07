'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('PurchasesCtrl', function ($scope, stkHttpService) {
        $scope.initPurchases = function() {
            $scope.sellsLoader = true;

            var stkService = stkHttpService.getPurchases();
            stkService.then(function(data) {
                if(data.data) {

                    $scope.purchases = data.data;

                    for(var index = 0; index < $scope.purchases.length; index++) {
                        for(var jindex = 0; jindex < parseInt(data.data[index]['pio'].pLength); jindex++) {
                            $scope.purchases[index][jindex].productPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index][jindex].productPrice);
                        }
                        $scope.purchases[index]['pio'].sumAll = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index]['pio'].sumAll);
                        $scope.purchases[index]['pio'].sumShipping = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index]['pio'].sumShipping);
                    }

                } else {
                    $scope.purchasesMessage = 'Keine Käufe vorhanden.';
                }
            });

            $scope.sellsLoader = false;
        };

        $scope.exportCSV = function() {
            alert('CSV Export');
        };
    });