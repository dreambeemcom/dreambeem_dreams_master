'use strict';

angular.module('customerDreambeemcomApp')
    .controller('BookingCtrl', function ($scope, $mdSidenav, $http, stkHttpService, $mdDialog, $mdToast, $compile, $route, $rootScope) {
        $scope.quantity = 0;
        $scope.dreamsUsers = [];

        $scope.bookDreamUser = function(ev,bookedId,kind1) {
            var startId = $('#bookingStart').attr('placeIdStart');
            var destinationId = $('#bookingAim').attr('placeIdAim');
            if($scope.bookerId && bookedId && $scope.choseAvailabilityTimeBooking1 && $scope.bookingDate && $scope.choseEventsBooking1 && $scope.choseCategoryEventsBookingb && $scope.bookingPrice) {
                var bookingObj = {};
                bookingObj.bookerId = $scope.bookerId;
                bookingObj.bookedPersonId = bookedId;
                bookingObj.bookedIdKind = kind1;
                bookingObj.destinationId = destinationId;
                bookingObj.startId = startId;
                bookingObj.destinationName = $('#bookingAim').val();
                bookingObj.startName = $('#bookingStart').val();
                bookingObj.timeBooking = $scope.choseAvailabilityTimeBooking1;
                bookingObj.dateBooking = $scope.bookingDate;
                bookingObj.eventBooking = $scope.choseEventsBooking1;
                bookingObj.eventCategoryBooking = $scope.choseCategoryEventsBookingb;
                bookingObj.priceBooking = $scope.bookingPrice;

                var stkService = stkHttpService.postBooking(bookingObj);
                stkService.then(function(dataB) {
                    if(dataB.data.answer === 'ok') {
                        var we = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dataB.data.walletEuro);
                        $('#walletEuro').text(we);
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'views/dialogs/bookingNew.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose:true,
                            targetEvent: ev,
                        })
                            .then(function(data) {


                            });

                    } else if(dataB.data.answer === 'failedMoney') {
                    	$mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_booking_alert_$.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    	
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_booking_alert_0.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });
            } else {
                alert('34556');
            }
        };

        $scope.searchNames = function(name) {
            if(name) {
                $scope.loading = true;
                var stkService = stkHttpService.postNameSearch(name);
                stkService.then(function (data1) {
                    if(data1.data.message === 'ok') {

                        $scope.items = data1.data.data;

                        var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                        var el = document.getElementById('dreamsList');

                        angular.element(el).append($compile(div)($scope));

                        $scope.loading = false;
                    }
                });
            }
        };

        $scope.dream = function(ev,nickname,pic,id,kind1) {
            if(nickname && pic && id && kind1) {
                if($('#dreamBooking').children()) {
                    $('#dreamBooking').children().remove();
                    $scope.start ='';
                    $scope.aim ='';
                }

                var stkService = stkHttpService.getUserdata();
                stkService.then(function(dataU) {
                    $scope.fullname = dataU.data.data.fullname;
                    $scope.profilePic = dataU.data.data.profilePic;
                    $scope.kind = dataU.data.data.kind;
                    $scope.bookerId = dataU.data.data.customerid;

                    $scope.book = ' bucht ';

                    var s = document.getElementById('destination-input').value;

                    if(s.length > 0) {
                        $scope.start = s;
                    } else {
                        $scope.start ='';
                    }

                    var a = document.getElementById('origin-input').value;

                    if(a.length > 0) {
                        $scope.aim = a;
                    } else {
                        $scope.aim = '';
                    }

                    var div = '<div flex="20" flex-md="33" flex-sm="33" flex-xs="100"><strong>' + $scope.fullname + '</strong><br><img on-error-src="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" src="' + $scope.profilePic + '"><span><strong class="md-padding text-big">' + $scope.book + '</strong></span></div>';
                    div = div + '<div flex="20" flex-md="33" flex-sm="33" flex-xs="100"><strong>' + nickname + '</strong><br><img src="' + pic + '" on-error-src="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"><span><strong class="md-padding text-big">nach</strong></span></div>';
                    div = div + '<div flex="20" flex-md="33" flex-sm="33" flex-xs="100"><md-input-container><input id="bookingStart" type="text" placeholder="Start" placeIdStart="" ng-model="start"></md-input-container><md-input-container><input id="bookingAim" type="text" placeIdAim="" placeholder="Ziel" ng-model="aim"></md-input-container></div>';
                    div = div + '<div flex="20" flex-md="33" flex-sm="33" flex-xs="100"><label>Buchungsdetails</label><md-select id="choseCategoryEventsBookingb" ng-model="choseCategoryEventsBookingb"><md-option ng-value="first">Kategorie wählen</md-option> <md-option ng-click="loadEvents1(1);" ng-value="1">Allgemeine Treffen</md-option> <md-option ng-click="loadEvents1(2);" ng-value="2">Sporttreffen</md-option> <md-option ng-click="loadEvents1(3);" ng-value="3">Bildungstreffen</md-option> <md-option ng-click="loadEvents1(4);" ng-value="4">Fototreffen</md-option> <md-option ng-click="loadEvents1(5);" ng-value="5">Tanztreffen</md-option></md-select><div id="catEventsBooking1"></div><div id="availableTimeBooking1"></div><div id="availablePriceBooking1"></div></div>';
                    div = div + '<div flex="20" flex-md="33" flex-sm="33" flex-xs="100"><md-button ng-click="bookDreamUser($event,' + id + ',\'' + kind1 + '\');" class="md-button md-raised md-warn">Buchen</md-button></div>';

                    var el = document.getElementById('dreamBooking');

                    angular.element(el).append($compile(div)($scope));
                });
            }
        };

        $scope.bookDream = function(ev,nickname,pic, id, kind1, fbl,twl,inl) {
            $scope.profileLoader = true;
            $rootScope.fbl = fbl;
            $rootScope.twl = twl;
            $rootScope.inl = inl;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/dialogs/profiles.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                scope: $scope,
                preserveScope: true,
                onComplete: $scope.dream(ev,nickname,pic, id, kind1)
            })
                .then(function(data) {


                });
            $scope.profileLoader = false;
        };

        function DialogController($scope, $mdDialog) {

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.reloadRoute = function() {
                $mdDialog.hide();
            }
        };

        $scope.loadDreamsUser = function() {
            $scope.quantity = 0;
            var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
            stkService.then(function (data1) {
                if(data1.data.message === 'ok') {

                    $scope.items = data1.data.data;

                    var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                    var el = document.getElementById('dreamsList');

                    angular.element(el).append($compile(div)($scope));

                    $scope.quantity = data1.data.qua;

                    $scope.busy = false;
                } else {
                    $mdToast.show({
                        theme       : 'success-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_following_0_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                }
            });
        };

        $scope.loadDreamsUsers = function (event,qua,choseCategoryEventsBooking,choseEventsBooking,choseAvailabilityTimeBooking,choseAvailabilityDayBooking,plz_place_booking,
                                           price_booking) {

            $scope.busy = true;
            $scope.loading = true;
            var stkService = stkHttpService.dreamsUsers(qua,choseCategoryEventsBooking,choseEventsBooking,choseAvailabilityTimeBooking,choseAvailabilityDayBooking,plz_place_booking,
                price_booking);
            stkService.then(function (data1) {
                if(data1.data.message === 'ok') {

                    $scope.items = data1.data.data;

                    var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                    var el = document.getElementById('dreamsList');

                    angular.element(el).append($compile(div)($scope));

                    $scope.quantity = data1.data.qua;

                    $scope.busy = false;
                } else {
                    $mdToast.show({
                        theme       : 'success-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_following_0_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                }

                $scope.loading = false;
            });
        };

            $scope.loadEvents = function(id) {
                $scope.quantity = 0;
                if(id) {
                    $scope.availabilityLoader = true;
                    delete $scope.dreamsUsers;
                    if($('#choseEventsBooking')) {
                        $('#choseEventsBooking').remove();
                    }

                    if($('#choseAvailabilityTimeBooking')) {
                        $('#choseAvailabilityTimeBooking').remove();
                    }

                    if($('#choseAvailabilityDayBooking')) {
                        $('#choseAvailabilityDayBooking').remove();
                    }

                    $scope.choseEventsBooking = undefined;
                    $scope.choseAvailabilityTimeBooking = undefined;
                    $scope.choseAvailabilityDayBooking = undefined;
                    $scope.plz_place_booking = undefined;
                    $scope.price_booking = undefined;

                    $scope.choseCategoryEventsBooking = id;

                    var stkService = stkHttpService.getCatEvents(id);
                    stkService.then(function(data) {
                        if(data) {
                            var div = '<md-select id="choseEventsBooking" ng-model="choseEventsBooking"><md-option ng-value="first" selected>Event wählen</md-option>';
                            for(var index = 0; index < data.data.length; index++) {
                                if(data.data[index]) {
                                    div = div + '<md-option ng-click="loadAvailabilityTime(' + data.data[index].eventId + ');" ng-value="' + data.data[index].eventId + '">' + data.data[index].eventName + ' - ' + data.data[index].durationMin + ' Min</md-option>';
                                }
                            }

                            var div = div + '</md-select>';

                            var el = document.getElementById('catEventsBooking');

                            angular.element(el).append($compile(div)($scope));
                        }
                    });

                    $scope.busy = true;
                    var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                        $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                    stkService.then(function (data1) {
                        console.log(data1);
                        if(data1.data.message === 'ok') {
                            var dreamCount = $('#dreamsList').children().length;

                            for(var i = 0; i < parseInt(dreamCount); i++) {
                                $('#dream_' + i).remove();
                            }

                            $scope.items = data1.data.data;

                            var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                            var el = document.getElementById('dreamsList');

                            angular.element(el).append($compile(div)($scope));

                            $scope.quantity = data1.data.qua;

                            $scope.busy = false;
                        } else {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_following_0_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    });

                    $scope.availabilityLoader = false;
                }
            };

        $scope.loadEvents1 = function(id) {
            $scope.quantity = 0;
            if(id) {
                $scope.availabilityLoader = true;
                delete $scope.dreamsUsers;
                if($('#choseEventsBooking1')) {
                    $('#choseEventsBooking1').remove();
                }

                if($('#choseAvailabilityTimeBooking1')) {
                    $('#choseAvailabilityTimeBooking1').remove();
                }

                if($('#choseAvailabilityDayBooking1')) {
                    $('#choseAvailabilityDayBooking1').remove();
                }

                if($('#bookingDatepicker')) {
                    $('#bookingDatepicker').remove();
                }

                if($('#bp')) {
                    $('#bp').remove();
                }

                $scope.choseEventsBooking = undefined;
                $scope.choseAvailabilityTimeBooking = undefined;
                $scope.choseAvailabilityDayBooking = undefined;
                $scope.plz_place_booking = undefined;
                $scope.price_booking = undefined;

                $scope.choseCategoryEventsBooking = id;

                var stkService = stkHttpService.getCatEvents(id);
                stkService.then(function(data) {
                    if(data) {
                        console.log(data);
                        var div = '<md-select id="choseEventsBooking1" ng-model="choseEventsBooking1"><md-option ng-value="first" selected>Event wählen</md-option>';
                        for(var index = 0; index < data.data.length; index++) {
                            if(data.data[index]) {
                                div = div + '<md-option ng-click="loadAvailabilityTime1(' + data.data[index].eventId + ');" ng-value="' + data.data[index].eventId + '">' + data.data[index].eventName + ' - ' + data.data[index].durationMin + ' Min</md-option>';
                            }
                        }

                        var div = div + '</md-select>';

                        var el = document.getElementById('catEventsBooking1');

                        angular.element(el).append($compile(div)($scope));
                    }
                });

                $scope.availabilityLoader = false;
            }
        };

            $scope.loadAvailabilityTime = function(id) {
                $scope.quantity = 0;
                $scope.availabilityLoader = true;
                if($('#choseAvailabilityTimeBooking')) {
                    $('#choseAvailabilityTimeBooking').remove();
                }

                if($('#choseAvailabilityDayBooking')) {
                    $('#choseAvailabilityDayBooking').remove();
                }

                $scope.choseEventsBooking = id;

                var div = '<md-select id="choseAvailabilityTimeBooking" ng-model="choseAvailabilityTimeBooking"><md-option ng-value="first" selected>Zeit wählen</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(1);" ng-value="1">0 - 24h</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(2);" ng-value="2">0:00 - 6:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(3);" ng-value="3">6:00 - 8:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(4);" ng-value="4">8:00 - 10:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(5);" ng-value="5">10:00 - 12:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(6);" ng-value="6">12:00 - 14:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(7);" ng-value="7">14:00 - 16:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(8);" ng-value="8">16:00 - 18:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(9);" ng-value="9">18:00 - 20:00</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityDay(10);" ng-value="10">20:00 - 0:00</md-option>';


                var div = div + '</md-select>';

                var el = document.getElementById('availableTimeBooking');

                angular.element(el).append($compile(div)($scope));

                $scope.busy = true;
                var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                    $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                stkService.then(function (data1) {
                    console.log(data1);
                    if(data1.data.message === 'ok') {
                        var dreamCount = $('#dreamsList').children().length;

                        for(var i = 0; i < parseInt(dreamCount); i++) {
                            $('#dream_' + i).remove();
                        }

                        $scope.items = data1.data.data;

                        var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" class="md-avatar" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                        var el = document.getElementById('dreamsList');

                        angular.element(el).append($compile(div)($scope));

                        $scope.quantity = data1.data.qua;

                        $scope.busy = false;
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_following_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });

                $scope.availabilityLoader = false;
            };

            $scope.loadAvailabilityDay = function(id) {
                $scope.quantity = 0;
                $scope.availabilityLoader = true;
                if($('#choseAvailabilityDayBooking')) {
                    $('#choseAvailabilityDayBooking').remove();
                }

                $scope.choseAvailabilityTimeBooking = id;

                var div = '<md-select id="choseAvailabilityDayBooking" ng-model="choseAvailabilityDayBooking" md-disabled><md-option ng-value="first" selected>Tag wählen</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(1);" ng-value="1">Montag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(2);" ng-value="2">Dienstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(3);" ng-value="3">Mittwoch</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(4);" ng-value="4">Donnerstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(5);" ng-value="5">Freitag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(6);" ng-value="6">Samstag</md-option>';
                div = div + '<md-option ng-click="loadAvailabilityPlace(7);" ng-value="7">Sonntag</md-option>';


                var div = div + '</md-select>';

                var el = document.getElementById('availableDayBooking');

                angular.element(el).append($compile(div)($scope));

                $scope.busy = true;
                var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                    $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                stkService.then(function (data1) {
                    if(data1.data.message === 'ok') {
                        var dreamCount = $('#dreamsList').children().length;

                        for(var i = 0; i < parseInt(dreamCount); i++) {
                            $('#dream_' + i).remove();
                        }

                        $scope.items = data1.data.data;

                        var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                        var el = document.getElementById('dreamsList');

                        angular.element(el).append($compile(div)($scope));

                        $scope.quantity = data1.data.qua;

                        $scope.busy = false;
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_following_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });

                $scope.availabilityLoader = false;
            };

        $scope.loadAvailabilityTime1 = function(id) {
            $scope.quantity = 0;
            $scope.availabilityLoader = true;
            if($('#choseAvailabilityTimeBooking1')) {
                $('#choseAvailabilityTimeBooking1').remove();
            }

            if($('#choseAvailabilityDayBooking1')) {
                $('#choseAvailabilityDayBooking1').remove();
            }

            if($('#bookingDatepicker')) {
                $('#bookingDatepicker').remove();
            }

            if($('#bp')) {
                $('#bp').remove();
            }

            $scope.choseEventsBooking = id;

            $scope.bookingDate = new Date();

            var div = '<md-select id="choseAvailabilityTimeBooking1" ng-model="choseAvailabilityTimeBooking1">';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="first" selected>Zeit wählen</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="1">0:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="2">0:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="3">0:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="4">0:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="5">1:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="6">1:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="7">1:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="8">1:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="9">2:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="10">2:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="11">2:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="12">2:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="13">3:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="14">3:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="15">3:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="16">3:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="17">4:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="18">4:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="19">4:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="20">4:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="21">5:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="22">5:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="23">5:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="24">5:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="25">6:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="26">6:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="27">6:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="28">6:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="29">7:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="30">7:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="31">7:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="32">7:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="33">8:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="34">8:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="35">8:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="36">8:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="37">9:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="38">9:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="39">9:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="40">9:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="41">10:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="42">10:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="43">10:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="44">10:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="45">11:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="46">11:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="47">11:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="48">11:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="49">12:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="50">12:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="51">12:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="52">12:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="53">13:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="54">13:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="55">13:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="56">13:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="57">14:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="58">14:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="59">14:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="60">14:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="61">15:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="62">15:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="63">15:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="64">15:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="65">16:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="66">16:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="67">16:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="68">16:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="69">17:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="70">17:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="71">17:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="72">17:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="73">18:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="74">18:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="75">18:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="76">18:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="77">19:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="78">19:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="79">19:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="80">19:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="81">20:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="82">20:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="83">20:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="84">20:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="85">21:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="86">21:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="87">21:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="88">21:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="89">22:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="90">22:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="91">22:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="92">22:45 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="93">23:00 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="94">23:15 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="95">23:30 Uhr</md-option>';
            div = div + '<md-option ng-click="loadAvailabilityPrice1();" ng-value="96">23:45 Uhr</md-option></md-select>';
            div = div + '<md-datepicker ng-model="bookingDate" id="bookingDatepicker"></md-datepicker>';

            var el = document.getElementById('availableTimeBooking1');

            angular.element(el).append($compile(div)($scope));

            $scope.availabilityLoader = false;
        };

        $scope.loadAvailabilityPrice1 = function() {
            $scope.quantity = 0;
            $scope.availabilityLoader = true;
            if($('#bookPrice')) {
                $('#bookPrice').remove();
            }

            var div = '<md-input-container id="bp"><input type="text" id="bookPrice" ng-model="bookingPrice" placeholder="Angebotspreis (in €)"></md-input-container>';

            var el = document.getElementById('availablePriceBooking1');

            angular.element(el).append($compile(div)($scope));

            $scope.availabilityLoader = false;
        };


        $scope.loadAvailabilityPlace1 = function(id) {
            $scope.quantity = 0;
            if(id !== undefined) {
                $scope.choseAvailabilityDayBooking = id;

                $scope.busy = true;
                var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                    $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                stkService.then(function (data1) {
                    console.log(data1);
                    if(data1.data.message === 'ok') {
                        var dreamCount = $('#dreamsList').children().length;

                        for(var i = 0; i < parseInt(dreamCount); i++) {
                            $('#dream_' + i).remove();
                        }

                        $scope.items = data1.data.data;

                        var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                        var el = document.getElementById('dreamsList');

                        angular.element(el).append($compile(div)($scope));

                        $scope.quantity = data1.data.qua;

                        $scope.busy = false;
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_following_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });
            }
        };

        $scope.loadAvailabilityPrice = function(price) {
            if(price) {
                $scope.quantity = 0;
                if(price !== undefined) {
                    $scope.price_booking = price;

                    $scope.busy = true;
                    var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                        $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                    stkService.then(function (data1) {
                        console.log(data1);
                        if(data1.data.message === 'ok') {
                            var dreamCount = $('#dreamsList').children().length;

                            for(var i = 0; i < parseInt(dreamCount); i++) {
                                $('#dream_' + i).remove();
                            }

                            $scope.items = data1.data.data;

                            var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                            var el = document.getElementById('dreamsList');

                            angular.element(el).append($compile(div)($scope));

                            $scope.quantity = data1.data.qua;

                            $scope.busy = false;
                        } else {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_following_0_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    });
                }
            }
        };

        $scope.loadAvailabilityPlz = function(plz) {
            if(plz) {
                $scope.quantity = 0;
                if(plz !== undefined) {
                    $scope.plz_place_booking = plz;

                    $scope.busy = true;
                    var stkService = stkHttpService.dreamsUsers($scope.quantity,$scope.choseCategoryEventsBooking,$scope.choseEventsBooking,$scope.choseAvailabilityTimeBooking,
                        $scope.choseAvailabilityDayBooking,$scope.plz_place_booking,$scope.price_booking);
                    stkService.then(function (data1) {

                        if(data1.data.message === 'ok') {
                            var dreamCount = $('#dreamsList').children().length;

                            for(var i = 0; i < parseInt(dreamCount); i++) {
                                $('#dream_' + i).remove();
                            }

                            $scope.items = data1.data.data;

                            var div = '<md-list-item ng-click="bookDream($event,item.nickname,item.profilePic,item.customerid,item.kind,item.fbl,item.twl,item.inl);" class="md-3-line" id="dream_{{$index}}" ng-repeat="item in items track by $index"> <img class="md-avatar" on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="{{item.profilePic}}" id="profilePic"> <div class="md-list-item-text" id="profileText" layout="column"> <h3>{{ item.nickname }}</h3> <p>{{ item.nicknameDescription }}</p> </div> </md-list-item>';

                            var el = document.getElementById('dreamsList');

                            angular.element(el).append($compile(div)($scope));

                            $scope.quantity = data1.data.qua;

                            $scope.busy = false;
                        } else {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_following_0_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    });
                }
            }
        };
    });
