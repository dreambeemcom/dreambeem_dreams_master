'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('LogoutCtrl', function ($scope, $mdSidenav, $http, stkHttpService, $window, $location) {
        $scope.loading = true;
        var stkService = stkHttpService.getLogout();
        stkService.then(function(data) {
            $scope.response = data;
            console.log($scope.response);

            $scope.loading = false;
            if($scope.response.data === 'ok') {
                $window.location.href = "https://www.dreambeem.com/";
            } else {
                $window.location.href = "https://www.dreambeem.com/";
            }
        });
    });
