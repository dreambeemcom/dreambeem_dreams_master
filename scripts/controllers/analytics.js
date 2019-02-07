'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('AnalyticsCtrl', function ($scope, $mdSidenav, $http, stkHttpService, $window, $location) {

        $scope.columnNames = [
            { name: 'Id', icon: 'callsplit24' },
            { name: 'Käufer', icon: 'name24' },
            { name: 'Menge', icon: 'explore24' },
            { name: 'Produkt', icon: 'shoppingbasket24' },
            { name: 'Bild', icon: 'camera24' },
            { name: 'Datum', icon: 'time24' },
            { name: 'Status', icon: 'status24' }
        ];

        $scope.items = ['online', 'offline'];
        $scope.selected = [];

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.submitFilterDate = function(fromDate) {
            $scope.loading = true;
            if ($scope.filterDate.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterStatus = function(status) {
            $scope.loading = true;
            if ($scope.filterStatus.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterPerson = function(person) {
            $scope.loading = true;
            if ($scope.filterPerson.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };
    });
