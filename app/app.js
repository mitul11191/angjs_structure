var app = angular.module("angDemo", ["ngRoute"]);

app.run(function ($rootScope, $route, $location, apiUrl, $filter, userService) {

    apiUrl.setApiUrls();
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.isActive = false;

        if (localStorage.getItem("x-access-token-filmOnTop") !== null) {
            $rootScope.islogin = true;
        } else {
            $rootScope.islogin = false;
        }

        if (current.auth === true) {
            if (localStorage.getItem("x-access-token-filmOnTop") === null) {
                $location.path("/home");
            }
        }
        $rootScope.pageName = current.pagename;
        $rootScope.addLink = current.addLink;
    });
});

app.controller('mainCtrl', ['$scope', '$rootScope', 'userService', '$location', '$route', 'constant', function ($scope, $rootScope, userService, $location, $route, constant) {
    $rootScope.userBaseUrl = constant.imageBaseUrl;


    $scope.$on('$routeChangeStart', function ($event, next, current) {
        $rootScope.currentPage = next.pagename;
    });

    $rootScope.logout = function () {
        userService.removeAllLocalStorage();
        $location.path("/home");
        $route.reload();
    };

}]);