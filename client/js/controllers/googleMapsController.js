app.controller('userController', ['$scope', '$location', function($scope, $location) {

  $scope.city = cityService.city;

  $scope.watch('city', function() {
    cityService.city = $scope.city;
  });

  $scope.submit  



}]);