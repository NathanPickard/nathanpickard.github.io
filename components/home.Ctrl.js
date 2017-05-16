(function(){
  'use strict';
  
  angular.module('Portfolio.controllers')

.controller('HomeCtrl', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'nav',
      '$mdSidenav',
      '$scope',
      function ($rootScope, $log, $state, $timeout, $location, nav, $mdSidenav, $scope) {

        var vm = this;

        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.nav = nav;
        $scope.toggleLeft = buildToggler('left');
        // vm.toggleList = toggleNavList;

        vm.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };

        // function toggleNavList() {
        //   $mdSidenav.toggle();
        // }

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          };
        }


        function isOpen(section) {
          return nav.isSectionSelected(section);
        }

        function toggleOpen(section) {
          nav.toggleSelectSection(section);
        }

      }])
})();