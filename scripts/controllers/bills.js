'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('BillsCtrl', function ($scope, $mdSidenav, $http, stkHttpService, $window, $location) {

        $scope.columnNames = [
            { name: 'Id', icon: 'callsplit24' },
            { name: 'Leistung', icon: 'performance24' },
            { name: 'Betrag', icon: 'amount24' },
            { name: 'Datum', icon: 'time24' },
            { name: 'Status', icon: 'status24' }
        ];

        $scope.submitFilterDate = function(fromDate) {
            $scope.loading = true;
            if ($scope.filterDate.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterDreambeem = function() {
            $scope.loading = true;
            if ($scope.filterDreambeem.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterFurnybeem = function() {
            $scope.loading = true;
            if ($scope.filterFurnybeem.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterProductbeem = function() {
            $scope.loading = true;
            if ($scope.filterProductbeem.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };
    });
