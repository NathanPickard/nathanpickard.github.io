(function () {

  angular.module('Portfolio', [
    'Portfolio.controllers',
    'dynamicTabs',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ui.router'])

    .config(function ($mdIconProvider, $mdThemingProvider) {

      $mdIconProvider.icon('home', './svg/002-home2.svg', 24);
      $mdIconProvider.icon('portfolio', './svg/048-folder.svg', 24);
      $mdIconProvider.icon('web', './svg/202-sphere.svg', 24);
      $mdIconProvider.icon('android', './svg/449-android.svg', 24);
      $mdIconProvider.icon('about', './svg/047-stack.svg', 24);
      $mdIconProvider.icon('contact', './svg/006-pencil.svg', 24);
      $mdIconProvider.icon('menu', './svg/190-menu.svg', 24);
      $mdIconProvider.icon('linkedin', './svg/458-linkedin.svg', 24);
      $mdIconProvider.icon('github', './svg/433-github.svg', 24);
      $mdIconProvider.icon('twitter', './svg/407-twitter.svg', 24);
      $mdIconProvider.icon('twitterWhite', './svg/Twitter_Social_Icon_White.svg', 24);

      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('green');
    })

    .config(['$stateProvider', '$urlRouterProvider', '$logProvider',
      function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
          .state('home', {
            url: '/',
            views: {
              '@': {
                templateUrl: 'components/home.html',
                controller: 'HomeCtrl as vm'                
              }
            }
          })
          .state('home.home', {
            url: 'homepage',
            views: {
              'content@home': {
                templateUrl: 'components/homepage.html'
              }
            }
          })
          .state('home.portfolio', {
            url: 'portfolio',
            abstract: true
          })
          .state('home.portfolio.webprojects', {
            url: '/webprojects',
            views: {
              'content@home': {
                templateUrl: 'components/portfolio.webprojects.html'
              }
            }
          })
          .state('home.portfolio.androidprojects', {
            url: '/androidprojects',
            views: {
              'content@home': {
                templateUrl: 'components/portfolio.androidprojects.html'
              }
            }
          })
          .state('home.about', {
            url: 'about',
            views: {
              'content@home': {
                templateUrl: 'components/about.html'
              }
            }
          })
          .state('home.contact', {
            url: 'contact',
            views: {
              'content@home': {
                templateUrl: 'components/contact.html'
              }
            }
          })
          //   views: {
          //     // 'content@home': {
          //     // templateUrl: 'components/about.html'
          //     // }
          //   }
          // })
      }])
    //take all whitespace out of string
    .filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function () {
      return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
          return doc.name.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }

        return doc.label || doc.name;
      };
    });
})();