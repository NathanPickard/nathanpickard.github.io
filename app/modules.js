(function() {
  'use strict';

  angular.module('common.services', []);
  angular.module('Portfolio.controllers', ['common.directives']);
  angular.module('common.directives', ['common.services']);
})();