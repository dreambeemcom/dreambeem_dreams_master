'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('MessagesCtrl', function ($scope, $mdDialog) {
        $scope.loading = true;
        $scope.d_kCount = 0;

        $scope.columnNames = [
            { name: 'Von', icon: 'name24' },
            { name: 'Empfänger', icon: 'receiver24' },
            { name: 'Betreff', icon: 'subject24' },
            { name: 'Datum', icon: 'time24' },
            { name: 'Status', icon: 'status24' }
        ];

        var imagePath = 'img/list/60.jpeg';

        $scope.phones = [
            {
                type: 'Home',
                number: '(555) 251-1234',
                options: {
                    icon: 'communication:phone'
                }
            },
            {
                type: 'Cell',
                number: '(555) 786-9841',
                options: {
                    icon: 'communication:phone',
                    avatarIcon: true
                }
            },
            {
                type: 'Office',
                number: '(555) 314-1592',
                options: {
                    face : imagePath
                }
            },
            {
                type: 'Offset',
                number: '(555) 192-2010',
                options: {
                    offset: true,
                    actionIcon: 'communication:phone'
                }
            }
        ];
        $scope.todos = [
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
        ];

        $scope.d_limitKeypress = function ($event, value, maxLength) {
            if (value != undefined && value.toString().length >= maxLength) {
                $event.preventDefault();
            } else {
                $scope.d_kCount = $scope.d_kCount + 1;
            }
        };

        $scope.submitFilterFrom = function(from) {
            $scope.loading = true;
            if ($scope.filterFrom.$valid) {

                alert('sdfcccccc');
            }

            $scope.loading = false;
        };

        $scope.submitFilterSubject = function(subject) {
            $scope.loading = true;
            if ($scope.filterSubject.$valid) {

                alert('sdkkkkf');
            }

            $scope.loading = false;
        };

        $scope.submitFilterDate = function(date) {
            $scope.loading = true;
            if ($scope.filterDate.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.submitSendMessage = function(from,to,subject,message) {
            $scope.loading = true;
            if ($scope.sendMessage.$valid) {

                alert('sdsssssssf');
            }

            $scope.loading = false;
        };

        $scope.showDialog = function(ev, id) {
            $mdDialog.show({
                //controller: DialogController,
                //templateUrl: 'views/storeDialog1.html',
                contentElement: "#"+id,
                parent: angular.element(document.body)
                //targetEvent: ev,
                //clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.destroy();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.loading = false;
    });

