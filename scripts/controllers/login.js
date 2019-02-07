'use strict';

angular.module('customerDreambeemcomApp')
    .controller('LoginCtrl', function ($scope, $mdSidenav, Facebook, stkHttpService, $window, $mdToast, $location, $mdDialog, $route) {
        var token = '';
        var token_verifier = '';
        var rUrl = '';

        token = $location.search().oauth_token;
        token_verifier = $location.search().oauth_verifier;
        rUrl = decodeURIComponent($location.search().rUrl);

        if (token && rUrl && token_verifier) {
            $scope.loading = true;

            if (token.length > 0 && token_verifier.length > 0 && rUrl.length > 0) {
                var stkService = stkHttpService.getTWData(token, token_verifier);
                stkService.then(function (data) {
                    $scope.response = data;

                    if ($scope.response.data === 'ok') {
                        $window.location.href = rUrl;
                    }
                });

                $scope.loading = false;
            }

            $scope.loading = false;
        } else if (!angular.isDefined(fb_oauth_access_token) && !angular.isDefined(fb_expires_in) && !angular.isDefined(fb_state)) {
            $scope.loading = true;

            var fb_oauth_access_token = '';
            var fb_expires_in = '';
            var fb_state = '';
            var locationHash = '';
            var locationHashValues = [];

            locationHash = $window.location.hash;
            var locationHashParameters = locationHash.split('&');
            for (var index = 0; index < locationHashParameters.length; index++) {
                if (locationHashParameters[index].length > 0) {
                    locationHashValues[index] = locationHashParameters[index].split('=');
                }
            }

            fb_oauth_access_token = locationHashValues[1][1];
            fb_expires_in = locationHashValues[2][1];
            fb_state = locationHashValues[0][1];

            if (fb_oauth_access_token && fb_expires_in && fb_state) {
                if (fb_oauth_access_token.length > 0 && fb_expires_in.length > 0 && fb_state.length > 0) {
                    $scope.loading = true;

                    Facebook.api('/me', {access_token: fb_oauth_access_token}, 'get', function (response2) {
                        $scope.user = response2;
                        Facebook.api('/' + $scope.user.id + '/accounts', {access_token: fb_oauth_access_token}, 'get', function (response11) {
                            $scope.pages = response11;

                            Facebook.api('/' + $scope.user.id + '?fields=email,birthday,gender,link', {access_token: fb_oauth_access_token}, 'get', function (response3) {
                                $scope.profile = response3;

                                Facebook.api('/me/friends', {access_token: fb_oauth_access_token}, 'get', function (response4) {
                                    $scope.userFriends = response4;

                                    Facebook.api('/'+ $scope.user.id + '/picture', {access_token: fb_oauth_access_token}, 'get', function (response5) {
                                        //console.log(response5);
                                        $scope.userProfilePic = response5;

                                        var data1 = {};
                                        data1.user = $scope.user;
                                        data1.profile = $scope.profile;
                                        data1.friends = $scope.userFriends;
                                        data1.pages = $scope.pages;
                                        data1.profilePic = $scope.userProfilePic;
                                        data1.accessToken = fb_oauth_access_token;
                                        data1.expires = fb_expires_in;

                                        var stkService = stkHttpService.postFBLogin(data1);
                                        stkService.then(function (data) {
                                            $scope.response = data;

                                            if ($scope.response.data === 'ok') {
                                                $window.location.href = "https://dreams.dreambeem.com/";
                                            } else {
                                                $window.location.href = "https://www.dreambeem.com/";
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                } else {
                    var fb_oauth_access_token = '';
                    var fb_expires_in = '';
                    var fb_state = '';
                }

                $scope.loading = false;
            } else {
                var fb_oauth_access_token = '';
                var fb_expires_in = '';
                var fb_state = '';
            }
        } else {
            $window.location.href = "https://www.dreambeem.com/";
        }
    });