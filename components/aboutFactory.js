(function() {
  'use strict';

  angular.module("Portfolio").factory("aboutFactory", function($http) {
    function getAboutInfo() {
      return $http.get('data/about.json');
    }

    return {
      getAboutInfo: getAboutInfo
    }
  });
})();