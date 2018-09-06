/**
 * Add all the js functions related to user signup, login and session here
 */
function  activateUser(){
		
		var userId = document.getElementById("userId").getAttribute("data-id").trim() ;
		var verificationCode = document.getElementById("verificationCode").getAttribute("data-id").trim() ;
		console.log(verificationCode)
		var oauthToken = authTokenForNewUser();
		console.log(oauthToken);
		
		$.ajax({
	
	        url: restAPIUrl + 'user/confirmRegistration/' + userId + '/verify/' +verificationCode,
			headers: {
	            'Authorization': 'Bearer ' + oauthToken,
	            'Content-Type': 'application/x-www-form-urlencoded',
	            
	        },
			type : 'GET',		
			async : false,
			contentType : 'application/json',
			dataType : 'json',
			success : function(data) {			
				console.log(data); 
				document.getElementById("confirm_e_veri_message").innerHTML = data.message ;
						
			},
			error : function(data) {
				console.log(data.responseText["message"]); 
				document.getElementById("confirm_e_veri_message").innerHTML = data.responseJSON.message ;
	
			}
		});
		
	}

function authTokenForNewUser(){
	 
	var userLogin = anonymousUserId;
    var userPassword = anonymousUserPwd;
	var oauthToken = '';
	 $.ajax({
	        url: baseUrl + 'oauth/token',
	        headers: {
	            'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
	            'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        type : 'POST',
	        async : false,
	        dataType: 'json',
	        data: {grant_type: 'password', username: userLogin, password: userPassword},
	        success: function (data) {
	            oauthToken = data.access_token;	                      
	        },
	        error: function (data) {
	            console.log(data);
	          
	        }
	    })
	    
	    return oauthToken;
}

function loginUser(oauthToken) {
    var userLogin = $('#login-username').val();
    var userPassword = $('#login-password').val();
   
    $.post({
        url: baseUrl + 'oauth/token',
        headers: {
            'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        async : false,
        data: {grant_type: 'password', username: userLogin, password: userPassword},
        success: function (data) {
            oauthToken = data.access_token;
            
            localStorage.setItem("oauthToken", oauthToken);
            if(getUserInfo(oauthToken)){
            	window.location.assign("index.jsp");
            }
            
            //$('#loggedInStatus').show();
            //$('#loginForm').hide();
            //loadCustomerses();
        },
        error: function (data) {
        	 $("#signin-Message").empty();					    
		     $("#signin-Message").html(' <div  class="alert alert-danger"></div>');
        	 $("#signin-Message").show();			
			 $("#signin-Message>div").text(data.responseJSON.message)
			 $("#signin-Message>div").text(data.responseJSON.error_description)
             console.log(data);
 
        }
    })
}

function getUserInfo(oauthToken){
	var userStatus = false ;
	
    $.get({
    	url: baseUrl + 'userInfo',
        headers: {
            'Authorization':'Bearer '+ oauthToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        async : false,
        success : function(data){
        	localStorage.setItem("userId", JSON.stringify(data.id));
//        	console.log(localStorage.getItem("userId"));
        	userStatus = true ;
        	 
        },
        error: function(data){
        	console.log(data);
        	userStatus = false  ;
        }
    })
    
    return userStatus ;
 
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


	
$(document).ready(function(){

	     $("#change-password").hide(); // error message hide .
		 $("#reset-password").hide();
		 $("#signup-Message").hide();
		 $("#signin-Message").hide();
		 $("#profile-change-password").hide()
		
		// http://localhost:8080/app/rest/v2/queries/fot$UserDetails/userWithLoginId?login=sameer
		     
		 $("#btn-login").click(function(){
			 var oauthToken = '';
			 $("#signin-Message").empty();
			 if($("#login-username").val().length<6  || $("#login-password").val().length<8  ){ 
			
				     $("#signin-Message").show();					    
				     $("#signin-Message").html(' <div  class="alert alert-danger"></div>');
					 $("#signin-Message>div").text("Please enter valid username/password")
//				     setTimeout(function(){ $("#signin-Message").hide()},2000)
				     return false;
			    }
			 else  {
				 oauthToken =  getAnonymusUserToken();
				
				 $.ajax({			
				        url: baseAPIUrlForQueries + 'fot$UserDetails/userWithLoginId?login='+ $("#login-username").val() ,
						headers: {
				            'Authorization': 'Bearer ' + oauthToken,
				            'Content-Type': 'application/json',		            
				        },
						type : 'GET',		
						async : false,
						contentType : 'application/json',
						dataType : 'json',			      
						success : function(data) {			
							 console.log(data);
							 if(data.length == 0){
							     $("#signin-Message").show();					    
							     $("#signin-Message").html(' <div  class="alert alert-danger"></div>');
								 $("#signin-Message>div").text("Not a valid user")
							 }
							 else if(data.length == 1 && data[0].active == false){
								 $("#signin-Message").show();					    
							     $("#signin-Message").html(' <div  class="alert alert-danger"></div>');
								 $("#signin-Message>div").text("Account is not activated !")
							 }
							 else {
								 localStorage.setItem("loginName" , $("#login-username").val())
								 loginUser(oauthToken);
							 }
							  							
						},
						error : function(data) {
							 $("#signin-Message").show();					    
						     $("#signin-Message").html(' <div  class="alert alert-danger"></div>');
							 $("#signin-Message>div").text(data.responseJSON.error_description)
							 if( data.responseJSON.error_description == undefined) { 
							   $("#signin-Message>div").text("Server is not responding");
							 }
							console.log(data);
							 			 		
						}
					});						 
			 }  		 
		 })
		 
		 $("#btn-signup").click(function(){		
			     var id = "#signup-Message" ; 
			    if($("#login-username").val().length == 0 || $("#login-password").val().length == 0 || $("#login-email").val().length == 0 ||  $("#login-cpassword").val().length == 0 ){
			    	showSignUpMessage("All fields are mandatory." , id);
	      			return false ;
			    }
			    if($("#login-remember")[0].checked == false){
	      			showSignUpMessage("Please click terms of service." ,id);
	      			return false;
	      	     }
			    
	      		if($("#login-username").val().length<5   ){ 
	      			showSignUpMessage("Login name should be of 6 character." ,id);
	      			return false ;
	      		}     		
	      		if($("#login-password").val().length<7  ){	      			 
	      			showSignUpMessage("Password should be of 8 character." , id)
	      			return false 
	      		}
	      		if(  $("#login-cpassword").val().length <7){	      			 
	      			showSignUpMessage("Confirm Password should be of 8 character." , id)
	      			return false 
	      		}     		
	  			 if(!validateEmail($("#login-email").val().trim())){
	  				showSignUpMessage("Please enter valid mail Id." , id)
	  				return false;
	  			 }  
	  			 
	  			 if($("#login-password").val() != $("#login-cpassword").val()){
	  				showSignUpMessage("Confirm Password & Password should match." , id)
	      			return false 
	  			 }
	      	
          	var oauthToken  = getAnonymusUserToken()
 
	      	
	        // calling api to create account 
          	     
  	        	registerUser(oauthToken);
		})
		

		
		function validateEmail(sEmail) {
		    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;	 
		    if (filter.test(sEmail)) {	 
		        return true;	 
		    }	 
		    else {		 
		        return false;	 
		    } 
		}
		
		 $("#btn-resetPassword").click(function(){
			 $("#reset-password").empty();
			 
			 var oauthToken = getAnonymusUserToken();
			 var email =  document.getElementById("login-email").value ;
			 
			 
			 if(email.length == 0 ){
				
				 
				 $("#reset-password").html('<div  class="alert alert-danger "></div>');
				 $("#reset-password > div").text("Please enter mail id.")
				 $("#reset-password").show()
//				 setTimeout(function(){ $("#reset-password").hide()},2000)
					return false 
				}
			 else if(!validateEmail(email)){
				 $("#reset-password").html('<div  class="alert alert-danger "></div>');
				 $("#reset-password > div").text("Please enter valid mail id.")
				 $("#reset-password").show()
			 }
			 else if(checkRegisteredUser(email , oauthToken) == 0){
				 
				 $("#reset-password").html('<div  class="alert alert-danger "></div>');
				 $("#reset-password > div").text("Mail id is not Registered.")				
				 $("#reset-password").show()
//				 setTimeout(function(){ $("#reset-password").hide()},2000)
				 return false ;
			 }
			 else { 
	        
				 forgotPassword(email, oauthToken);
			 }	
	     })
	
			function forgotPassword(email , oauthToken){
								     
				$.ajax({
			
			        url: restAPIUrl + 'user/resetPasswordRequest/' + email + '/',
					headers: {
			            'Authorization': 'Bearer ' + oauthToken,
			            'Content-Type': 'application/x-www-form-urlencoded',
			            
			        },
					type : 'GET',		
					async : false,
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {			
						 console.log(data); 
						 $("#reset-password").html('<div  class="alert alert-success "></div>');
						 $("#reset-password > div").text( data.message)				
						 $("#reset-password").show()
 						// setTimeout(function(){ $("#reset-password").hide()},2000)
						 // removing the annonymus token used here
						 tokenSingOut(oauthToken) ;
								
					},
					error : function(data) {
						console.log(data); 
 
			
					}
				});
			}
		 
		 function checkRegisteredUser(email , oauthToken){
			 var count = 0 ; 
			 
			 $.ajax({			
			        url: baseUrl + 'queries/fot$UserDetails/userWithGivenEmail?withEmail=' + email ,
					headers: {
			            'Authorization': 'Bearer ' + oauthToken,
			             		            
			        },
					type : 'GET',		
					async : false,
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {			
						 console.log(data);
						 if(data.length > 0) { 
							 count = data.length ;					 
						 }							
					},
					error : function(data) {
						console.log(data); 
						 
						console.log(JSON.stringify(data.responseText));
			
					}
				});
			 
			 return count ;
		 }
		 
		 function resetPassword(userId,resetCode,newPassword ,confirmPassword){
			 $("#change-password").empty();
			 $("#change-password").html('  <div  class="alert alert-danger "></div>');
			 var oauthToken =  getAnonymusUserToken();
			
			 $.ajax({			
			        url: restAPIUrl + 'user/resetPassword' ,
					headers: {
			            'Authorization': 'Bearer ' + oauthToken,
			            'Content-Type': 'application/json',		            
			        },
					type : 'POST',		
					async : false,
					//contentType : 'application/json',
					dataType : 'json',
					data : JSON.stringify({  id:userId, pwdResetCode:resetCode,password:newPassword, confirmPassword:confirmPassword }),			      
					success : function(data) {			
						 console.log(data);
						 $("#change-password >div").text(data.message);
						 $("#change-password>div").removeClass("alert-danger").addClass("alert-success");
						 $("#change-password").show()
						  // removing the annonymus token used here
						 tokenSingOut(oauthToken) ;
			             setTimeout(function(){ window.location.href = 'signin.jsp';},4000)						  							
					},
					error : function(data) {
						console.log(data);
						 $("#change-password >div").text( data.responseJSON.message);						
						 $("#change-password").show()
						 $("#btn-changePassword-section").after('<div class="col-md-12"><a href="forgot_password.jsp">Click on the link to request password</a><div>')
//			             setTimeout(function(){ $("#change-password").hide()},2000)
						console.log(JSON.stringify(data.responseText));			
					}
				});
		 }
		 function getAnonymusUserToken() {
				var userLogin = anonymousUserId;
			    var userPassword = anonymousUserPwd;
			    var oauthToken = '';
			    $.ajax({
			        url: baseUrl + 'oauth/token',
			        headers: {
			            'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
			            'Content-Type': 'application/x-www-form-urlencoded'
			        },
			        type : 'POST',
			        async : false,
			        dataType: 'json',
			        data: {grant_type: 'password', username: userLogin, password: userPassword},
			        success: function (data) {
			            oauthToken = data.access_token;
			            //localStorage.setItem("oauthToken", oauthToken);
			            //console.log(oauthToken);
			             // oauthToken = '';
			        },
			        error: function (data) {
			            console.log(data);
			            
			        }
			    })
			    
			    return oauthToken
			}
	
		 
		 // change password screen 
		 
		 
		 $("#btn-changePassword").click(function(){
			 
			 if($("#newPassword").val().length == 0){
				    $("#change-password").show();
	            	$("#change-password >div").text("Please enter new password.")
	            	return false ;
			 }
			 if($("#confirmPassword").val().length == 0){
				    $("#change-password").show();
	            	$("#change-password >div").text("Please enter confirm Password.")
	            	return false ;
			 }
			
			 if(( $("#newPassword").val().length >7) && ($("#confirmPassword").val().length >7) ){
	             
	            if($("#newPassword").val() ==  $("#confirmPassword").val() ){
	            	
	            	$("#changePasswordform").data("userid") 
	            	$("#changePasswordform").data("vericode") 
	            	
	            	resetPassword($("#changePasswordform").data("userid").trim(),$("#changePasswordform").data("vericode").trim() ,$("#newPassword").val() ,$("#confirmPassword").val())
	            }
	            else {
	            	$("#change-password").show();
	            	$("#change-password >div").text("New Password & Confirm password does not match!")
//	            	setTimeout(function(){ $("#change-password").hide()},2000)
	            	return false ;
	            }
              }
			 else {
				 $("#change-password").show();
				 $("#change-password >div").text("New Password/Confirm password should be more than 7 character!")
//				 setTimeout(function(){ $("#change-password").hide()},2000)
				 return false ;
			 }
      			 
		 })
		 
		 
		 // change password from profile link
		 
		 $("#btn-profile-change-password").click(function(){
			  var id = "#profile-change-password"
			 if($("#current-password").val().length == 0){
				    showSignUpMessage("Please enter current password." , id)   
	            	return false ;
			 }
			 if($("#new-password").val().length == 0){				  	            	 
	            	showSignUpMessage("Please enter new Password." , id)   
	            	return false ;
			 }
			 if($("#new-retypepassword").val().length == 0){				     
	            	showSignUpMessage("Please re-type new Password." , id)
	            	return false ;
			 }
			  if($("#new-password").val() !=  $("#new-retypepassword").val() ){	
				    showSignUpMessage("New Password & re-type password does not match!" , id)				                
	            	return false ;				  
			  }
			  
			
			 if(( $("#current-password").val().length >7) && ($("#new-password").val().length >7) && ($("#new-retypepassword").val().length > 7) ){	             
				 profilePasswordChange();
           }
			 else {
				 showSignUpMessage("New Password/Confirm password should be more than 7 character!" , id)					  		 
				 return false ;
			 }
			 
		 })
		 
		 function registerUser(oauthToken){
			 
				var signupDetailsForm = '#signupform';
				var userData = JSON.stringify($(signupDetailsForm).serializeFormJSON());
				var url = restAPIUrl +'user/registerUser';  
				var id = '#signup-Message'
				
				$.ajax({
					url: url,
					headers: {
			            'Authorization': 'Bearer ' + oauthToken,
			            'Content-Type': 'application/json'
			        },
					type : 'POST',
					data : userData,
					async : false,
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {			
						 
						//destroy the token
						tokenSingOut(oauthToken);
			        	//console.log(data);
			            window.location.assign("greeting.jsp");
					},
					error : function(data) {						
					    console.log(data);
						showSignUpMessage(data.responseJSON.message , id  );
						if(data.responseJSON.message == undefined) { 
						  showSignUpMessage(data.responseJSON.error_description , id );
						}		      			 
					}
				});
				
			}
		 
		 function profilePasswordChange(){
			 var id = "#profile-change-password"
			 //http://localhost:8080/app-portal/rest/registeredUser/changePassword 
			 var url = restAPIUrl +'registeredUser/changePassword';  
			 var oauthToken  = localStorage.getItem("oauthToken");
			 var userId = localStorage.getItem("userId").replace(/\"/g, "");

				       
				$.ajax({
					url: url,
					headers: {
			            'Authorization': 'Bearer ' + oauthToken,
			            'Content-Type': 'application/json'
			        },
					type : 'POST',
					data :  JSON.stringify({id:userId, oldPassword: $("#current-password").val(), password:  $("#new-password").val() ,confirmPassword :  $("#new-retypepassword").val() }),
					//data :JSON.stringify(data),
					async : false,				 
					success : function(data) {							 
						 console.log(data);
						showSuccessMessage(data.message, id );
					},
					error : function(data) {						
					    console.log(data);
						showSignUpMessage(data.responseJSON.message, id );
						if(data.responseJSON.message == undefined) { 
						   showSignUpMessage(data.responseJSON.error_description ,id);	   
						}
					}
				});		 
		 }
		 
		
		 function showSignUpMessage(message , id){			   
		     	console.log(message)
			    $(id+ ">div").removeClass("alert-success").addClass("alert-danger");
		     	$(id +">div").text("");
				$(id +">div").text(message); 
				$(id).show();	 
		     }
		 
		 function showSuccessMessage(message , id){	
			    console.log(message)
				$(id+ ">div").removeClass("alert-danger").addClass("alert-success");
			    $(id +">div").text("");
				$(id +">div").text(message);
				$(id).show();	 
		     }
		 
		 
 	  
})

	  function myFunction(event) {
    var Enterkey = event.which || event.keyCode; 

    if(Enterkey == 13)
    if(loginUser()){}
}