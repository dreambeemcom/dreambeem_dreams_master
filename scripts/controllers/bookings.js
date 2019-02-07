'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('BookingsCtrl', function ($scope, $mdSidenav, stkHttpService, $window, $location) {

        $scope.getBookings = function() {
            var stkService = stkHttpService.getOpenBookings();
            stkService.then(function (data) {
                if(data.data.message === 'ok') {

                    $scope.openBookings = data.data.data;

                    $scope.openBookingBookingId = [];

                    for(var index = 0; index < $scope.openBookings.length; index++) {
                        $scope.openBookings[index].bookingPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.data[index].bookingPrice);
                        $scope.openBookingBookingId[index] = $scope.openBookings[index].bookingId;
                        $scope.openBookings[index].bookingId = $scope.openBookings[index].bookingId.substr(0,$scope.openBookings[index].bookingId.indexOf('.'));
                    }

                } else {
                    $scope.openBookingMessage = 'Keine offenen Buchungen vorhanden.';
                }
            });

            var stkService = stkHttpService.getDoneBookings();
            stkService.then(function (data) {
                if(data.data.message === 'ok') {

                    $scope.doneBookings = data.data.data;

                    $scope.doneBookingBookingId = [];

                    for(var index = 0; index < $scope.doneBookings.length; index++) {
                        $scope.doneBookings[index].bookingPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.data[index].bookingPrice);
                        $scope.doneBookingBookingId[index] = $scope.doneBookings[index].bookingId;
                        $scope.doneBookings[index].bookingId = $scope.doneBookings[index].bookingId.substr(0,$scope.doneBookings[index].bookingId.indexOf('.'));
                    }

                } else {
                    $scope.doneBookingMessage = 'Keine getätigten Buchungen vorhanden.';
                }
            });
        }
    });
