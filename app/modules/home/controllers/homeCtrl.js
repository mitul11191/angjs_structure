app.controller('homeCtrl', ['$rootScope', '$scope', '$http', 'homefactory', '$location', function ($rootScope, $scope, $http, homefactory, $location) {

	console.log("Home Controller");

	homefactory.userInfo().then(function (data) {
		console.log('Success');
	}, function (err) {
		console.log('error', err);
	})

}]);

