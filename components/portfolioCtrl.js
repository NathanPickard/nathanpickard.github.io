(function () {
  'use strict';

  angular.module('Portfolio.controlelrs')
    .controller('portfolioCtrl', function ($scope) {

      $scope.photos = [
        { src: './img/ftfss1.png', desc: 'image01' },
        { src: './img/ftfss2.png', desc: 'image02' }
      ];

      $scope._Index = 0;

      $scope.isActive = function (index) {
        return $scope._Index === index;
      };

      $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
      };

      $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
      };

      $scope.showPhoto = function (index) {
        $scope._Index = index;
      }
    });
})();