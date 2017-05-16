 angular.module('common.directives')
  .run(['$templateCache', function ($templateCache) {
      $templateCache.put('partials/nav-toggle.tmpl.html',
        '<md-button class="md-button-toggle"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-nav-{{section.name | nospace}}"\n' +
        '  flex layout="row"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '  <md-icon md-svg-src={{section.icon}}></md-icon>\n' +
        '  {{section.name}}\n' +
        '  <span style="padding-left: 5px"</span>\n' +
        '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
        '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
        '</md-button>\n' +
        '<ul ng-show="isOpen()" id="docs-nav-{{section.name | nospace}}" class="nav-toggle-list">\n' +
        '  <li ng-repeat="page in section.pages">\n' +
        '    <nav-link section="page"></nav-link>\n' +
        '  </li>\n' +
        '</ul>\n' +
        '');
    }])
 .directive('navToggle', ['$timeout', function ($timeout ) {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/nav-toggle.tmpl.html',
        link: function (scope, element) {
          var controller = element.parent().controller();

          scope.isOpen = function () {
            return controller.isOpen(scope.section);
          };
          scope.toggle = function () {
            controller.toggleOpen(scope.section);
          };
          
          var parentNode = element[0].parentNode.parentNode.parentNode;
          if (parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            element[0].firstChild.setAttribute('aria-describedby', heading.id);
          }
        }
      };
    }])