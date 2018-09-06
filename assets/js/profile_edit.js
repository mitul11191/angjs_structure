
var oauthToken = localStorage.getItem("oauthToken");



$(document).ready(function() {
 
		
	// 	$(function () {
    //        $('#datetimepicker1').datetimepicker();
           
    //         $(document).on("click" , "#addAward" ,function(){
    //           	 $('.datetimepickers').datetimepicker();
    //         })
    //    });
	// 	if(!checkSessionValidity())
	// 	{
	// 		 window.location= "signin.jsp";
	// 	}

/* To prepare the JSON object to save user details to DB. It is manual but need to be automated with some jquery framework */
function getUserFormData() {
	var profileSectionForm = '#profileSection';
	var personalSectionForm = '#personalSection';
	var profeSectionForm = '#profeSection';
	var awardSectionForm = '#awardSection';
	var customSectionForm = '#customSection';

	//e.preventDefault();
	var data0 = JSON.stringify($(profileSectionForm).serializeFormJSON());
	var data1 = getPersonalSecData(personalSectionForm);
	var data2 = getProfessionalSecData();//'"userProfDet"' + ":" + "["		+ JSON.stringify($(profeSectionForm).serializeFormJSON()) + "]";
	var data3 = getAwardSecData();//'"userAwardDet"' + ":" + "["	+ JSON.stringify($(awardSectionForm).serializeFormJSON()) + "]";
	var data4 = getCustomSecData();//'"userCustDet"' + ":" + "["	+ JSON.stringify($(customSectionForm).serializeFormJSON()) + "]";
	var data = "";

	data = data0.substring(0, data0.length - 1) + ",";
	data = data.concat(data1.substring(1, data1.length - 1)) + ",";
	var finalData = data.concat(data2) + ",";
	finalData = finalData.concat(data3) + ",";
	finalData = finalData.concat(data4) + "}";
	//alert("Forming: " + finalData);
	return finalData;
}

//Personal section data formed here
function getPersonalSecData(personalSectionForm) {
	
	var customData = JSON.stringify($(personalSectionForm).serializeFormJSON());

	return customData;
}

//Professional section data formed here
function getProfessionalSecData() {
	var companyNameElms = document.querySelectorAll("[id='companyName']");
	var companyWebsiteElms = document.querySelectorAll("[id='companyWebsite']");
	var compPositionElms = document.querySelectorAll("[id='compPosition']");
	var cityElms = document.querySelectorAll("[id='city']");
	var detailsElms = document.querySelectorAll("[id='details']");
    var count = 0 ;
	var customData = '"userProfDet":[';
	for (var i = 0; i < companyNameElms.length; i++) {
		if(companyNameElms[i].value != '' && companyWebsiteElms[i].value != ''){
			count = count + 1 ;
			customData += '{"' + companyNameElms[i].id + '":"' + companyNameElms[i].value + '",';
			customData += '"' + companyWebsiteElms[i].id + '":"' + companyWebsiteElms[i].value + '",';
			customData += '"' + compPositionElms[i].id + '":"' + compPositionElms[i].value + '",';
			customData += '"' + cityElms[i].id + '":"' + cityElms[i].value + '",';
			customData += '"' + detailsElms[i].id + '":"' + detailsElms[i].value + '"},';
		}
	}
	return count > 0 ? customData = customData.substring(0, customData.length - 1)	+ "]" : '"userProfDet":[]';
}

//Award section data formed here
function getAwardSecData() {
	var awardByElms = document.querySelectorAll("[id='awardBy']");
	var awardWebsiteElms = document.querySelectorAll("[id='awardWebsite']");
	var awardForElms = document.querySelectorAll("[id='awardFor']");
	var dateReveivedElms = document.querySelectorAll("[id='dateReveived']");
	 var customData = '"userAwardDet":[';
	 var count = 0 ;
 if(awardByElms.length > 0){
    
	for (var i = 0; i < awardByElms.length; i++) {
		if(awardByElms[i].value != '' && awardWebsiteElms[i].value != ''){
		 	count = count +1;
			customData += '{"' + awardByElms[i].id + '":"' + awardByElms[i].value + '",';
			customData += '"' + awardWebsiteElms[i].id + '":"' + awardWebsiteElms[i].value + '",';
			customData += '"' + awardForElms[i].id + '":"' + awardForElms[i].value + '",';
			customData += '"' + dateReveivedElms[i].id + '":"' + dateReveivedElms[i].value + '"},';
		}
	}
	
 }
 
 return count > 0 ? customData = customData.substring(0, customData.length - 1)	+ "]" : '"userAwardDet":[]';
	 
}

//Custom section data formed here
function getCustomSecData() {
	var customTitleElms = document.querySelectorAll("[id='customTitle']");
	var customDetailsElms = document.querySelectorAll("[id='customDetails']");

    var count = 0 ;
	var customData = '"userCustDet":[';
	for (var i = 0; i < customTitleElms.length; i++) {
		if(customDetailsElms[i].value != '' && customTitleElms[i].value != ''){
			count = count + 1 ;
			customData += '{"' + customDetailsElms[i].id + '":"' + customDetailsElms[i].value + '",';
			customData += '"' + customTitleElms[i].id + '":"' + customTitleElms[i].value + '"},';
		}
	}
	
	
	return count > 0 ? customData = customData.substring(0, customData.length - 1)	+ "]" : '"userCustDet":[]';
}
/* To save the user details to DB first time only*/
function submitform(formId) {
	document.getElementById("loadingmessage").style.display = "block"; 
	$('#cognitoUserId').val($('#sub').val());
	$('#userFirstName').val($('#name').val());
	$('#userLastName').val($('#family_name').val());
	$('#userEmailId').val($('#email').val());
	var finalData = getUserFormData();
	
	$.ajax({

		url : baseAPIUrl + 'fot$UserDetails',
		type : 'POST',
		data : finalData,
		async : false,
		contentType : 'application/json',
		dataType : 'json',
		success : function(data) {			
			//alert("Profile updated.");
			document.getElementById("loadingmessage").style.display = "none"; 
			//alert(JSON.stringify(data));
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

/* Load all the user related entity details from db and populate the screen with values */
var userId = localStorage.getItem("userId");



/* To update the user profile with custom values from the database*/
function updateform() {
	$('#cognitoUserId').val($('#sub').val());
	$('#userFirstName').val($('#name').val());
	$('#userLastName').val($('#family_name').val());
	$('#userEmailId').val($('#email').val());
	
	var updateData = getUserFormData();// prepare the JSON object
	console.log(updateData) ;
	//http://localhost:8080/app/rest/v2/entities/fot$UserDetails/ecacc4c1-a13e-4e3b-65b4-993b4bd78dc5
	$.ajax({
		url : baseAPIUrl + 'fot$UserDetails/' + $('#userDetailsId').val(),
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'put',
		data : updateData,
		dataType : 'json',
		success : function(data) {
			 $("#profile_message").empty();
	           $("#profile_message").html(' <div class="alert alert-success  col-md-5" style="left:20px" >Profile updated successfully !</div>')
    		 setTimeout(function(){window.location.reload()},1000);
		 
		},
		error : function(data) {
			alert("update fail : " + JSON.stringify(data));
		},
		complete: function(){
			  
		}
	});
}


    //carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: 10000,	
    });
	
 
	//Below call will load all the user details from cognito and database and populate the screen with values
	//setTimeout("onLoadHomePage('profile_edit')",1000); 
	//from profile_edit.js

	
	$("#btnBrowse").click(function(){
		 $("#fileUpload").trigger("click");
	})
	
  //user.getId()+"_Profile.jpg"

  $("#btnUpload").click(function(){
	        var userId =  localStorage.getItem("userId").replace(/\"/g, "");
	        var oauthToken = localStorage.getItem("oauthToken");
			alert( $("#fileUpload").val().split('\\')[2]);
			alert(oauthToken );
			alert(userId+ '_Profile.jpg')
		 
				 
			$.ajax({
				url : restAPIUrl + 'imageHandler/userImage' ,
				headers: {
		            'Authorization': 'Bearer ' + oauthToken
		           
		        },
				type : 'post',      			 
				dataType : 'form-data',
				data:{name : userId+ '_Profile.jpg', file: $("#fileUpload").val().split('\\')[2]},
				success : function(data) {
					 
				    alert(data)

				},
				error : function(data) {
					alert("update fail : " + JSON.stringify(data));
				}
		 
			})
       })
       
 
 
         $(document).on('click' , '.updateBtn' , function(){
        	 updateform();
         })
	
	})
	
function addCustomSec(){
	$("div[id^='addCustomDetailsSec']:last").after($('#customDetailsTemplate').clone());
}
function addCustomAwardSec(){
	$("div[id^='addCustomAwardDetailsSec']:last").after($('#customawardDetailsTemplate').clone());
}
function addCustomProfSec(){
	$("div[id^='addCustomProfDetailsSec']:last").after($('#customProfDetailsTemplate').clone());
}

function onLoadselectGender(){
    if(document.getElementById('gender')){
      var genderSelected = document.getElementById('gender').value;
      $("#"+genderSelected).prop("checked", true);
    }
}

function applyStyling(){
	populateFastSelect('.languagesInput');
	populateFastSelect('.qualificationInput');
	populateFastSelect('.institutionInput');
	populateFastSelect('.skillsInput');
	populateFastSelect('.expInput');
	populateFastSelect('.localeInput');
	if($.trim($('#cognitoUserId').val()) == ''){
		$('#saveBtn').show();
		$('#updateBtn').hide();
	}else{
		$('#saveBtn').hide();
		$('#updateBtn').show();
    }
}

function onLoadGetCustomDetails() {
	//alert(localStorage.getItem("userId"));
	//var profeSectionForm = '#profeSection';
	
	var url = baseAPIUrlForQueries
			+ 'fot$UserDetails/userDetailsWithGivenId?userId=' +localStorage.getItem("userId").replace(/\"/g, "");//+ $('#sub').val();

	$.ajax({
		url : url,
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'GET',
		async : false,
		//contentType : 'application/json',
		//dataType: 'json',
		success : function(data) {
			//alert(JSON.stringify(data));
			//Populating the html field values - function implementation found in util.js
			printList(data, "");

		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

setTimeout("onLoadGetCustomDetails()",1000);
setTimeout("applyStyling()",1000);
setTimeout("onLoadselectGender()",1000);

 