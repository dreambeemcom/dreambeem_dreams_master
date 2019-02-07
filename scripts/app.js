'use strict';

/**
 * @ngdoc overview
 * @name customerDreambeemcomApp
 * @description
 * # customerDreambeemcomApp
 *
 * Main module of the application.
 */
angular
  .module('customerDreambeemcomApp', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial',
        'facebook',
        'ngCountUp',
        'infinite-scroll'


  ])
  .config(function ($routeProvider, $locationProvider, FacebookProvider, $mdDateLocaleProvider) {
        FacebookProvider.init({
            appId: '1107023486046982',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.6'
        });

        $mdDateLocaleProvider.formatDate = function(date) {
            var newDate = new Date(date).toLocaleDateString();
            return newDate.toString('dd.mm.YYYY');
        };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
        .when('/dreams-balance', {
            templateUrl: 'views/dreams-balance.html',
            controller: 'DreamsBalanceCtrl',
            controllerAs: 'dreamsbalance'
        })
        .when('/assessment', {
            templateUrl: 'views/assessment1.html',
            controller: 'Assessment1Ctrl',
            controllerAs: 'assessment1'
        })
            .when('/software-license', {
                templateUrl: 'views/softwarelicense.html',
                controller: 'SoftwareLicenseCtrl',
                controllerAs: 'softwarelicense'
            })
        .when('/fbprom', {
            templateUrl: 'views/fbprom.html',
            controller: 'FbPromCtrl',
            controllerAs: 'FbProm'
        })
        .when('/about-us', {
            templateUrl: 'views/aboutus.html',
            controller: 'AboutusCtrl',
            controllerAs: 'aboutus'
        })
        .when('/booking', {
            templateUrl: 'views/booking.html',
            controller: 'BookingCtrl',
            controllerAs: 'booking'
        })
        .when('/bookings', {
            templateUrl: 'views/bookings.html',
            controller: 'BookingsCtrl',
            controllerAs: 'bookings'
        })
        .when('/faq', {
            templateUrl: 'views/faq.html',
            controller: 'FaqCtrl',
            controllerAs: 'faq'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl',
            controllerAs: 'contact'
        })
        .when('/twitter-follower/:lang/:page', {
            templateUrl: 'views/twitter-follower.html',
            controller: 'TwitterFollowerCtrl',
            controllerAs: 'twitterfollower'
        })
        .when('/datasecurity', {
            templateUrl: 'views/datasecurity.html',
            controller: 'DatasecurityCtrl',
            controllerAs: 'datasecurity'
        })
        .when('/dreamlogin', {
            templateUrl: 'views/login.html',
            controller: 'DreamloginCtrl',
            controllerAs: 'dreamlogin'
        })
        .when('/impressum', {
            templateUrl: 'views/impressum.html',
            controller: 'ImpressumCtrl',
            controllerAs: 'impressum'
        })
        .when('/agb-events', {
            templateUrl: 'views/agb-events.html',
            controller: 'AgbEventsCtrl',
            controllerAs: 'agbevents'
        })
        .when('/agb-products', {
            templateUrl: 'views/agb-products.html',
            controller: 'AgbProductsCtrl',
            controllerAs: 'agbproducts'
        })
        .when('/agb-papers', {
            templateUrl: 'views/agb-papers.html',
            controller: 'AgbPapersCtrl',
            controllerAs: 'agbpapers'
        })
        .when('/sell-events', {
            templateUrl: 'views/dream-events-sell.html',
            controller: 'DreamEventsSellCtrl',
            controllerAs: 'DreamEventsSell'
        })
        .when('/sell-products', {
            templateUrl: 'views/dream-products-sell.html',
            controller: 'DreamProductsSellCtrl',
            controllerAs: 'DreamProductsSell'
        })
        .when('/sell-papers', {
            templateUrl: 'views/dream-papers-sell.html',
            controller: 'DreamPapersSellCtrl',
            controllerAs: 'DreamPapersSell'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl',
            controllerAs: 'settings'
        })
        .when('/orders', {
            templateUrl: 'views/orders.html',
            controller: 'OrdersCtrl',
            controllerAs: 'orders'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/bills', {
            templateUrl: 'views/bills.html',
            controller: 'BillsCtrl',
            controllerAs: 'bills'
        })
        .when('/analytics', {
            templateUrl: 'views/analytics.html',
            controller: 'AnalyticsCtrl',
            controllerAs: 'analytics'
        })
        .when('/shop', {
            templateUrl: 'views/shop.html',
            controller: 'ShopCtrl',
            controllerAs: 'shop'
        })
        .when('/lager', {
            templateUrl: 'views/lager.html',
            controller: 'LagerCtrl',
            controllerAs: 'lager'
        })
        .when('/portfolio', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioCtrl',
            controllerAs: 'portfolio'
        })
        .when('/sales', {
            templateUrl: 'views/sales.html',
            controller: 'SalesCtrl',
            controllerAs: 'sales'
        })
        .when('/purchases', {
            templateUrl: 'views/purchases.html',
            controller: 'PurchasesCtrl',
            controllerAs: 'purchases'
        })
        .when('/payoffs', {
            templateUrl: 'views/payoffs.html',
            controller: 'PayoffsCtrl',
            controllerAs: 'payoffs'
        })
        .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'MessagesCtrl',
            controllerAs: 'messages'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutCtrl',
            controllerAs: 'logout'
        })
        .when('/customer', {
            templateUrl: 'views/customer.html',
            controller: 'CustomerCtrl',
            controllerAs: 'customer'
        })
        .when('/dream-products', {
            templateUrl: 'views/dream-products.html',
            controller: 'DreamProductsCtrl',
            controllerAs: 'dreamproducts'
        })
        .when('/dream-events', {
            templateUrl: 'views/dream-events.html',
            controller: 'DreamEventsCtrl',
            controllerAs: 'dreamevents'
        })
        .when('/dream-papers', {
            templateUrl: 'views/dream-papers.html',
            controller: 'DreamPapersCtrl',
            controllerAs: 'dreampapers'
        })
      .otherwise({
        redirectTo: '/404.html'
      });

        $locationProvider.html5Mode(true);
  });
