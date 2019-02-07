'use strict';

angular.module('customerDreambeemcomApp')
    .controller('Assessment1Ctrl', function ($scope, $mdSidenav, $http, stkHttpService, $mdDialog, $route, $mdToast) {

        $scope.doAssessment = function(ev,bid) {
            $scope.assessmentLoader = true;
            $mdDialog.show({
                templateUrl: 'views/dialogs/assessment.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                preserveScope: true,
                locals: { bid: bid },
                controller: ['$scope', 'bid', function($scope, bid) {
                    $scope.bid = bid;

                    $scope.assessmentData = [{
                        id: "assessmentVeryDissatisfiedEvent24",
                        title: 'Sehr unzufrieden',
                        value: '5'
                    },{
                        id: "assessmentDissatisfiedEvent24",
                        title: 'Unzufrieden',
                        value: '4'
                    },{
                        id: "assessmentNeutralEvent24",
                        title: 'Neutral',
                        value: '3'
                    },{
                        id: "assessmentSatisfiedEvent24",
                        title: 'Zufrieden',
                        value: '2'
                    },{
                        id: "assessmentVerySatisfiedEvent24",
                        title: 'Sehr zufrieden',
                        value: '1'
                    }];

                    $scope.makeAssessment = function(ev,bid) {
                        if(bid && $scope.assass && $scope.assessmentText && $scope.assessmentBookingsDreamMoney && $scope.assessmentBookings[0].bookingPrice) {

                            var obj = {};
                            
                            obj.bid = bid;
                            obj.assass = $scope.assass;
                            obj.assessmentText = $scope.assessmentText;
                            obj.assessmentBookingsDreamMoney = $scope.assessmentBookingsDreamMoney;
                            obj.assessmentBookingsPrice = $scope.assessmentBookings[0].bookingPrice;
                            obj.bookedPersonId = $scope.assessmentBookings[0].bookedPersonId;
                            obj.bookedIdKind = $scope.assessmentBookings[0].bookedIdKind;

                            var stkService = stkHttpService.makeAssessment(obj);
                            stkService.then(function(data) {
                                if(data.data.message === 'ok') {
                                    $mdToast.show({
                                        theme       : 'success-toast',
                                        hideDelay   : 3000,
                                        position    : 'top',
                                        controller  : 'ToastCtrl',
                                        templateUrl : 'views/toasts/toast_made_assessment_1_alert.html',
                                        toastClass  : 'md-success-toast-theme'
                                    });

                                    $mdDialog.cancel();
                                    $route.reload();
                                }
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_assessment_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    };

                    $scope.getAssessmentBooking = function() {
                        var stkService = stkHttpService.getAssBooking(bid);
                        stkService.then(function(data) {
                            if(data.data.message === 'ok') {
                                $scope.assessmentBookings = data.data.data;

                                $scope.openBookingBookingId = [];

                                if($scope.assessmentBookings) {
                                    for(var index = 0; index < $scope.assessmentBookings.length; index++) {
                                        $scope.assessmentBookings[index].bookingPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.data[index].bookingPrice);
                                        $scope.openBookingBookingId[index] = $scope.assessmentBookings[index].bookingId;
                                        $scope.bid = $scope.assessmentBookings[index].bookingId;
                                        $scope.bookedPersonId = $scope.assessmentBookings[index].bookedPersonId;
                                        $scope.bookedIdKind = $scope.assessmentBookings[index].bookedIdKind;
                                        $scope.assessmentBookings[index].bId = $scope.assessmentBookings[index].bookingId.substr(0,$scope.assessmentBookings[index].bookingId.indexOf('.'));
                                    }
                                }

                                var bp = parseFloat(data.data.data[0].bookingPrice.replace('€',''));
                                var dreamPercent = parseFloat((bp / 100) * 80);
                                $scope.assessmentBookingsDreamMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dreamPercent);
                            } else {

                            }
                        });
                    };

                    $scope.hide = function() {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    $scope.reloadRoute = function() {
                        $mdDialog.hide();
                    }
                }]
            })
                .then(function(data) {


                });
            $scope.assessmentLoader = false;
        };

        $scope.getAcceptedBookings = function() {
            var stkService = stkHttpService.getAcceptedBookings();
            stkService.then(function (data) {
                if(data.data.message === 'ok') {

                    $scope.assessmentBookings = data.data.data;

                    $scope.openBookingBookingId = [];

                    if($scope.assessmentBookings) {
                        for(var index = 0; index < $scope.assessmentBookings.length; index++) {
                            $scope.assessmentBookings[index].bookingPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.data[index].bookingPrice);
                            $scope.openBookingBookingId[index] = $scope.assessmentBookings[index].bookingId;
                            $scope.assessmentBookings[index].bId = $scope.assessmentBookings[index].bookingId.substr(0,$scope.assessmentBookings[index].bookingId.indexOf('.'));
                        }
                    }
                } else {
                    $scope.assessmentBookingMessage = 'Keine getätigten Buchungen vorhanden.';
                }
            });
        };

        $scope.getValuedBookings = function() {
            var stkService = stkHttpService.getValuedBookings();
            stkService.then(function (data) {
                if(data.data.message === 'ok') {

                    $scope.valuedBookings = data.data.data;

                    $scope.openBookingBookingId = [];

                    if($scope.valuedBookings) {
                        for(var index = 0; index < $scope.valuedBookings.length; index++) {
                            $scope.valuedBookings[index].bookingPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.data[index].bookingPrice);
                            $scope.openBookingBookingId[index] = $scope.valuedBookings[index].bookingId;
                            $scope.valuedBookings[index].bId = $scope.valuedBookings[index].bookingId.substr(0,$scope.valuedBookings[index].bookingId.indexOf('.'));
                        }
                    }


                } else {
                    $scope.valuedBookingMessage = 'Keine getätigten Bewertungen vorhanden.';
                }
            });
        };
    });
