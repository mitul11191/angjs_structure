app.factory('homefactory', ['httpMethodService', 'apiUrl', '$q',
    function (httpMethodService, apiUrl, $q) {
        var userInfo = function (params) {
            var deferred = $q.defer();
            // httpMethodService.httpMethodCallforUrlencoded("GET", apiUrl.getApiUrl('userInfo')).success(function (data) {
            //     deferred.resolve(data);
            // }).error(function (err) {
            //     deferred.reject(err);
            // });
            return deferred.promise;
        };
        return {
            userInfo: userInfo,
        };
    }]);