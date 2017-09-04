(function () {
  'use strict';

  angular
    .module('app')
    .filter('slugify', Filter);

  function Filter() {
    return function (input) {
      if (!input)
        return;


      var slug = input.toLowerCase().trim();


      slug = slug.replace(/[^a-z0-9\s-]/g, ' ');


      slug = slug.replace(/[\s-]+/g, '-');

      return slug;
    };
  }
})();