/**
 * All payment related functions here
 */

var oauthToken   = localStorage.getItem("oauthToken");

function initiatePayment(){
	alert(oauthToken);

	/*var paymentDetails = '#paymentForm';
	var data = JSON.stringify($(projectDetails).serializeFormJSON());
	var customData = getCustomData().concat(getCastCrewData());
	if (customData && customData != "") {
		data = data.substring(0, data.length - 1).concat(customData)+ ',"userDetails":{"id": "'+ $('#userDetailsId').val() +'"}}';
	}
	console.log(data);*/
	var id = "e4acf7f6-5b93-59ae-cf1d-62ee3a48e52a";
	$.ajax({
		url : restAPIUrl + 'payment/initiateOnlinePayment',
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'POST',
		data : JSON.stringify({subscriptionId:id, surl:restAPIUrl, furl:restAPIUrl}),
		async : false,
		dataType : 'json',
		success : function(data) {
			alert(JSON.stringify(data));
			//Populating the html field values - function implementaion found in util.js
			printList(data, "");
			
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

function payNow(){
	alert("going to payUMoney");
	var paymentDetails = '#paymentForm';
	var data = JSON.stringify($(paymentDetails).serializeFormJSON());
	alert(data);
	$("#paymentForm").submit();
}