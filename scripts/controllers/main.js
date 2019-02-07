'use strict';

angular.module('customerDreambeemcomApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, Facebook, stkHttpService, $window, $mdMenu, $rootScope, $mdToast, $location, $mdDialog, $timeout, $document, $routeParams) {
        $scope.url = 'ok';

        $scope.d_kCount = 0;
        $scope.f_kCount = 0;

        $scope.dreamsInputDisabled = true;

        $scope.optionsCount = {
            useEasing : true,
            useGrouping : true,
            separator : '.',
            decimal : ',',
            prefix : '',
            suffix : ''
        };

        $scope.inTWUsers = function() {
            var stkService = stkHttpService.insertTWUsers();
            stkService.then(function(data) {

            });
        };

        $scope.checkAddresses = function() {
            var stkService = stkHttpService.checkAddressesEmail();
            stkService.then(function(data) {
                if(data.data.answer === 'addressesNotFound') {
                    $mdToast.show({
                        theme       : 'success-toast',
                        hideDelay   : 15000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_addressesNotFound_alert_1.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                }
            });
        };

        $scope.initCheckout = function() {
            if($routeParams.checkout === 'true') {
                $scope.showAdvanced(null, 'cart-checkout');
            }
        };

        $scope.dreamsStakes = function(checkbox) {
            if (!checkbox) {
                $scope.dreamsInputDisabled = false;
            } else {
                $scope.dreamsInputDisabled = true;
            }
        };

        $scope.initDreambeem = function() {
            $scope.loading = true;

            $rootScope.furnyLink = '';

            var stkService = stkHttpService.getCartCount();
            stkService.then(function(data1) {
                if(data1) {
                    $scope.cartNumber = data1.data.count;
                    if($scope.cartNumber > 0) {
                        $scope.showAdvanced(null, 'cart-checkout');
                    }
                }
            });

            var stkService = stkHttpService.getUserdata();
            stkService.then(function(dataU) {
                $scope.fullname = dataU.data.data.fullname;
                $scope.profilePic = dataU.data.data.profilePic;
                $scope.kind = dataU.data.data.kind;
                $scope.userId = dataU.data.data.customerid;
                $scope.fame = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dataU.data.data.fame);
            });

            $scope.notifications = [];

            var stkService = stkHttpService.getDreambeem();
            stkService.then(function(data) {
                $scope.response = data;

                $scope.loading = false;

                $scope.walletEuro = $scope.response.data[0].walletEuro;
                $scope.walletDreams = $scope.response.data[0].walletDreams;
                $scope.dreambeems = $scope.response.data[0].dreambeems;
                $scope.furnybeems = $scope.response.data[0].furnybeems;

                if(parseInt($scope.walletDreams) > 0) {
                    $scope.walletDreamsBool = true;
                } else {
                    $scope.walletDreamsBool = false;
                }

                $scope.loading = false;
            });
        };

        $scope.openMenu = function($mdMenu, ev) {
            var originatorEv;

            originatorEv = ev;
            $mdMenu.open(ev);
        };

        /*$scope.banners = function() {

            var banner = '<!-- BEGIN PARTNER PROGRAM - DO NOT CHANGE THE PARAMETERS OF THE HYPERLINK --> <script type="text/javascript" src="https://banners.webmasterplan.com/view.asp?ref=713104&js=1&site=10953&b=143&target=_blank&title=FlixBus+-+Einfach+Busfahren" ></script><noscript><a href="https://partners.webmasterplan.com/click.asp?ref=713104&site=10953&type=b143&bnb=143" target="_blank"> <img style="width: 100%; height: auto;" src="http://banners.webmasterplan.com/view.asp?ref=713104&site=10953&b=143" border="0" title="FlixBus - Einfach Busfahren" alt="FlixBus - Einfach Busfahren" /></a></noscript> <!-- END PARTNER PROGRAM -->';

            postscribe('#leaderBoardBottom', '' + banner + '', {
                error: function(e) {
                    console.log(e);
                },
                done: function() {
                    console.log("postscribe work");
                }
            });
        };*/

        function DialogCart($scope, $mdDialog, stkHttpService, $rootScope) {
            $scope.cartLoader = true;

            var stkService = stkHttpService.getCartProductsSum();
            stkService.then(function(data1) {

                if(data1.data !== 'failed') {

                    for(var i = 0;i < data1.data.length;i++) {
                        if(data1.data[i][0].selling_price) {
                            var sum = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data1.data[i][0].selling_price);
                            data1.data[i][0].selling_price = sum;
                        }

                        if(data1.data[i][0].dream_price) {
                            var sum = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data1.data[i][0].dream_price);
                            data1.data[i][0].dream_price = sum;
                        }
                    }

                    var dataSumAll = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data1.dataSumAll);
                    data1.dataSumAll = dataSumAll;

                    var dataSumShipping = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data1.dataSumShipping);
                    data1.dataSumShipping = dataSumShipping;

                    var dataSumProducts = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data1.dataSumProducts);
                    data1.dataSumProducts = dataSumProducts;
                    $scope.products = data1;
                } else {
                    $scope.cartMessage = 'Keine Produkte gefunden.';
                }

                var stkService = stkHttpService.getCartCount();
                stkService.then(function(data1) {
                    if(data1) {
                        $scope.cartNumber = data1.data.count;
                    }
                });

                $scope.cartLoader = false;
            });

            $scope.showValues = function () {
                alert('oldValue = ' + $scope.oldValue);
                alert('newValue = ' + $scope.furnybeemlinka);
            };

            $scope.takeLink = function(id) {
                if(id) {
                    $scope.dreamnewsLoader = true;
                    var stkService = stkHttpService.getDreamNewsLink(id);
                    stkService.then(function(data) {
                        if(data) {
                            $scope.dnLink = data.data[0].link;
                            alert($rootScope.linkKind);

                            $('#'+$rootScope.linkKind).val($scope.dnLink);
                            if($rootScope.linkKind === 'furnybeemlink') {
                                $rootScope.furnyLink = $scope.dnLink;
                            } else {
                                $rootScope.dreamLink = $scope.dnLink;
                            }

                            $scope.dreamnewsLoader = false;
                            $rootScope.linkN = 'news';
                            $scope.hide();
                            var element = $window.document.getElementById($rootScope.linkKind);
                            element.focus();
                        }
                    });
                }
            };

            $scope.takeLinkProducts = function(id,pid,title) {
                if(id && pid && title) {
                    $scope.dreamnewsLoader = true;

                    var options = {
                        lang: 'de',
                        maintainCase: true,
                        separator: '-'
                    };

                    var getSlug = createSlug(options);

                    var titleN =  getSlug(title, options);

                    $scope.dnLink = 'https://www.dreambeem.com/' + titleN + '/' + id + '/' + pid + '/';

                    $('#'+$rootScope.linkKind).val($scope.dnLink);
                    if($rootScope.linkKind === 'furnybeemlink') {
                        $rootScope.furnyLink = $scope.dnLink;
                    } else {
                        $rootScope.dreamLink = $scope.dnLink;
                    }

                    $scope.dreamnewsLoader = false;
                    $rootScope.linkN = 'products';
                    $scope.hide();
                    var element = $window.document.getElementById($rootScope.linkKind);
                    element.focus();
                }
            };

            $scope.initProductsBaby = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsBaby();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksBaby = data.data;

                            for(var index = 0;index < $scope.linksBaby.length;index++) {
                                $scope.linksBaby[index].dreamPrice = false;
                                if(parseFloat($scope.linksBaby[index].dream_price) > 0) {
                                    $scope.linksBaby[index].dreamPrice = true;
                                    $scope.linksBaby[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksBaby[index].dream_price);
                                }
                            }
                        } else {
                            $scope.babyMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.babyMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsBekleidung = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsBekleidung();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksBekleidung = data.data;

                            for(var index = 0;index < $scope.linksBekleidung.length;index++) {
                                $scope.linksBekleidung[index].dreamPrice = false;
                                if(parseFloat($scope.linksBekleidung[index].dream_price) > 0) {
                                    $scope.linksBekleidung[index].dreamPrice = true;
                                    $scope.linksBekleidung[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksBekleidung[index].dream_price);
                                }
                            }
                        } else {
                            $scope.bekleidungMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.bekleidungMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsBuero = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsBuero();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksBuero = data.data;

                            for(var index = 0;index < $scope.linksBuero.length;index++) {
                                $scope.linksBuero[index].dreamPrice = false;
                                if(parseFloat($scope.linksBuero[index].dream_price) > 0) {
                                    $scope.linksBuero[index].dreamPrice = true;
                                    $scope.linksBuero[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksBuero[index].dream_price);
                                }
                            }
                        } else {
                            $scope.bueroMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.bueroMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsElektronik = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsElektronik();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksElektronik = data.data;

                            for(var index = 0;index < $scope.linksElektronik.length;index++) {
                                $scope.linksElektronik[index].dreamPrice = false;
                                if(parseFloat($scope.linksElektronik[index].dream_price) > 0) {
                                    $scope.linksElektronik[index].dreamPrice = true;
                                    $scope.linksElektronik[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksElektronik[index].dream_price);
                                }
                            }
                        } else {
                            $scope.elektronikMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.elektronikMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsFahrzeuge = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsFahrzeuge();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksFahrzeuge = data.data;

                            for(var index = 0;index < $scope.linksFahrzeuge.length;index++) {
                                $scope.linksFahrzeuge[index].dreamPrice = false;
                                if(parseFloat($scope.linksFahrzeuge[index].dream_price) > 0) {
                                    $scope.linksFahrzeuge[index].dreamPrice = true;
                                    $scope.linksFahrzeuge[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksFahrzeuge[index].dream_price);
                                }
                            }
                        } else {
                            $scope.fahrzeugeMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.fahrzeugeMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsErwachsene = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsErwachsene();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksErwachsene = data.data;

                            for(var index = 0;index < $scope.linksErwachsene.length;index++) {
                                $scope.linksErwachsene[index].dreamPrice = false;
                                if(parseFloat($scope.linksErwachsene[index].dream_price) > 0) {
                                    $scope.linksErwachsene[index].dreamPrice = true;
                                    $scope.linksErwachsene[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksErwachsene[index].dream_price);
                                }
                            }
                        } else {
                            $scope.erwachseneMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.erwachseneMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsGesundheit = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsGesundheit();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksGesundheit = data.data;

                            for(var index = 0;index < $scope.linksGesundheit.length;index++) {
                                $scope.linksGesundheit[index].dreamPrice = false;
                                if(parseFloat($scope.linksGesundheit[index].dream_price) > 0) {
                                    $scope.linksGesundheit[index].dreamPrice = true;
                                    $scope.linksGesundheit[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksGesundheit[index].dream_price);
                                }
                            }
                        } else {
                            $scope.gesundheitMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.gesundheitMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsHeim = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsHeim();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksHeim = data.data;

                            for(var index = 0;index < $scope.linksHeim.length;index++) {
                                $scope.linksHeim[index].dreamPrice = false;
                                if(parseFloat($scope.linksHeim[index].dream_price) > 0) {
                                    $scope.linksHeim[index].dreamPrice = true;
                                    $scope.linksHeim[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksHeim[index].dream_price);
                                }
                            }
                        } else {
                            $scope.heimMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.heimMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsHeimwerker = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsHeimwerker();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksHeimwerker = data.data;

                            for(var index = 0;index < $scope.linksHeimwerker.length;index++) {
                                $scope.linksHeimwerker[index].dreamPrice = false;
                                if(parseFloat($scope.linksHeimwerker[index].dream_price) > 0) {
                                    $scope.linksHeimwerker[index].dreamPrice = true;
                                    $scope.linksHeimwerker[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksHeimwerker[index].dream_price);
                                }
                            }
                        } else {
                            $scope.heimwerkerMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.heimwerkerMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsKameras = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsKameras();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksKameras = data.data;

                            for(var index = 0;index < $scope.linksKameras.length;index++) {
                                $scope.linksKameras[index].dreamPrice = false;
                                if(parseFloat($scope.linksKameras[index].dream_price) > 0) {
                                    $scope.linksKameras[index].dreamPrice = true;
                                    $scope.linksKameras[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksKameras[index].dream_price);
                                }
                            }
                        } else {
                            $scope.kamerasMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.kamerasMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsKunst = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsKunst();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksKunst = data.data;

                            for(var index = 0;index < $scope.linksKunst.length;index++) {
                                $scope.linksKunst[index].dreamPrice = false;
                                if(parseFloat($scope.linksKunst[index].dream_price) > 0) {
                                    $scope.linksKunst[index].dreamPrice = true;
                                    $scope.linksKunst[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksKunst[index].dream_price);
                                }
                            }
                        } else {
                            $scope.kunstMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.kunstMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsMedien = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsMedien();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksMedien = data.data;

                            for(var index = 0;index < $scope.linksMedien.length;index++) {
                                $scope.linksMedien[index].dreamPrice = false;
                                if(parseFloat($scope.linksMedien[index].dream_price) > 0) {
                                    $scope.linksMedien[index].dreamPrice = true;
                                    $scope.linksMedien[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksMedien[index].dream_price);
                                }
                            }
                        } else {
                            $scope.medienMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.medienMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsMoebel = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsMoebel();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksMoebel = data.data;

                            for(var index = 0;index < $scope.linksMoebel.length;index++) {
                                $scope.linksMoebel[index].dreamPrice = false;
                                if(parseFloat($scope.linksMoebel[index].dream_price) > 0) {
                                    $scope.linksMoebel[index].dreamPrice = true;
                                    $scope.linksMoebel[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksMoebel[index].dream_price);
                                }
                            }
                        } else {
                            $scope.moebelMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.moebelMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsNahrung = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsNahrung();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksNahrung = data.data;

                            for(var index = 0;index < $scope.linksNahrung.length;index++) {
                                $scope.linksNahrung[index].dreamPrice = false;
                                if(parseFloat($scope.linksNahrung[index].dream_price) > 0) {
                                    $scope.linksNahrung[index].dreamPrice = true;
                                    $scope.linksNahrung[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksNahrung[index].dream_price);
                                }
                            }
                        } else {
                            $scope.nahrungMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.nahrungMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsReligion = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsReligion();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksReligion = data.data;

                            for(var index = 0;index < $scope.linksReligion.length;index++) {
                                $scope.linksReligion[index].dreamPrice = false;
                                if(parseFloat($scope.linksReligion[index].dream_price) > 0) {
                                    $scope.linksReligion[index].dreamPrice = true;
                                    $scope.linksReligion[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksReligion[index].dream_price);
                                }
                            }
                        } else {
                            $scope.religionMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.religionMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsSoftware = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsSoftware();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksSoftware = data.data;

                            for(var index = 0;index < $scope.linksSoftware.length;index++) {
                                $scope.linksSoftware[index].dreamPrice = false;
                                if(parseFloat($scope.linksSoftware[index].dream_price) > 0) {
                                    $scope.linksSoftware[index].dreamPrice = true;
                                    $scope.linksSoftware[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksSoftware[index].dream_price);
                                }
                            }
                        } else {
                            $scope.softwareMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.softwareMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsSpielzeug = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsSpielzeug();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksSpielzeug = data.data;

                            for(var index = 0;index < $scope.linksSpielzeug.length;index++) {
                                $scope.linksSpielzeug[index].dreamPrice = false;
                                if(parseFloat($scope.linksSpielzeug[index].dream_price) > 0) {
                                    $scope.linksSpielzeug[index].dreamPrice = true;
                                    $scope.linksSpielzeug[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksSpielzeug[index].dream_price);
                                }
                            }
                        } else {
                            $scope.spielzeugMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.spielzeugMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsSport = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsSport();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksSport = data.data;

                            for(var index = 0;index < $scope.linksSport.length;index++) {
                                $scope.linksSport[index].dreamPrice = false;
                                if(parseFloat($scope.linksSport[index].dream_price) > 0) {
                                    $scope.linksSport[index].dreamPrice = true;
                                    $scope.linksSport[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksSport[index].dream_price);
                                }
                            }
                        } else {
                            $scope.sportMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.sportMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsTaschen = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsTaschen();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksTaschen = data.data;

                            for(var index = 0;index < $scope.linksTaschen.length;index++) {
                                $scope.linksTaschen[index].dreamPrice = false;
                                if(parseFloat($scope.linksTaschen[index].dream_price) > 0) {
                                    $scope.linksTaschen[index].dreamPrice = true;
                                    $scope.linksTaschen[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksTaschen[index].dream_price);
                                }
                            }
                        } else {
                            $scope.taschenMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.taschenMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsTiere = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsTiere();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksTiere = data.data;

                            for(var index = 0;index < $scope.linksTiere.length;index++) {
                                $scope.linksTiere[index].dreamPrice = false;
                                if(parseFloat($scope.linksTiere[index].dream_price) > 0) {
                                    $scope.linksTiere[index].dreamPrice = true;
                                    $scope.linksTiere[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksTiere[index].dream_price);
                                }
                            }
                        } else {
                            $scope.tiereMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.tiereMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initProductsWirtschaft = function() {
                $scope.dreamproductsLoader = true;
                var stkService = stkHttpService.getDreamProductsWirtschaft();
                stkService.then(function(data) {
                    if(data) {
                        if(data.data.length > 0) {
                            $scope.linksWirtschaft = data.data;

                            for(var index = 0;index < $scope.linksWirtschaft.length;index++) {
                                $scope.linksWirtschaft[index].dreamPrice = false;
                                if(parseFloat($scope.linksWirtschaft[index].dream_price) > 0) {
                                    $scope.linksWirtschaft[index].dreamPrice = true;
                                    $scope.linksWirtschaft[index].d_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.linksWirtschaft[index].dream_price);
                                }
                            }
                        } else {
                            $scope.wirtschaftMessage = 'Kein Produkte gefunden.';
                        }
                    } else {
                        $scope.wirtschaftMessage = 'Kein Produkte gefunden.';
                    }

                    $scope.dreamproductsLoader = false;
                });
            };

            $scope.initCategoryAlles = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsAlles();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAlles = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryVideos = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsVideos();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksVideos = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryTag = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsTag();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksTag = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryPolitik = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsPolitik();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPolitik = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryPanorama = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsPanorama();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPanorama = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategorySport = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsSport();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksSport = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryKultur = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsKultur();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksKultur = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryWirtschaft = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsWirtschaft();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWirtschaft = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryAuto = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsAuto();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAuto = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryGesundheit = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsGesundheit();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGesundheit = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryLifestyle = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsLifestyle();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksLifestyle = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryGenuss = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsGenuss();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGenuss = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryFamilie = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsFamilie();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFamilie = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryWetter = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsWetter();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWetter = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryDigital = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsDigital();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksDigital = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryWissen = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsWissen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWissen = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryReise = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsReise();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksReise = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryEilmeldungen = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsEilmeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksEilmeldungen = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryMeldungen = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsMeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksMeldungen = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryAusland = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsAusland();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAusland = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryImmobilien = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsImmobilien();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksImmobilien = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryFinanzen = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsFinanzen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFinanzen = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.initCategoryBoerse = function() {
                $scope.dreamnewsLoader = true;
                var stkService = stkHttpService.getDreamNewsBoerse();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksBoerse = data.data;
                        $scope.dreamnewsLoader = false;
                    }
                });
            };

            $scope.deleteProduct = function(id, pid) {
                if(id) {
                    $scope.cartLoader = true;

                    var stkService = stkHttpService.deleteCartProduct(id);
                    stkService.then(function (data1) {
                        if (data1.data !== 'failed') {
                            $('#pp_' + pid).remove();

                            var dataSumProducts = $('#sumProducts').text();
                            var dataSumAll = $('#sumAll').text();
                            var dataSumShipping = $('#sumShipping').text();

                            var sProducts = parseFloat(dataSumProducts.replace(',','.')) - parseFloat(data1.sumProducts);
                            var sAll = parseFloat(dataSumAll.replace(',', '.')) - parseFloat(data1.sumAll);

                            var count = parseInt($('.cartNumber').text());
                            $('.cartNumber').text(parseInt(count) - parseInt(data1.delCount));

                            if((parseInt(count) - parseInt(data1.delCount)) === 0) {
                                var sShipping = 0.00;
                            } else {
                                var sShipping = parseFloat(dataSumShipping) - parseFloat(data1.sumShipping);
                            }

                            var s = parseFloat(sAll) - sShipping;

                            var products = {};
                            products.dataSumProducts = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(sProducts);
                            products.dataSumShipping = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(sShipping);
                            products.dataSumAll = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(s);

                            $('#sumShipping').text(products.dataSumShipping);
                            $('#sumAll').text(products.dataSumAll);
                            $('#sumProducts').text(products.dataSumProducts);

                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 3000,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_cartDelete_alert_1.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        } else {
                            $mdToast.show({
                                theme: 'error-toast',
                                hideDelay: 3000,
                                position: 'top',
                                controller: 'ToastCtrl',
                                templateUrl: 'views/toasts/toast_cartDelete_alert_0.html',
                                toastClass: 'md-error-toast-theme'
                            });
                            $scope.cartMessage = data1.data;
                        }

                        $scope.cartLoader = false;
                    });
                }
            };

            $scope.checkoutMember = function() {
                var stkService = stkHttpService.checkCheckout();
                stkService.then(function(data1) {
                    if(data1.data === 'ok') {
                        $window.location.href = 'https://dreams.dreambeem.com?checkout=true';
                    } else {
                        $window.location.href = 'https://www.dreambeem.com';
                    }
                });
            };

            $scope.payCart = function(vent) {
                $scope.cartLoader = true;

                var stkService = stkHttpService.cartCheckout();
                stkService.then(function(data1) {
                    if(data1.data === 'ok') {
                        var EuroWallet = String(data1.walletEuro);
                        var eu = EuroWallet.replace('.',',');
                        $('#walletEuro').text(eu);

                        var count = parseInt($('.cartNumber').text());
                        $('.cartNumber').text(parseInt(count) - parseInt(data1.delCount));

                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 10000,
                            position    : 'right',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_thanksBought_alert_1.html',
                            toastClass  : 'md-success-toast-theme'
                        });

                        $scope.hide();
                    } else if(data1.answer === 'addressesNotFound') {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 15000,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_addressesNotFound_alert_1.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    } else {
                        $scope.hide();
                        $scope.showDialog(vent, 'cart-checkout-nomoney');
                    }
                });

                $scope.cartLoader = false;
            };

            $scope.showDialog = function(ev,kind) {
                switch(kind) {
                    case 'cart-checkout-nomoney':
                        $mdDialog.show({
                            controller: DialogCart,
                            templateUrl: 'views/dialogs/cart-nomoney.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose:true
                        })
                            .then(function() {

                            });
                    break;
                }
            };

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }

        $scope.openCart = function(ev, kind, pid) {
            $scope.showAdvanced(ev, kind);

        };

        $scope.openDreamnews = function(ev,lkind) {
            $rootScope.linkKind = lkind;
            $scope.showAdvanced(ev, 'dreamnews');
        };

        $scope.openDreamproducts = function(ev,lkind) {
            $rootScope.linkKind = lkind;
            $scope.showAdvanced(ev, 'dreamproducts');
        };

        $scope.showAdvanced = function(ev, kind) {
            switch(kind) {
                case 'dreamnews':
                    $mdDialog.show({
                        controller: DialogCart,
                        templateUrl: 'views/dialogs/dreamnews.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'dreamproducts':
                    $mdDialog.show({
                        controller: DialogCart,
                        templateUrl: 'views/dialogs/dreamproducts.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'cart-checkout':
                    $mdDialog.show({
                        controller: DialogCart,
                        templateUrl: 'views/dialogs/cartcheckout.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'cart-checkout-nomoney':
                    $mdDialog.show({
                        controller: DialogCart,
                        templateUrl: 'views/dialogs/cart-nomoney.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                    break;
                case 'cart':
                    $mdDialog.show({
                        controller: DialogCart,
                        templateUrl: 'views/dialogs/cart.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'furnybeemNoMoney':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/furnybeemNoMoney.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            $scope.resetFurnybeem();
                        });
                break;
                case 'furnybeem':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/furnybeemOk.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            $scope.resetFurnybeem();
                        });
                break;
                case 'dreambeem':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/dreambeemOk.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            $scope.resetDreambeem();
                        });
                break;
                case 'furnybeemNotFound':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/furnybeemFailed.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                        /*fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.*/
                    })
                        .then(function() {
                            $scope.resetFurnybeem();
                        });
                break;
                case 'dreambeemNotFound':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/dreambeemFailed.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            $scope.resetDreambeem();
                        });
                    break;
                case 'furnybeemDreams':
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/dialogs/furnybeemDreams.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {
                            $scope.resetFurnybeem();
                        });
                    break;
            }
        };

        $scope.beemline = function() {
            $window.location.href = "https://dreams.dreambeem.com/";
        };

        $scope.limitInput = function(text, statusObject, textFieldObject) {
            if(text !== undefined && text.length) {
                if(text.length > 0) {
                    var textLength = text.substr(($scope.cursorPosVal - text.length), text.length);
                    var valueLength = parseInt(textLength.length);

                    if(parseInt(valueLength) >= 80) {
                        var cutText = text.substr(0,80);
                        $(textFieldObject).val(cutText);
                        $(statusObject).text(80);
                        alert('Es sind nur 80 Zeichen erlaubt.');
                    } else {
                        $(statusObject).text(valueLength);
                    }
                }
            } else {
                $(statusObject).text(0);
            }
        };

        $scope.submitDreambeem = function(isValid, link, text) {
            $scope.checkLogin();

            if (isValid) {
                var dreamData = {};
                var regexUrl = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
                var regEx = new RegExp(regexUrl);
                if(link !== '' && link != null) {
                    $rootScope.dreamLink = link;
                }

                if (regEx.test($rootScope.dreamLink)) {
                    if(text != null && text !== '' && text.length <= 80) {
                        dreamData.dreambeemtext = text;
                        dreamData.dreambeemlink = $rootScope.dreamLink;
                        if($rootScope.linkN === 'news') {
                            dreamData.news = 1;
                        } else {
                            dreamData.news = 0;
                        }

                        $scope.postDreambeem(dreamData, isValid);
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 2500,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_dreambeemtext_alert_0.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                } else {
                    $mdToast.show({
                        theme       : 'success-toast',
                        hideDelay   : 2500,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_dreamsharelink_0_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                }
            }
        };

        $scope.postDreambeem = function(dreamData, event) {
            $scope.loading_dream = true;
            var stkService = stkHttpService.postDreambeem(dreamData);
            stkService.then(function(data) {
                $scope.response = data;

                if($scope.response.data.data === 'okokok') {
                    $scope.showAdvanced(event, 'dreambeemNotFound');
                } else {
                    $scope.showAdvanced(event, 'dreambeem');
                }

                var dreambeems = parseInt($scope.dreambeems) + 1;
                $('#dreambeems').text(dreambeems);

                $mdSidenav('DreambeemLeft').toggle();

                $scope.loading_dream = false;
            });
        };

        $scope.submitFurnybeem = function(isValid,fb_user_all_reach,tw_user_all_reach,furnybeemlink,
                                          furnybeemtext,fb_user_chose_all,furnybeem_fb_price,tw_user_chose_all,
                                          reach_all,furnybeem_tw_price,furnybeem_all_price,dreamsOn,walletDreams) {
            $scope.checkLogin();

            if (isValid) {
                var furnyData = {};
                var regexUrl = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
                var regEx = new RegExp(regexUrl);
                if(furnybeemlink !== '' && furnybeemlink != null) {
                    if (regEx.test(furnybeemlink)) {
                        if(furnybeemtext != null && furnybeemtext !== '' && furnybeemtext.length <= 80) {
                            furnyData.facebookReachAll = fb_user_all_reach;
                            furnyData.facebookChosenReach = fb_user_chose_all;
                            furnyData.twitterReachAll = tw_user_all_reach;
                            furnyData.twitterChosenReach = tw_user_chose_all;
                            furnyData.facebookReachPrice = furnybeem_fb_price;
                            furnyData.twitterReachPrice = furnybeem_tw_price;
                            furnyData.furnybeemPrice = furnybeem_all_price;
                            furnyData.furnybeemLink = furnybeemlink;
                            furnyData.furnybeemText = furnybeemtext;
                            furnyData.reachAll = reach_all;
                            furnyData.dreamsOn = dreamsOn;
                            furnyData.dreams = walletDreams;
                            if($rootScope.linkN === 'news') {
                                furnyData.news = 1;
                            } else {
                                furnyData.news = 0;
                            }

                            $scope.postFurnybeem(furnyData, isValid);
                        } else {
                            $mdToast.show({
                                theme       : 'success-toast',
                                hideDelay   : 2500,
                                position    : 'top',
                                controller  : 'ToastCtrl',
                                templateUrl : 'views/toasts/toast_dreamsharetext_alert_0.html',
                                toastClass  : 'md-success-toast-theme'
                            });
                        }
                    } else {
                        $mdToast.show({
                            theme       : 'success-toast',
                            hideDelay   : 2500,
                            position    : 'top',
                            controller  : 'ToastCtrl',
                            templateUrl : 'views/toasts/toast_dreamsharelink_0_alert.html',
                            toastClass  : 'md-success-toast-theme'
                        });
                    }
                } else {
                    alert('Kein Link oder Text eingegeben.');
                }
            }
        };

        $scope.postFurnybeem = function(furnyData, event) {
            $scope.loading_furny = true;
            var notificationCount;


            var stkService = stkHttpService.postFurnybeem(furnyData);
            stkService.then(function(data) {
                $scope.response = data;

                $('#walletDreams').text($scope.response.data.walletDreams);

                $('#walletEuro').text($scope.response.data.walletEuro);

                if($scope.response.data.data === 'okokok') {
                    $scope.showAdvanced(event, 'furnybeemNotFound');
                } else if($scope.response.data.data === 'failed') {
                    $scope.showAdvanced(event, 'furnybeemNoMoney');
                } else {
                    $scope.showAdvanced(event, 'furnybeem');
                }

                var furnybeems = parseInt($scope.furnybeems) + 1;
                $('#furnybeems').text(furnybeems);

                $mdSidenav('FurnybeemLeft').toggle();

                $scope.loading_furny = false;
            });
        };

        $scope.calculateDreams = function(dreams,dreamsOn,fb_user_all,tw_user_all) {
            var dreamsStake = parseInt(dreams);
            var reachDreams = parseInt(dreamsStake) * parseInt(75);
            var reachAll = parseInt(fb_user_all) + parseInt(tw_user_all);
            if(dreamsOn == true) {
                if(reachDreams > reachAll) {
                    $scope.showAdvanced(event, 'furnybeemDreams');
                } else {
                    var fb_user_dreams = Math.floor(parseInt(fb_user_all) / 75);
                    var tw_user_dreams = Math.floor(parseInt(tw_user_all) / 75);
                    if((parseInt(dreams)) >= (parseInt(fb_user_dreams))) {
                        var dreamsCalculation_fb = parseInt(dreams) - parseInt(fb_user_dreams);
                        if(dreamsCalculation_fb >= 0) {
                            $scope.fb_user_all_left = parseInt(fb_user_all) - ((parseInt(dreams) - parseInt(dreamsCalculation_fb))* 75);
                            $scope.fb_user_chose_all = parseInt(75) * (parseInt(dreams) - parseInt(dreamsCalculation_fb));
                            $scope.fb_user_all = $scope.fb_user_all_left;

                            var dreams_left = parseInt(dreamsCalculation_fb);
                            $scope.tw_user_all_left = parseInt(tw_user_all) - (parseInt(dreams_left) * 75);
                            $scope.tw_user_chose_all = parseInt(75) * (parseInt(dreams_left));
                            $scope.tw_user_all = $scope.tw_user_all_left;
                        }
                    } else {
                        var dreamsCalculation_fb = parseInt(dreams);
                        if(dreamsCalculation_fb >= 0) {
                            $scope.fb_user_all_left = parseInt(fb_user_all) - (parseInt(dreams) * 75);
                            $scope.fb_user_chose_all = parseInt(75) * parseInt(dreams);
                            $scope.fb_user_all = $scope.fb_user_all_left;
                        }
                    }

                    $scope.reach_all = parseInt(reachDreams);
                }
            }

        };

        $scope.calculateFacebookReach = function(fb_user_all,fb_user_all_left) {
            var fb_reach_left = parseInt(fb_user_all_left) - parseInt(fb_user_all);
            var fb_chose_reach = $scope.fb_user_chose_all + parseInt(fb_user_all);
            if((parseInt(fb_user_all) <= parseInt($scope.fb_user_all_reach)) && (parseInt($scope.fb_user_all_left) >= parseInt(fb_user_all))) {
                $scope.fb_user_all_left = parseInt(fb_user_all_left) - parseInt(fb_user_all);
                $scope.fb_user_chose_all = parseInt($scope.fb_user_chose_all) + parseInt(fb_user_all);
                $scope.reach_all = parseInt($scope.reach_all) + parseInt(fb_user_all);
                var fb_price_str = ""+$scope.furnybeem_fb_price+"";
                $scope.furnybeem_fb_price = fb_price_str;
                var fb_price = parseFloat((0.008 * parseInt($scope.fb_user_chose_all)));
                $scope.furnybeem_fb_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(fb_price);
                var tw_price_str = ""+$scope.furnybeem_tw_price+"";
                var tw_price_float1 = tw_price_str.replace(new RegExp("\\.","g"),'');
                var tw_price_float = tw_price_float1.replace(',','.');
                var tw_p = tw_price_float.replace('€','');
                $scope.furnybeem_tw_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(tw_p);
                var furnyAllPrice = parseFloat(tw_p) + parseFloat(fb_price);
                $scope.furnybeem_all_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(furnyAllPrice);
                $scope.fb_user_all = $scope.fb_user_all_left;
            } else {
                var confirm = showError(event, 'fb');
            }
        };

        $scope.calculateTwitterReach = function(tw_user_all,tw_user_all_left) {
            var tw_reach_left = parseInt(tw_user_all_left) - parseInt(tw_user_all);
            var tw_chose_reach = $scope.tw_user_chose_all + parseInt(tw_user_all);
            if((parseInt(tw_user_all) <= parseInt($scope.tw_user_all_reach)) && (parseInt($scope.tw_user_all_left) >= parseInt(tw_user_all))) {
                $scope.tw_user_all_left = parseInt(tw_user_all_left) - parseInt(tw_user_all);
                $scope.tw_user_chose_all = parseInt($scope.tw_user_chose_all) + parseInt(tw_user_all);
                $scope.reach_all = parseInt($scope.reach_all) + parseInt(tw_user_all);
                var tw_price_str = ""+$scope.furnybeem_tw_price+"";
                $scope.furnybeem_tw_price = tw_price_str;
                var tw_price = parseFloat((0.008 * parseInt($scope.tw_user_chose_all)));
                $scope.furnybeem_tw_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(tw_price);
                var fb_price_str = ""+$scope.furnybeem_fb_price+"";
                var fb_price_float1 = fb_price_str.replace(new RegExp("\\.","g"),'');
                var fb_price_float = fb_price_float1.replace(',','.');
                var fb_p = fb_price_float.replace('€','');
                $scope.furnybeem_fb_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(fb_p));
                var furnyAllPrice = parseFloat(fb_p) + parseFloat(tw_price);
                $scope.furnybeem_all_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(furnyAllPrice);
                $scope.tw_user_all = $scope.tw_user_all_left;
            } else {
                var confirm = showError(event, 'tw');
            }
        };

        $scope.resetDreambeem = function() {
            $scope.checkLogin();
            $scope.loading_dream = true;

            $('#dreambeemtext').val('');
            $('#dreambeemlink').val('');

            $scope.dreambeemtext = null;
            $scope.dreambeemlink = null;

            $('#d_kCount').text('0');

            $('#urlok_d').text('');
            $scope.loading_dream = false;
        };

        $scope.resetFurnybeem = function($event) {
            $scope.checkLogin();
            $scope.loading_furny = true;

            $('#furnybeemtext').val('');
            $('#furnybeemlink').val('');

            $scope.furnybeemtext = null;
            $scope.furnybeemlink = null;

            $('#f_kCount').text('0');

            $('#urlok_f').text('');

            $scope.tw_user_all = 0;
            $scope.fb_user_all = 0;

            $scope.fb_user_chose_all = 0;
            $scope.tw_user_chose_all = 0;

            $scope.reach_all = 0;

            $scope.furnybeem_fb_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(0.00);
            $scope.furnybeem_tw_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(0.00);
            $scope.furnybeem_all_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(0.00);

            var stkService = stkHttpService.getFbReach();
            stkService.then(function(data) {
                $scope.response = data;
                console.log($scope.response);

                if($scope.response.data.answer === 'ok') {
                    $scope.fb_user_all_reach = parseInt($scope.response.data.data.fb_user_reach);
                    $scope.fb_user_all_left = parseInt($scope.response.data.data.fb_user_reach);

                    $scope.fb_user_all = $scope.fb_user_all_left;

                    if($scope.fb_user_all_reach === 'undefined' || !$scope.fb_user_all_reach) {
                        $scope.fb_user_all_reach = parseInt(0);
                        $scope.fb_user_all_left = parseInt(0);

                        $scope.fb_user_all = 0;
                    }
                }
            });

            var stkService = stkHttpService.getTwReach();
            stkService.then(function(data) {
                $scope.response = data;

                if($scope.response.data.answer === 'ok') {
                    $scope.tw_user_all_reach = parseInt($scope.response.data.data.tw_user_reach);
                    $scope.tw_user_all_left = parseInt($scope.response.data.data.tw_user_reach);

                    $scope.tw_user_all = $scope.tw_user_all_left;

                    if($scope.tw_user_all_reach === 'undefined' || !$scope.tw_user_all_reach) {
                        $scope.tw_user_all_reach = parseInt(0);
                        $scope.tw_user_all_left = parseInt(0);

                        $scope.tw_user_all = 0;
                    }
                }
            });

            $scope.loading_furny = false;
        };

        $scope.checkIfCookiesAreEnabled = function() {
            var cookieEnabled = $window.navigator.cookieEnabled;
            if (!cookieEnabled){
                $document.cookie = "dreambeem_CT";
                cookieEnabled = ($document.cookie.indexOf("dreambeem_CT") == -1) ? true : false;
            }
            return cookieEnabled;
        };

        $scope.checkLogin = function() {
            $scope.loading = true;
            var cookiesEnabled = $scope.checkIfCookiesAreEnabled();

            if(cookiesEnabled) {
                var stkService = stkHttpService.controlLogin();
                stkService.then(function(data) {
                    $scope.response = data;

                    if($scope.response.data === 'ok') {
                        $scope.answer = 'ok';
                    } else {
                        showError(null,'ses',$scope.response.data)
                        $window.location.href = "https://www.dreambeem.com/";
                    }
                });
            } else {
                showError(null,'','Diese App benötigt Cookies. Cookies im Browser bitte anstellen.');
                $window.location.href = "http://www.dreambeem.com/";
            }

            $scope.loading = false;
        };

        $scope.doGetCaretPosition = function(oField) {
            var iCaretPos = 0;

            if (document.selection) {
                oField.focus ();
                var oSel = document.selection.createRange ();
                oSel.moveStart ('character', -oField.value.length);
                iCaretPos = oSel.text.length;
            }

            else if (oField.selectionStart || oField.selectionStart == '0')
                iCaretPos = oField.selectionStart;

            $scope.cursorPosVal = iCaretPos;
        };

        $scope.convertNumber = function(numberVar) {
            var NumberVar = numberVar.split(',');
            return parseFloat(NumberVar[0] + '.' + NumberVar[1]);
        };

        $scope.toggleMenuLeft = buildToggler('MenuLeft');

        $scope.toggleDreambeemLeft = buildToggler('DreambeemLeft');

        $scope.toggleFurnybeemLeft = buildToggler('FurnybeemLeft');

        $scope.initFurnybeem = function() {


        };

        function DialogController($scope, $mdDialog, $window) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.reloadRoute = function() {
                $mdDialog.hide();
                //$window.location.reload(false);
            }
        };

        function buildToggler(componentId) {
            return function() {
                if(componentId === 'DreambeemLeft') {
                    $scope.resetDreambeem();
                } else if(componentId === 'FurnybeemLeft') {
                    $scope.resetFurnybeem();
                }

                $mdSidenav(componentId).toggle();
            };
        };

        function showError(ev, social, m) {
            if(social === 'fb') {
                var message = 'Sie haben eine zu hohe Facebook - Reichweite gewählt!';
            } else if(social === 'tw') {
                var message = 'Sie haben eine zu hohe Twitter - Reichweite gewählt!';
            } else if(social === 'ses') {
                var message = 'Session abgelaufen!';
            } else {
                var message = m;
            }

            var confirm = $mdDialog.alert()
                .title('Es ist ein Fehler aufgetreten!')
                .textContent(message)
                .targetEvent(ev)
                .ok('Ok!');

            $mdDialog.show(confirm).then(function () {
            }, function () {
            });
        };
  });
