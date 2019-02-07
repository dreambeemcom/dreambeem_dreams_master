'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('TwitterFollowerCtrl', function ($scope, stkHttpService, $window, $location, $mdToast) {
        $scope.url1 = $location.path();

        if($scope.url1 && $scope.url1 !== undefined) {
            var completeUrl = $scope.url1.split('/');
            $scope.TWUsers = [];

            $scope.quantity = completeUrl[3];
            $scope.lang = completeUrl[2];
            $scope.h1 = 'Twitter - User mit Sprache: ' + convertISO639_1ToWords($scope.lang);
        }

        function convertISO639_1ToWords(lang) {
            switch(lang) {
                case 'de':
                    return 'Deutsch';
                break;
                case 'en':
                    return 'English';
                break;
                case 'zh':
                    return '漢語';
                break;
                case 'ar':
                    return 'العربية';
                break;
                case 'hr':
                    return 'hrvatski jezik';
                break;
                case 'ja':
                    return '日本語';
                break;
                case 'fr':
                    return 'français';
                break;
                case 'pt':
                    return 'Português';
                break;
                case 'es':
                    return 'Español';
                break;
                case 'ru':
                    return 'Русский';
                break;
                case 'tr':
                    return 'Türkçe';
                break;
                case 'it':
                    return 'lietuvių kalba';
                break;
                case 'bg':
                    return 'български език';
                break;
                case 'nl':
                    return 'Nederlands';
                break;
                case 'th':
                    return 'ไทย';
                break;
                case 'pl':
                    return 'Język Polski';
                break;
                case 'ko':
                    return '한국어';
                break;
                case 'sr':
                    return 'српски језик';
                break;
                case 'vi':
                    return 'Tiếng Việt';
                break;
                case 'el':
                    return 'ελληνικά';
                break;
                case 'da':
                    return 'dansk';
                break;
                case 'id':
                    return 'Bahasa Indonesia';
                break;
                case 'ro':
                    return 'Română';
                break;
                case 'uk':
                    return 'Українська';
                break;
                case 'sv':
                    return 'Svenska';
                break;
                case 'cs':
                    return 'čeština';
                break;
                case 'sk':
                    return 'Slovenčina';
                break;
                case 'hu':
                    return 'magyar';
                break;
                case 'fi':
                    return 'suomi';
                break;
                case 'ca':
                    return 'català';
                break;
                case 'no':
                    return 'Norsk';
                break;
                case 'fa':
                    return 'فارسی';
                break;
                case 'mr':
                    return 'मराठी';
                break;
                case 'he':
                    return 'עברית';
                break;
                case 'lv':
                    return 'Latviešu Valoda';
                break;
                case 'hi':
                    return 'हिन्दी, हिंद';
                break;
                case 'ur':
                    return 'اردو';
                break;
                case 'bn':
                    return 'বাংলা';
                break;
                case 'ga':
                    return 'Gaeilge';
                break;
                case 'ms':
                    return 'Bahasa Melayu';
                break;
                case 'ta':
                    return 'தமிழ';
                break;
                case 'gu':
                    return 'ગુજરાતી';
                break;
                case 'eu':
                    return 'euskara';
                break;
                case 'nb':
                    return 'Norsk Bokmål';
                break;
                case 'af':
                    return 'Afrikaans';
                break;

            }
        };

        $scope.loadTwitterUsers = function (lang, qua) {
            if ($scope.busy) return;
            $scope.busy = true;
            $scope.loading = true;
            var stkService = stkHttpService.TWFindFollowers(qua, lang);
            stkService.then(function (data1) {
                if(data1.message === 'ok') {
                    var items = data1.users;
                    for (var i = 0; i < items.length; i++) {
                        $scope.TWUsers.push(items[i]);
                    }

                    $scope.quantity = data1.qua;

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

        $scope.followUser = function(id) {
            if(id) {
                var stkService = stkHttpService.TWFollowUser(id);
                stkService.then(function (data1) {
                    if(data1.data === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_following_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
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
            }
        };

        $scope.loadTWUsersLanguage = function(lang) {
            if(lang) {
                $window.location.href = 'https://dreams.dreambeem.com/twitter-follower/' + lang + '/0';
            }
        };
    });