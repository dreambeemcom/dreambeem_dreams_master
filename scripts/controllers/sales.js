'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('SalesCtrl', function ($scope, stkHttpService) {
        $scope.initSales = function() {
            var stkService = stkHttpService.getSales();
            stkService.then(function (data) {
                if(data.data.length > 0) {
                    $scope.sales = data.data;

                    var ownerMargeFull = 0.00;
                    var sumAllFull = 0.00;
                    for(var index = 0;index < $scope.sales.length;index++) {
                        if($scope.sales[index].ownerMarge) {
                            ownerMargeFull = parseFloat(ownerMargeFull) + parseFloat($scope.sales[index].ownerMarge);
                            $scope.sales[index].ownerMarge = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.sales[index].ownerMarge);
                        }

                        if($scope.sales[index].sumAll) {
                            sumAllFull = parseFloat(sumAllFull) + parseFloat($scope.sales[index].sumAll);
                            $scope.sales[index].sumAll = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.sales[index].sumAll);
                        }
                    }

                    $scope.sumAllFull = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(sumAllFull);
                    $scope.ownerMargeFull = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ownerMargeFull);
                } else {
                    $scope.salesMessage = 'Keine Verkäufe vorhanden.';
                }
            });
        };

        $scope.exportCSV = function() {
            alert('CSV Export');
        };
    });