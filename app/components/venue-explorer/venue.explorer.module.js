var venueExplorerModule = angular.module('venueExplorer', ['ngMessages', 'ui.bootstrap']);


venueExplorerModule.controller('venueExplorerController', ['$scope','$location','venueExplorerService',
 function($scope, $location,venueExplorerService){ 

        console.log('Calling venueExplorerController');
 
        $scope.venueSearchResults = [];
        $scope.serviceCallError = "";
        $scope.searchLocation = "";

        $scope.viewby = 10;
        $scope.totalItems = $scope.venueSearchResults.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; 
        $scope.numPages = Math.ceil($scope.totalItems /  $scope.itemsPerPage);

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1;
            $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);     
        }


        $scope.submitForm = function() {
            console.log('Submitting form with search text:'+$scope.searchLocation); //$location.path('/exploreVenue');  
            $scope.venueSearchResults.length  = 0;
            
            var callPromise = venueExplorerService.getVenues($scope.searchLocation);

            callPromise.then(
                function(answer) {
                    $scope.answer = answer;
                    $scope.status = answer.meta.code;
                    $scope.venueSearchResults = answer.response.groups[0].items;

                    console.log('Status:'+$scope.status);
                    $scope.totalItems = $scope.venueSearchResults.length;
                },
                function(reason) {
                    $scope.serviceCallError = reason;
                    console.log('Error:'+$scope.serviceCallError.data.meta.code); //.status
                }
            )       
        };

        $scope.checkResultsSize = function() {
            if ($scope.venueSearchResults.length <= 0) {
                return true;
            } else {
                return false;
            }
        };

}]);

venueExplorerModule.service('venueExplorerService', ['$http', '$q','$filter', function($http, $q, $filter){

    var url = 'https://api.foursquare.com/v2/venues/explore?near=';
    var clientId = '&client_id=YB1I2HHFHTPPLZNSHU0CQB1MMQCMB3A2NPLVQUOOXJHD5O4L';
    var clientSecret = '&client_secret=FJ43M15M04W5WFWHRMJXTCBQUXCSVB0DWMLDQBAPPDLVXHSP';
    var date = new Date();
    var formattedDate = $filter('date')(new Date(), 'yyyyMMdd');
    var version = '&v='+formattedDate;


var deferred,
      callMethods = {
 
        getVenues: function(search) {
        console.log('Request:'+url+search+clientId+clientSecret+version);

          var promise =  $http.get(url+search+clientId+clientSecret+version),
                deferred =  deferred || $q.defer();
 
                promise.then(
                  function(answer){
                    deferred.resolve(answer.data);
                    console.log('Success');
                  },
                  function(reason){
                    deferred.reject(reason);
                    console.log('Error');
                  });
 
           return deferred.promise;
          }
       };

       return callMethods;
 
}]);




