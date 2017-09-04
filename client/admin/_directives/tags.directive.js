(function () {
  'use strict';

  angular
    .module('app')
    .directive('tags', Directive);

  function Directive($filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {

        ngModel.$formatters.push(function (tags) {
          return $filter('csv')(tags);
        });


        ngModel.$parsers.push(function (tagsString) {
          var tags = _.map(tagsString.split(','), function (tag) {

            return tag.trim();
          });


          tags = _.filter(tags, function (tag) { return tag; });

          return tags;
        });
      }
    };
  }
})();