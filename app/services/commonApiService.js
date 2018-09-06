app.factory('ApiService', ['$http', '$q', function ($http, $q) {
        var get = function (url, options) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(url, options)
                    .success(function (data, status, headers, config) {
                        var response = {};
                        response.data = data;
                        response.status = status;
                        response.headers = headers;
                        response.config = config;
                        if (data.code == "200") {
                            deferred.resolve(response);
                        } else {
                            deferred.resolve(response);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        var response = {};
                        response.data = data;
                        response.status = status;
                        response.headers = headers;
                        response.config = config;
                        deferred.reject(response);
                    });
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        };
        var post = function (url, data, options) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(url, data, options)
                    .success(function (data, status, headers, config) {
                        var response = {};
                        response.data = data;
                        response.status = status;
                        response.headers = headers;
                        response.config = config;
                        if (data.code == "200") {
                            deferred.resolve(response);
                        } else {
                            deferred.resolve(response);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        var response = {};
                        response.data = data;
                        response.status = status;
                        response.headers = headers;
                        response.config = config;
                        deferred.reject(response);
                    });
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
        return {
            get: get,
            post: post
        }

    }]);

app.factory('apiUrl', ['constantApi', 'constant', function (constantApi, constant) {
        var allUrls = {};

        
        var setApiUrls = function () {
            angular.forEach(constantApi, function (value, key) {
                allUrls[key] = constant.apiUrl + value;
            })
        }

      
        var getApiUrl = function (key) {
            return allUrls[key];
        }

        return {
            setApiUrls: setApiUrls,
            getApiUrl: getApiUrl
        }

    }])