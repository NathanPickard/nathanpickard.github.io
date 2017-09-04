(function () {
  'use strict';

  angular
    .module('app')
    .directive('datepicker', Directive);

  function Directive($filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {

        element.addClass('datepicker');


        element.datepicker({ dateFormat: "dd/mm/yy" });


        ngModel.$formatters.push(function (date) {
          if (!date)
            return;

          return moment(date).format('DD/MM/YYYY');
        });


        ngModel.$parsers.push(function (date) {
          if (!date)
            return;

          return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        });
      }
    };
  }
})();