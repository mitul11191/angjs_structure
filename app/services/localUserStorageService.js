app.factory('userService', ['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        var userData = {};
        var userInfo = {};

        /* @description get brosewe name from browserdetector service */
        var browser = '';
        var vm = this;
 
        // vm.allData = JSON.stringify(vm.data, null, 2);
        // browser = vm.data.browser;
        // userData.browser = browser;
      
        userData.checkSessionExpired = function () {
            var currentTime = new Date().getTime();
            var lastLoggedInTime = localStorage.getItem('lastLoggedInTime');
            if (typeof lastLoggedInTime != 'undefined' && lastLoggedInTime != 'null') {
                lastLoggedInTime = parseInt(lastLoggedInTime) + (7 * 24 * 60 * 60 * 1000); // for 7 days
                if (lastLoggedInTime < currentTime) {
                    this.removeAllLocalStorage();
                } else {
                    localStorage.setItem('lastLoggedInTime', currentTime);
                }
            } else {
                this.removeAllLocalStorage();
            }

        }
       
        userData.saveDataInLocalStorage = function (userInfo) {
            userInfo = userInfo;
            if (userInfo['x-access-token-filmOnTop']) {
                var currentTime = new Date().getTime();
                localStorage.setItem('x-access-token-filmOnTop', userInfo['x-access-token-filmOnTop']);
                localStorage.setItem('lastLoggedInTime', currentTime);
            }
            for (var x in userInfo) {
                localStorage.setItem(x, userInfo[x]);
            }
            return userInfo;
        }
        
        userData.getDataFromLocalStorage = function (key) {
            userInfo = localStorage.getItem(key);

            return userInfo;
        }
       
        userData.UpdateInfo = function (updatedInformation) {
//            var keys = Object.keys(updatedInformation);
            var arr = [];
            for (var x in updatedInformation) {
                localStorage.setItem(x, updatedInformation[x]);
                userInfo.x = updatedInformation[x];
                arr[x] = updatedInformation[x];
            }
            return arr;
        }
        userData.UpdateIndividualInfo = function (key, updatedInformation) {
            localStorage.setItem(key, updatedInformation);
            return true;
        }

        userData.saveSelectedLanguage = function (SelectedLanguage) {
            localStorage.setItem('selectedLanguage', SelectedLanguage);
            return true;
        }

        
        userData.removeAllLocalStorage = function () {

            if (localStorage.length) {
                localStorage.removeItem('x-access-token-filmOnTop');
                localStorage.removeItem('userId');
                localStorage.removeItem('lastLoggedInTime');
                var rememberMeUsername = localStorage.getItem("remember-me-email");
                var rememberMePassword = localStorage.getItem("remember-me-password");
                for (var i = 0, len = localStorage.length; i < len; i++) {
                    var key = localStorage.key(i);
                    var value = localStorage[key];
                    this.removeLocalStorageKey(key);
                }
                localStorage.setItem('remember-me-email', rememberMeUsername);
                localStorage.setItem('remember-me-password', rememberMePassword);
                return true;
            } else {
                return false;
            }

        }

       
        userData.removeLocalStorageKey = function (key) {
            localStorage.removeItem(key);
            return true;
        }

       
        userData.checkExistKey = function (key) {
            if (localStorage.getItem(key) !== '' && localStorage.getItem(key) != undefined && localStorage.getItem(key) != null) {
                return localStorage.getItem(key);
                return true;
            } else {
                return false;
//                console.log("else");
            }
        }

        return userData;

    }]); 