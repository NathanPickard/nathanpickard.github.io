(function () {

  'use strict';

  angular.module('common.services')
    .factory('nav', [
      '$location',
      '$rootScope',
    function ($location) {

      var sections = [{
        name: 'Home',
        state: 'home.home',
        type: 'link',
        icon: 'home'
      }];

      sections.push({
        name: 'Portfolio',
        type: 'toggle',
        icon: 'portfolio',
        pages: [{
          name: 'Web Projects',
          type: 'link',
          state: 'home.portfolio.webprojects',
          icon: 'web'
        }, {
          name: 'Android projects',
          type: 'link',
          state: 'home.portfolio.androidprojects',
          icon: 'android'
        }]
      });

      sections.push({
        name: 'About',
        type: 'link',
        state: 'home.about',
        icon: 'about'
      })

      sections.push({
        name: 'Contact',
        type: 'link',
        state: 'home.contact',
        icon: 'contact'
      });

      var self;

      return self = {
        sections: sections,

        toggleSelectSection: function (section) {
          self.openedSection = (self.openedSection === section ? null : section);
        },
        isSectionSelected: function (section) {
          return self.openedSection === section;
        },

        selectPage: function (section, page) {
          page && page.url && $location.path(page.url);
          self.currentSection = section;
          self.currentPage = page;
        }
      };

    }
  ])
})();