'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('CustomerCtrl', function ($scope, stkHttpService, $mdToast, $mdDialog, $compile) {
        $scope.defineAvailability = function(ev) {
            $scope.loading = true;
            $scope.showAdvanced(ev, 'defineAvailability');
            $scope.loading = false;
        };

        $scope.initCustomer = function() {
            $scope.loading = true;
            var stkService = stkHttpService.getCustomer();
            stkService.then(function(data) {
                $scope.response = data;
                if( $scope.response.data === 'failed') {
                    $mdToast.show({
                        theme       : 'error-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_customer_0_alert.html',
                        toastClass  : 'md-error-toast-theme'
                    });
                } else {
                    $scope.firstName = $scope.response.data[0].firstname;
                    $scope.lastName = $scope.response.data[0].lastname;
                    $scope.street = $scope.response.data[0].street;
                    $scope.plz = $scope.response.data[0].plz;
                    $scope.town = $scope.response.data[0].town;
                    if($scope.response.data[0].country === 'Deutschland') {
                        $scope.country = 'de';
                    } else if($scope.response.data[0].country === 'Schweiz') {
                        $scope.country = 'sui';
                    } else if($scope.response.data[0].country === 'Österreich') {
                        $scope.country = 'aut';
                    }

                    $scope.phone = $scope.response.data[0].phone;
                    $scope.emaila = $scope.response.data[0].email;
                }
            });
            $scope.loading = false;
        };

        $scope.showAdvanced = function(ev, kind) {
            switch(kind) {
                case 'defineAvailability':
                    $mdDialog.show({
                        controller: DialogAvailable,
                        templateUrl: 'views/dialogs/available.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
            }
        };

        function DialogAvailable($scope, $mdDialog, $compile,stkHttpService, $route) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
                $route.reload();
            };

            $scope.loadEvents = function(id) {
                if(id) {
                    $scope.availabilityLoader = true;
                    if($('#choseEvents')) {
                        $('#choseEvents').remove();
                    }

                    var stkService = stkHttpService.getCatEvents(id);
                    stkService.then(function(data) {
                        if(data) {
                            console.log(data);
                            var div = '<md-select id="choseEvents" ng-model="choseEvents"><md-option ng-value="first" selected>Event wählen</md-option>';
                            for(var index = 0; index < data.data.length; index++) {
                                if(data.data[index]) {
                                    div = div + '<md-option ng-click="loadAvailabilityTime();" ng-value="' + data.data[index].eventId + '">' + data.data[index].eventName + ' - ' + data.data[index].durationMin + ' Min</md-option>';
                                }
                            }

                            var div = div + '</md-select>';

                            var el = document.getElementById('catEvents');

                            angular.element(el).append($compile(div)($scope));
                        }
                    });

                    var stkService = stkHttpService.getCatEventsDreams(id,0);
                    stkService.then(function(data) {
                        if(data) {
                            console.log(data);
                            var div = '<md-select id="choseEvents" ng-model="choseEvents"><md-option ng-value="first" selected>Event wählen</md-option>';
                            for(var index = 0; index < data.data.length; index++) {
                                if(data.data[index]) {
                                    div = div + '<md-option ng-click="loadAvailabilityTime();" ng-value="' + data.data[index].eventId + '">' + data.data[index].eventName + ' - ' + data.data[index].durationMin + ' Min</md-option>';
                                }
                            }

                            var div = div + '</md-select>';

                            var el = document.getElementById('catEvents');

                            angular.element(el).append($compile(div)($scope));
                        }
                    });

                    $scope.availabilityLoader = false;
                }
            };

            $scope.loadAvailabilityTime = function() {
                $scope.availabilityLoader = true;
                if($('#choseAvailabilityTime')) {
                    $('#choseAvailabilityTime').remove();
                }

                var div = '<md-select id="choseAvailabilityTime" ng-model="choseAvailabilityTime"><md-option ng-value="first" selected>Zeit wählen</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="0">0 - 24h</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="1">0:00 - 6:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="2">6:00 - 8:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="3">8:00 - 10:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="4">10:00 - 12:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="5">12:00 - 14:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="6">14:00 - 16:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="7">16:00 - 18:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="8">18:00 - 20:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay();" ng-value="9">20:00 - 0:00</md-option>';


                var div = div + '</md-select>';

                var el = document.getElementById('availableTime');

                angular.element(el).append($compile(div)($scope));
                $scope.availabilityLoader = false;
            };

            $scope.loadAvailabilityDay = function() {
                $scope.availabilityLoader = true;
                if($('#choseAvailabilityDay')) {
                    $('#choseAvailabilityDay').remove();
                }

                var div = '<md-select id="choseAvailabilityDay" ng-model="choseAvailabilityDay" md-disabled><md-option ng-value="first" selected>Tag wählen</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="0">Montag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="1">Dienstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="2">Mittwoch</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="3">Donnerstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="4">Freitag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="5">Samstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace();" ng-value="6">Sonntag</md-option>';


                var div = div + '</md-select>';

                var el = document.getElementById('availableDay');

                angular.element(el).append($compile(div)($scope));

                $scope.availabilityLoader = false;
            };

            $scope.signinEvent = function(isValid,choseCategoryEvents,choseEvents,choseAvailabilityTime,choseAvailabilityDay,plz_place,chosePlaceCompass,price,roadPrice) {
                $scope.availabilityLoader = true;
                if(isValid) {
                    $scope.plzMessage = '';
                        var available = {};
                        available.catEvents = choseCategoryEvents;
                        available.eventId = choseEvents;
                        available.time = choseAvailabilityTime;
                        available.day = choseAvailabilityDay;
                        available.plz = plz_place;
                        available.compass = chosePlaceCompass;
                        available.price = price;
                    available.roadPrice = roadPrice;

                        var stkService = stkHttpService.postAvailability(available);
                        stkService.then(function(data) {
                            if(data.data.message === 'ok') {
                                if($('#avMessage')) {
                                    $('#avMessage').remove();
                                }

                                var div = '<div class="text-center" id="pe1_' + data.data.data.index +'" flex="15" flex-xs="100" flex-sm="50" flex-md="50">';
                                div = div + data.data.data.eventName;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="pe2_' + data.data.data.index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data.availableTime;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="pe3_' + data.data.data.index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data.availableDay;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="pe4_' + data.data.data.index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data.availablePlace + ' ' + data.data.data.radius;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="pe5_' + data.data.data.index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + '<span><strong>' + data.data.data.price.replace('.',',') + ' €</strong></span><br><span class="text-middle-small text-success">' + data.data.data.roadPrice.replace('.',',') + ' €</span>';
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="pe6_' + data.data.data.index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + '<md-icon md-svg-src="delete24" aria-label="Entfernen" ng-click="deleteEvent(' + data.data.data.index + ',' + choseCategoryEvents + ',' + data.data.data.eventId + ',\'' + data.data.data.availableTime + '\');"></md-icon>';
                                div = div + '</div>';
                                div = div + '</div>';

                                var el = document.getElementById('eventList');

                                angular.element(el).append($compile(div)($scope));

                                $scope.availabilityLoader = false;
                            } else if(data.data.message === 'plz') {
                                $scope.plzMessage = 'Deine Postleitzahl existiert nicht, neu eingeben.';
                                $scope.availabilityLoader = false;
                            }
                        });
                }
            };

            $scope.initEvents = function() {
                $scope.availabilityLoader = true;
                var stkService = stkHttpService.initEvents();
                stkService.then(function(data) {
                    if(data.data.message === 'ok') {
                        if(data.data.data) {
                            if(data.data.data.length > 0) {
                                for (var index = 0; index < data.data.data.length; index++) {
                                    var div = '<div class="text-center" id="pe1_' + index + '" flex="15" flex-xs="100" flex-sm="50" flex-md="50">';
                                    div = div + data.data.data[index].eventName;
                                    div = div + '</div>';
                                    div = div + '<div class="text-center" id="pe2_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                    div = div + data.data.data[index].availableTime;
                                    div = div + '</div>';
                                    div = div + '<div class="text-center" id="pe3_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                    div = div + data.data.data[index].availableDay;
                                    div = div + '</div>';
                                    div = div + '<div class="text-center" id="pe4_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                    div = div + data.data.data[index].availablePlace + ' ' + data.data.data[index].radius;
                                    div = div + '</div>';
                                    div = div + '<div class="text-center" id="pe5_' + index +'" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                    div = div + '<span><strong>' +  data.data.data[index].price.replace('.',',') + '</strong></span><br><span class="text-middle-small text-success">' + data.data.data[index].roadPrice.replace('.',',') + ' €</span>';
                                    div = div + '</div>';
                                    div = div + '<div class="text-center" id="pe6_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                    div = div + '<md-icon md-svg-src="delete24" class="material-icons" ng-click="deleteEvent(' + index + ',' + data.data.data[index].eventCategoryId + ',' + data.data.data[index].eventId + ',\'' + data.data.data[index].availableTime + '\');"></md-icon>';
                                    div = div + '</div>';

                                    var el = document.getElementById('eventList');

                                    angular.element(el).append($compile(div)($scope));
                                }
                            } else {
                                $scope.availableMessage = 'Keine eingetragenen Events gefunden.';
                            }
                        }

                        $scope.availabilityLoader = false;
                    }
                });
            };

            $scope.deleteEvent = function(id, mainId, eventId, timeA) {
                $scope.availabilityLoader = true;
                    var stkService = stkHttpService.deleteEvent(mainId,eventId, id, timeA);
                    stkService.then(function(data) {
                        if(data.data.message === 'ok') {
                            $('#pe1_' + id).remove();
                            $('#pe2_' + id).remove();
                            $('#pe3_' + id).remove();
                            $('#pe4_' + id).remove();
                            $('#pe5_' + id).remove();
                            $('#pe6_' + id).remove();
                            $scope.availabilityLoader = false;
                        }
                    });
            };
        };

        $scope.initNickName = function() {
            var stkService = stkHttpService.getNickNames();
            stkService.then(function(data1) {
                console.log(data1);
                $scope.nname = data1.data.data[0].nickname;
                $scope.nnameDescription = data1.data.data[0].nicknameDescription;
            });
        };

        $scope.saveNickName = function(isValid,name,description) {
            if(isValid) {
                $scope.availabilityLoader = true;
                var obj = {};
                obj.name = name;
                obj.description = description;
                var stkService = stkHttpService.saveNickNames(obj);
                stkService.then(function(data) {
                    if(data.data.message === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_nicknames_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_nicknames_0_alert.html',
                            toastClass  : 'md-error-toast-theme'
                        });
                    }
                    $scope.availabilityLoader = false;
                });
            }
        };

        $scope.initProfileLinks = function() {
            $scope.availabilityLoader = true;
            var stkService = stkHttpService.initProfileLinks();
            stkService.then(function(data) {
                console.log(data);
                $scope.fbl = data.data.data[0].fbl;
                $scope.twl = data.data.data[0].twl;
                $scope.inl = data.data.data[0].inl;
                $scope.availabilityLoader = false;
            });
        };

        $scope.initEvents = function() {
            $scope.availabilityLoader = true;
            var stkService = stkHttpService.initEvents();
            stkService.then(function(data) {
                if(data.data.message === 'ok') {
                    if(data.data.data) {
                        if(data.data.data.length > 0) {
                            for(var index = 0; index < data.data.data.length;index++) {
                                var div = '<div class="text-center" id="e1_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data[index].mainCategory;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="e2_' + index + '" flex="15" flex-xs="100" flex-sm="50" flex-md="50">';
                                div = div + data.data.data[index].eventName;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="e3_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data[index].availableTime;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="e4_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data[index].availableDay;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="e5_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + data.data.data[index].availablePlace + ' ' + data.data.data[index].radius;
                                div = div + '</div>';
                                div = div + '<div class="text-center" id="e6_' + index + '" flex-xs="100" flex="15" flex-sm="50" flex-md="50">';
                                div = div + '<span><strong>' +  data.data.data[index].price.replace('.',',') + ' €</strong></span><br><span class="text-middle-small text-success">' + data.data.data[index].roadPrice.replace('.',',') + ' €</span>';
                                div = div + '</div>';

                                var el = document.getElementById('availableEvents');

                                angular.element(el).append($compile(div)($scope));
                            }
                        } else {
                            $scope.availableMessage = 'Keine eingetragenen Events gefunden.';
                        }
                    }

                    $scope.availabilityLoader = false;
                }
            });
        };

        $scope.saveProfiles = function(isValid,fbl,twl,inl) {
            if(isValid) {
                $scope.loading = true;
                var profiles = {};
                profiles.fb = fbl;
                profiles.tw = twl;
                profiles.in = inl;
                var stkService = stkHttpService.saveSocialProfiles(profiles);
                stkService.then(function(data) {
                    $scope.response = data;
                    if( $scope.response.data.message === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_profiles_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_profiles_0_alert.html',
                            toastClass  : 'md-error-toast-theme'
                        });
                    }
                });
                $scope.loading = false;
            }
        };

        $scope.initAddresses = function() {
            $scope.loading = true;
            var stkService = stkHttpService.getCustomerAddresses();
            stkService.then(function(data) {
                $scope.response = data;
                if( $scope.response.data === 'failed') {
                    $mdToast.show({
                        theme       : 'error-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_customer_0_alert.html',
                        toastClass  : 'md-error-toast-theme'
                    });
                } else {
                    $scope.addresses = $scope.response.data;
                }
            });
            $scope.loading = false;
        };

        $scope.submitCustomer = function(isValid,firstName, lastName, street, plz, town, country, phone, emaila) {
            $scope.loading = true;
            if (isValid) {

                var customerData = {};
                customerData.firstname = firstName;
                customerData.lastname = lastName;
                customerData.street = street;
                customerData.plz = plz;
                customerData.town = town;

                if(country === 'de') {
                    customerData.country = 'Deutschland';
                } else if(country === 'sui') {
                    customerData.country = 'Schweiz';
                } else if(country === 'aut') {
                    customerData.country = 'Österreich';
                }

                customerData.phone = phone;
                customerData.email = emaila;
                console.log(customerData);

                if(customerData) {
                    var stkService = stkHttpService.sendCustomer(customerData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        console.log($scope.response);

                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_customer_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });

                            $scope.initCustomer();
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_customer_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }
                    });
                }
            }

            $scope.loading = false;
        };

        $scope.submitAddress = function(isValid,a_firstName,a_lastName,a_street,a_plz,a_town,a_country) {
            $scope.loading = true;
            if (isValid) {
                var customerData = {};
                customerData.firstname = a_firstName;
                customerData.lastname = a_lastName;
                customerData.street = a_street;
                customerData.plz = a_plz;
                customerData.town = a_town;

                if(a_country === 'de') {
                    customerData.country = 'Deutschland';
                } else if(a_country === 'sui') {
                    customerData.country = 'Schweiz';
                } else if(a_country === 'aut') {
                    customerData.country = 'Österreich';
                }

                if(customerData) {
                    var stkService = stkHttpService.sendCustomerAddress(customerData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        console.log($scope.response);

                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_customer_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });

                            $scope.initAddresses();
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_customer_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }


                    });
                }

            }

            $scope.loading = false;
        };
    });
