'use strict';

/* Create and configure application */

angular
	.module('persephone', [ 'ngMaterial' ])
	.config([ '$mdThemingProvider', Routes])
	.run([Run]);

function Routes ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('brown')
      .warnPalette('red');
}

function Run () {
  // App initialization stuff here
}
