'use strict';

angular.module('customerDreambeemcomApp')
    .controller('BeemlineCtrl', function ($scope, $mdToast, $mdSidenav, $http, stkHttpService, $interval, $compile,  $mdDialog, Facebook, $window) {
        $scope.keywordName = [];
        $scope.beemlineShow = false;

        var self = this, j= 0, counter = 0;

        self.mode = 'query';
        self.activated = true;
        self.determinateValue = 30;
        self.determinateValue2 = 30;

        self.showList = [ ];

        $scope.settings = function() {
            $window.location.href = 'https://dreams.dreambeem.com/settings';
        };

        $scope.FBNewsPosting = function(ev) {
            $scope.showAdvanced(ev, 'Facebook-News-Post');
        };

        $scope.FBProductsPosting = function(ev) {
            $scope.showAdvanced(ev, 'Facebook-Products-Post');
        };

        $scope.TWNewsPosting = function(ev) {
            $scope.showAdvanced(ev, 'News-Twittern');
        };

        $scope.TWProductsPosting = function(ev) {
            $scope.showAdvanced(ev, 'Products-Twittern');
        };

        $scope.TWFollowers = function(ev) {
            if(ev) {
                $window.location.href = 'https://dreams.dreambeem.com/twitter-follower/de/0';
            }
        };

        $scope.showAdvanced = function(ev, kind) {
            switch(kind) {
                case 'Facebook-News-Post':
                    $mdDialog.show({
                        controller: DialogFacebook,
                        templateUrl: 'views/dialogs/facebookpost.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                break;
                case 'Facebook-Products-Post':
                    $mdDialog.show({
                        controller: DialogFacebook,
                        templateUrl: 'views/dialogs/facebookproductspost.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                    break;
                case 'Products-Twittern':
                    $mdDialog.show({
                        controller: DialogTwitter,
                        templateUrl: 'views/dialogs/twitterproductspost.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                    break;
                case 'News-Twittern':
                    $mdDialog.show({
                        controller: DialogTwitter,
                        templateUrl: 'views/dialogs/twittern.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        disableParentScroll: false,
                        clickOutsideToClose:true
                    })
                        .then(function() {

                        });
                    break;
            }
        };

        function DialogTwitter($scope, $mdDialog, stkHttpService, $window) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.twittern = function(link,text) {

            };

            $scope.takeLink = function(id) {
                if(id) {
                    $scope.twitterLoader = true;
                    var stkService = stkHttpService.getDreamNewsLink(id);
                    stkService.then(function(data) {
                        if(data) {
                            $scope.twLink = data.data[0].link;
                            $scope.twDescription = data.data[0].title.substr(0,119);
                            $('#twLink').val($scope.twLink);
                            $('#twDescription').val($scope.twDescription);
                            $scope.twitterLoader = false;
                        }
                    });
                }
            };

            $scope.takeLinkProducts = function(id,pid,title) {
                if(id && pid && title) {
                    $scope.twitterLoader = true;

                    var options = {
                        lang: 'de',
                        maintainCase: true,
                        separator: '-'
                    };

                    var getSlug = createSlug(options);

                    var titleN =  getSlug(title, options);

                    $scope.dnLink = 'https://www.dreambeem.com/' + titleN + '/' + id + '/' + pid + '/';

                    $('#twpLink').val($scope.dnLink);
                    $scope.twpLink = $scope.dnLink;

                    var element = $window.document.getElementById('twpLink');
                    element.focus();

                    $scope.twitterLoader = false;

                }
            };

            $scope.initProductsBaby = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsBekleidung = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsBuero = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsElektronik = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsFahrzeuge = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsErwachsene = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsGesundheit = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsHeim = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsHeimwerker = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsKameras = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsKunst = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsMedien = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsMoebel = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsNahrung = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsReligion = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSoftware = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSpielzeug = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSport = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsTaschen = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsTiere = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsWirtschaft = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initCategoryAlles = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsAlles();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAlles = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryVideos = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsVideos();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksVideos = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryTag = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsTag();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksTag = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryPolitik = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsPolitik();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPolitik = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryPanorama = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsPanorama();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPanorama = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategorySport = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsSport();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksSport = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryKultur = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsKultur();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksKultur = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryWirtschaft = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsWirtschaft();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWirtschaft = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryAuto = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsAuto();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAuto = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryGesundheit = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsGesundheit();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGesundheit = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryLifestyle = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsLifestyle();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksLifestyle = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryGenuss = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsGenuss();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGenuss = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryFamilie = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsFamilie();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFamilie = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryWetter = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsWetter();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWetter = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryDigital = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsDigital();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksDigital = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryWissen = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsWissen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWissen = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryReise = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsReise();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksReise = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryEilmeldungen = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsEilmeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksEilmeldungen = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryMeldungen = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsMeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksMeldungen = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryAusland = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsAusland();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAusland = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryImmobilien = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsImmobilien();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksImmobilien = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryFinanzen = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsFinanzen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFinanzen = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };

            $scope.initCategoryBoerse = function() {
                $scope.twitterLoader = true;
                var stkService = stkHttpService.getDreamNewsBoerse();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksBoerse = data.data;
                        $scope.twitterLoader = false;
                    }
                });
            };
        }

        function DialogFacebook($scope, $mdDialog, stkHttpService, $window) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.facebookShare = function(link) {
                Facebook.ui({
                    method: 'share',
                    href: link,
                    quote: link
                }, function(response){});
            };

            $scope.facebookSend = function(link) {
                Facebook.ui({
                    method: 'send',
                    link: link,
                    caption: link
                });
            };

            $scope.facebookFeed = function(link) {
                Facebook.ui({
                    method: 'feed',
                    link: link,
                    caption: link
                }, function(response){});
            };

            $scope.takeLink = function(id) {
                if(id) {
                    $scope.facebookLoader = true;
                    var stkService = stkHttpService.getDreamNewsLink(id);
                    stkService.then(function(data) {
                        if(data) {
                            $scope.fbLink = data.data[0].link;
                            $scope.fbDescription = data.data[0].title;
                            $('#fbLink').val($scope.fbLink);
                            $('#fbDescription').val($scope.fbDescription);
                            $scope.facebookLoader = false;
                        }
                    });
                }
            };

            $scope.takeLinkProducts = function(id,pid,title) {
                if(id && pid && title) {
                    $scope.facebookLoader = true;

                    var options = {
                        lang: 'de',
                        maintainCase: true,
                        separator: '-'
                    };

                    var getSlug = createSlug(options);

                    var titleN =  getSlug(title, options);

                    $scope.dnLink = 'https://www.dreambeem.com/' + titleN + '/' + id + '/' + pid + '/';

                    $('#fbpLink').val($scope.dnLink);
                    $scope.fbpLink = $scope.dnLink;

                    var element = $window.document.getElementById('fbpLink');
                    element.focus();

                    $scope.facebookLoader = false;

                }
            };

            $scope.initProductsBaby = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsBekleidung = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsBuero = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsElektronik = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsFahrzeuge = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsErwachsene = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsGesundheit = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsHeim = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsHeimwerker = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsKameras = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsKunst = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsMedien = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsMoebel = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsNahrung = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsReligion = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSoftware = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSpielzeug = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsSport = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsTaschen = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsTiere = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initProductsWirtschaft = function() {
                $scope.facebookLoader = true;
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

                    $scope.facebookLoader = false;
                });
            };

            $scope.initCategoryAlles = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsAlles();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAlles = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryVideos = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsVideos();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksVideos = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryTag = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsTag();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksTag = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryPolitik = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsPolitik();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPolitik = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryPanorama = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsPanorama();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksPanorama = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategorySport = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsSport();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksSport = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryKultur = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsKultur();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksKultur = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryWirtschaft = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsWirtschaft();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWirtschaft = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryAuto = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsAuto();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAuto = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryGesundheit = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsGesundheit();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGesundheit = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryLifestyle = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsLifestyle();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksLifestyle = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryGenuss = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsGenuss();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksGenuss = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryFamilie = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsFamilie();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFamilie = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryWetter = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsWetter();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWetter = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryDigital = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsDigital();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksDigital = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryWissen = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsWissen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksWissen = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryReise = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsReise();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksReise = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryEilmeldungen = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsEilmeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksEilmeldungen = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryMeldungen = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsMeldungen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksMeldungen = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryAusland = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsAusland();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksAusland = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryImmobilien = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsImmobilien();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksImmobilien = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryFinanzen = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsFinanzen();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksFinanzen = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };

            $scope.initCategoryBoerse = function() {
                $scope.facebookLoader = true;
                var stkService = stkHttpService.getDreamNewsBoerse();
                stkService.then(function(data) {
                    if(data) {
                        $scope.linksBoerse = data.data;
                        $scope.facebookLoader = false;
                    }
                });
            };
        }

        self.toggleActivation = function() {
            if ( !self.activated ) self.showList = [ ];
            if (  self.activated ) {
                j = counter = 0;
                self.determinateValue = 60;
                self.determinateValue2 = 60;
            }
        };

        $interval(function() {
            self.determinateValue += 1;
            self.determinateValue2 += 1.5;

            if (self.determinateValue > 100) self.determinateValue = 30;
            if (self.determinateValue2 > 100) self.determinateValue2 = 30;

            if ( (j < 2) && !self.showList[j] && self.activated ) {
                self.showList[j] = true;
            }
            if ( counter++ % 4 === 0 ) j++;

            if ( j == 2 ) self.contained = "indeterminate";

        }, 100, 0, true);

        $interval(function() {
            self.mode = (self.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);

        $scope.initBeemlineConfig = function() {
            var stkService = stkHttpService.getBeemlineConfig();
            stkService.then(function(data) {
                if(data) {
                    $scope.keywordName = data.data.data.split('|');
                    $scope.ebay = data.data.ebay;
                    $scope.dreams = data.data.dreams;
                }
            });
        };

        $scope.getBeems = function() {
            var page = 1;
            $scope.loading1 = true;
            var stkService = stkHttpService.getUserdata();
            stkService.then(function(dataU) {
                if (!$scope.keywordName) {
                    var stkService = stkHttpService.getInitBeemline();
                    stkService.then(function (data) {
                        if (data) {
                            for (var index = 0; index < data.data.data.length; index++) {
                                if (data.data.data[index][0]) {
                                    if (Object.keys(data.data.data[index][0]).length == 20) {
                                        $scope.beemlineShow = false;
                                        var div = '<div id="Furnybeem_' + data.data.data[index][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                            '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.user[0].fullname + '</strong></h3>' +
                                            '<div class="clearfix"></div>' +
                                            '<a target="_blank" class="beemline-link" href="' + data.data.data[index][0].furnybeemLinkShort + '">' +
                                            '<h3><strong>Dreamshare</strong> ' + data.data.data[index][0].furnybeemTitle + '</h3>';

                                            div = div + '<img width="130" src="' + data.data.data[index][0].furnybeemPath + '">';

                                        div = div + '<span>' + data.data.data[index][0].furnybeemDescription + '</span>' +
                                            '<md-divider></md-divider>' +
                                            '<p>' + data.data.data[index][0].furnybeemText + '</p>' +
                                            'Gesamte Reichweite: ' + data.data.data[index][0].reachAll + '<br>' +
                                            'Facebook Reichweite: ' + data.data.data[index][0].facebookChosenReach + '<br>' +
                                            'Twitter Reichweite: ' + data.data.data[index][0].twitterChosenReach + '' +
                                            '</a>';

                                        if (data.data.data[index][0].confirmedUser) {
                                            var confirmedUserIds = data.data.data[index][0].confirmedUser.split('|');

                                            for (var cindex = 0; cindex < confirmedUserIds.length; cindex++) {
                                                if (dataU.data.data.customerid == confirmedUserIds[cindex]) {
                                                    div = div + '<md-button class="md-button md-raised md-primary">Furnybeem bestätigt</md-button>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                    $scope.furnybeemConfirmed = true;
                                                    break;
                                                } else {
                                                    $scope.furnybeemConfirmed = false;
                                                }
                                            }

                                            if (!$scope.furnybeemConfirmed) {
                                                if (dataU.data.data.kind == 'twitter' && data.data.data[index][0].twitterChosenReach > 0) {
                                                    div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data.data[index][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                    '<md-progress-linear md-mode="determinate" value="{{vm.determinateValue}}"></md-progress-linear>' +
                                                    '</div>';
                                                } else if (dataU.data.data.kind == 'facebook' && data.data[index][0].facebookChosenReach > 0) {
                                                    div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data[index][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                    '<md-progress-linear md-mode="determinate" value="{{vm.determinateValue}}"></md-progress-linear>' +
                                                    '</div>';
                                                }
                                            }
                                        } else {
                                            if (dataU.data.data.kind == 'twitter' && data.data.data[index][0].facebookChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data.data[index][0].furnyId + '&sid=' + data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear md-mode="determinate" value="{{vm.determinateValue}}"></md-progress-linear>' +
                                                '</div>';
                                            } else if (dataU.data.data.kind == 'facebook' && data.data[index][0].facebookChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data.data[index][0].furnyId + '&sid=' + data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                            }
                                        }

                                        var el = document.getElementById('beemline');

                                        angular.element(el).append($compile(div)($scope));

                                        $('#Furnybeem_' + data.data[index][0].id).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    } else if(data.data.da[index].length > 0) {
                                        $scope.beemlineShow = false;
                                        var div = '<div id="Dreams_' + data.data.da[index].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                            '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.da[index].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.da[index].nickname + '</strong></h3>' +
                                            '<div class="clearfix"></div>' +
                                            '<p>' + data.data.da[index].nicknameDescription + '</p><br>' +
                                            '<a target="_blank" class="beemline-dreams-link-fbl" href="' + data.data.da[index][0].fbl + '">' +
                                            '<h3><strong>Facebook - Profil</strong> </h3></a>' +
                                            '<a target="_blank" class="beemline-dreams-link-twl" href="' + data.data.da[index][0].twl + '">' +
                                            '<h3><strong>Twitter Website</strong></h3></a>' +
                                            '<a target="_blank" class="beemline-dreams-link-inl" href="' + data.data.da[index][0].inl + '">' +
                                            '<h3><strong>Instagram - Profil</strong></h3></a>' +
                                            '<md-divider></md-divider>';

                                        var el = document.getElementById('beemline');

                                        angular.element(el).append($compile(div)($scope));

                                        $('#Dreams_' + data.data.da[index].id).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    } else {
                                        $scope.beemlineShow = false;
                                        var div = '<div id="Dreambeem_' + data.data.data[index][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                            '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.user[0].fullname + '</strong></h3>' +
                                            '<div class="clearfix"></div>' +
                                            '<a target="_blank" class="beemline-link" href="' + data.data.data[index][0].dreambeemlinkShort + '">' +
                                            '<h3><strong>Dreambeem</strong> ' + data.data.data[index][0].dreambeemTitle + '</h3>';

                                            div = div + '<img width="130" src="' + data.data.data[index][0].dreambeemPath + '">';

                                        div = div + '<span>' + data.data.data[index][0].dreambeemDescription + '</span>' +
                                            '<md-divider></md-divider>' +
                                            '<p>' + data.data[index][0].dreambeemtext + '</p>' +
                                            '</a>';


                                        if (dataU.data.data.kind == 'twitter' && data.data.data[index][0].status === 'not confirmed') {
                                            div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data.data.data[index][0].dreamId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=twitter&link1=' + encodeURIComponent(data.data.data[index][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        } else if (dataU.data.data.kind == 'facebook' && data.data[index][0].status === 'not confirmed') {
                                            div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data.data.data[index][0].dreamId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=facebook&link1=' + encodeURIComponent(data.data.data[index][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        } else {
                                            div = div +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        }

                                        var el = document.getElementById('beemline');

                                        angular.element(el).append($compile(div)($scope));

                                        $('#Dreambeem_' + data.data.data[index][0].id).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    }
                                }
                            }

                            $scope.amazonProducts = data.data.pa;
                            $scope.ebayProducts = data.data.pe;

                            for(var index = 0; index < $scope.ebayProducts.length; index++) {
                                $scope.beemlineShow = false;

                                var days = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('P')+1,$scope.ebayProducts[index].timeLeft.indexOf('DT')-1);
                                var hours = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('T')+1,$scope.ebayProducts[index].timeLeft.indexOf('H')-$scope.ebayProducts[index].timeLeft.indexOf('T')-1);
                                var minutes = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('H')+1,$scope.ebayProducts[index].timeLeft.indexOf('M')-$scope.ebayProducts[index].timeLeft.indexOf('H')-1);
                                var seconds = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('M')+1,$scope.ebayProducts[index].timeLeft.indexOf('S')-$scope.ebayProducts[index].timeLeft.indexOf('M')-1);
                                var tl = ' <span class="warning">Tage ' + days + '</span><span class="text-danger"> Stunden ' + hours + '</span><span class="text-warning"> Minuten ' + minutes + '</span> Sekunden ' + seconds;

                                var pri = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.ebayProducts[index].currentPrice);

                                var div = '<div id="cEbay_' + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;" ng-cloak>' +
                                    '<img width="80" src="/images/ebaylogo.png" class="pull-left">' +
                                    '<div class="clearfix"></div>' +
                                    '<a target="_blank" class="beemline-link" href="' + $scope.ebayProducts[index].productUrl + '">' +
                                    '<h3><strong>' + $scope.ebayProducts[index].title + '</strong></h3>' +
                                    '<img width="130" src="' + $scope.ebayProducts[index].image.replace('http','https') + '"><br>' +
                                    '<span><strong>' + $scope.ebayProducts[index].condition + '</strong></span><br>' +
                                    '<span>Sofort - Kauf <strong>' + $scope.ebayProducts[index].buyItNowAvailable + '</strong></span><br>' +
                                    '<span>Preisvorschlag <strong>' + $scope.ebayProducts[index].bestOfferEnabled + '</strong></span><br>' +
                                    '<span>Aktuell <strong>' + pri + '</strong></span><br>' +
                                    '<span>Läuft aus <strong>' + tl + '</strong></span>' +
                                    '<md-divider></md-divider>' +
                                    '</a>' +
                                    '<a href="' +  $scope.ebayProducts[index].productUrl + '" target="_blank">' +
                                    '<md-button class="md-button md-raised md-warn">Zur Auktion</md-button>' +
                                    '</a>';

                                var el = document.getElementById('beemline');

                                angular.element(el).prepend($compile(div)($scope));

                                $("#cEbay_" + index).fadeIn(3500, "swing");
                                $scope.beemlineShow = true;
                            }

                            $scope.loading = false;
                        }

                        $interval(function (page) {
                            var stkService = stkHttpService.getLiveBeemline();
                            stkService.then(function (data1) {
                                if (data1) {
                                    for (var index1 = 0; index1 < data1.data.data.length; index1++) {
                                        if (data1.data.data[index1][0]) {
                                            if (Object.keys(data1.data.data[index1][0]).length == 20) {
                                                $scope.beemlineShow = false;
                                                var div = '<div id="cFurnybeem_' + data1.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                    '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data1.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left"><strong>' + data1.data.user[0].fullname + '</strong></h3>' +
                                                    '<div class="clearfix"></div>' +
                                                    '<a target="_blank" class="beemline-link" href="' + data1.data.data[index1][0].furnybeemLinkShort + '">' +
                                                    '<h3><strong>Dreamshare</strong> ' + data1.data.data[index1][0].furnybeemTitle + '</h3>';
                                                    div = div + '<img width="130" src="' + data1.data.data[index1][0].furnybeemPath + '">';

                                                    div = div + '<span>' + data1.data.data[index1][0].furnybeemDescription + '</span>' +
                                                    '<md-divider></md-divider>' +
                                                    '<p>' + data1.data[index1][0].furnybeemText + '</p>' +
                                                    'Gesamte Reichweite: ' + data1.data.data[index1][0].reachAll + '<br>' +
                                                    'Facebook Reichweite: ' + data1.data.data[index1][0].facebookChosenReach + '<br>' +
                                                    'Twitter Reichweite: ' + data1.data.data[index1][0].twitterChosenReach + '' +
                                                    '</a>';

                                                if (data1.data[index1][0].confirmedUser) {
                                                    var confirmedUserIds = data1.data.data[index1][0].confirmedUser.split('|');

                                                    for (var cindex = 0; cindex < confirmedUserIds.length; cindex++) {
                                                        if (dataU.data.data.customerid == confirmedUserIds[cindex]) {
                                                            div = div + '<md-button class="md-button md-raised md-primary">Furnybeem bestätigt</md-button>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                            $scope.furnybeemConfirmed = true;
                                                            break;
                                                        } else {
                                                            $scope.furnybeemConfirmed = false;
                                                        }
                                                    }

                                                    if (!$scope.furnybeemConfirmed) {
                                                        if (dataU.data.data.kind == 'twitter' && data1.data.data[index1][0].twitterChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data1.data.data[index1][0].furnyId + '&sid=' + data1.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        } else if (dataU.data.data.kind == 'facebook' && data1.data[index1][0].facebookChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data1.data.data[index1][0].furnyId + '&sid=' + data1.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        }
                                                    }
                                                } else {
                                                    if (!$scope.furnybeemConfirmed) {
                                                        if (dataU.data.data.kind == 'twitter' && data1.data.data[index1][0].twitterChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data1.data[index1][0].furnyId + '&sid=' + data1.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        } else if (dataU.data.data.kind == 'facebook' && data1.data.data[index1][0].facebookChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data1.data.data[index1][0].furnyId + '&sid=' + data1.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Furnybeem (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        }
                                                    }
                                                }

                                                var el = document.getElementById('beemline');

                                                angular.element(el).append($compile(div)($scope));

                                                $('#cFurnybeem_' + data1.data[index1][0].id).fadeIn(3500, "swing");
                                                $scope.beemlineShow = true;
                                            } else {
                                                $scope.beemlineShow = false;
                                                var div = '<div id="cDreambeem_' + data1.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                    '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data1.data.user[0].profilePic.replace('http','https') + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data1.data.user[0].fullname + '</strong></h3>' +
                                                    '<div class="clearfix"></div>' +
                                                    '<a target="_blank" class="beemline-link" href="' + data1.data.data[index1][0].dreambeemlinkShort + '">' +
                                                    '<h3><strong>Dreambeem</strong> ' + data1.data.data[index1][0].dreambeemTitle + '</h3>';

                                                    div = div + '<img width="130" src="' + data1.data.data[index1][0].dreambeemPath + '">';

                                                    div = div +
                                                    '<span>' + data1.data.data[index1][0].dreambeemDescription + '</span>' +
                                                    '<md-divider></md-divider>' +
                                                    '<p>' + data1.data[index1][0].dreambeemtext + '</p>' +
                                                    '</a>';


                                                if (dataU.data.data.kind == 'twitter' && data1.data.data[index1][0].status === 'not confirmed') {
                                                    div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data1.data.data[index1][0].dreamId + '&sid=' + data1.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=twitter&link1=' + encodeURIComponent(data1.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                } else if (dataU.data.data.kind == 'facebook' && data1.data.data[index1][0].status === 'not confirmed') {
                                                    div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data1.data.data[index1][0].dreamId + '&sid=' + data1.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=facebook&link1=' + encodeURIComponent(data1.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                } else {
                                                    div = div +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                }

                                                var el = document.getElementById('beemline');

                                                angular.element(el).append($compile(div)($scope));

                                                $('#cDreambeem_' + data1.data.data[index1][0].id).fadeIn(3500, "swing");
                                                $scope.beemlineShow = true;
                                            }
                                        }
                                    }

                                    $scope.amazonProducts = data1.data.pa;
                                    $scope.ebayProducts = data1.data.pe;



                                    if(data1.data.da.length > 0 > 0) {
                                        for(var index = 0; index < data1.data.da.length; index++) {
                                            $scope.beemlineShow = false;
                                            var div = '<div id="Dreams_' + data1.data.da[index].nickname + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data1.data.da[index1].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data1.data.da[index1].nickname + '</strong></h3>' +
                                                '<div class="clearfix"></div>' +
                                                '<p>' + data1.data.da[index1].nicknameDescription + '</p><br>';
                                            if(data1.data.da[index].fbl) {
                                                div = div + '<a target="_blank" class="beemline-dreams-link-fbl" href="' + data1.data.da[index1].fbl + '">' +
                                                '<h3><strong>Facebook - Profil</strong> </h3></a>';
                                            }
                                                if( data1.data.da[index1][0].twl) {
                                                    div = div + '<a target="_blank" class="beemline-dreams-link-twl" href="' + data1.data.da[index1].twl + '">' +
                                                    '<h3><strong>Twitter Website</strong></h3></a>';
                                                }
                                               if(data1.data.da[index1].inl) {
                                                  div = div + '<a target="_blank" class="beemline-dreams-link-inl" href="' + data1.data.da[index1].inl + '">' +
                                                  '<h3><strong>Instagram - Profil</strong></h3></a>';
                                               }

                                               div = div +  '<md-divider></md-divider>';

                                            var el = document.getElementById('beemline');

                                            angular.element(el).append($compile(div)($scope));

                                            $('#Dreams_' + data1.data.da[index].nickname + index).fadeIn(3500, "swing");
                                            $scope.beemlineShow = true;
                                        }
                                    }

                                    for(var index = 0; index < $scope.ebayProducts.length; index++) {
                                        $scope.beemlineShow = false;

                                        var days = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('P')+1,$scope.ebayProducts[index].timeLeft.indexOf('DT')-1);
                                        var hours = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('T')+1,$scope.ebayProducts[index].timeLeft.indexOf('H')-$scope.ebayProducts[index].timeLeft.indexOf('T')-1);
                                        var minutes = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('H')+1,$scope.ebayProducts[index].timeLeft.indexOf('M')-$scope.ebayProducts[index].timeLeft.indexOf('H')-1);
                                        var seconds = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('M')+1,$scope.ebayProducts[index].timeLeft.indexOf('S')-$scope.ebayProducts[index].timeLeft.indexOf('M')-1);
                                        var tl = ' <span class="warning">Tage ' + days + '</span><span class="text-danger"> Stunden ' + hours + '</span><span class="text-warning"> Minuten ' + minutes + '</span> Sekunden ' + seconds;

                                        var pri = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.ebayProducts[index].currentPrice);

                                        var div = '<div id="cEbay_' + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;" ng-cloak>' +
                                            '<img width="80" src="/images/ebaylogo.png" class="pull-left">' +
                                            '<div class="clearfix"></div>' +
                                            '<a target="_blank" class="beemline-link" href="' + $scope.ebayProducts[index].productUrl + '">' +
                                            '<h3><strong>' + $scope.ebayProducts[index].title + '</strong></h3>' +
                                            '<img width="130" src="' + $scope.ebayProducts[index].image.replace('http','https') + '"><br>' +
                                            '<span><strong>' + $scope.ebayProducts[index].condition + '</strong></span><br>' +
                                            '<span>Sofort - Kauf <strong>' + $scope.ebayProducts[index].buyItNowAvailable + '</strong></span><br>' +
                                            '<span>Preisvorschlag <strong>' + $scope.ebayProducts[index].bestOfferEnabled + '</strong></span><br>' +
                                            '<span>Aktuell <strong>' + pri + '</strong></span><br>' +
                                            '<span>Läuft aus <strong>' + tl + '</strong></span>' +
                                            '<md-divider></md-divider>' +
                                            '</a>' +
                                            '<a href="' +  $scope.ebayProducts[index].productUrl + '" target="_blank">' +
                                            '<md-button class="md-button md-raised md-warn">Zur Auktion</md-button>' +
                                            '</a>';

                                        var el = document.getElementById('beemline');

                                        angular.element(el).prepend($compile(div)($scope));

                                        $("#cEbay_" + index).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    }

                                    $scope.loading = false;
                                }
                            });
                        }, 120000);
                    });
                } else {
                    var stkService = stkHttpService.getInitBeemlineWithConfig(page);
                    page = parseInt(page) + 1;
                    stkService.then(function (data2) {
                        if (data2) {
                            for (var index = 0; index < data2.data.data.length; index++) {
                                if (data2.data.data[index][0]) {
                                    if (Object.keys(data2.data.data[index][0]).length == 20) {
                                        $scope.beemlineShow = false;
                                        var div = '<div id="Furnybeem_' + data2.data.data[index][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                            '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data2.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data2.data.user[0].fullname + '</strong></h3>' +
                                            '<div class="clearfix"></div>' +
                                            '<a target="_blank" class="beemline-link" href="' + data2.data.data[index][0].furnybeemLinkShort + '">' +
                                            '<h3><strong>Dreamshare</strong> ' + data2.data.data[index][0].furnybeemTitle + '</h3>';

                                            div = div + '<img on-error-src="https://dreams.dreambeem.com/images/dreamsempty.jpg" width="130" src="' + data2.data.data[index][0].furnybeemPath + '">';

                                            div = div +
                                            '<span>' + data2.data.data[index][0].furnybeemDescription + '</span>' +
                                            '<md-divider></md-divider>' +
                                            '<p>' + data2.data.data[index][0].furnybeemText + '</p>' +
                                            'Gesamte Reichweite: ' + data2.data.data[index][0].reachAll + '<br>' +
                                            'Facebook Reichweite: ' + data2.data.data[index][0].facebookChosenReach + '<br>' +
                                            'Twitter Reichweite: ' + data2.data.data[index][0].twitterChosenReach + '<br>' +
                                            '</a>';

                                        if (data2.data.data[index][0].confirmedUser) {
                                            var confirmedUserIds = data2.data.data[index][0].confirmedUser.split('|');

                                            for (var cindex = 0; cindex < confirmedUserIds.length; cindex++) {
                                                if (dataU.data.data.customerid == confirmedUserIds[cindex]) {
                                                    div = div + '<md-button class="md-button md-raised md-primary">Dreamshare bestätigt</md-button>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                    $scope.furnybeemConfirmed = true;
                                                    break;
                                                } else {
                                                    $scope.furnybeemConfirmed = false;
                                                }
                                            }

                                            if (!$scope.furnybeemConfirmed) {
                                                if (dataU.data.data.kind == 'twitter' && data2.data.data[index][0].twitterChosenReach > 0) {
                                                    div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data2.data.data[index][0].furnyId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                } else if (dataU.data.data.kind == 'facebook' && data2.data[index][0].facebookChosenReach > 0) {
                                                    div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data2.data.data[index][0].furnyId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                    '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                    '</div>';
                                                }
                                            }
                                        } else {
                                            if (dataU.data.data.kind == 'twitter' && data2.data.data[index][0].twitterChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data2.data.data[index][0].furnyId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                            } else if (dataU.data.data.kind == 'facebook' && data2.data.data[index][0].facebookChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data2.data.data[index][0].furnyId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                            }
                                        }

                                        var el = document.getElementById('beemline');

                                        angular.element(el).append($compile(div)($scope));

                                        $('#Furnybeem_' + data2.data.data[index][0].id).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    } else {
                                        $scope.beemlineShow = false;
                                        var div = '<div id="Dreambeem_' + data2.data.data[index][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                            '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data2.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data2.data.user[0].fullname + '</strong></h3>' +
                                            '<div class="clearfix"></div>' +
                                            '<a target="_blank" class="beemline-link" href="' + data2.data.data[index][0].dreambeemlinkShort + '">' +
                                            '<h3><strong>Dreambeem</strong> ' + data2.data.data[index][0].dreambeemTitle + '</h3>';

                                            div = div + '<img on-error-src="https://dreams.dreambeem.com/images/dreamsempty.jpg" width="130" src="' + data2.data.data[index][0].dreambeemPath + '">';

                                            div = div +
                                            '<span>' + data2.data.data[index][0].dreambeemDescription + '</span>' +
                                            '<md-divider></md-divider>' +
                                            '<p>' + data2.data.data[index][0].dreambeemtext + '</p>' +
                                            '</a>';

                                        if (dataU.data.data.kind == 'twitter' && data2.data.data[index][0].status === 'not confirmed') {
                                            div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data2.data.data[index][0].dreamId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=twitter&link1=' + encodeURIComponent(data2.data.data[index][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        } else if (dataU.data.data.kind == 'facebook' && data2.data.data[index][0].status === 'not confirmed') {
                                            div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data2.data.data[index][0].dreamId + '&sid=' + data2.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=facebook&link1=' + encodeURIComponent(data2.data.data[index][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        } else {
                                            div = div +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        }

                                        var el = document.getElementById('beemline');

                                        angular.element(el).append($compile(div)($scope));

                                        $('#Dreambeem_' + data2.data.data[index][0].id).fadeIn(3500, "swing");
                                        $scope.beemlineShow = true;
                                    }
                                } else {

                                }
                            }

                            $scope.amazonProducts = data2.data.pa;
                            $scope.ebayProducts = data2.data.pe;

                            if(data2.data.da) {
                            for(var index = 0; index < data2.data.da.length; index++) {
                                    $scope.beemlineShow = false;
                                    var div = '<div id="Dreams_' + data2.data.da[index].nickname + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                        '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data2.data.da[index].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data2.data.da[index].nickname + '</strong></h3>' +
                                        '<div class="clearfix"></div>' +
                                        '<p>' + data2.data.da[index].nicknameDescription + '</p><br>';
                                if(data2.data.da[index].fbl) {
                                    div = div + '<a target="_blank" class="beemline-dreams-link-fbl" href="' + data2.data.da[index].fbl + '">' +
                                    '<h3><strong>Facebook - Profil</strong> </h3></a>';
                                }
                                            if(data2.data.da[index].twl) {
                                                div = div + '<a target="_blank" class="beemline-dreams-link-twl" href="' + data2.data.da[index].twl + '">' +
                                                '<h3><strong>Twitter Website</strong></h3></a>';
                                            }
                                if(data2.data.da[index].inl) {
                                    div = div + '<a target="_blank" class="beemline-dreams-link-inl" href="' + data2.data.da[index].inl + '">' +
                                    '<h3><strong>Instagram - Profil</strong></h3></a>';
                                }

                                        '<md-divider></md-divider>';

                                    var el = document.getElementById('beemline');

                                    angular.element(el).append($compile(div)($scope));

                                    $('#Dreams_' + data2.data.da[index].nickname + index).fadeIn(3500, "swing");
                                    $scope.beemlineShow = true;
                                }
                            }

if($scope.ebayProducts) {
    for (var index = 0; index < $scope.ebayProducts.length; index++) {
        $scope.beemlineShow = false;

        var days = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('P') + 1, $scope.ebayProducts[index].timeLeft.indexOf('DT') - 1);
        var hours = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('T') + 1, $scope.ebayProducts[index].timeLeft.indexOf('H') - $scope.ebayProducts[index].timeLeft.indexOf('T') - 1);
        var minutes = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('H') + 1, $scope.ebayProducts[index].timeLeft.indexOf('M') - $scope.ebayProducts[index].timeLeft.indexOf('H') - 1);
        var seconds = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('M') + 1, $scope.ebayProducts[index].timeLeft.indexOf('S') - $scope.ebayProducts[index].timeLeft.indexOf('M') - 1);
        var tl = ' <span class="warning">Tage ' + days + '</span><span class="text-danger"> Stunden ' + hours + '</span><span class="text-warning"> Minuten ' + minutes + '</span> Sekunden ' + seconds;

        var pri = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format($scope.ebayProducts[index].currentPrice);

        var div = '<div id="cEbay_' + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;" ng-cloak>' +
            '<img width="80" src="/images/ebaylogo.png" class="pull-left">' +
            '<div class="clearfix"></div>' +
            '<a target="_blank" class="beemline-link" href="' + $scope.ebayProducts[index].productUrl + '">' +
            '<h3><strong>' + $scope.ebayProducts[index].title + '</strong></h3>' +
            '<img width="130" src="' + $scope.ebayProducts[index].image.replace('http','https') + '"><br>' +
            '<span><strong>' + $scope.ebayProducts[index].condition + '</strong></span><br>' +
            '<span>Sofort - Kauf <strong>' + $scope.ebayProducts[index].buyItNowAvailable + '</strong></span><br>' +
            '<span>Preisvorschlag <strong>' + $scope.ebayProducts[index].bestOfferEnabled + '</strong></span><br>' +
            '<span>Aktuell <strong>' + pri + '</strong></span><br>' +
            '<span>Läuft aus <strong>' + tl + '</strong></span>' +
            '<md-divider></md-divider>' +
            '</a>' +
            '<a href="' + $scope.ebayProducts[index].productUrl + '" target="_blank">' +
            '<md-button class="md-button md-raised md-warn">Zur Auktion</md-button>' +
            '</a>';

        var el = document.getElementById('beemline');

        angular.element(el).prepend($compile(div)($scope));

        $("#cEbay_" + index).fadeIn(3500, "swing");
        $scope.beemlineShow = true;
    }
}

                            $interval(function (page) {
page = parseInt(page) + 1;
                                var stkService = stkHttpService.getLiveBeemlineWithConfig(page);

                                stkService.then(function (data12) {
                                    if (data12) {
                                        for (var index1 = 0; index1 < data12.data.data.length; index1++) {
                                            if (data12.data.data[index1][0]) {
                                                if (Object.keys(data12.data.data[index1][0]).length == 20) {
                                                    $scope.beemlineShow = false;
                                                    var div = '<div id="cFurnybeem_' + data12.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                        '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data12.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data12.data.user[0].fullname + '</strong></h3>' +
                                                        '<div class="clearfix"></div>' +
                                                        '<a target="_blank" class="beemline-link" href="' + data12.data.data[index1][0].furnybeemLinkShort + '">' +
                                                        '<h3><strong>Dreamshare</strong> ' + data12.data.data[index1][0].furnybeemTitle + '</h3>';

                                                        div = div + '<img on-error-src="https://dreams.dreambeem.com/images/dreamsempty.jpg" width="130" src="' + data12.data.data[index1][0].furnybeemPath + '">';

                                                        div = div +
                                                        '<span>' + data12.data.data[index1][0].furnybeemDescription + '</span>' +
                                                        '<md-divider></md-divider>' +
                                                        '<p>' + data12.data.data[index1][0].furnybeemText + '</p>' +
                                                        'Gesamte Reichweite: ' + data12.data.data[index1][0].reachAll + '<br>' +
                                                        'Facebook Reichweite: ' + data12.data.data[index1][0].facebookChosenReach + '<br>' +
                                                        'Twitter Reichweite: ' + data12.data.data[index1][0].twitterChosenReach + '' +
                                                        '</a>';

                                                    if (data12.data.data[index1][0].confirmedUser) {
                                                        var confirmedUserIds = data12.data.data[index1][0].confirmedUser.split('|');

                                                        for (var cindex = 0; cindex < confirmedUserIds.length; cindex++) {
                                                            if (dataU.data.data.customerid == confirmedUserIds[cindex]) {
                                                                div = div + '<md-button class="md-button md-raised md-primary">Dreamshare bestätigt</md-button>' +
                                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                                '</div>';
                                                                $scope.furnybeemConfirmed = true;
                                                                break;
                                                            } else {
                                                                $scope.furnybeemConfirmed = false;
                                                            }
                                                        }

                                                        if (!$scope.furnybeemConfirmed) {
                                                            if (dataU.data.data.kind == 'twitter' && data12.data[index1][0].twitterChosenReach > 0) {
                                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data12.data[index1][0].furnyId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                                '</div>';
                                                            } else if (dataU.data.data.kind == 'facebook' && data12.data[index1][0].facebookChosenReach > 0) {
                                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data12.data[index1][0].furnyId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                                '</div>';
                                                            }
                                                        }
                                                    } else {
                                                        if (dataU.data.data.kind == 'twitter' && data12.data.data[index1][0].twitterChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data12.data.data[index1][0].furnyId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        } else if (dataU.data.data.kind == 'facebook' && data12.data.data[index1][0].facebookChosenReach > 0) {
                                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data12.data.data[index1][0].furnyId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                            '</div>';
                                                        }
                                                    }

                                                    var el = document.getElementById('beemline');

                                                    angular.element(el).prepend($compile(div)($scope));

                                                    $('#cFurnybeem_' + data12.data.data[index1][0].id).fadeIn(3500, "swing");
                                                    $scope.beemlineShow = true;
                                                } else {
                                                    $scope.beemlineShow = false;
                                                    var div = '<div id="cDreambeem_' + data12.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                        '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data12.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data12.data.user[0].fullname + '</strong></h3>' +
                                                        '<div class="clearfix"></div>' +
                                                        '<a target="_blank" class="beemline-link" href="' + data12.data.data[index1][0].dreambeemlinkShort + '">' +
                                                        '<h3><strong>Dreambeem</strong> ' + data12.data.data[index1][0].dreambeemTitle + '</h3>';
                                                        div = div + '<img on-error-src="https://dreams.dreambeem.com/images/dreamsempty.jpg" width="130" src="' + data12.data.data[index1][0].dreambeemPath + '">';

                                                        div = div +
                                                        '<span>' + data12.data.data[index1][0].dreambeemDescription + '</span>' +
                                                        '<md-divider></md-divider>' +
                                                        '<p>' + data12.data.data[index1][0].dreambeemtext + '</p>' +
                                                        '</a>';

                                                    if (dataU.data.data.kind == 'twitter' && data12.data.data[index1][0].status === 'not confirmed') {
                                                        div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data12.data.data[index1][0].dreamId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=twitter&link1=' + encodeURIComponent(data12.data.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                        '</div>';
                                                    } else if (dataU.data.data.kind == 'facebook' && data12.data.data[index1][0].status === 'not confirmed') {
                                                        div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data12.data.data[index1][0].dreamId + '&sid=' + data12.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=facebook&link1=' + encodeURIComponent(data12.data.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                        '</div>';
                                                    } else {
                                                        div = div +
                                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                        '</div>';
                                                    }

                                                    var el = document.getElementById('beemline');

                                                    angular.element(el).prepend($compile(div)($scope));

                                                    $('#cDreambeem_' + data12.data.data[index1][0].id).fadeIn(3500, "swing");
                                                    $scope.beemlineShow = true;
                                                }
                                            }
                                        }

                                        $scope.ebayProducts = data12.data.pe;

                                        if(data12.data.da) {
                                            for(var index = 0; index < data12.data.da.length; index++) {
                                                $scope.beemlineShow = false;
                                                var div = '<div id="Dreams_' + data12.data.da[index].nickname + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                                    '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data12.data.da[index].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data12.data.da[index].nickname + '</strong></h3>' +
                                                    '<div class="clearfix"></div>' +
                                                    '<p>' + data12.data.da[index].nicknameDescription + '</p><br>';
                                                if(data12.data.da[index].fbl) {
                                                    div = div + '<a target="_blank" class="beemline-dreams-link-fbl" href="' + data12.data.da[index].fbl + '">' +
                                                    '<h3><strong>Facebook - Profil</strong> </h3></a>';
                                                }
                                                if(data12.data.da[index].twl) {
                                                    div = div + '<a target="_blank" class="beemline-dreams-link-twl" href="' + data12.data.da[index].twl + '">' +
                                                    '<h3><strong>Twitter Website</strong></h3></a>';
                                                }
                                                if(data12.data.da[index].inl) {
                                                    div = div + '<a target="_blank" class="beemline-dreams-link-inl" href="' + data12.data.da[index].inl + '">' +
                                                    '<h3><strong>Instagram - Profil</strong></h3></a>';
                                                }

                                                '<md-divider></md-divider>';

                                                var el = document.getElementById('beemline');

                                                angular.element(el).append($compile(div)($scope));

                                                $('#Dreams_' + data12.data.da[index].nickname + index).fadeIn(3500, "swing");
                                                $scope.beemlineShow = true;
                                            }
                                        }
if($scope.ebayProducts) {
    for (var index = 0; index < $scope.ebayProducts.length; index++) {
        $scope.beemlineShow = false;

        var days = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('P') + 1, $scope.ebayProducts[index].timeLeft.indexOf('DT') - 1);
        var hours = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('T') + 1, $scope.ebayProducts[index].timeLeft.indexOf('H') - $scope.ebayProducts[index].timeLeft.indexOf('T') - 1);
        var minutes = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('H') + 1, $scope.ebayProducts[index].timeLeft.indexOf('M') - $scope.ebayProducts[index].timeLeft.indexOf('H') - 1);
        var seconds = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('M') + 1, $scope.ebayProducts[index].timeLeft.indexOf('S') - $scope.ebayProducts[index].timeLeft.indexOf('M') - 1);
        var tl = ' <span class="warning">Tage ' + days + '</span><span class="text-danger"> Stunden ' + hours + '</span><span class="text-warning"> Minuten ' + minutes + '</span> Sekunden ' + seconds;

        var pri = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format($scope.ebayProducts[index].currentPrice);

        var div = '<div id="cEbay_' + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;" ng-cloak>' +
            '<img width="80" src="/images/ebaylogo.png" class="pull-left">' +
            '<div class="clearfix"></div>' +
            '<a target="_blank" class="beemline-link" href="' + $scope.ebayProducts[index].productUrl + '">' +
            '<h3><strong>' + $scope.ebayProducts[index].title + '</strong></h3>' +
            '<img width="130" src="' + $scope.ebayProducts[index].image.replace('http','https') + '"><br>' +
            '<span><strong>' + $scope.ebayProducts[index].condition + '</strong></span><br>' +
            '<span>Sofort - Kauf <strong>' + $scope.ebayProducts[index].buyItNowAvailable + '</strong></span><br>' +
            '<span>Preisvorschlag <strong>' + $scope.ebayProducts[index].bestOfferEnabled + '</strong></span><br>' +
            '<span>Aktuell <strong>' + pri + '</strong></span><br>' +
            '<span>Läuft aus <strong>' + tl + '</strong></span>' +
            '<md-divider></md-divider>' +
            '</a>' +
            '<a href="' + $scope.ebayProducts[index].productUrl + '" target="_blank">' +
            '<md-button class="md-button md-raised md-warn">Zur Auktion</md-button>' +
            '</a>';

        var el = document.getElementById('beemline');

        angular.element(el).prepend($compile(div)($scope));

        $("#cEbay_" + index).fadeIn(3500, "swing");
        $scope.beemlineShow = true;
    }
}


                                    }
                                });
                            }, 120000);
                        }
                    });
                }

                $scope.loading1 = false;
            });
        };

        $scope.submitBeemlineConfig = function(isValid, chips, ebay, dreams) {

            if (isValid) {
                if(chips.length === 0) {
                    $mdToast.show({
                        theme       : 'error-toast',
                        hideDelay   : 3000,
                        position    : 'top',
                        controller  : 'ToastCtrl',
                        templateUrl : 'views/toasts/toast_beemlineconfig_0_alert.html',
                        toastClass  : 'md-success-toast-theme'
                    });
                } else {
                    $scope.loading1 = true;
                    var stkService = stkHttpService.postBeemlineConfig(chips, ebay, dreams);
                    stkService.then(function(data) {
                        $scope.ebayProducts = data.data.pe;

                        for(var index = 0; index < $scope.ebayProducts.length; index++) {
                            $scope.beemlineShow = false;

                            var days = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('P')+1,$scope.ebayProducts[index].timeLeft.indexOf('DT')-1);
                            var hours = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('T')+1,$scope.ebayProducts[index].timeLeft.indexOf('H')-$scope.ebayProducts[index].timeLeft.indexOf('T')-1);
                            var minutes = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('H')+1,$scope.ebayProducts[index].timeLeft.indexOf('M')-$scope.ebayProducts[index].timeLeft.indexOf('H')-1);
                            var seconds = $scope.ebayProducts[index].timeLeft.substr($scope.ebayProducts[index].timeLeft.indexOf('M')+1,$scope.ebayProducts[index].timeLeft.indexOf('S')-$scope.ebayProducts[index].timeLeft.indexOf('M')-1);
                            var tl = ' <span class="warning">Tage ' + days + '</span><span class="text-danger"> Stunden ' + hours + '</span><span class="text-warning"> Minuten ' + minutes + '</span> Sekunden ' + seconds;

                            var pri = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format($scope.ebayProducts[index].currentPrice);

                            var div = '<div id="cEbay_' + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;" ng-cloak>' +
                                '<img width="80" src="/images/ebaylogo.png" class="pull-left">' +
                                '<div class="clearfix"></div>' +
                                '<a target="_blank" class="beemline-link" href="' + $scope.ebayProducts[index].productUrl + '">' +
                                '<h3><strong>' + $scope.ebayProducts[index].title + '</strong></h3>' +
                                '<img width="130" src="' + $scope.ebayProducts[index].image.replace('http','https') + '">' +
                                '<span><strong>' + $scope.ebayProducts[index].condition + '</strong></span><br>' +
                                    '<span>Sofort - Kauf <strong>' + $scope.ebayProducts[index].buyItNowAvailable + '</strong></span><br>' +
                                '<span>Preisvorschlag <strong>' + $scope.ebayProducts[index].bestOfferEnabled + '</strong></span><br>' +
                                '<span>Aktuell <strong>' + pri + '</strong></span><br>' +
                                '<span>Läuft aus <strong>' + tl + '</strong></span>' +
                                '<md-divider></md-divider>' +
                                '</a>' +
                                '<a href="' +  $scope.ebayProducts[index].productUrl + '" target="_blank">' +
                                '<md-button class="md-button md-raised md-warn">Zur Auktion</md-button>' +
                                '</a>';

                            var el = document.getElementById('beemline');

                            angular.element(el).append($compile(div)($scope));

                            $("#cEbay_" + index).fadeIn(3500, "swing");
                            $scope.beemlineShow = true;
                        }

                        if(data.data.da) {
                            for(var index = 0; index < data.data.da.length; index++) {
                                $scope.beemlineShow = false;
                                var div = '<div id="Dreams_' + data.data.da[index].nickname + index + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                    '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.da[index].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.da[index].nickname + '</strong></h3>' +
                                    '<div class="clearfix"></div>' +
                                    '<p>' + data.data.da[index].nicknameDescription + '</p><br>';
                                if(data.data.da[index].fbl) {
                                    div = div + '<a target="_blank" class="beemline-dreams-link-fbl" href="' + data.data.da[index].fbl + '">' +
                                    '<h3><strong>Facebook - Profil</strong> </h3></a>';
                                }
                                if(data.data.da[index].twl) {
                                    div = div + '<a target="_blank" class="beemline-dreams-link-twl" href="' + data.data.da[index].twl + '">' +
                                    '<h3><strong>Twitter Website</strong></h3></a>';
                                }
                                if(data.data.da[index].inl) {
                                    div = div + '<a target="_blank" class="beemline-dreams-link-inl" href="' + data.data.da[index].inl + '">' +
                                    '<h3><strong>Instagram - Profil</strong></h3></a>';
                                }

                                '<md-divider></md-divider>';

                                var el = document.getElementById('beemline');

                                angular.element(el).prepend($compile(div)($scope));

                                $('#Dreams_' + data.data.da[index].nickname + index).fadeIn(3500, "swing");
                                $scope.beemlineShow = true;
                            }
                        }

                        var stkService = stkHttpService.getUserdata();
                        stkService.then(function(dataU) {

                        for (var index1 = 0; index1 < data.data.data.length; index1++) {
                            if (data.data.data[index1][0]) {
                                if (Object.keys(data.data.data[index1][0]).length == 20) {
                                    $scope.beemlineShow = false;
                                    var div = '<div id="cFurnybeem_' + data.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                        '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.user[0].fullname + '</strong></h3>' +
                                        '<div class="clearfix"></div>' +
                                        '<a target="_blank" class="beemline-link" href="' + data.data.data[index1][0].furnybeemLinkShort + '">' +
                                        '<h3><strong>Dreamshare</strong> ' + data.data.data[index1][0].furnybeemTitle + '</h3>';
                                        div = div + '<img width="130" src="' + data.data.data[index1][0].furnybeemPath + '">';

                                       div = div +
                                        '<span>' + data.data.data[index1][0].furnybeemDescription + '</span>' +
                                        '<md-divider></md-divider>' +
                                        '<p>' + data.data.data[index1][0].furnybeemText + '</p>' +
                                        'Gesamte Reichweite: ' + data.data.data[index1][0].reachAll + '<br>' +
                                        'Facebook Reichweite: ' + data.data.data[index1][0].facebookChosenReach + '<br>' +
                                        'Twitter Reichweite: ' + data.data.data[index1][0].twitterChosenReach + '' +
                                        '</a>';

                                    if (data.data.data[index1][0].confirmedUser) {
                                        var confirmedUserIds = data.data.data[index1][0].confirmedUser.split('|');

                                        for (var cindex = 0; cindex < confirmedUserIds.length; cindex++) {
                                            if (dataU.data.data.customerid == confirmedUserIds[cindex]) {
                                                div = div + '<md-button class="md-button md-raised md-primary">Dreamshare bestätigt</md-button>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                                $scope.furnybeemConfirmed = true;
                                                break;
                                            } else {
                                                $scope.furnybeemConfirmed = false;
                                            }
                                        }

                                        if (!$scope.furnybeemConfirmed) {
                                            if (dataU.data.data.kind == 'twitter' && data.data[index1][0].twitterChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data[index1][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                            } else if (dataU.data.data.kind == 'facebook' && data.data[index1][0].facebookChosenReach > 0) {
                                                div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data[index1][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                                '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                                '</div>';
                                            }
                                        }
                                    } else {
                                        if (dataU.data.data.kind == 'twitter' && data.data.data[index1][0].twitterChosenReach > 0) {
                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data.data[index1][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&twReach=' + dataU.data.data.reach + '&kind=twitter"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        } else if (dataU.data.data.kind == 'facebook' && data.data.data[index1][0].facebookChosenReach > 0) {
                                            div = div + '<a href="https://www.dreambeem.com/furnybeem?id=' + data.data.data[index1][0].furnyId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&fbReach=' + dataU.data.data.reach + '&kind=facebook"><md-button class="md-button md-raised md-warn">Dreamshare (' + dataU.data.data.reach + ') bestätigen</md-button></a>' +
                                            '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                            '</div>';
                                        }
                                    }

                                    var el = document.getElementById('beemline');

                                    angular.element(el).prepend($compile(div)($scope));

                                    $('#cFurnybeem_' + data.data.data[index1][0].id).fadeIn(3500, "swing");
                                    $scope.beemlineShow = true;
                                } else {
                                    $scope.beemlineShow = false;
                                    var div = '<div id="cDreambeem_' + data.data.data[index1][0].id + '" style="margin-left: auto; margin-right: auto; display: block; display: none; width: 300px ; padding: 15px;">' +
                                        '<img on-error-src="https://dreams.dreambeem.com/images/default_profile_normal.png" style="z-index: 999999;" src="' + data.data.user[0].profilePic + '" class="pull-left"><h3 class="pull-left m-l"><strong>' + data.data.user[0].fullname + '</strong></h3>' +
                                        '<div class="clearfix"></div>' +
                                        '<a target="_blank" class="beemline-link" href="' + data.data.data[index1][0].dreambeemlinkShort + '">' +
                                        '<h3><strong>Dreambeem</strong> ' + data.data.data[index1][0].dreambeemTitle + '</h3>';

                                        div = div + '<img width="130" src="' + data.data.data[index1][0].dreambeemPath + '">';

                                        div = div +
                                        '<span>' + data.data.data[index1][0].dreambeemDescription + '</span>' +
                                        '<md-divider></md-divider>' +
                                        '<p>' + data.data.data[index1][0].dreambeemtext + '</p>' +
                                        '</a>';

                                    if (dataU.data.data.kind == 'twitter' && data.data.data[index1][0].status === 'not confirmed') {
                                        div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data.data[index1][0].dreamId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=twitter&link1=' + encodeURIComponent(data.data.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                        '</div>';
                                    } else if (dataU.data.data.kind == 'facebook' && data.data.data[index1][0].status === 'not confirmed') {
                                        div = div + '<a href="https://www.dreambeem.com/dreambeem?id=' + data.data.data[index1][0].dreamId + '&sid=' + data.data.user[0].customerid + '&cid=' + dataU.data.data.customerid + '&kind=facebook&link1=' + encodeURIComponent(data.data.data[index1][0].dreambeemlinkShort) + '"><md-button class="md-button md-raised md-warn">Dreambeem bestätigen</md-button></a>' +
                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                        '</div>';
                                    } else {
                                        div = div +
                                        '<md-progress-linear class="md-warn" md-mode="buffer" value="{{vm.determinateValue}}" md-buffer-value="{{vm.determinateValue2}}"></md-progress-linear>' +
                                        '</div>';
                                    }

                                    var el = document.getElementById('beemline');

                                    angular.element(el).prepend($compile(div)($scope));

                                    $('#cDreambeem_' + data.data.data[index1][0].id).fadeIn(3500, "swing");
                                    $scope.beemlineShow = true;
                                }
                            }
                        }

                            });

                        $scope.loading1 = false;

                    });
                }
            }
        };
    });