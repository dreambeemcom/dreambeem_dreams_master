'use strict';

/**
 * @ngdoc function
 * @name dreambeemcomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreambeemcomApp
 */
angular.module('customerDreambeemcomApp')
    .controller('LagerCtrl', function ($scope, stkHttpService, $mdDialog, $mdToast, $window, $rootScope, $compile) {

        $scope.pageNumber = 1;
        $scope.pageNumber1 = 1;
        $scope.page = 1;


        $scope.loading_lager = false;

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

                            var oldProduct = $('#pppriceo_' + $rootScope.index);
                            if(oldProduct.length > 0) {
                                $('#oMessage_' + $rootScope.index).text('Dreampreis wurde definiert');
                                $('#pppriceo_' + $rootScope.index).text($scope.dreamPrice1);
                                $('#oMessage_' + $rootScope.index).removeClass('text-danger');
                                $('#oMessage_' + $rootScope.index).addClass('text-success');
                            } else {
                                $('#nMessage_' + $rootScope.index).text('Dreampreis wurde definiert');
                                $('#pppricen_' + $rootScope.index).text($scope.dreamPrice1);
                                $('#nMessage_' + $rootScope.index).removeClass('text-danger');
                                $('#nMessage_' + $rootScope.index).addClass('text-success');
                            }

                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'bottom',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_priceIncrease_1_alert.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme       : 'error-toast',
                                hideDelay   : 3000,
                                position    : 'bottom',
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

                        if(parseFloat(data.data[0].dream_price) > 0) {
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

        $scope.refresh = function() {
            $scope.resetSearch();
        };

        $scope.showLagerPageSearch = function(page, search) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            var stkService = stkHttpService.getSearchLagerProductsCount(search);
            stkService.then(function (data) {
                $scope.lagerProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

                if(page) {
                    $scope.page = parseInt(page);

                    $scope.pageNumber = page;

                    if (parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
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

                var stkService = stkHttpService.getSearchLagerProducts(search, ((page - 1) * 10));
                stkService.then(function (data) {
                    if (data) {
                        $scope.products = data.data;

                        $scope.oldPrice = true;

                        for(var index = 0;index < $scope.products.length;index++) {
                            if ($scope.products[index].selling_price) {
                                $scope.products[index].oldPrice = true;
                                $scope.products[index].newPrice = false;
                                $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                                $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                            }

                            if (parseFloat($scope.products[index].dream_price) > 0) {
                                $scope.products[index].oldPrice = false;
                                $scope.products[index].newPrice = true;
                                $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                                $scope.priceMessage = 'Dreampreis wurde definiert';
                            }
                        }

                        document.getElementById('pros_0').remove();

                        var div = '<div id="pros_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<strong class="text-success" ng-if="product.oldPrice">' +
                                '<span id="pppriceo_{{$index}}">{{product.s_price}}</span><br>' +
                                '<span class="text-middle-small text-danger" id="oMessage_{{$index}}">{{priceMessage}}</span>' +
                                '</strong>' +
                                '<strong class="text-success" ng-if="product.newPrice">' +
                                    '<span id="pppricen_{{$index}}">{{product.d_price}}</span><br>' +
                                    '<span class="text-middle-small text-success" id="nMessage_{{$index}}">{{priceMessage}}</span>' +
                                    '</strong>' +
                                    '</div>' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                                    '<div id="categories_{{$index}}">' +
                                        '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                                            '<label>1. Ebene</label>' +
                                            '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                                                ' <md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
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
                                                '<md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId,$index);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,product.title);" md-svg-src="plink24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                                                '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';

                        var el = document.getElementById('lager');

                        angular.element(el).append($compile(div)($scope));

                        $('#lagerloader').removeClass('yesShow');
                        $('#lagerloader').addClass('noShow');
                    }
                });

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

                $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

                if(page) {
                    $scope.page = parseInt(page);

                    $scope.pageNumber = page;

                    if (parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
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
                                $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                            }

                            if (parseFloat($scope.products[index].dream_price) > 0) {
                                $scope.products[index].oldPrice = false;
                                $scope.products[index].newPrice = true;
                                $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                                $scope.priceMessage = 'Dreampreis wurde definiert';
                            }
                        }

                        document.getElementById('pros_0').remove();

                        var div = '<div id="pros_0">' +
                            '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<strong class="text-success" ng-if="product.oldPrice">' +
                            '<span id="pppriceo_{{$index}}">{{product.s_price}}</span><br>' +
                            '<span class="text-middle-small text-danger" id="oMessage_{{$index}}">{{priceMessage}}</span>' +
                            '</strong>' +
                            '<strong class="text-success" ng-if="product.newPrice">' +
                            '<span id="pppricen_{{$index}}">{{product.d_price}}</span><br>' +
                            '<span class="text-middle-small text-success" id="nMessage_{{$index}}">{{priceMessage}}</span>' +
                            '</strong>' +
                            '</div>' +
                            '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                            '<div id="categories_{{$index}}">' +
                            '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                            '<label>1. Ebene</label>' +
                            '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                            ' <md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
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
                            '<md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId,$index);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                            '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,product.title);" md-svg-src="plink24" class="material-icons"></md-icon>' +
                            '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                            '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
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
        };

        $scope.showLagerPage = function(page) {

            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            var stkService = stkHttpService.getLagerProductsCount();
            stkService.then(function(data) {
                $scope.lagerProductsCount = data.data;

                $scope.maxPages = Math.ceil(($scope.lagerProductsCount / 10));

                if (page) {
                    $scope.page = parseInt(page);

                    if (page == 1) {
                        var qua = 0;
                    } else {
                        var qua = (parseInt((page - 1)) * 10);
                    }

                    $scope.pageNumber = page;

                    if (parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
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

                    var stkService = stkHttpService.getLagerProducts(qua);
                    stkService.then(function (data) {
                        if (data) {
                            $scope.products = data.data;

                            $scope.pprice = 'Richtpreis, bitte aktualisieren';

                            for(var index = 0;index < $scope.products.length;index++) {
                                if ($scope.products[index].selling_price) {
                                    $scope.products[index].oldPrice = true;
                                    $scope.products[index].newPrice = false;
                                    $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                                    $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                                }

                                if (parseFloat($scope.products[index].dream_price) > 0) {
                                    $scope.products[index].oldPrice = false;
                                    $scope.products[index].newPrice = true;
                                    $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                                    $scope.priceMessage = 'Dreampreis wurde definiert';
                                }
                            }

                            document.getElementById('pros_0').remove();

                            var div = '<div id="pros_0">' +
                                '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                                '<strong class="text-success" ng-if="product.oldPrice">' +
                                '<span id="pppriceo_{{$index}}">{{product.s_price}}</span><br>' +
                                '<span class="text-middle-small text-danger" id="oMessage_{{$index}}">{{priceMessage}}</span>' +
                                '</strong>' +
                                '<strong class="text-success" ng-if="product.newPrice">' +
                                '<span id="pppricen_{{$index}}">{{product.d_price}}</span><br>' +
                                '<span class="text-middle-small text-success" id="nMessage_{{$index}}">{{priceMessage}}</span>' +
                                '</strong>' +
                                '</div>' +
                                '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                                '<div id="categories_{{$index}}">' +
                                '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                                '<label>1. Ebene</label>' +
                                '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                                ' <md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
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
                                '<md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId,$index);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                                '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,product.title);" md-svg-src="plink24" class="material-icons"></md-icon>' +
                                '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                                '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
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
            });
        };

        $scope.submitStoreSearch = function(isValid, searchText, qua) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            if(isValid) {
                var stkService = stkHttpService.getSearchLagerProducts(searchText,0);
                stkService.then(function(data) {
                    $scope.products = data.data;

                    $scope.oldPrice = true;

                    for(var index = 0;index < $scope.products.length;index++) {
                        if ($scope.products[index].selling_price) {
                            $scope.products[index].oldPrice = true;
                            $scope.products[index].newPrice = false;
                            $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                            $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                        }

                        if (parseFloat($scope.products[index].dream_price) > 0) {
                            $scope.products[index].oldPrice = false;
                            $scope.products[index].newPrice = true;
                            $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                            $scope.priceMessage = 'Dreampreis wurde definiert';
                        }
                    }

                    var stkService = stkHttpService.getSearchLagerProductsCount(searchText);
                    stkService.then(function(data) {

                        $scope.lagerProductsSearchCount = data.data;

                        $scope.maxPages = Math.ceil(($scope.lagerProductsSearchCount / 10));

                        $scope.lagerProductsCount = '';

                        $scope.pageNumber = 1;

                        if (parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
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

                    document.getElementById('pros_0').remove();

                    var div = '<div id="pros_0">' +
                        '<div layout="row" class="p-t-lg" layout-wrap ng-repeat="product in products track by $index" flex id="product_{{$index}}">' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33"><img src="{{product.main_image}}" width="120"></div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">{{product.title}}</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                        '<strong class="text-success" ng-if="product.oldPrice">' +
                        '<span id="pppriceo_{{$index}}">{{product.s_price}}</span><br>' +
                        '<span class="text-middle-small text-danger" id="oMessage_{{$index}}">{{priceMessage}}</span>' +
                        '</strong>' +
                        '<strong class="text-success" ng-if="product.newPrice">' +
                        '<span id="pppricen_{{$index}}">{{product.d_price}}</span><br>' +
                        '<span class="text-middle-small text-success" id="nMessage_{{$index}}">{{priceMessage}}</span>' +
                        '</strong>' +
                        '</div>' +
                        '<div class="text-center" flex-xs="100" flex="20" flex-sm="33" flex-md="33">' +
                        '<div id="categories_{{$index}}">' +
                        '<md-input-container style="margin-top: 0 !important;" id="p_{{$index}}">' +
                        '<label>1. Ebene</label>' +
                        '<md-select ng-init="index = $index;" name="productCategory_{{product.productId}}" ng-id="productCategory_{{product.productId}}" ng-model="_product.productId">' +
                        ' <md-option ng-click="add2CategoryLayer(category.categoryId1,index,2,product.productId);" ng-repeat="category in categories" ng-value="{{category.categoryId1}}">{{category.categoryLayer1Name}}</md-option>' +
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
                        '<md-icon title="Preis erhöhen" ng-click="increasePrice(product.productId,product.shopId,product.ownerId,$index);" md-svg-src="priceIncrease24" class="material-icons"></md-icon>' +
                        '<md-icon title="Produktlink" ng-click="showProductLink(product.productId,product.shopId,product.ownerId,product.title);" md-svg-src="plink24" class="material-icons"></md-icon>' +
                        '<md-icon title="Aktualisieren" ng-click="refresh();" md-svg-src="actual24" class="material-icons"></md-icon>' +
                        '<md-icon title="Löschen" ng-click="deleteLaProduct(product.productId,product.ownerId,$index);" md-svg-src="delete24" class="material-icons"></md-icon>' +
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

        $scope.initProducts = function(quantityShown) {
            $('#lagerloader').removeClass('noShow');
            $('#lagerloader').addClass('yesShow');

            var stkService = stkHttpService.getLagerProducts(quantityShown);
            stkService.then(function(data) {
                if(data.data.length > 0) {
                    $scope.products = data.data;
                    $scope.pprice = 'Richtpreis, bitte aktualisieren';

                    for(var index = 0;index < $scope.products.length;index++) {
                        if ($scope.products[index].selling_price) {
                            $scope.products[index].oldPrice = true;
                            $scope.products[index].newPrice = false;
                            $scope.products[index].s_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].selling_price);
                            $scope.priceMessage = 'Verkaufspreis wurde noch nicht definiert';
                        }

                        if (parseFloat($scope.products[index].dream_price) > 0) {
                            $scope.products[index].oldPrice = false;
                            $scope.products[index].newPrice = true;
                            $scope.products[index].d_price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.products[index].dream_price);
                            $scope.priceMessage = 'Dreampreis wurde definiert';
                        }
                    }
                } else {
                    $scope.lagerMessage = 'Lager ist leer.';
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

                if (parseInt($scope.maxPages) == 0 && parseInt($scope.page) == 1) {
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

            $('#lagerloader').removeClass('yesShow');
            $('#lagerloader').addClass('noShow');
        };
    });