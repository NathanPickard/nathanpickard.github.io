(function() {
  'use strict';

  angular.module('projectItems', ['ngMaterial'])
      .controller('PortfolioController', PortfolioController);

  function PortfolioController($scope) {
    $scope.currentNavItem = 'page1';
  }
})();