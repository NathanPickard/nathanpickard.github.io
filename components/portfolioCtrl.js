(function () {
  'use strict';

  angular.module('Portfolio.controllers')
    .controller('portfolioCtrl', function ($scope) {

      $scope.photos = [
        { src: 'https://s26.postimg.org/84rmb5zo9/ftfss1.png', desc: 'Image 01' },
        { src: 'https://s26.postimg.org/n0q5iw0u1/ftfss2.png', desc: 'Image 02' },
        { src: 'https://s26.postimg.org/o30c1gty1/ftfss3.png', desc: 'Image 03' },
        { src: '', desc: '' },
        { src: '', desc: '' }
      ];

      $scope.photos.set1 = [
        { set1: 'https://s26.postimg.org/jlgescf55/wdss1.png', desc: 'Image 04' },
        { set1: 'https://s26.postimg.org/6gf5apgll/wdss2.png', desc: 'Image 05' },
        { set1: 'https://s26.postimg.org/i5j4yp2fd/wdss3.png', desc: 'Image 06' },
        { set1: 'https://s26.postimg.org/bru1vgcyx/wdss4.png', desc: 'Image 07' },
        { set1: 'https://s26.postimg.org/3z3e3jc5l/wdss5.png', desc: 'Image 08' }
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