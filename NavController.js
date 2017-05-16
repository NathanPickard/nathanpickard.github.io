(function () {
  angular.module('navCtrl', ['ngMaterial'])
    .controller('NavCtrl', function ($scope, $timeout, $mdSidenav) {
      $scope.toggleLeft = buildToggler('left');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }
    })
})

// (function () {
//   angular.module('navItems').controller('NavController', NavController)

//   function NavController(navService, $mdSidenav, $log) {

//     var self = this;

//     self.selected = null;
//     self.navItems = [];
//     self.selectItem = selectItem;
//     // self.toggleList = toggleNavList;

//     navService.loadAllItems().then(function (navItems) {
//       self.navItems = [].concat(navItems);
//       self.selected = navItems[0];
//     });

//     // function toggleNavList() {
//     //   $mdSidenav('left').toggle();
//     // }

//     function selectItem(navItem) {
//       self.selected = angular.isNumber(navItem) ? $scope.navItems[navItem] : navItem;
//       if(self.selected === 1) {
        

//       }
//     }

//   }
// })();