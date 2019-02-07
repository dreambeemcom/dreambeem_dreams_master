'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('DreamloginCtrl', function ($scope, $location, stkHttpService, Facebook, $window) {
        $scope.loginStatus = 'disconnected';

        $scope.checkLogin = function() {
            $scope.loading = true;
            var stkService = stkHttpService.checkLogin();
            stkService.then(function(data) {
                $scope.response = data;
                $scope.loading = false;
                console.log($scope.response);

                if($scope.response.data === 'ok') {
                    $window.location.href = "http://dreams.dreambeem.com/";
                } else {
                    $window.location.href = "http://dreambeem.com/login/";
                }
            });
        };

        $scope.FBLogin = function () {
            var uri = encodeURI('http://dreams.dreambeem.com/login/');
            var uniqueState = Math.floor((Math.random() * 1000) + 1000000000);
            Facebook.getLoginStatus(function(response) {
                console.log(response);
                if (response.status === 'connected') {
                    $window.location = encodeURI("https://facebook.com/v2.9/dialog/oauth?client_id=1107023486046982&redirect_uri=" + uri + "&response_type=token&state=" + uniqueState + "&scope=email,user_friends,manage_pages,public_profile,business_management");
                } else if (response.status === 'not_authorized') {
                    $window.location = encodeURI("https://facebook.com/v2.9/dialog/oauth?client_id=1107023486046982&redirect_uri=" + uri + "&response_type=token&state=" + uniqueState + "&scope=email,user_friends,manage_pages,public_profile,business_management");
                } else {
                    $window.location = encodeURI("https://facebook.com/v2.9/dialog/oauth?client_id=1107023486046982&redirect_uri=" + uri + "&response_type=token&state=" + uniqueState + "&scope=email,user_friends,manage_pages,public_profile,business_management");
                }
            });
        };

        $scope.twitterOAuth = function() {
            $scope.loading = true;
            var stkService = stkHttpService.TWLogin();
            stkService.then(function(data) {
                $scope.response = data;
                $scope.loading = false;
                if($scope.response.length > 0) {
                    $window.location.href = $scope.response;
                }
            });
        };
    });