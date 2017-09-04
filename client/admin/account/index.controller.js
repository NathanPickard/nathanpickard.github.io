(function () {
  'use strict';

  angular
    .module('app')
    .controller('Account.IndexController', Controller);

  function Controller($window, UserService, AlertService) {
    var vm = this;

    vm.user = null;
    vm.saveUser = saveUser;
    vm.deleteUser = deleteUser;

    initController();

    function initController() {

      UserService.GetCurrent().then(function (user) {
        vm.user = user;
      });
    }

    function saveUser() {
      UserService.Update(vm.user)
        .then(function () {
          AlertService.Success('User updated');
        })
        .catch(function (error) {
          AlertService.Error(error);
        });
    }

    function deleteUser() {
      UserService.Delete(vm.user._id)
        .then(function () {

          $window.location = '/login';
        })
        .catch(function (error) {
          AlertService.Error(error);
        });
    }
  }

})();