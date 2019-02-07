'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('SettingsCtrl', function ($scope, $mdToast, $mdSidenav, $http, stkHttpService, $log, $window, $location) {

        $scope.getUserdata = function() {
            var stkService = stkHttpService.getUserdata();
            stkService.then(function(dataU) {
                $scope.kind = dataU.data.data.kind;
                $scope.customerid = dataU.data.data.customerid;
            });
        };

        $scope.initTwitterSettings = function() {
            $scope.loading = true;
            var stkService = stkHttpService.getTwitterSettings();
            stkService.then(function(data) {
                $scope.response = data;
                console.log($scope.response);

                if($scope.response.data[0].s1 == 1) {
                    $scope.twitterSetting1 = true;
                } else {
                    $scope.twitterSetting1 = false;
                }

                if($scope.response.data[0].s1Text.length > 0) {
                    $scope.twSetting1 = $scope.response.data[0].s1Text;
                } else {
                    $scope.twSetting1 = '';
                }
            });

            $scope.loading = false;
        };

        $scope.submitTwitterSettings = function(isValid,twitterSetting1,twSettingText1) {
            if(isValid) {
                var settingsTwitterData = {};
                settingsTwitterData.twitterSetting1 = twitterSetting1;
                settingsTwitterData.twitterSettingText1 = twSettingText1;

                if(settingsTwitterData) {
                    $scope.loading = true;
                    var stkService = stkHttpService.sendTwitterSettings(settingsTwitterData);
                    stkService.then(function(data) {
                        if(data.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }

                        $scope.loading = false;
                    });
                }
            }
        };

        $scope.submitGeneralSettings = function(isValid,generalSetting2,gSetting2,generalSetting3,generalSetting4,generalSetting5,
                                                gSetting5,generalSetting6) {
            $scope.loading = true;
            if (isValid) {
                var settingsGeneralData = {};
                settingsGeneralData.generalSetting2 = generalSetting2;
                settingsGeneralData.gSetting2 = gSetting2;
                settingsGeneralData.generalSetting3 = generalSetting3;
                settingsGeneralData.generalSetting4 = generalSetting4;
                settingsGeneralData.generalSetting5 = generalSetting5;
                settingsGeneralData.gSetting5 = gSetting5;
                settingsGeneralData.generalSetting6 = generalSetting6;

                if(settingsGeneralData) {
                    var stkService = stkHttpService.sendGeneralSettings(settingsGeneralData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        $scope.loading = false;
                        console.log($scope.response);

                        $scope.loading = false;
                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }
                    });
                }
            }

            $scope.loading = false;

        };

        $scope.submitEmailLimitsSettings = function(isValid,emaillimitsSetting1,eSetting1,emaillimitsSetting2,eSetting2,
                                                    emaillimitsSetting3,eSetting3,emaillimitsSetting4,eSetting4) {
            $scope.loading = true;
            if (isValid) {
                var settingsEmaillimitsData = {};
                settingsEmaillimitsData.emaillimitsSetting1 = emaillimitsSetting1;
                settingsEmaillimitsData.eSetting1 = eSetting1;
                settingsEmaillimitsData.emaillimitsSetting2 = emaillimitsSetting2;
                settingsEmaillimitsData.eSetting2 = eSetting2;
                settingsEmaillimitsData.emaillimitsSetting3 = emaillimitsSetting3;
                settingsEmaillimitsData.eSetting3 = eSetting3;
                settingsEmaillimitsData.emaillimitsSetting4 = emaillimitsSetting4;
                settingsEmaillimitsData.eSetting4 = eSetting4;

                if(settingsEmaillimitsData) {
                    var stkService = stkHttpService.sendEmaillimitsSettings(settingsEmaillimitsData);
                    stkService.then(function(data) {
                        $scope.response = data;
                        $scope.loading = false;
                        console.log($scope.response);

                        $scope.loading = false;
                        if($scope.response.data === 'ok') {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_settings_0_alert.html',
                                toastClass  : 'md-error-toast-theme'
                            });
                        }
                    });
                }
            }

            $scope.loading = false;
        };

        $scope.initGeneralSettings = function() {
            $scope.loading = true;
            var stkService = stkHttpService.getGeneralSettings();
            stkService.then(function(data) {
                $scope.response = data;
                console.log($scope.response);

                if($scope.response.data[0].s2 == 1) {
                    $scope.generalSetting2 = true;
                } else {
                    $scope.generalSetting2 = false;
                }

                if($scope.response.data[0].s2_count > 0) {
                    $scope.gSetting2 = $scope.response.data[0].s2_count;
                } else {
                    $scope.gSetting2 = 0;
                }

                if($scope.response.data[0].s3 == 1) {
                    $scope.generalSetting3 = true;
                } else {
                    $scope.generalSetting3 = false;
                }

                if($scope.response.data[0].s4 == 1) {
                    $scope.generalSetting4 = true;
                } else {
                    $scope.generalSetting4 = false;
                }
            });

            $scope.loading = false;
        };

        $scope.initEmaillimitsSettings = function() {
            $scope.loading = true;
            var stkService = stkHttpService.getEmaillimitsSettings();
            stkService.then(function(data) {
                $scope.response = data;
                console.log($scope.response);

                if($scope.response.data[0].s1 == 1) {
                    $scope.emaillimitsSetting1 = true;
                } else {
                    $scope.emaillimitsSetting1 = false;
                }

                if($scope.response.data[0].s1_count > 0) {
                    $scope.eSetting1 = $scope.response.data[0].s1_count;
                } else {
                    $scope.eSetting1 = 0;
                }

                if($scope.response.data[0].s2 == 1) {
                    $scope.emaillimitsSetting2 = true;
                } else {
                    $scope.emaillimitsSetting2 = false;
                }

                if($scope.response.data[0].s2_count > 0) {
                    $scope.eSetting2 = $scope.response.data[0].s2_count;
                } else {
                    $scope.eSetting2 = 0;
                }

                if($scope.response.data[0].s3 == 1) {
                    $scope.emaillimitsSetting3 = true;
                } else {
                    $scope.emaillimitsSetting3 = false;
                }

                if($scope.response.data[0].s3_count > 0) {
                    $scope.eSetting3 = $scope.response.data[0].s3_count;
                } else {
                    $scope.eSetting3 = 0;
                }
            });

            $scope.loading = false;
        };

        $scope.beemlineConfig = function(setting) {
            if(setting === 'beemlineSetting1') {
                $scope.beemlineSetting3 = false;
            } else if(setting === 'beemlineSetting2') {
                $scope.beemlineSetting4 = false;
            } else if(setting === 'beemlineSetting3') {
                $scope.beemlineSetting1 = false;
            } else if(setting === 'beemlineSetting4') {
                $scope.beemlineSetting2 = false;
            }

        };

        $scope.columnNames = [
            { name: 'Id', icon: 'callsplit24' },
            { name: 'Menge', icon: 'explore24' },
            { name: 'Produkt', icon: 'shoppingbasket24' },
            { name: 'Bild', icon: 'camera24' },
            { name: 'Datum', icon: 'time24' }
        ];
    });
