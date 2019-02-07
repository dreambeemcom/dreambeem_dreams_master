'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('ShopCtrl', function ($scope, stkHttpService, $window, $mdToast) {
        $scope.loadShop = function(id) {
            if(id) {
                var stkService = stkHttpService.updateCurrentShop(id);
                stkService.then(function(data) {
                    if(data.data === 'ok') {
                        $window.location.href = 'https://dreams.dreambeem.com/dream-products?sid=' + id + '';
                    }
                });
            }
        };

        $scope.initShop = function() {
            $scope.loading = true;

            var stkService = stkHttpService.getShopData();
            stkService.then(function(data) {

                $scope.response = data;
                $scope.firstLoad = $scope.response.fload;

                if($scope.response) {
                    $scope.admin = false;

                    $scope.shopName = $scope.response.data[0].shopname;
                    $scope.shopLink = $scope.response.data[0].shoplink;
                    $scope.shopLogo = $scope.response.data[0].logo;
                    $scope.shopStreet = $scope.response.data[0].street;
                    $scope.shopPlz = $scope.response.data[0].plz;
                    $scope.shopTown = $scope.response.data[0].town;
                    $scope.shopId = $scope.response.data[0].shopId;
                    if($scope.response.data[0].country === 'Deutschland') {
                        $scope.shopCountry = 'de';
                    } else if($scope.response.data[0].country === 'Österreich') {
                        $scope.shopCountry = 'aut';
                    } else if($scope.response.data[0].country === 'Schweiz') {
                        $scope.shopCountry = 'sui';
                    }
                    $scope.shopPhone = $scope.response.data[0].phone;
                    $scope.shopEmail = $scope.response.data[0].email;
                    $scope.shopDescription = $scope.response.data[0].description;

                    $scope.shopFullName = $scope.response.data[0].partnername;
                    $scope.shopPartnerStreet = $scope.response.data[0].partnerstreet;
                    $scope.shopPartnerPlz = $scope.response.data[0].partnerplz;
                    $scope.shopPartnerTown = $scope.response.data[0].partnertown;

                    if($scope.response.data[0].partnercountry === 'Deutschland') {
                        $scope.shopPartnerCountry = 'de';
                    } else if($scope.response.data[0].partnercountry === 'Österreich') {
                        $scope.shopPartnerCountry = 'aut';
                    } else if($scope.response.data[0].partnercountry === 'Schweiz') {
                        $scope.shopPartnerCountry = 'sui';
                    }

                    $scope.shopPartnerPhone = $scope.response.data[0].partnerphone;
                    $scope.shopPartnerEmail = $scope.response.data[0].partneremail;
                    if($scope.response.data[0].status === 'online') {
                        $scope.shopEnable = true;
                    }

                }

                $('#lagerloader').removeClass('yesShow');
                $('#lagerloader').addClass('noShow');
            });
        };

        $scope.submitShop = function(event) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if ($scope.shopForm.$valid) {
                var shopData = {};
                shopData.shopname = $scope.shopName;
                shopData.shoplink = $scope.shopLink;
                shopData.street = $scope.shopStreet;
                shopData.plz = $scope.shopPlz;
                shopData.town = $scope.shopTown;

                if($scope.shopCountry === 'de') {
                    shopData.country = 'Deutschland';
                } else if($scope.shopCountry === 'sui') {
                    shopData.country = 'Schweiz';
                } else if($scope.shopCountry === 'aut') {
                    shopData.country = 'Österreich';
                }

                shopData.phone = $scope.shopPhone;
                shopData.email = $scope.shopEmail;
                shopData.description = $scope.shopDescription;
                console.log(shopData);

                if(shopData) {
                    var stkService = stkHttpService.sendShop(shopData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_shop_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_shop_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                }
            }

            $scope.loading = false;
        };

        $scope.submitPartnerShop = function() {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if ($scope.shopPartnerForm.$valid) {
                var shopPartnerData = {};
                shopPartnerData.partnername = $scope.shopFullName;
                shopPartnerData.partnerstreet = $scope.shopPartnerStreet;
                shopPartnerData.partnerplz = $scope.shopPartnerPlz;
                shopPartnerData.partnertown = $scope.shopPartnerTown;

                if($scope.shopPartnerCountry === 'de') {
                    shopPartnerData.partnercountry = 'Deutschland';
                } else if($scope.shopPartnerCountry === 'sui') {
                    shopPartnerData.partnercountry = 'Schweiz';
                } else if($scope.shopPartnerCountry === 'aut') {
                    shopPartnerData.partnercountry = 'Österreich';
                }

                shopPartnerData.partnerphone = $scope.shopPartnerPhone;
                shopPartnerData.partneremail = $scope.shopPartnerEmail;

                if(shopPartnerData) {
                    var stkService = stkHttpService.sendShopPartner(shopPartnerData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        $scope.loading = false;

                        $scope.loading = false;
                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_shop_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_shop_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                }

            }

            $scope.loading = false;
        };

        $scope.submitEnableShop = function(pid) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if ($scope.shopEnableForm.$valid) {
                var stkService = stkHttpService.sendShopStatus(pid);
                stkService.then(function(data) {
                    $scope.response = data;
                    $scope.loading = false;

                    $scope.loading = false;
                    if($scope.response.data === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_online_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'error-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_shop_0_alert.html',
                            toastClass  : 'md-error-toast-theme'
                        });
                    }

                    $('#lagerloader').removeClass('yesShow');
                    $('#lagerloader').addClass('noShow');
                });
            }

        };
    });