//    AWSCognito.config.region = 'us-east-1';

    var poolData = {
            UserPoolId : 'us-east-1_WspF6k3n1', // your user pool id here
            ClientId : '4mm2npd4jpq2o6lqh2t2k0udft' // your app client id here
    };
//    var userPool = 
//    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    function fnSignUpSubmit(){
            var formName = document.getElementById("login-username").value;
            var userData = {
                Username : formName, // your username here
                Pool : userPool
            };
            var attributeList = [];
            var dataName = {
                Name : 'name',
                Value : formName // your email here
            };
            var formEmailVal = document.getElementById("login-email").value;
            var dataEmail = {
                Name : 'email',
                Value : formEmailVal // your email here
            };
 /*           var formPhoneVal = document.getElementById("login-phone").value;
            var dataPhoneNumber = {
                Name : 'phone_number',
                Value : "+91" + formPhoneVal // your phone number here with +country code and no delimiters in front
            };
           var dataGivenName = {
                Name : 'given_name',
                Value : 'Jesi' // your phone number here with +country code and no delimiters in front
            };
       */   
            var attributeName = 
            new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);  
            var attributeEmail = 
            new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
   //       var attributePhoneNumber = 
    //         new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
      //      var attributeGivenName = 
       //     new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGivenName);
             
            attributeList.push(attributeName);
            attributeList.push(attributeEmail);
     //       attributeList.push(attributePhoneNumber);
      //      attributeList.push(attributeGivenName);

            var formPWVal = document.getElementById("login-password").value;
             
            var cognitoUser;
            userPool.signUp(formName, formPWVal, attributeList, null, function(err, result){
                if (err) {
                    alert(err);
                    return;
                }
                cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
                window.location.assign("email_verification.jsp?name=" + cognitoUser.getUsername());
            });

            

         }

 function fnSignInSubmit(){
                var formUserName = document.getElementById("login-username").value;
                var formPW = document.getElementById("login-password").value;
                var userData = {
                    Username : formUserName, // your username here
                    Pool : userPool
                };

                var authenticationData = {
                        email : formUserName, // your username here
                        Password : formPW, // your password here
                    };
                    var authenticationDetails = 
                    new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                 
                    var cognitoUser = 
                    new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            console.log('access token + ' + result.getAccessToken().getJwtToken());

                            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                            IdentityPoolId : 'us-east-1:bee8f03f-bd0a-49db-b94f-f7f3d5056dea', // your identity pool id here

                            Logins : {
                                // Change the key below according to the specific region your user pool is in.
                                'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_ClIEV5OLN' : result.getIdToken().getJwtToken()
                            }
                        });

                            // Initialize the Cognito Sync client 
                      /*      AWS.config.credentials.get(function(){ 
                                var syncClient = new AWS.CognitoSyncManager(); 
                                syncClient.openOrCreateDataset('myDataset', function(err, dataset) { 
                                    dataset.put('myKey', 'myValue', function(err, record){ 
                                        dataset.synchronize({ onSuccess: function(data, newRecords) { // Your handler code here 

                                        } }); }); }); }); */
                        window.location.assign("index.jsp");    
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();

                        },
                 
                        onFailure: function(err) {
                            alert(err);
                        },
                    });

            }       
var URLParamName = getQueryVariable("name");
 //   alert(URLParamName);
 var URLParamcode = getQueryVariable("code");
function fnEmailValidatonSubmit(){

            var cognitoUser = userPool.getCurrentUser();
         
                if (cognitoUser != null) {
                    cognitoUser.getSession(function(err, session) {
                        if (err) {
                            alert("1");
                            alert(err);
                            return;
                        }
                        console.log('session validity: ' + session.isValid());
                    });
                }


       //     var formName = document.getElementById("login-username").value;
            var userData = {
                Username : URLParamName, // your username here
                Pool : userPool
            };

            var emailCode = document.getElementById("login-emailCode").value;
             var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
                cognitoUser.confirmRegistration(emailCode, true, function(err, result) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    console.log('call result: ' + result);

                });

             window.location.assign("signin.jsp");

         }

    function fnresetPWSubmit(){
//        var cognitoUser = userPool.getCurrentUser();
//        if (cognitoUser != null) {
//            cognitoUser.getSession(function(err, session) {
//                if (err) {
//                    alert(err);
//                    return;
//                }
//                console.log('session validity: ' + session.isValid());
//            });
//        }
//        var oldPassword = document.getElementById("current-password").value;
//        var newPassword = document.getElementById("new-password").value;
//        cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
//            if (err) {
//                alert(err);
//                return;
//            }
//            console.log('call result: ' + result);
//        });
//        window.location.assign("signin.jsp");
    }     

    function fnSignoutSubmit(){
        tokenSingOut(localStorage.getItem("oauthToken"))
    	localStorage.setItem("userId" , '');
    	localStorage.setItem("oauthToken" , '');    	 
        window.location.assign("signin.jsp");
    }   

    function fnGlobalSignoutSubmit(){
    	tokenSingOut(localStorage.getItem("oauthToken"))
    	localStorage.setItem("userId" , '');
    	localStorage.setItem("oauthToken" , '');    
        window.location.assign("signin.jsp");
    }   

    function fnForgotPasswordSubmit(){
        var username = document.getElementById("login-email").value;

        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

       
        cognitoUser.forgotPassword({
            onSuccess: function () {
            //    console.log('call result: ' + result);
                 window.location.assign("signin.jsp");
                // successfully initiated reset password request
            },
            onFailure: function(err) {
                alert(err);
            },
            //Optional automatic callback
            inputVerificationCode: function(data) {
                console.log('Code sent to: ' + data);
                var verificationCode = prompt('Please input verification code ' ,'');
                var newPassword = prompt('Enter new password ' ,'');
                cognitoUser.confirmPassword(verificationCode, newPassword, this);
            }
        });

    }

//    alert(param1var1);
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      } 
    }         

    function onLoadHomePage(screen){
                var cognitoUser = userPool.getCurrentUser();
                if (cognitoUser != null) {
                        cognitoUser.getSession(function(err, session) {
                            if (err) {
                                alert(err);
                                return;
                            }
                            console.log('session validity: ' + session.isValid());
                        });
                    
                    cognitoUser.getUserAttributes(function(err, result) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    for (i = 0; i < result.length; i++) {
                        //var existingVal  = document.getElementById("name").innerHTML;
                        //alert(existingVal)
                        //var temp = existingVal + "<br><br> attribute " + result[i].getName() + " has value " + result[i].getValue();
                        //document.getElementById("retrive").innerHTML = temp;
                        console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                        if(document.getElementById(result[i].getName())){
                            //document.getElementById(result[i].getName()).value = result[i].getValue();
                        	var element = '#'+result[i].getName();
                        	if($(element).attr('type')){
                        		$(element).val(result[i].getValue());
                        	}else{
                        		$(element).text(result[i].getValue());
                        	}
                        	
                        }
                    }
                    //select correct gender radio
                    onLoadselectGender();
                    if(screen && screen == "profile_edit"){
                    	//alert(screen);
                    	onLoadGetCustomDetails();
                    	//from profile_edit.js
                    	applyStyling();
                    }
                    if(screen && screen == "add_project"){
                    	//from profile_edit.js
                    	onLoadGetCustomDetails();
                    }
                    if(screen && screen == "profile"){
                    	//alert(screen);
                    	//profile.js
                    	onLoadGetProjectDetails();
                    	
                    	//from profile_edit.js
                    	onLoadGetCustomDetails();
                    }
                    if(screen && screen == "video_main"){
                    	//from profile_edit.js
                    	//onLoadGetCustomDetails();
                    	//from video_main.js
                    	//onLoadAssignValues();
                    }
                    if(screen && screen == "postJob"){
                    	//alert(screen);
                    	onLoadGetJobPlans();
                    	
                    	//from profile_edit.js
                    	//onLoadGetCustomDetails();
                    }
                }); 
            }
        }

        function onLoadselectGender(){
            if(document.getElementById('gender')){
              var genderSelected = document.getElementById('gender').value;
              $("#"+genderSelected).prop("checked", true);
            }
        }
        
        function fnUpdateProfileSubmit(attribute){
                    //alert(attribute.id + ":" + attribute.tagName + ":"+ attribute.type);
                    var cognitoUser = userPool.getCurrentUser();
                    if(checkSessionValidity()){
                        var attributeId = attribute.id;
                        var cognitoUser = userPool.getCurrentUser();
                        if (cognitoUser != null) {
                            cognitoUser.getSession(function(err, session) {
                                if (err) {
                                    alert(err);
                                    return;
                                }
                                console.log('session validity: ' + session.isValid());
                            });
                        }
                        var attributeVal;

                        if (attribute.type == "radio") {
                            attributeVal = $('input[name='+ attribute.name +']:checked').val();
                            attributeId = attribute.name;
                        }else{
                        
                            attributeVal = document.getElementById(attributeId).value;
                        }
                        //alert(attributeId +" : "+attributeVal);
                        var dataObj = {
                            Name : attributeId,
                            Value : attributeVal 
                        };
                        
                        var attributeList = [];
                        
                        var attributeAddress1 = 
                        new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataObj);
                         
                        attributeList.push(attributeAddress1);
                        
                        cognitoUser.updateAttributes(attributeList, function(err, result) {
                            if (err) {
                                alert(err);
                                return;
                            }
                            console.log('call result: ' + result);
                        });

                        cognitoUser.getUserAttributes(function(err, result) {
                            if (err) {
                                alert(err);
                                return;
                            }
                            for (i = 0; i < result.length; i++) {
                                console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                            }
                        });
                    }

                 }

               
               function checkSessionValidity(){
             
                   var userId = localStorage.getItem("userId");
 
                   if(userId != null &&  userId != "") {
                	   $('.siginedin').attr('class', 'hidden');
						$('.siginedout').attr('class', 'visible');
						return true;
                   }
                   else{
                	   $('.siginedout').attr('class', 'hidden');
						$('.siginedin').attr('class', 'visible');
						return false;
                   }
               }
               
               
               function  tokenSingOut(oauthToken){
            		
            		$.ajax({

            	        url: baseUrl + 'oauth/revoke',
            			headers: {
            	            'Authorization': 'Bearer ' + oauthToken,
            	            'Content-Type': 'application/x-www-form-urlencoded',
            	            
            	        },
            			type : 'POST',		
            			async : false,		 
            			dataType : 'json',
            			success : function(data) {			
            				console.log(JSON.stringify(data)); 
            				localStorage.setItem("oauthToken" , '');
            			},
            			error : function(data) {
            			 
            				console.log(JSON.stringify(data.responseText))

            			}
            		});
            		
            	}

            