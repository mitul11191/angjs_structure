app.factory('helper', ['$http', '$q', function ($http, $q) {
        var getAdminInfoByKey = function (key) {
            console.log(localStorage.getItem("adminInfo"));
            return JSON.parse(localStorage.getItem("adminInfo"))[key];
        };
        var refineObjForUpdate = function (obj) {
            delete obj.createdBy;
            delete obj.updatedBy;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        };
        return {
            getAdminInfoByKey: getAdminInfoByKey,
            refineObjForUpdate: refineObjForUpdate,
        }
    }]);