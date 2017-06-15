(function(){
  'use strict';

  angular.module('Portfolio.controllers')
  .controller('contactFormController', ['$scope', '$http', '$mdToast', '$animate',

    function($scope, $http, $mdToast, $animate) {
      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
          .filter(function (pos) {
            return $scope.toastPosition[pos];
          })
          .join(' ');
      };

      this.sendMail = function () {
        $mdToast.show(
          $mdToast.simple()
          .content('Thanks for your message ' + this.contactName + ' You Rock!')
                .position($scope.getToastPosition())
                .hideDelay(5000)
        );
      }

      // this.sendMail = function() {

      //   var data = ({
      //     contactName : this.contactName,
      //     contactEmail : this.contactEmail,
      //     contactMsg : this.contactMsg
      //   });

      //   $http.post('/contact-form', data).
      //     success(function(data, status, headers, config) {
      //       $mdToast.show(
      //         $mdToast.simple()
      //           .content('Thanks for your message ' + data.contactName + ' You Rock!')
      //           .position($scope.getToastPosition())
      //           .hideDelay(5000)
      //       );

      //     }).
      //     error(function(data, status, headers, config) {

      //     });        
      // };
    }
  ]);
})();

// 'use strict';

// angular.module('core').controller('ContactFormController', ['$scope', '$http', '$mdToast', '$animate',
//     function($scope, $http, $mdToast, $animate) {
//       $scope.toastPosition = {
//         bottom: false,
//         top: true,
//         left: false,
//         right: true
//       };
//       $scope.getToastPosition = function () {
//         return Object.keys($scope.toastPosition)
//           .filter(function (pos) {
//             return $scope.toastPosition[pos];
//           })
//           .join(' ');
//       };

//       this.sendMail = function() {

//         var data = ({
//           contactName : this.contactName,
//           contactEmail : this.contactEmail,
//           contactMsg : this.contactMsg
//         });

//         $http.post('/contact-form', data).
//           success(function(data, status, headers, config) {
//             $mdToast.show(
//               $mdToast.simple()
//                 .content('Thanks for your message ' + data.contactName + ' You Rock!')
//                 .position($scope.getToastPosition())
//                 .hideDelay(5000)
//             );

//           }).
//           error(function(data, status, headers, config) {

//           });        
//       };
//     }
//   ]);