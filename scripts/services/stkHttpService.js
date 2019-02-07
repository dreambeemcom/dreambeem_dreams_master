'use strict';

angular.module('customerDreambeemcomApp')
    .service('stkHttpService', function ($http) {
        this.cartCheckout = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Cart/checkout'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.checkCheckout = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/checkCheckout'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getCartProductsSum = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Cart/getCartProductsSum'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getCartCount = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Cart/getCartCount'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postPayoffsInformation = function(payoffsInformation) {
            if(payoffsInformation) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Payoffs/savePayoffsInformation',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: payoffsInformation
                }).then(function successCallback(response) {
                    console.log(response);
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getPayoffsInformation = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Payoffs/getInformation'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.sendMessage = function(contact) {
            if(contact) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Contact/sendMessage',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: contact
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories7 = function(id3) {
            if(id3) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get7Categories?id3=' + id3 + ''
                }).then(function successCallback(response) {
                    console.log(response);
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.TWFollowUser = function(id) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Twitter/followUser?fid=' + id
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.TWFindFollowers = function(qua,lang) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Twitter/getFollowers?qua=' + qua + '&lang=' + lang
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.insertTWUsers = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Twitter/insertUsers'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getCategories6 = function(id3) {
            if(id3) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get6Categories?id3=' + id3 + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories5 = function(id3) {
            if(id3) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get5Categories?id3=' + id3 + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories4 = function(id3) {
            if(id3) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get4Categories?id3=' + id3 + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories3 = function(id3) {
            if(id3) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get3Categories?id3=' + id3 + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories2 = function(id2) {
            if(id2) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/get2Categories?id3=' + id2 + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCategories = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Categories/getRootCategories',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.increasePrice = function(id,pid,oid,p,op) {
            if(id && pid && oid && p) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/increasePrice?id=' + id + '&pid=' + pid + '&oid=' + oid + '&p=' + encodeURI(p) + '&op=' + encodeURI(op)
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getLagerProducts = function(q) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/getProducts?qua=' + q + '',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
        };

        this.checkAddressesEmail = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/checkAddresses'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postPayAmount = function(amount,kind) {
            if(amount) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Payoffs/payAmount?amount=' + encodeURI(amount) + '&kind=' + kind
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getPayments = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Payoffs/getPayments'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getSales = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getSales'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getSearchLagerProductsCount = function(q) {
            if(q) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Products/getSearchLagerProductsCount?q=' + encodeURI(q) + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getSearchLagerProducts = function(s,c) {
            if(s) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Products/getSearchLagerProducts?q=' + encodeURI(s) + '&c=' + c + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getLagerProductsCount = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getLagerProductsCount',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.sendShopStatus = function (pid) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/enableStatus?shopstatus=online&pid=' + pid + '',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.sendShop = function (shopData) {
            if(shopData.email.length > 0) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/saveShop',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: shopData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.saveCategory = function (id,cid) {
            if(id && cid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Categories/saveCategory?id=' + id + '&cid=' + cid + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.sendShopPartner = function (shopPartnerData) {
            if(shopPartnerData) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/saveShopPartner',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: shopPartnerData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.deleteLagerProduct1 = function(id,pid) {
            if(id && pid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/deleteLagerProduct?id=' + id + '&pid=' + pid + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getDreamProductsBekleidung = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsBekleidung'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsBaby = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsBaby'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsBuero = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsBuero'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsElektronik = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsElektronik'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsFahrzeuge = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsFahrzeuge'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsErwachsene = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsErwachsene'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsGesundheit = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsGesundheit'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsHeim = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsHeim'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsHeimwerker = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsHeimwerker'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsKameras = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsKameras'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsKunst = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsKunst'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsMedien = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsMedien'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsMoebel = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsMoebel'
            }).then(function successCallback(response) {
                var response = response.data;
                console.log(response);
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsNahrung = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsNahrung'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsReligion = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsReligion'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsSoftware = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsSoftware'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsSpielzeug = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsSpielzeug'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsSport = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsSportartikel'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsTaschen = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsTaschen'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsTiere = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsTiere'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamProductsWirtschaft = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getProductsWirtschaft'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getLagerInProduct = function(id,pid,oid) {
            if(id && pid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/getLagerProduct?id=' + id + '&pid=' + pid + '&oid=' + oid
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        }

        this.addProductToLager = function(productId,pid) {
            if(pid && productId) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/addProductToLager?id=' + productId + '&pid=' + pid + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getDreamNewsLink = function(id) {
            if(id) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Links/getDreamNewsLink?id=' + id + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.saveProductN = function(p) {
            if(p) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/saveProductNew',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: p
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getPurchases = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Purchases/getPurchases'
            }).then(function successCallback(response) {
                var resp = response.data;
                console.log(resp);
                return resp;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.updateCurrentShop = function(id) {
            if(id) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/updateCurrentShop?id=' + id + ''
                }).then(function successCallback(response) {
                    var resp = response.data;
                    return resp;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        }

        this.getPortfolioProductsCount = function(id) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getPortfolioProductsCount?id=' + id + '',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                console.log(response);
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getSearchPortfolioProductsCount = function(catid, s) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getSearchPortfolioProductsCount?catid=' + catid + '&s=' + encodeURI(s) + '',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getSearchPortfolioProducts = function(catid, s, c) {
            if(s && catid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/getSearchPortfolioProducts?catid=' + catid + '&s=' + encodeURI(s) + '&qua=' + c + ''
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getDreamNewsAlles = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryAlles'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsVideos = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryVideos'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsTag = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryTag'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsPolitik = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryPolitik'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsPanorama = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryPanorama'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsSport = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategorySport'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsKultur = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryKultur'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsWirtschaft = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryWirtschaft'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsAuto = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryAuto'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsGesundheit = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryGesundheit'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsLifestyle = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryLifestyle'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsGenuss = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryGenuss'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsFamilie = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryFamilie'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsWetter = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryWetter'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsDigital = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryDigital'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsWissen = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryWissen'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsReise = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryReise'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsEilmeldungen = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryEilmeldungen'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsMeldungen = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryMeldungen'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsAusland = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryAusland'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsImmobilien = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryImmobilien'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsFinanzen = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryFinanzen'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDreamNewsBoerse = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Links/getCategoryBoerse'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getAmaSearch = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Amazon/getSearch'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.refreshProduct = function(id,pid) {
            if(id && pid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Shop/actualProduct?id=' + id + '&pid=' + pid
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getPortfolioProducts = function(catId,qua) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getPortfolioProducts?catId=' + catId + '&qua=' + qua + ''
            }).then(function successCallback(response) {
                var resp = response.data;
                return resp;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getShopData = function (fl,sid) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Shop/getShopData'
            }).then(function successCallback(response) {
                var resp = response.data;
                return resp;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postBooking = function(obj) {
            if(obj) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Booking/saveBooking',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: obj
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getUserdata = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Customer/getUserdata'
            }).then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getInitBeemline = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Beemline/initBeemline'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getLiveBeemline = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Beemline/liveBeemline'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getInitBeemlineWithConfig = function(page) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Beemline/initBeemlineWithConfig?p=' + page
            }).then(function successCallback(response) {
                var res = response;
                return res;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getLiveBeemlineWithConfig = function(page) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Beemline/liveBeemlineWithConfig?p=' + page
            }).then(function successCallback(response) {
                var r = response;
                return r;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postBeemlineConfig = function(keywords, ebay, dreams) {
            if(keywords.length > 0) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Beemline/config?ebay=' + ebay + '&dreams=' + dreams,
                    headers: {
                     'Content-Type':'application/x-www-form-urlencoded'
                     },
                    data: keywords
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getOpenBookings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Bookings/getOpenBookings'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getDoneBookings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Bookings/getDoneBookings'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getBeemlineConfig = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Beemline/getBeemlineConfig'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getLogout = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/customerLogout'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.saveProductDetails = function(data) {
            if(data) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Products/saveProductDetails',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: data
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getDreambeem = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Customer/getDreambeem'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getFbReach = function () {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Facebook/getReach'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getTwReach = function () {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Twitter/getReach'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postFurnybeem = function (furnyData) {
            if(furnyData) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Furnybeem/postFurnybeem',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: furnyData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.postDreambeem = function (dreamData) {
            if(dreamData) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Dreambeem/postDreambeem',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: dreamData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCustomerAddresses = function () {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Customer/getAddresses'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postFBLogin = function(data){
            return $http({
                method: 'POST',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/FBLogin',
                data: data,
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                 }
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getEmaillimitsSettings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Settings/getEmaillimitsSettings'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postNameSearch = function(name) {
            if(name) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Events/searchNames?s=' + encodeURI(name)
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.dreamsUsers = function(quantity,choseCategoryEventsBooking,
                                    choseEventsBooking,choseAvailabilityTimeBooking,choseAvailabilityDayBooking,plz_place_booking,price_booking) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Events/getDreams?qua=' + encodeURI(quantity) + '&catEventId=' + encodeURI(choseCategoryEventsBooking) + '&eventId=' +
                encodeURI(choseEventsBooking) + '&availableTime=' + encodeURI(choseAvailabilityTimeBooking) + '&availableDay=' + encodeURI(choseAvailabilityDayBooking)
                + '&plz=' + encodeURI(plz_place_booking) + '&price=' + encodeURI(price_booking)
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getCatEventsDreams = function(id,start) {
            if(id) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Events/getCatEventsDreams?id=' + id + '&start=' + start
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getNickNames = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Customer/getNicknames'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.saveNickNames = function(obj) {
            if(obj) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Customer/saveNickname',
                    data: obj,
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.saveSocialProfiles = function(obj) {
            if(obj) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Customer/saveProfiles',
                    data: obj,
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.initProfileLinks = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Events/getProfileLinks'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.deleteEvent = function(mainId,eventId, id, timeA) {
            if(mainId && eventId) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Events/deleteEvent?mainId=' + mainId + '&eventId=' + eventId + '&id=' + id + '&time=' + encodeURI(timeA)
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.initEvents = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Events/getEvents'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.postAvailability = function(availbale) {
            if(availbale) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Events/insertAvailable',
                    data: availbale,
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCatEvents = function(id) {
            if(id) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Events/getCategoryEvents?id=' + id
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getTwitterSettings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Settings/getTwitterSettings'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getGeneralSettings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Settings/getGeneralSettings'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.sendTwitterSettings = function (settings) {
            if(settings) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Settings/saveTwitterSettings',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: settings
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getValuedBookings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Bookings/getValuedBookings'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.makeAssessment = function (obj) {
            if(obj) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Assessment/makeAssessment',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: obj
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getAssBooking = function(bid) {
            if(bid) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Bookings/getAssBooking?bid=' + bid
                }).then(function successCallback(response) {
                    var response = response;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getAcceptedBookings = function() {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Bookings/getAcceptedBookings'
            }).then(function successCallback(response) {
                var response = response;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.sendEmaillimitsSettings = function (settings) {
            if(settings) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Settings/saveEmaillimitsSettings',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: settings
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.sendGeneralSettings = function (settings) {
            if(settings) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Settings/saveGeneralSettings',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: settings
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.sendCustomerAddress = function (customerAddressData) {
            if(customerAddressData) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Customer/saveCustomerAddress',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: customerAddressData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.getCustomer = function () {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Customer/getCustomer'
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
        };

        this.sendCustomer = function (customerData) {
            if(customerData) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Customer/saveCustomer',
                    headers: {
                     'Content-Type':'application/x-www-form-urlencoded'
                     },
                    data: customerData
                }).then(function successCallback(response) {
                    var response = response.data;
                    return response;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.deleteCartProduct = function(id) {
            if(id) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: 'https://api.dreambeem.com/Cart/deleteProduct?id=' + id + ''
                }).then(function successCallback(response) {
                    var res = response.data;
                    return res;
                }, function errorCallback(response) {
                    throw response;
                });
            }
        };

        this.controlLogin = function () {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/controlLogin'
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

        this.getTWData = function(oauth_token, token_verifier){
            return $http({
                method: 'GET',
                withCredentials: true,
                url: 'https://api.dreambeem.com/Login/getTWData?token='+oauth_token+'&token_verifier='+token_verifier
            }).then(function successCallback(response) {
                var response = response.data;
                return response;
            }, function errorCallback(response) {
                throw response;
            });
        };

    });