app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "app/modules/home/templates/home.html",
            controller: "homeCtrl",
            pagename: "Home"
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);