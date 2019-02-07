'use strict';

/**
 * @ngdoc directive
 * @name dreambeemcomApp.directive:stkCategories
 * @description
 * # stkCategories
 */
angular.module('customerDreambeemcomApp')
    .directive('charCount', function($scope, $log, $timeout){
        return {
            restrict: 'A',
            compile: function compile()
            {
                return {
                    post: function postLink($scope, iElement)
                    {
                        alert('asdfasdfsdf');
                        iElement.bind('keydown', function()
                        {
                            $scope.numberOfCharacters = 11;
                            $scope.$apply(function() {
                                $scope.numberOfCharacters = iElement.val().length;
                            });
                        });
                        iElement.bind('paste', function()
                        {
                            $timeout(function () {
                                $scope.$apply(function() {
                                    $scope.numberOfCharacters = iElement.val().length;
                                });
                            }, 200);
                        });
                    }
                }
            }
        }
    });

