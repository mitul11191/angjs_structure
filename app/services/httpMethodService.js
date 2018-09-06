app.factory('httpMethodService', ['$http', '$rootScope', '$q', '$httpParamSerializerJQLike', '$location', 'userService', 'constant',
    function ($http, $rootScope, $q, $httpParamSerializerJQLike, $location, userService, constant) {
        var httpMethodCallforRowData = function (method, url, params, header) {
            var token = userService.getDataFromLocalStorage('x-access-token-filmOnTop');
            var browser = userService.browser;
            console.log('http params',params);
            if (token !== undefined && token !== null && token != "") {
                var header = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            } else {
                var header = {
                    'Content-Type': 'application/json'
                }
            }
            var httpData = $http({
                method: method,
                url: url,
                //              data : {},
                dataType: 'json',
                data: JSON.stringify(params),
                // 'processData': false,
                //              withCredentials: true,
                headers: header
            });
            httpData.success(function (response, status, headers) {
                if (status == 401) {
                    if (userService.removeAllLocalStorage()) {
                        window.location = constant.nonloggedInUserReload;
                    }
                }
            });
            return httpData;
        };
        var httpMethodCallforCustomHeader = function (method, url, params, header) {
            var httpData = $http({
                method: method,
                url: url,
                dataType: 'json',
                data: $httpParamSerializerJQLike(params),
                'processData': false,
                headers: header
            });
            httpData.success(function (response, status, headers) {
                if (status == 401) {
                    userService.removeAllLocalStorage();
                }
                //cb(response);
            });
            httpData.error(function (response, status, headers) {
                //cb(response);
            });
            return httpData
        };

        var httpMethodCallforCustomHeaderJsonData = function (method, url, params, header) {
            var httpData = $http({
                method: method,
                url: url,
                dataType: 'json',
                data: JSON.stringify(params),
                'processData': false,
                headers: header
            });
            httpData.success(function (response, status, headers) {
                if (status == 401) {
                    userService.removeAllLocalStorage();
                }
                //cb(response);
            });
            httpData.error(function (response, status, headers) {
                //cb(response);
            });
            return httpData
        };

        var httpMethodCallforUrlencoded = function (method, url, params, cb, header) {
            var token = userService.getDataFromLocalStorage('x-access-token-filmOnTop');
            if (token !== undefined && token !== null && token != "") {
                var header = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                }
            }

            var httpData = $http({
                method: method,
                url: url,
                dataType: 'json',
                data: $httpParamSerializerJQLike(params),
                'processData': false,
                headers: header
            });
            httpData.success(function (response, status, headers) {
                if (status == 401) {
                    userService.removeAllLocalStorage();
                }
                //cb(response);
            });
            httpData.error(function (response, status, headers) {
                //cb(response);
            });
            return httpData
        };

        var httpMethodCallforFormData = function (method, url, params, header) {
            var fd = new FormData();
            angular.forEach(params, function (value, key) {
                fd.append(key, value);
            });
            var token = userService.getDataFromLocalStorage('x-access-token-filmOnTop');

            if (token !== undefined && token !== null && token != "") {
                var header = { 'Content-Type': undefined, 'Authorization': 'Bearer ' + token };
            } else {
                var header = { 'Content-Type': undefined };
            }
            var httpData = $http({
                method: method,
                url: url,
                dataType: 'json',
                'data': fd,
                'processData': false,
                headers: header
            });
            httpData.success(function (response, status, headers) {
                if (status == 401) {
                    userService.removeAllLocalStorage();
                    $location.path("/login");
                }
                //cb(response);
            });
            httpData.error(function (response, status, headers) {
                //cb(response);
            });
            return httpData
        };

        var httpFile = function (method, url, params, header) {
            var token = userService.getDataFromLocalStorage('x-access-token-filmOnTop');
            var browser = userService.browser;
            var httpData = $http({
                method: method,
                url: url,
                dataType: 'json',
                processData: false,
                //contentType: false,
                data: params, //forms user object
                headers: { 'Content-Type': undefined, 'Authorization': 'Bearer ' + token }
            });

            return httpData;
        };

        return httpMethodFactory = {
            httpMethodCallforRowData: httpMethodCallforRowData,
            httpMethodCallforFormData: httpMethodCallforFormData,
            httpMethodCallforUrlencoded: httpMethodCallforUrlencoded,
            httpMethodCallforCustomHeaderJsonData: httpMethodCallforCustomHeaderJsonData,
            httpMethodCallforCustomHeader: httpMethodCallforCustomHeader,
            httpFile: httpFile
        };

    }]);