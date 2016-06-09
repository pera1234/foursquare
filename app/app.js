'use strict';

var venueSearchApp = angular.module('venueSearchApp', ['ngRoute','venueExplorer']);

venueSearchApp.config(['$routeProvider', 
	function($routeProvider,venueExplorerController) {
    $routeProvider.
    	when('/exploreVenue', {
			templateUrl: function() {
    			return 'app/components/venue-explorer/venueSearchResults.html?' +new Date();
			},

    		controller: 'venueExplorerController'
    	}).
    	otherwise({
    		redirectTo: '/'
    	});

}]);  
