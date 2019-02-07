'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('PortfolioCtrl', function ($scope, $rootScope, stkHttpService, $mdToast, $compile) {

        $scope.pageNumber = 1;
        $scope.pageNumber1 = 1;
        $scope.page = 1;

        $scope.portfolioloader = false;

        $scope.refreshProduct = function(id,pid,index) {
            if(id) {
                $('#sspinner_' + index).show();
                var stkService = stkHttpService.refreshProduct(id,pid);
                stkService.then(function (data) {
                    if(data) {
                        $scope.available = [];
                        $scope.availableText = [];
                        var price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.data.selling_price);
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

                        $('#sspinner_' + index).hide();
                    }
                });
            }
        };

        $scope.submitPortfolioSearch = function(isValid, searchText, qua) {
            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            if(isValid) {
                var stkService = stkHttpService.getSearchPortfolioProducts($rootScope.categoryId,searchText,0);
                stkService.then(function(data1) {

                    //$rootScope = $rootScope.$new(true);
                    //$scope = $scope.$new(true);

                    $scope.portfolioProducts = data1.data;

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if(angular.isArray($scope.available)) {
                            if(angular.isDefined($scope.available[index])) {
                                $scope.available[index] = false;
                                $scope.availableText[index] = '';
                            }
                        }
                    }

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index].base_price) {
                            $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                        }
                    }

                    var stkService = stkHttpService.getSearchPortfolioProductsCount($rootScope.categoryId,searchText);
                    stkService.then(function(data) {

                        $scope.portfolioProductsSearchCount = data.data;

                        $scope.maxPages = Math.ceil(($scope.portfolioProductsSearchCount / 10));

                        $scope.portfolioProductsCount = '';

                        $scope.pageNumber = 1;

                        if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 2) {
                            if($scope.page == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 3) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 4) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 4) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                            if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)},
                                    {pageN: parseInt(($scope.page) + 2)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                            }
                        } else {
                            var pages = [
                                {pageN: parseInt($scope.page)},
                                {pageN: parseInt(($scope.page) + 1)},
                                {pageN: parseInt(($scope.page) + 2)},
                                {pageN: parseInt(($scope.page) + 3)},
                                {pageN: parseInt(($scope.page) + 4)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        }

                        $scope.pages = pages;

                    });

                    document.getElementById('proso_0').remove();

                    var div = '<div id="proso_0">' +
                        '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                    '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                    '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong ng-class="available[$index] ? \'text-success\' : \'text-danger\'" id="pprice_{{$index}}" ng-if="product.s_price">{{product.s_price}}</strong><br>' +
                        '<span class="text-small">{{pprice}}</span></div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                                '<span id="categoryLayers_po_{{$index}}">{{product.ccc}}</span>' +
                                '</div>' +
                            '</div>' +
                        '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="available[$index] ? \'text-success\' : \'text-danger\'">{{availableText[$index]}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div class="small-spinner" style="display: none;" id="sspinner_{{$index}}">' +
                                    '<div class="double-bounce1"></div>' +
                                    '<div class="double-bounce2"></div>' +
                                    '</div>' +
                                '<md-button ng-show="available[$index]" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                                    'ins Lager übernehmen' +
                                    '</md-button>' +
                                '<md-icon title="Aktualisieren" ng-click="refreshProduct(product.productId,product.shopId,$index);" md-svg-src="actual24" class="material-icons"></md-icon>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    var el = document.getElementById('portfolio');

                    angular.element(el).append( $compile(div)($scope) );

                    $('#portfolioloader').removeClass('yesShow');
                    $('#portfolioloader').addClass('noShow');
                });

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_odown">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showPortfolioPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';

                var el = document.getElementById('po_down');

                var removeElement = document.getElementById('pager_odown');

                removeElement.remove();

                angular.element(el).append( $compile(div)($scope) );

                var div = '<div layout="row" class="text-center" layout-wrap flex id="pager_oup">' +
                    '<div flex="20" md-flex="20" sm-flex="20" xs-flex="50" ng-repeat="pageN in pages">' +
                    '<h3 ng-click="showPortfolioPageSearch(pageN.pageN,\'' + searchText + '\');">{{pageN.pageN}}</h3>' +
                    '</div>' +
                    '</div>';


                $('#pager_oup').remove();

                var el = $('#po_up');

                angular.element(el).append( $compile(div)($scope) );
            }

        };

        $scope.showPortfolioPageSearch = function(page, search) {
            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            var stkService = stkHttpService.getSearchPortfolioProductsCount($rootScope.categoryId,search);
            stkService.then(function(data) {
                $scope.portfolioProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

                if(page) {
                    $scope.page = parseInt(page);
                    if (page == 1) {
                        var qua = 0;
                    } else {
                        var qua = (parseInt((page - 1)) * 10);
                    }

                    $scope.pageNumber = page;

                    if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                        var pages = [
                            {pageN: parseInt(1)}
                        ];

                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    } else if (parseInt($scope.maxPages) == 1) {
                        var pages = [
                            {pageN: parseInt(1)}
                        ];

                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    } else if (parseInt($scope.maxPages) == 2) {
                        if($scope.page == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.maxPages) == 3) {
                        if(parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 2) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 3) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.maxPages) == 4) {
                        if(parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 2) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 3) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 4) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                        if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))},
                                {pageN: parseInt(($scope.page) + 1)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))},
                                {pageN: parseInt(($scope.page) + 1)},
                                {pageN: parseInt(($scope.page) + 2)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                        }
                    } else {
                        var pages = [
                            {pageN: parseInt($scope.page)},
                            {pageN: parseInt(($scope.page) + 1)},
                            {pageN: parseInt(($scope.page) + 2)},
                            {pageN: parseInt(($scope.page) + 3)},
                            {pageN: parseInt(($scope.page) + 4)}
                        ];

                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    }

                    $scope.pages = pages;
                }
            });

                var stkService = stkHttpService.getSearchPortfolioProducts($rootScope.categoryId,search, ((page - 1) * 10));
                stkService.then(function (data) {
                    if (data) {
                        $scope.portfolioProducts = data.data;

                        if($scope.portfolioProducts.length > 0) {
                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if(angular.isArray($scope.available)) {
                                    if(angular.isDefined($scope.available[index])) {
                                        $scope.available[index] = false;
                                        $scope.availableText[index] = '';
                                    }
                                }
                            }

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index].base_price) {
                                    $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                                }
                            }

                            document.getElementById('proso_0').remove();

                            var div = '<div id="proso_0">' +
                                '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong ng-class="available[$index] ? \'text-success\' : \'text-danger\'" id="pprice_{{$index}}" ng-if="product.s_price">{{product.s_price}}</strong><br>' +
                                '<span class="text-small">{{pprice}}</span></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                                '<span id="categoryLayers_po_{{$index}}">{{product.ccc}}</span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="available[$index] ? \'text-success\' : \'text-danger\'">{{availableText[$index]}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div class="small-spinner" style="display: none;" id="sspinner_{{$index}}">' +
                                '<div class="double-bounce1"></div>' +
                                '<div class="double-bounce2"></div>' +
                                '</div>' +
                                '<md-button ng-show="available[$index]" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                                'ins Lager übernehmen' +
                                '</md-button>' +
                                '<md-icon title="Aktualisieren" ng-click="refreshProduct(product.productId,product.shopId,$index);" md-svg-src="actual24" class="material-icons"></md-icon>' +
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

        };

        $scope.resetPortfolioSearch = function() {

            $scope.portfolioSearch = '';
            $scope.portfolioProductsSearchCount = '';
            var page = 1;
            $rootScope.categoryId = 166;

            $('#portfolioloader').removeClass('noShow');
            $('#portfolioloader').addClass('yesShow');

            var stkService = stkHttpService.getPortfolioProductsCount($rootScope.categoryId);
            stkService.then(function(data) {

                $scope.portfolioProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

                if(page) {
                    $scope.page = parseInt(page);

                    $scope.pageNumber = page;

                    if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                        var pages = [
                            {pageN: parseInt(1)}
                        ];

                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    } else if (parseInt($scope.maxPages) == 1) {
                        var pages = [
                            {pageN: parseInt(1)}
                        ];

                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    } else if (parseInt($scope.maxPages) == 2) {
                        if($scope.page == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.maxPages) == 3) {
                        if(parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 2) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 3) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.maxPages) == 4) {
                        if(parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 2) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 3) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if(parseInt($scope.page) == 4) {
                            var pages = [
                                {pageN: parseInt(1)},
                                {pageN: parseInt(2)},
                                {pageN: parseInt(3)},
                                {pageN: parseInt(4)}
                            ];
                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        }
                    } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                        if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))},
                                {pageN: parseInt(($scope.page) + 1)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))},
                                {pageN: parseInt(($scope.page) + 1)},
                                {pageN: parseInt(($scope.page) + 2)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                            var pages = [
                                {pageN: parseInt($scope.page) - 2},
                                {pageN: parseInt(($scope.page) - 1)},
                                {pageN: parseInt(($scope.page))}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                        }
                    } else {
                        var pages = [
                            {pageN: parseInt($scope.page)},
                            {pageN: parseInt(($scope.page) + 1)},
                            {pageN: parseInt(($scope.page) + 2)},
                            {pageN: parseInt(($scope.page) + 3)},
                            {pageN: parseInt(($scope.page) + 4)}
                        ];

                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    }

                    $scope.pages = pages;
                }
            });

            if (page == 1) {
                var qua = 0;
            } else {
                var qua = (parseInt((page - 1)) * 10);
            }

                var stkService = stkHttpService.getPortfolioProducts($rootScope.categoryId,qua);
                stkService.then(function(data) {
                    if(data) {
                        $scope.portfolioProducts = data.data;

                        for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                            if(angular.isArray($scope.available)) {
                                if(angular.isDefined($scope.available[index])) {
                                    $scope.available[index] = false;
                                    $scope.availableText[index] = '';
                                }
                            }
                        }

                        for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                            if ($scope.portfolioProducts[index].base_price) {
                                $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                            }
                        }

                        document.getElementById('proso_0').remove();

                        var div = '<div id="proso_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong ng-class="available[$index] ? \'text-success\' : \'text-danger\'" id="pprice_{{$index}}" ng-if="product.s_price">{{product.s_price}}</strong><br>' +
                            '<span class="text-small">{{pprice}}</span></div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                            '<span id="categoryLayers_po_{{$index}}">{{product.ccc}}</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="available[$index] ? \'text-success\' : \'text-danger\'">{{availableText[$index]}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                            '<div class="small-spinner" style="display: none;" id="sspinner_{{$index}}">' +
                            '<div class="double-bounce1"></div>' +
                            '<div class="double-bounce2"></div>' +
                            '</div>' +
                            '<md-button ng-show="available[$index]" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                            'ins Lager übernehmen' +
                            '</md-button>' +
                            '<md-icon title="Aktualisieren" ng-click="refreshProduct(product.productId,product.shopId,$index);" md-svg-src="actual24" class="material-icons"></md-icon>' +
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

        };

        $scope.showPortfolioPage = function(page) {

                $scope.page = parseInt(page);
                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');

            if (page == 1) {
                var qua = 0;
            } else {
                var qua = (parseInt((page - 1)) * 10);
            }

                var stkService = stkHttpService.getPortfolioProductsCount($rootScope.categoryId);
                stkService.then(function(data) {

                    $scope.portfolioProductsCount = data.data;

                    $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));

                    if(page) {
                        $scope.page = parseInt(page);

                        $scope.pageNumber = page;

                        if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 2) {
                            if($scope.page == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 3) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 4) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 4) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                            if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)},
                                    {pageN: parseInt(($scope.page) + 2)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                            }
                        } else {
                            var pages = [
                                {pageN: parseInt($scope.page)},
                                {pageN: parseInt(($scope.page) + 1)},
                                {pageN: parseInt(($scope.page) + 2)},
                                {pageN: parseInt(($scope.page) + 3)},
                                {pageN: parseInt(($scope.page) + 4)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        }

                        $scope.pages = pages;
                    }
                });

                    var stkService = stkHttpService.getPortfolioProducts($rootScope.categoryId,qua);
                    stkService.then(function(data) {
                        if(data) {
                            $scope.portfolioProducts = data.data;

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if(angular.isArray($scope.available)) {
                                    if(angular.isDefined($scope.available[index])) {
                                        $scope.available[index] = false;
                                        $scope.availableText[index] = '';
                                    }
                                }
                            }

                            for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                                if ($scope.portfolioProducts[index].base_price) {
                                    $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                                }
                            }

                            document.getElementById('proso_0').remove();

                            var div = '<div id="proso_0">' +
                                '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in portfolioProducts track by $index" flex>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><img src="{{product.main_image}}" width="120"></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">{{product.title}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><strong ng-class="available[$index] ? \'text-success\' : \'text-danger\'" id="pprice_{{$index}}" ng-if="product.s_price">{{product.s_price}}</strong><br>' +
                                '<span class="text-small">{{pprice}}</span></div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div flex="100" flex-xs="100" flex-sm="25" flex-md="25" id="categories_po_{{$index}}">' +
                                '<span id="categoryLayers_po_{{$index}}">{{product.ccc}}</span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25"><span ng-class="available[$index] ? \'text-success\' : \'text-danger\'">{{availableText[$index]}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="15" flex-sm="25" flex-md="25">' +
                                '<div class="small-spinner" style="display: none;" id="sspinner_{{$index}}">' +
                                '<div class="double-bounce1"></div>' +
                                '<div class="double-bounce2"></div>' +
                                '</div>' +
                                '<md-button ng-show="available[$index]" ng-click="addToLager(product.productId,product.shopId);" class="md-button md-raised md-warn">' +
                                'ins Lager übernehmen' +
                                '</md-button>' +
                                '<md-icon title="Aktualisieren" ng-click="refreshProduct(product.productId,product.shopId,$index);" md-svg-src="actual24" class="material-icons"></md-icon>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                            var el = document.getElementById('portfolio');

                            angular.element(el).append( $compile(div)($scope) );

                            $('#portfolioloader').removeClass('yesShow');
                            $('#portfolioloader').addClass('noShow');
                        }
                    });
        };

        $scope.addToLager = function(productId, pid) {
            if(productId && pid) {
                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');
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

                    $('#portfolioloader').removeClass('yesShow');
                    $('#portfolioloader').addClass('noShow');
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

                    $scope.maxPages = Math.ceil(($scope.portfolioProductsCount / 10));
                    var page = 1;
                    if(page) {
                        $scope.page = parseInt(page);

                        $scope.pageNumber = page;

                        if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 1) {
                            var pages = [
                                {pageN: parseInt(1)}
                            ];

                            $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                        } else if (parseInt($scope.maxPages) == 2) {
                            if($scope.page == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 3) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.maxPages) == 4) {
                            if(parseInt($scope.page) == 1) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 2) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 3) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if(parseInt($scope.page) == 4) {
                                var pages = [
                                    {pageN: parseInt(1)},
                                    {pageN: parseInt(2)},
                                    {pageN: parseInt(3)},
                                    {pageN: parseInt(4)}
                                ];
                                $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                            }
                        } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                            if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))},
                                    {pageN: parseInt(($scope.page) + 1)},
                                    {pageN: parseInt(($scope.page) + 2)}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.page) * 10);
                            } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                                var pages = [
                                    {pageN: parseInt($scope.page) - 2},
                                    {pageN: parseInt(($scope.page) - 1)},
                                    {pageN: parseInt(($scope.page))}
                                ];

                                $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                            }
                        } else {
                            var pages = [
                                {pageN: parseInt($scope.page)},
                                {pageN: parseInt(($scope.page) + 1)},
                                {pageN: parseInt(($scope.page) + 2)},
                                {pageN: parseInt(($scope.page) + 3)},
                                {pageN: parseInt(($scope.page) + 4)}
                            ];

                            $scope.pageNumberNum = (parseInt($scope.page) * 10);
                        }

                        $scope.pages = pages;
                    }

                    $('#portfolioloader').removeClass('yesShow');
                    $('#portfolioloader').addClass('noShow');
                });

                $('#portfolioloader').removeClass('noShow');
                $('#portfolioloader').addClass('yesShow');

                var stkService = stkHttpService.getPortfolioProducts(id, 0);
                stkService.then(function (data) {
                    $scope.portfolioProducts = data.data;

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if(angular.isArray($scope.available)) {
                            if(angular.isDefined($scope.available[index])) {
                                $scope.available[index] = false;
                                $scope.availableText[index] = '';
                            }
                        }
                    }

                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index].base_price) {
                            $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
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
                if(data.data) {
                    $scope.portfolioProducts = data.data;
                    $scope.pprice = 'Richtpreis, bitte aktualisieren';


                    for(var index = 0;index < $scope.portfolioProducts.length;index++) {
                        if ($scope.portfolioProducts[index].base_price) {
                            $scope.portfolioProducts[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.portfolioProducts[index].base_price);
                        }
                    }
                } else {
                    $scope.portfolioMessage = 'Keine Portfolio - Produkte vorhanden.';
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

                if(parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
                    var pages = [
                        {pageN: parseInt(1)}
                    ];

                    $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                } else if (parseInt($scope.maxPages) == 1) {
                    var pages = [
                        {pageN: parseInt(1)}
                    ];

                    $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                } else if (parseInt($scope.maxPages) == 2) {
                    if($scope.page == 1) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)}
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)}
                        ];
                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    }
                } else if (parseInt($scope.maxPages) == 3) {
                    if(parseInt($scope.page) == 1) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)}
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if(parseInt($scope.page) == 2) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)},
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if(parseInt($scope.page) == 3) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)}
                        ];
                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    }
                } else if (parseInt($scope.maxPages) == 4) {
                    if(parseInt($scope.page) == 1) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)},
                            {pageN: parseInt(4)}
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if(parseInt($scope.page) == 2) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)},
                            {pageN: parseInt(4)}
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if(parseInt($scope.page) == 3) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)},
                            {pageN: parseInt(4)}
                        ];
                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if(parseInt($scope.page) == 4) {
                        var pages = [
                            {pageN: parseInt(1)},
                            {pageN: parseInt(2)},
                            {pageN: parseInt(3)},
                            {pageN: parseInt(4)}
                        ];
                        $scope.pageNumberNum = parseInt($scope.lagerProductsCount);
                    }
                } else if (parseInt($scope.page) > 3 && parseInt($scope.maxPages) >= 5) {
                    if (parseInt($scope.maxPages) == (parseInt($scope.page) + 1)) {
                        var pages = [
                            {pageN: parseInt($scope.page) - 2},
                            {pageN: parseInt(($scope.page) - 1)},
                            {pageN: parseInt(($scope.page))},
                            {pageN: parseInt(($scope.page) + 1)}
                        ];

                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if (parseInt($scope.maxPages) > parseInt($scope.page)) {
                        var pages = [
                            {pageN: parseInt($scope.page) - 2},
                            {pageN: parseInt(($scope.page) - 1)},
                            {pageN: parseInt(($scope.page))},
                            {pageN: parseInt(($scope.page) + 1)},
                            {pageN: parseInt(($scope.page) + 2)}
                        ];

                        $scope.pageNumberNum = (parseInt($scope.page) * 10);
                    } else if (parseInt($scope.maxPages) == parseInt($scope.page)) {
                        var pages = [
                            {pageN: parseInt($scope.page) - 2},
                            {pageN: parseInt(($scope.page) - 1)},
                            {pageN: parseInt(($scope.page))}
                        ];

                        $scope.pageNumberNum = (parseInt($scope.lagerProductsCount));
                    }
                } else {
                    var pages = [
                        {pageN: parseInt($scope.page)},
                        {pageN: parseInt(($scope.page) + 1)},
                        {pageN: parseInt(($scope.page) + 2)},
                        {pageN: parseInt(($scope.page) + 3)},
                        {pageN: parseInt(($scope.page) + 4)}
                    ];

                    $scope.pageNumberNum = (parseInt($scope.page) * 10);
                }

                $scope.pages = pages;
            });

            $('#portfolioloader').removeClass('yesShow');
            $('#portfolioloader').addClass('noShow');
        };
    });