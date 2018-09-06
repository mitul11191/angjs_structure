app.factory('pagefooterfactory', ['httpMethodService','apiUrl', 'constantApi', 'constant', '$q',
    function (httpMethodService, apiUrl, constantApi, constant, $q) {
var getFooterMenu = function (header,params) {

            var deferred = $q.defer();
            httpMethodService.httpMethodCallforCustomHeaderJsonData("GET", apiUrl.getApiUrl('getFooterMenuApi'),params,header).success(function (data) {
               
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

         return {
getFooterMenu:getFooterMenu,


    };
      }]);