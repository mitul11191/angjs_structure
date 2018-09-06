app.directive("pageFooter", ['$rootScope', function ($rootScope) {
    return {
        restrict: "E",
        templateUrl: "app/directives/pageFooter/footer.html",
        controller: "pageFooterCtrl",
        link: function (scope, element, attrs) {
            console.log("Page Footer");
        }
    };


}]);