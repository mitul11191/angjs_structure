var app = angular.module("myApp", ["ngRoute"]);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('myCtrl2', function($scope) {
    $scope.firstName = "Green";
   
});