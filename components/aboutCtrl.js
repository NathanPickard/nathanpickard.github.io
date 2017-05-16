(function () {
  'use strict';
  angular
    .module('dynamicTabs', ['ngMaterial'])
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl($scope, $log) {
    var tabs = [
      {
        title: 'Background',
        content: "Having a natural aptitude for technology, I've been a computer enthusiast since I can remember." +
        "  I grew up from my adolescence to my early 20s in Murfreesboro, TN, just south of Nashville." + 
        "  I spent 8 months as a maintenance crew member in the beautiful Yosemite National Park in 2012." +
        "  After moving to the Portland metro area in mid 2013, I call in the City of Roses my home since." +
        " After learning a good bit of Java and building my own Android apps in Android Studio " + '\n' +
        ", moving to web development was the obvious choice in creating a more well-rounded user experience"
      },
      {
        title: 'Hobbies',
        content: "Passion for all things technology, music of all kinds, the great outdoors and excellent BBQ"
      },
      {
        title: 'Current Activities',
        content: "Always learning in in's and out's of full-stack web development.  Currently focusing on Angular and the Angular Material framework."
      }
    ],
      selected = null,
      previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function (current, old) {
      previous = selected;
      selected = tabs[current];
      if (old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if (current + 1) $log.debug('Hello ' + selected.title + '!');
    });
    $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false });
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };
  }
})();

// (function () {
//   'use strict';

//   angular.module("Portfolio")
//     .controller("aboutCtrl", function ($scope, $state, $http, aboutFactory, $mdSidenav) {

//       var vm = this;
//       vm.aboutInfo;

//       aboutFactory.getAboutInfo().then(function (aboutInfo) {
//         vm.aboutInfo = aboutInfo.data;

//       });


//     });
// });