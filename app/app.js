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
      $mdIconProvider.icon('mail', './svg/388-mail.svg', 24);
      $mdIconProvider.icon('upArrow', './svg/up-arrow.svg', 24);

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
              },
              'content@home': {
                templateUrl: 'components/homepage.html'
              }
            }
          })
          .state('home.home', {
            url: 'home',
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
          // .state('home.blog', {
          //   url:'blog',
          //   views: {
          //     'content@home': {
          //       templateUrl: 'templates/blog-view.base.tpl.html'
          //     }
          //   }
          // })
          // .state('home.blogedit', {
          //   url:'blogedit',
          //   views: {
          //     'content@home': {
          //       templateUrl: 'templates/blog-edit.post.tpl.html'
          //     }
          //   }
          // })
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