(function () {
  'use strict';

  angular.module('Portfolio.controllers')
    .controller('portfolioCtrl', function ($scope) {

      $scope.photos = [
        { src: '../img/ftfss1.png', desc: 'Image 01' },
        { src: '../img/ftfss2.png', desc: 'Image 02' },
        { src: '../img/ftfss3.png', desc: 'Image 03' }
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