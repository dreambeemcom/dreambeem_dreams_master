'use strict';

/**
 * @ngdoc function
 * @name sellerdreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sellerdreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('DreamProductsCtrl', function ($scope, $mdSidenav, $http, stkHttpService, $mdToast, $compile, $window, $mdDialog,$rootScope) {

        $scope.pageNumber = 1;
        $scope.pageNumber1 = 1;
        $scope.page = 1;


        $scope.loading_lager = false;

        $scope.submitPortfolioSearch = function(isValid, searchText, qua) {
            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            if(isValid) {
                var stkService = stkHttpService.getSearchPortfolioProducts($rootScope.categoryId,searchText,0);
                stkService.then(function(data) {
                    $scope.portfolioProducts = data.data;

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index][0].available == true) {
                            $scope.portfolioProducts[index][0].availableText = 'Verfügbar';
                        } else {
                            $scope.portfolioProducts[index][0].availableText = 'Nicht auf Lager';
                        }
                    }

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index][0].selling_price) {
                            $scope.portfolioProducts[index][0].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index][0].selling_price);
                        }
                    }

                    var stkService = stkHttpService.getSearchPortfolioProductsCount($rootScope.categoryId,searchText);
                    stkService.then(function(data) {

                        $scope.portfolioProductsSearchCount = data.data;

                        $scope.maxPages = Math.ceil(($scope.portfolioProductsSearchCount / 10));

                        $scope.portfolioProductsCount = '';

                        $scope.pageNumber = 1;

                        if($scope.maxPages == 1) {
                            var pages = [
                                { pageN: parseInt(1)}
                            ];
                        } else if($scope.maxPages == 2) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)}
                            ];
                        } else if($scope.maxPages == 3) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)}
                            ];
                        } else if($scope.maxPages == 4) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)},
                                { pageN: parseInt(4)}
                            ];
                        } else {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)},
                                { pageN: parseInt(4)},
                                { pageN: parseInt(5)}
                            ];
                        }

                        $scope.pages = pages;

                    });

                    document.getElementById('proso_0').remove();

                    var div = '<div id="proso_0">' +
                        '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong>{{product[0].s_price}}</strong></div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                        '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                        '<span id="categoryLayers_po_{{$index}}">{{product[0].ccc}}</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="product[0].available ? \'text-success\' : \'text-danger\'">{{product[0].availableText}}</div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                        '<md-button ng-show="product[0].available" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                        'ins Lager übernehmen' +
                        '</md-button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    var el = document.getElementById('portfolio');

                    angular.element(el).append( $compile(div)($scope) );

                    $('#portfolioloader').removeClass('yesShow');
                    $('#portfolioloader').addClass('noShow');
                });

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_down">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showPortfolioPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';

                var el = document.getElementById('po_down');

                document.getElementById('pager_odown').remove();

                angular.element(el).append( $compile(div)($scope) );

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_up">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showPortfolioPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';

                var el = document.getElementById('po_up');

                document.getElementById('pager_oup').remove();

                angular.element(el).append( $compile(div)($scope) );
            }

        };

        $scope.showPortfolioPageSearch = function(page, search) {

            $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

            if(page) {
                $scope.page = parseInt(page);
                if (page == 1) {
                    var qua = 0;
                } else {
                    var qua = (parseInt((page - 1)) * 10);
                }

                $scope.pageNumber = page;

                if (page == 1 && $scope.maxPages >= 5) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)},
                        {pageN: parseInt(($scope.page) + 4)}
                    ];
                } else if ($scope.maxPages == 1) {
                    var pages = [
                        {pageN: parseInt($scope.page)}
                    ];
                } else if ($scope.maxPages == 2) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)}
                    ];
                } else if ($scope.maxPages == 3) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)}
                    ];
                } else if ($scope.maxPages == 4) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)}
                    ];
                } else {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)},
                        {pageN: parseInt(($scope.page) + 4)}
                    ];
                }

                $scope.pages = pages;

                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');

                var stkService = stkHttpService.getSearchPortfolioProducts($rootScope.categoryId,search, ((page - 1) * 10));
                stkService.then(function (data) {
                    if (data) {
                        $scope.portfolioProducts = data.data;

                        if($scope.portfolioProducts.length > 0) {
                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index][0].available == true) {
                                    $scope.portfolioProducts[index][0].availableText = 'Verfügbar';
                                } else {
                                    $scope.portfolioProducts[index][0].availableText = 'Nicht auf Lager';
                                }
                            }

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index][0].selling_price) {
                                    $scope.portfolioProducts[index][0].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index][0].selling_price);
                                }
                            }

                            document.getElementById('proso_0').remove();

                            var div = '<div id="proso_0">' +
                                '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong>{{product[0].s_price}}</strong></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                                '<span id="categoryLayers_po_{{$index}}">{{product[0].ccc}}</span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="product[0].available ? \'text-success\' : \'text-danger\'">{{product[0].availableText}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<md-button ng-show="product[0].available" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                                'ins Lager übernehmen' +
                                '</md-button>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                            var el = document.getElementById('portfolio');

                            angular.element(el).append($compile(div)($scope));
                        } else {
                            $scope.portfolioMessage = 'Keine Produkte vorhanden!';
                        }

                        $('#portfolioloader').removeClass('yesShow');
                        $('#portfolioloader').addClass('noShow');
                    }
                });
            }
        };

        $scope.resetPortfolioSearch = function() {
            $scope.portfolioSearch = '';
            $scope.portfolioProductsSearchCount = '';
            var page = 1;

            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            var stkService = stkHttpService.getPortfolioProductsCount();
            stkService.then(function(data) {

                $scope.portfolioProductsCount = data.data;
            });

            $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

            if(page) {
                $scope.page = parseInt(page);
                if(page == 1) {
                    var qua = 0;
                    var prosPage = 0;
                } else {
                    var qua = (parseInt((page-1)) * 10);
                    var prosPage = parseInt((page-1));
                }

                $scope.pageNumber = page;

                if(page == 1 && $scope.maxPages >= 5) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                } else if($scope.maxPages == 1) {
                    var pages = [
                        { pageN: parseInt($scope.page)}
                    ];
                } else if($scope.maxPages == 2) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)}
                    ];
                } else if($scope.maxPages == 3) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)}
                    ];
                } else if($scope.maxPages == 4) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)}
                    ];
                } else {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                }

                $scope.pages = pages;


                var stkService = stkHttpService.getPortfolioProducts($rootScope.categoryId,qua);
                stkService.then(function(data) {
                    if(data) {
                        $scope.portfolioProducts = data.data;

                        for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                            if ($scope.portfolioProducts[index][0].available == true) {
                                $scope.portfolioProducts[index][0].availableText = 'Verfügbar';
                            } else {
                                $scope.portfolioProducts[index][0].availableText = 'Nicht auf Lager';
                            }
                        }

                        for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                            if ($scope.portfolioProducts[index][0].selling_price) {
                                $scope.portfolioProducts[index][0].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index][0].selling_price);
                            }
                        }

                        document.getElementById('proso_0').remove();

                        var div = '<div id="proso_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong>{{product[0].selling_price}}</strong></div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                            '<span id="categoryLayers_po_{{$index}}">{{product[0].ccc}}</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="product[0].available ? \'text-success\' : \'text-danger\'">{{product[0].availableText}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<md-button ng-show="product[0].available" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                            'ins Lager übernehmen' +
                            '</md-button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('portfolio');

                        angular.element(el).append( $compile(div)($scope) );

                        var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_down">' +
                            '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                            '<h3 ng-click="showPortfolioPage(pageN.pageN);">{{pageN.pageN}}</h3>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('po_down');

                        document.getElementById('pager_odown').remove();

                        angular.element(el).append( $compile(div)($scope) );

                        var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_up">' +
                            '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                            '<h3 ng-click="showPortfolioPage(pageN.pageN);">{{pageN.pageN}}</h3>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('po_up');

                        document.getElementById('pager_oup').remove();

                        angular.element(el).append( $compile(div)($scope) );

                        $('#portfolioloader').removeClass('yesShow');
                        $('#portfolioloader').addClass('noShow');
                    }
                });
            }
        };

        $scope.showPortfolioPage = function(page) {
            if(page) {
                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');

                $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

                if(page) {
                    $scope.page = parseInt(page);
                    if(page == 1) {
                        var qua = 0;
                        var prosPage = 0;
                    } else {
                        var qua = (parseInt((page-1)) * 10);
                        var prosPage = parseInt((page-1));
                    }

                    $scope.pageNumber = page;

                    if(page == 1 && $scope.maxPages >= 5) {
                        var pages = [
                            { pageN: parseInt($scope.page)},
                            { pageN: parseInt(($scope.page) + 1)},
                            { pageN: parseInt(($scope.page) + 2)},
                            { pageN: parseInt(($scope.page) + 3)},
                            { pageN: parseInt(($scope.page) + 4)}
                        ];
                    } else if($scope.maxPages == 1) {
                        var pages = [
                            { pageN: parseInt($scope.page)}
                        ];
                    } else if($scope.maxPages == 2) {
                        var pages = [
                            { pageN: parseInt($scope.page)},
                            { pageN: parseInt(($scope.page) + 1)}
                        ];
                    } else if($scope.maxPages == 3) {
                        var pages = [
                            { pageN: parseInt($scope.page)},
                            { pageN: parseInt(($scope.page) + 1)},
                            { pageN: parseInt(($scope.page) + 2)}
                        ];
                    } else if($scope.maxPages == 4) {
                        var pages = [
                            { pageN: parseInt($scope.page)},
                            { pageN: parseInt(($scope.page) + 1)},
                            { pageN: parseInt(($scope.page) + 2)},
                            { pageN: parseInt(($scope.page) + 3)}
                        ];
                    } else {
                        var pages = [
                            { pageN: parseInt($scope.page)},
                            { pageN: parseInt(($scope.page) + 1)},
                            { pageN: parseInt(($scope.page) + 2)},
                            { pageN: parseInt(($scope.page) + 3)},
                            { pageN: parseInt(($scope.page) + 4)}
                        ];
                    }

                    $scope.pages = pages;

                    var stkService = stkHttpService.getPortfolioProducts($rootScope.categoryId,qua);
                    stkService.then(function(data) {
                        if(data) {
                            $scope.portfolioProducts = data.data;

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index][0].available == true) {
                                    $scope.portfolioProducts[index][0].availableText = 'Verfügbar';
                                } else {
                                    $scope.portfolioProducts[index][0].availableText = 'Nicht auf Lager';
                                }
                            }

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index][0].selling_price) {
                                    $scope.portfolioProducts[index][0].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index][0].selling_price);
                                }
                            }

                            document.getElementById('proso_0').remove();

                            var div = '<div id="proso_0">' +
                                '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong>{{product[0].s_price}}</strong></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                                '<span id="categoryLayers_po_{{$index}}">{{product[0].ccc}}</span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="product[0].available ? \'text-success\' : \'text-danger\'">{{product[0].availableText}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<md-button ng-show="product[0].available" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                            'ins Lager übernehmen' +
                            '</md-button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                            var el = document.getElementById('portfolio');

                            angular.element(el).append( $compile(div)($scope) );

                            $('#portfolioloader').removeClass('yesShow');
                            $('#portfolioloader').addClass('noShow');
                        }
                    });
                }
            }
        };

        $scope.addToLager = function(productId, pid) {
            if(productId && pid) {
                var stkService = stkHttpService.addProductToLager(productId, pid);
                stkService.then(function (data) {
                    if(data.data === 'ok') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_addToLager_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'error-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_addToLager_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });
            }
        };

        $scope.loadCategory = function(id,categoryName) {

            if(id) {

                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');

                $scope.categoryName = categoryName;
                $rootScope.categoryId = id;

                var stkService = stkHttpService.getPortfolioProductsCount(id);
                stkService.then(function (data) {
                    $scope.portfolioProductsCount = data.data;
                });

                var stkService = stkHttpService.getPortfolioProducts(id, 0);
                stkService.then(function (data) {
                    $scope.portfolioProducts = data.data;

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index][0].available == true) {
                            $scope.portfolioProducts[index][0].availableText = 'Verfügbar';
                        } else {
                            $scope.portfolioProducts[index][0].availableText = 'Nicht auf Lager';
                        }
                    }

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index][0].selling_price) {
                            $scope.portfolioProducts[index][0].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index][0].selling_price);
                        }
                    }

                    $('#portfolioloader').removeClass('yesShow');
                    $('#portfolioloader').addClass('noShow');

                });
            }
        };

        $scope.initPortfolioProducts = function() {
            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            $scope.categoryName = 'Bekleidung & Accessoires';
            $rootScope.categoryId = parseInt(166);

            var stkService = stkHttpService.getPortfolioProducts($rootScope.categoryId,0);
            stkService.then(function(data) {
                $scope.portfolioProducts = data.data;
                $scope.pprice = 'Richtpreis, bitte aktualisieren';
                for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                    if ($scope.portfolioProducts[index].available == true) {
                        $scope.portfolioProducts[index].availableText = 'Verfügbar';
                    } else {
                        $scope.portfolioProducts[index].availableText = 'Nicht auf Lager';
                    }
                }

                for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                    if ($scope.portfolioProducts[index].base_price) {
                        $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                    }
                }
            });

            var stkService = stkHttpService.getCategories();
            stkService.then(function(data) {

                $scope.portfolioCategories = data.data;
            });

            var stkService = stkHttpService.getPortfolioProductsCount(166);
            stkService.then(function(data) {
                $scope.portfolioProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

                if($scope.maxPages === 1) {
                    var pages = [
                        { pageN: parseInt(1)}
                    ];
                } else if($scope.maxPages === 2) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)}
                    ];
                } else if($scope.maxPages === 3) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)}
                    ];
                } else if($scope.maxPages === 4) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)},
                        { pageN: parseInt(4)}
                    ];
                } else {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)},
                        { pageN: parseInt(4)},
                        { pageN: parseInt(5)}
                    ];
                }

                $scope.pages = pages;
            });

            $('#portfolioloader').removeClass('yesShow');
            $('#portfolioloader').addClass('noShow');
        };

        $scope.newAddProduct = function() {
            $('#title1').val('');
            $('#desc1').val('');
            $('#sellingPrice1').val('');
            $('#brand1').val('');
            $('#manufacturer1').val('');
            $('#model1').val('');
            $('#base_price1').val('');
            $('#reduced_price1').val('');
            $('#basePriceArticle1').val('');
            $('#quantity11').val('');
            $('#shippingWeight1').val('');
            $('#colour1').val('');
            $('#material1').val('');
            $('#shippingCost1').val('');
            $('#deliveryTime1').val('');
            $('#shippingCountries1').val('');
            $('#sellingPriceUnit1').val('');
            $('#reducedPriceUnit1').val('');
            $('#sku1').val('');
            $('#ean1').val('');
            $('#keywords1').val('');
            $('#catId1').val('');
            $('#categoryLayers_88999').text('');

            var stkService = stkHttpService.getCategories();
            stkService.then(function(data) {
                $scope.categories = data.data;

                if($scope.categories.length) {

                    var div = '<md-input-container style="margin-top: 0 !important;" id="p_8899" flex="100" sm-flex="100" md-flex="100" xs-flex="100"><label>Kategorie 1. Ebene</label><md-select ng-id="productCategory" ng-model="catNewProduct"> <md-option ng-click="add2CategoryLayer(category.categoryId1,8899,2,11111111);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option> </md-select></md-input-container>';
                } else  if(proId !== 11111111){
                    var div = '<md-input-container style="margin-top: 0 !important;" id="s_8899"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(11111111,2,8899);">Speichern</button></md-input-container>';
                } else {
                    var div = '';
                }

                var el = document.getElementById('categories_8899');

                angular.element(el).append( $compile(div)($scope) );
            });
        };

        $scope.saveProductNew = function(isValid,name,description,quantity,price,catId,condition) {
            $scope.pnloader = true;

            if(isValid) {
                var pNew = {};
                pNew.name = name;
                pNew.description = description;
                pNew.quantity = quantity;
                pNew.price = price;
                pNew.catId = $('#catId').val();
                pNew.condition = condition;

                if(pNew) {
                    var stkService = stkHttpService.saveProductN(pNew);
                    stkService.then(function (data) {
                        if(data.data === 'ok') {
                            $('#name').val('');
                            $('#desc').val('');
                            $('#price').val('');
                            $('#qy1').val('');
                            $('#catId').val('');
                            $('#categoryLayers_88999').text('');


                            var stkService = stkHttpService.getCategories();
                            stkService.then(function(data) {
                                $scope.categories = data.data;

                                if($scope.categories.length) {

                                    var div = '<md-input-container style="margin-top: 0 !important;" id="p_88999" flex="100" sm-flex="100" md-flex="100" xs-flex="100"><label>Kategorie 1. Ebene</label><md-select ng-id="productCategory" ng-model="catNewProduct"> <md-option ng-click="add2CategoryLayer(category.categoryId1,88999,2,11111111);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option> </md-select></md-input-container>';
                                } else  if(proId !== 11111111){
                                    var div = '<md-input-container style="margin-top: 0 !important;" id="s_88999"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(11111111,2,88999);">Speichern</button></md-input-container>';
                                } else {
                                    var div = '';
                                }

                                var el = document.getElementById('categories_88999');

                                angular.element(el).append( $compile(div)($scope) );
                            });


                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_pnSave_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_pnSave_0_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    });
                }
            }

            $scope.pnloader = false;
        };

        function DialogIncreasePrice($scope, $mdDialog, $rootScope, stkHttpService, $mdToast, $window) {

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.increasePr = function(ev,p) {
                if(ev) {
                    $scope.increaseLoader = true;
                    if($rootScope.bprice) {
                        op = $rootScope.bprice;
                    } else {
                        var op = $rootScope.dprice;
                    }

                    var stkService = stkHttpService.increasePrice($rootScope.productId,$rootScope.shopId,$rootScope.ownerId,p,op);
                    stkService.then(function(data) {
                        if(data.data === 'ok') {
                            $scope.marge =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.marge);
                            $scope.dreamPercent = data.dreamPercent.replace('.',',');
                            $scope.dreamPrice1 =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.dreamPrice);
                            $rootScope.dPrice =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.dreamPrice);
                            $scope.priceMessage = 'Dreampreis wurde definiert';

                            $('#ppprice_'+$rootScope.index).text($scope.dreamPrice1);

                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_priceIncrease_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_priceIncrease_0_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                        $scope.increaseLoader = false;
                    });
                }
            };

            $scope.initProductLink = function() {

                $scope.dreamLink = 'https://www.dreambeem.com/' + $rootScope.t + '/' + $rootScope.productId + '/' + $rootScope.ownerId + '/';
                $scope.showAdvanced(null, 'show-Product-Link');
            };

            $scope.initIncreaseProduct = function() {
                $scope.increaseLoader = true;
                var stkService = stkHttpService.getLagerInProduct($rootScope.productId,$rootScope.shopId,$rootScope.ownerId);
                stkService.then(function(data) {
                    if(data) {
                        $scope.name = data.data[0].title;
                        $scope.img = data.data[0].main_image;
                        if(data.data[0].base_price) {
                            $scope.bprice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[0].base_price);
                            $rootScope.bprice = data.data[0].base_price;
                        }

                        if(data.data[0].dream_price) {
                            $scope.dprice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[0].dream_price);
                            $rootScope.dprice = data.data[0].selling_price;
                        }

                        $scope.increaseLoader = false;
                    }
                });
            };
        }

        $scope.showAdvanced = function(ev, kind) {

            switch(kind) {
                case 'Increase-Price':
                    $mdDialog.show({
                        controller: DialogIncreasePrice,
                        templateUrl: 'views/dialogs/increasePrice.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'show-Product-Link':
                    $mdDialog.show({
                        controller: DialogIncreasePrice,
                        templateUrl: 'views/dialogs/dreamLink.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
            }
        };

        $scope.deleteLaProduct = function(productId,ownerId,id) {
            var stkService = stkHttpService.deleteLagerProduct1(productId,ownerId);
            stkService.then(function(data) {
                if(data.data === 'ok') {
                    $('#product_' + id).remove();
                    $mdToast.show({
                        theme       : 'success-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_deleteLagerProduct_1_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                } else {
                    $mdToast.show({
                        theme       : 'error-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_deleteLagerProduct_0_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                }
            });
        };

        $scope.increasePrice = function(productId,pid,ownerId,index) {
            if(productId && pid) {
                $rootScope.productId = productId;
                $rootScope.shopId = pid;
                $rootScope.ownerId = ownerId;
                $rootScope.index = index;
                $scope.showAdvanced(null, 'Increase-Price');
            }
        };

        $scope.showProductLink = function(productId,pid,ownerId,title) {

            var options = {
                lang: 'de',
                maintainCase: true,
                separator: '-'
            };

            var getSlug = createSlug(options);

            var t = getSlug(title, options);

            $rootScope.productId = productId;
            $rootScope.shopId = pid;
            $rootScope.ownerId = ownerId;
            $rootScope.t = t;
            $scope.showAdvanced(null, 'show-Product-Link');

        };

        $scope.refreshProduct = function(id,pid,index) {
            if(id) {
                var stkService = stkHttpService.refreshProduct(id,pid);
                stkService.then(function (data) {
                    if(data) {
                        $scope.available = [];
                        $scope.availableText = [];
                        var price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.selling_price);
                        if(parseFloat(price) > 0) {
                            $('#pprice_'+index).text(price);
                            $scope.pprice = 'aktueller Preis';
                        }

                        $scope.available[index] = data.data.available;
                        if ($scope.available[index] == true) {
                            $scope.availableText[index] = 'Verfügbar';
                        } else {
                            $scope.availableText[index] = 'Nicht auf Lager';
                        }
                    }
                });
            }
        };

        $scope.refresh = function() {
            $scope.resetSearch();
        };

        $scope.showLagerPageSearch = function(page, search) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

            if(page) {
                $scope.page = parseInt(page);
                if (page == 1) {
                    var qua = 0;
                    var prosPage = 0;
                } else {
                    var qua = (parseInt((page - 1)) * 10);
                    var prosPage = parseInt((page - 1));
                }

                $scope.pageNumber = page;

                if (page == 1 && $scope.maxPages >= 5) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)},
                        {pageN: parseInt(($scope.page) + 4)}
                    ];
                } else if ($scope.maxPages == 1) {
                    var pages = [
                        {pageN: parseInt($scope.page)}
                    ];
                } else if ($scope.maxPages == 2) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)}
                    ];
                } else if ($scope.maxPages == 3) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)}
                    ];
                } else if ($scope.maxPages == 4) {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)}
                    ];
                } else {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)},
                        {pageN: parseInt(($scope.page) + 4)}
                    ];
                }

                $scope.pages = pages;

                var stkService = stkHttpService.getSearchLagerProducts(search, ((page - 1) * 10));
                stkService.then(function (data) {
                    if (data) {
                        $scope.products = data.data;

                        document.getElementById('pros_0').remove();

                        var div = '<div id="pros_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<strong class="text-success" ng-if="product.oldPrice">' +
                                '{{product.s_price}}<br>' +
                                '<span class="text-middle-small text-danger">Verkaufspreis wurde noch nicht definiert</span>' +
                                '</strong>' +
                                '<strong class="text-success" ng-if="product.newPrice">' +
                                    '{{product.b_price}}<br>' +
                                    '<span class="text-middle-small text-success">DreamPrice wurde gesetzt</span>' +
                                    '</strong>' +
                                    '</div>' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                                    '<div id="categories_{{$index}}">' +
                                        '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                                            '<label>1. Ebene</label>' +
                                            '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                                                '<md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
                                                '</md-select>' +
                                            '</md-input-container>' +
                                        '<md-input-container>' +
                                            '<input type="hidden" name="categoryIds" ng-model="categoryIds" id="categoryIds" value="">' +
                                                '</md-input-container><br>' +
                                            '<span id="categoryLayers_{{$index}}">{{product.ccc}}</span>' +
                                            '</div>' +
                                            '</div>' +
                                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                                            '<div>' +
                                                ' <md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,\'{{product.title}}\');" md-svg-src="plink24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

                        var el = document.getElementById('lager');

                        angular.element(el).append($compile(div)($scope));

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    }
                });
            }
        };

        $scope.resetSearch = function() {
            $scope.storeSearch = '';
            $scope.lagerProductsSearchCount = '';
            var page = 1;

            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            var stkService = stkHttpService.getLagerProductsCount();
            stkService.then(function(data) {

                $scope.lagerProductsCount = data.data;
            });

            $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

            if(page) {
                $scope.page = parseInt(page);
                if(page == 1) {
                    var qua = 0;
                    var prosPage = 0;
                } else {
                    var qua = (parseInt((page-1)) * 10);
                    var prosPage = parseInt((page-1));
                }

                $scope.pageNumber = page;

                if(page == 1 && $scope.maxPages >= 5) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                } else if($scope.maxPages == 1) {
                    var pages = [
                        { pageN: parseInt($scope.page)}
                    ];
                } else if($scope.maxPages == 2) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)}
                    ];
                } else if($scope.maxPages == 3) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)}
                    ];
                } else if($scope.maxPages == 4) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)}
                    ];
                } else {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                }

                $scope.pages = pages;


                var stkService = stkHttpService.getLagerProducts(qua);
                stkService.then(function(data) {
                    if(data) {
                        $scope.products = data.data;
                        $scope.oldPrice = true;

                        for(var index = 0;index < $scope.products.length;index++) {
                            if ($scope.products[index].selling_price) {
                                $scope.products[index].oldPrice = true;
                                $scope.products[index].newPrice = false;
                                $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                            }

                            if ($scope.products[index].base_price) {
                                $scope.products[index].oldPrice = false;
                                $scope.products[index].newPrice = true;
                                $scope.products[index].b_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].base_price);
                            }
                        }

                        document.getElementById('pros_0').remove();

                        var div = '<div id="pros_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<strong class="text-success" ng-if="product.oldPrice">' +
                            '{{product.s_price}}<br>' +
                            '<span class="text-middle-small text-danger">Verkaufspreis wurde noch nicht definiert</span>' +
                            '</strong>' +
                            '<strong class="text-success" ng-if="product.newPrice">' +
                            '{{product.b_price}}<br>' +
                            '<span class="text-middle-small text-success">DreamPrice wurde gesetzt</span>' +
                            '</strong>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<div id="categories_{{$index}}">' +
                            '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                            '<label>1. Ebene</label>' +
                            '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                            '<md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
                            '</md-select>' +
                            '</md-input-container>' +
                            '<md-input-container>' +
                            '<input type="hidden" name="categoryIds" ng-model="categoryIds" id="categoryIds" value="">' +
                            '</md-input-container><br>' +
                            '<span id="categoryLayers_{{$index}}">{{product.ccc}}</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<div>' +
                            ' <md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                            '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,\'{{product.title}}\');" md-svg-src="plink24" class="material-icons"></md-icon>' +
                            '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                            '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('lager');

                        angular.element(el).append( $compile(div)($scope) );

                        var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_down">' +
                            '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                            '<h3 ng-click="showLagerPage(pageN.pageN);">{{pageN.pageN}}</h3>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('p_down');

                        document.getElementById('pager_down').remove();

                        angular.element(el).append( $compile(div)($scope) );

                        var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_up">' +
                            '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                            '<h3 ng-click="showLagerPage(pageN.pageN);">{{pageN.pageN}}</h3>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('p_up');

                        document.getElementById('pager_up').remove();

                        angular.element(el).append( $compile(div)($scope) );

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    }
                });
            }
        };

        $scope.showLagerPage = function(page) {

            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

            if(page) {
                $scope.page = parseInt(page);
                if(page == 1) {
                    var qua = 0;
                    var prosPage = 0;
                } else {
                    var qua = (parseInt((page-1)) * 10);
                    var prosPage = parseInt((page-1));
                }

                $scope.pageNumber = page;

                if(page == 1 && $scope.maxPages >= 5) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                } else if($scope.maxPages == 1) {
                    var pages = [
                        { pageN: parseInt($scope.page)}
                    ];
                } else if($scope.maxPages == 2) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)}
                    ];
                } else if($scope.maxPages == 3) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)}
                    ];
                } else if($scope.maxPages == 4) {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)}
                    ];
                } else {
                    var pages = [
                        { pageN: parseInt($scope.page)},
                        { pageN: parseInt(($scope.page) + 1)},
                        { pageN: parseInt(($scope.page) + 2)},
                        { pageN: parseInt(($scope.page) + 3)},
                        { pageN: parseInt(($scope.page) + 4)}
                    ];
                }

                $scope.pages = pages;


                var stkService = stkHttpService.getLagerProducts(qua);
                stkService.then(function(data) {
                    if(data) {
                        $scope.products = data.data;

                        document.getElementById('pros_0').remove();

                        var div = '<div id="pros_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<strong class="text-success" ng-if="product.oldPrice">' +
                            '{{product.s_price}}<br>' +
                            '<span class="text-middle-small text-danger">Verkaufspreis wurde noch nicht definiert</span>' +
                            '</strong>' +
                            '<strong class="text-success" ng-if="product.newPrice">' +
                            '{{product.b_price}}<br>' +
                            '<span class="text-middle-small text-success">DreamPrice wurde gesetzt</span>' +
                            '</strong>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<div id="categories_{{$index}}">' +
                            '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                            '<label>1. Ebene</label>' +
                            '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                            '<md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
                            '</md-select>' +
                            '</md-input-container>' +
                            '<md-input-container>' +
                            '<input type="hidden" name="categoryIds" ng-model="categoryIds" id="categoryIds" value="">' +
                            '</md-input-container><br>' +
                            '<span id="categoryLayers_{{$index}}">{{product.ccc}}</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<div>' +
                            ' <md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                            '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,\'{{product.title}}\');" md-svg-src="plink24" class="material-icons"></md-icon>' +
                            '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                            '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        var el = document.getElementById('lager');

                        angular.element(el).append( $compile(div)($scope) );

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    }
                });
            }
        };

        $scope.submitStoreSearch = function(isValid, searchText, qua) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if(isValid) {
                var stkService = stkHttpService.getSearchLagerProducts(searchText,0);
                stkService.then(function(data) {
                    $scope.products_search = data.data;

                    var stkService = stkHttpService.getSearchLagerProductsCount(searchText);
                    stkService.then(function(data) {

                        $scope.lagerProductsSearchCount = data.data;

                        $scope.maxPages = Math.ceil(($scope.lagerProductsSearchCount / 10));

                        $scope.lagerProductsCount = '';

                        $scope.pageNumber = 1;

                        if($scope.maxPages == 1) {
                            var pages = [
                                { pageN: parseInt(1)}
                            ];
                        } else if($scope.maxPages == 2) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)}
                            ];
                        } else if($scope.maxPages == 3) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)}
                            ];
                        } else if($scope.maxPages == 4) {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)},
                                { pageN: parseInt(4)}
                            ];
                        } else {
                            var pages = [
                                { pageN: parseInt(1)},
                                { pageN: parseInt(2)},
                                { pageN: parseInt(3)},
                                { pageN: parseInt(4)},
                                { pageN: parseInt(5)}
                            ];
                        }

                        $scope.pages = pages;

                    });

                    document.getElementById('pros_0').remove();

                    var div = '<div id="pros_0">' +
                        '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                        '<strong class="text-success" ng-if="product.oldPrice">' +
                        '{{product.s_price}}<br>' +
                        '<span class="text-middle-small text-danger">Verkaufspreis wurde noch nicht definiert</span>' +
                        '</strong>' +
                        '<strong class="text-success" ng-if="product.newPrice">' +
                        '{{product.b_price}}<br>' +
                        '<span class="text-middle-small text-success">DreamPrice wurde gesetzt</span>' +
                        '</strong>' +
                        '</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                        '<div id="categories_{{$index}}">' +
                        '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                        '<label>1. Ebene</label>' +
                        '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                        '<md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
                        '</md-select>' +
                        '</md-input-container>' +
                        '<md-input-container>' +
                        '<input type="hidden" name="categoryIds" ng-model="categoryIds" id="categoryIds" value="">' +
                        '</md-input-container><br>' +
                        '<span id="categoryLayers_{{$index}}">{{product.ccc}}</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                        '<div>' +
                        ' <md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                        '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,\'{{product.title}}\');" md-svg-src="plink24" class="material-icons"></md-icon>' +
                        '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                        '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    var el = document.getElementById('lager');

                    angular.element(el).append( $compile(div)($scope) );

                    $('#lagerloader').removeClass('yesShow');
                    $('#lagerloader').addClass('noShow');
                });

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_down">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showLagerPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';

                var el = document.getElementById('p_down');

                document.getElementById('pager_down').remove();

                angular.element(el).append( $compile(div)($scope) );

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_up">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showLagerPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';

                var el = document.getElementById('p_up');

                document.getElementById('pager_up').remove();

                angular.element(el).append( $compile(div)($scope) );
            }

            $scope.loading_lager = false;
        };


        $scope.saveCategory = function(id,cid,pid) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if(id && cid) {
                var stkService = stkHttpService.saveCategory(id, cid);
                stkService.then(function(data) {
                    if(data.data == 'ok') {
                        var d = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"> <label>1. Ebene</label> <md-select ng-init="index = ' + pid + ';" name="productCategory_' + id + '" ng-id="productCategory_' + id + '" ng-model="_' + id + '"> <md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,' + id + ');" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option> </md-select> </md-input-container>';

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('s_' + pid).remove();
                        angular.element(el).prepend( $compile(d)($scope) );

                        //$('#categoryLayers_' + pid + '').text('');

                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_categorySave_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'error-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_categorySave_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }

                    $('#lagerloader').removeClass('yesShow');
                    $('#lagerloader').addClass('noShow');
                });
            }
        };

        $scope.saveProduct = function(isValid,title,description,sellingPrice,brand,manufacturer,model,base_price,reduced_price,
                                      basePriceArticle,quantity,shippingWeight,colour,material,shipping_cost,deliveryTime,shipping_countries,sellingPriceUnit,
                                      reducedPriceUnit,sku,ean,keywords,pid) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if(isValid) {

                var productData = {};
                productData.title = title;
                productData.description = description;
                productData.sellingPrice = sellingPrice;
                productData.brand = brand;
                productData.manufacturer = manufacturer;
                productData.model = model;
                productData.basePrice = base_price;
                productData.reducedPrice = reduced_price;
                productData.basePriceArticle = basePriceArticle;
                productData.quantity = quantity;
                productData.shippingWeight = shippingWeight;
                productData.colour = colour;
                productData.material = material;
                productData.shippingCost = shipping_cost;
                productData.deliveryTime = deliveryTime;
                productData.shippingCountries = shipping_countries;
                productData.sellingPriceUnit = sellingPriceUnit;
                productData.reducedPriceUnit = reducedPriceUnit;
                productData.sku = sku;
                productData.ean = ean;
                productData.keywords = keywords;
                productData.productId = pid;
                productData.catId = $('#catId1').val();

                var stkService = stkHttpService.saveProductDetails(productData);
                stkService.then(function (data) {
                    if(data.data === 'ok') {
                        $('#title1').val('');
                        $('#desc1').val('');
                        $('#sellingPrice1').val('');
                        $('#brand1').val('');
                        $('#manufacturer1').val('');
                        $('#model1').val('');
                        $('#base_price1').val('');
                        $('#reduced_price1').val('');
                        $('#basePriceArticle1').val('');
                        $('#quantity11').val('');
                        $('#shippingWeight1').val('');
                        $('#colour1').val('');
                        $('#material1').val('');
                        $('#shippingCost1').val('');
                        $('#deliveryTime1').val('');
                        $('#shippingCountries1').val('');
                        $('#sellingPriceUnit1').val('');
                        $('#reducedPriceUnit1').val('');
                        $('#sku1').val('');
                        $('#ean1').val('');
                        $('#keywords1').val('');
                        $('#catId1').val('');
                        $('#categoryLayers_88999').text('');

                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_productSave_1_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $mdToast.show({
                            theme       : 'error-toast',
                            hideDelay   : 3000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_productSave_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                });
            }

            $('#lagerloader').removeClass('yesShow');
            $('#lagerloader').addClass('noShow');
        };

        $scope.showDialog = function(ev, id, index) {
            $mdDialog.show({
                //controller: DialogController,
                //templateUrl: 'views/storeDialog1.html',
                contentElement: "#"+id+index,
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

        $scope.cancel = function() {
            $mdDialog.destroy();
        };

        $scope.add2CategoryLayer = function(id1,pid,layer,proId) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

                if(layer == 1) {
                    var stkService = stkHttpService.getCategories();
                    stkService.then(function(data) {
                        $scope.categories = data.data;

                        if($scope.categories) {
                            var el = document.getElementById('categories_'+pid);

                            var div = '<md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="productCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId1,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option> </md-select>';

                            $('#layerLabelCategory').text(layer + '. Ebene');

                            angular.element(el).replaceWith( $compile(div)($scope) );

                            $('#lagerloader').removeClass('yesShow');
                            $('#lagerloader').addClass('noShow');
                        }
                    });
                } else if(layer == 2) {
                    var stkService = stkHttpService.getCategories2(id1);
                    stkService.then(function(data) {
                        $scope.categories2 = data.data;

                        $('#categoryLayers_' + pid).text('');

                        if($scope.categories2.length) {

                            var div = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"><label>2. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId2,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories2" ng-value="{{category.categoryId2}}">{{category.categoryLayer2Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);
                        } else  if(proId !== 11111111){
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );


                        for(var index = 0; index < $scope.categories.length; index++) {
                            if($scope.categories[index].categoryId1 == id1) {
                                var categoryLayerActual = $scope.categories[index].categoryLayer1Name;
                            }
                        }

                        $('#categoryLayers_' + pid).text(categoryLayerActual);
                        $('#catId').val(id1);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                } else if(layer == 3) {
                    var stkService = stkHttpService.getCategories3(id1);
                    stkService.then(function(data) {
                        $scope.categories3 = data.data;

                        if($scope.categories3.length) {

                            var div = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"><label>3. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId3,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories3" ng-value="{{category.categoryId3}}">{{category.categoryLayer3Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);
                        } else if(proId !== 11111111){
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );

                        for(var index = 0; index < $scope.categories2.length; index++) {
                            if($scope.categories2[index].categoryId2 == id1) {
                                var categoryLayerActual = $scope.categories2[index].categoryLayer2Name;
                            }
                        }

                        var catText = $('#categoryLayers_' + pid + '').text();

                        $('#categoryLayers_' + pid).text(catText + '->' + categoryLayerActual);
                        $('#catId').val(id1);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                } else if(layer == 4) {
                    var stkService = stkHttpService.getCategories4(id1);
                    stkService.then(function(data) {
                        $scope.categories4 = data.data;

                        if($scope.categories4.length) {

                            var div = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"><label>4. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId4,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories4" ng-value="{{category.categoryId4}}">{{category.categoryLayer4Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);
                        } else if(proId !== 11111111){
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );

                        for(var index = 0; index < $scope.categories3.length; index++) {
                            if($scope.categories3[index].categoryId3 == id1) {
                                var categoryLayerActual = $scope.categories3[index].categoryLayer3Name;
                            }
                        }

                        var catText = $('#categoryLayers_' + pid + '').text();
                        $('#catId').val(id1);

                        $('#categoryLayers_' + pid).text(catText + '->' + categoryLayerActual);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                } else if(layer == 5) {
                    var stkService = stkHttpService.getCategories5(id1);
                    stkService.then(function(data) {
                        $scope.categories5 = data.data;

                        if($scope.categories5.length) {
                            var div = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"><label>5. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId5,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories5" ng-value="{{category.categoryId5}}">{{category.categoryLayer5Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);
                        } else if(proId !== 11111111){
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );

                        for(var index = 0; index < $scope.categories4.length; index++) {
                            if($scope.categories4[index].categoryId4 == id1) {
                                var categoryLayerActual = $scope.categories4[index].categoryLayer4Name;
                            }
                        }

                        var catText = $('#categoryLayers_' + pid + '').text();
                        $('#catId').val(id1);

                        $('#categoryLayers_' + pid).text(catText + '->' + categoryLayerActual);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });

                } else if(layer == 6) {
                    var stkService = stkHttpService.getCategories6(id1);
                    stkService.then(function(data) {
                        $scope.categories6 = data.data;

                        if($scope.categories6.length) {
                            var div = '<md-input-container style="margin-top: 0 !important;" id="p_' + pid + '"><label>6. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId6,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories6" ng-value="{{category.categoryId6}}">{{category.categoryLayer6Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);
                        } else  if(proId !== 11111111){
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );

                        for(var index = 0; index < $scope.categories5.length; index++) {
                            if($scope.categories5[index].categoryId5 == id1) {
                                var categoryLayerActual = $scope.categories5[index].categoryLayer5Name;
                            }
                        }

                        var catText = $('#categoryLayers_' + pid + '').text();

                        $('#categoryLayers_' + pid).text(catText + '->' + categoryLayerActual);
                        $('#catId').val(id1);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });

                } else if(layer == 7) {
                    var stkService = stkHttpService.getCategories7(id1);
                    stkService.then(function(data) {
                        $scope.categories7 = data.data;

                        if($scope.categories7.length) {

                            var div = '<md-input-container style="margin-top: 0 !important;" ng-id="p_' + pid + '"><label>7. Ebene</label><md-select name="productCategory_' + pid + '" id="productCategory_' + pid + '" ng-model="ProductCategory_' + pid + '"> <md-option ng-click="add2CategoryLayer(category.categoryId7,' + pid + ',' + (layer+1) + ',' + proId + ');" ng-repeat="category in categories7" ng-value="{{category.categoryId7}}">{{category.categoryLayer7Name}}</md-option> </md-select></md-input-container>';
                            $('#categoryIds').val(id1);

                        } else if(proId !== 11111111) {
                            var div = '<md-input-container style="margin-top: 0 !important;" id="s_' + pid + '"><button class="md-button md-raised md-warn" type="button" ng-click="saveCategory(' + proId + ',' + id1 + ',' + pid + ');">Speichern</button></md-input-container>';
                        } else {
                            var div = '';
                        }

                        var el = document.getElementById('categories_' + pid);

                        document.getElementById('p_' + pid).remove();
                        angular.element(el).prepend( $compile(div)($scope) );

                        for(var index = 0; index < $scope.categories6.length; index++) {
                            if($scope.categories6[index].categoryId6 == id1) {
                                var categoryLayerActual = $scope.categories6[index].categoryLayer6Name;
                            }
                        }

                        var catText = $('#categoryLayers_' + pid + '').text();

                        $('#categoryLayers_' + pid).text(catText + '->' + categoryLayerActual);
                        $('#catId').val(id1);

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    });
                }
        };

        $scope.initPurchases = function() {
            $scope.sellsLoader = true;

            var stkService = stkHttpService.getPurchases();
            stkService.then(function(data) {

                $scope.purchases = data.data;

                for(var index = 0; index < $scope.purchases.length; index++) {
                    for(var jindex = 0; jindex < parseInt(data.data[index]['pio'].pLength); jindex++) {
                        $scope.purchases[index][jindex].productPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index][jindex].productPrice);
                    }
                    $scope.purchases[index]['pio'].sumAll = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index]['pio'].sumAll);
                    $scope.purchases[index]['pio'].sumShipping = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data[index]['pio'].sumShipping);
                }

                console.log($scope.purchases);
            });

            $scope.sellsLoader = false;
        };

        $scope.exportCSV = function() {
            alert('CSV Export');
        };

        $scope.initProducts = function(quantityShown) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            var stkService = stkHttpService.getLagerProducts(quantityShown);
            stkService.then(function(data) {

                $scope.products = data.data;
                $scope.pprice = 'Richtpreis, bitte aktualisieren';

                for(var index = 0;index < $scope.products.length;index++) {
                    if ($scope.products[index].selling_price) {
                        $scope.products[index].oldPrice = true;
                        $scope.products[index].newPrice = false;
                        $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                        $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                    }

                    if ($scope.products[index].dream_price) {
                        $scope.products[index].oldPrice = false;
                        $scope.products[index].newPrice = true;
                        $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                        $scope.priceMessage = 'Dreampreis wurde definiert';
                    }
                }
            });

            var stkService = stkHttpService.getCategories();
            stkService.then(function(data) {

                $scope.categories = data.data;
            });

            var stkService = stkHttpService.getLagerProductsCount();
            stkService.then(function(data) {
                $scope.lagerProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

                if($scope.maxPages === 1) {
                    var pages = [
                        { pageN: parseInt(1)}
                    ];
                } else if($scope.maxPages === 2) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)}
                    ];
                } else if($scope.maxPages === 3) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)}
                    ];
                } else if($scope.maxPages === 4) {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)},
                        { pageN: parseInt(4)}
                    ];
                } else {
                    var pages = [
                        { pageN: parseInt(1)},
                        { pageN: parseInt(2)},
                        { pageN: parseInt(3)},
                        { pageN: parseInt(4)},
                        { pageN: parseInt(5)}
                    ];
                }

                $scope.pages = pages;
            });

            $('#lagerloader').removeClass('yesShow');
            $('#lagerloader').addClass('noShow');
        };

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
