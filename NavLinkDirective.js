(function(){
  'use strict';
  
  angular.module('common.directives')
    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/nav-link.tmpl.html',
        '<md-button ng-class="{\'{{section.icon}}\' : true}" ui-sref-active="active" \n' +
        '  ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
        '  <md-icon md-svg-src={{section.icon}}></md-icon>\n' +
        '  {{section | humanizeDoc}}\n' +
        '  <span  class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' +
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '');
    }])
    .directive('navLink', function () {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/nav-link.tmpl.html',
        link: function ($scope, $element) {
          var controller = $element.parent().controller();

          $scope.focusSection = function () {
            // set flag to be used later when
            // $locationChangeSuccess calls openPage()
            controller.autoFocusContent = true;
          };
        }
      };
    })
})();