app.directive("pageHeader", ['$rootScope', function ($rootScope) {
        return {
            restrict: "E",
            templateUrl: "app/directives/pageHeader/header.html",
            link: function (scope, element, attrs) {
                console.log("Page Header");
            }
        };
    }]);