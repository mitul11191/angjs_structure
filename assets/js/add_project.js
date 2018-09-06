/**
 * Add all the js functions related to add_project.jsp page here
 */

var oauthToken   = localStorage.getItem("oauthToken");

/* To prepare the JSON object to save video project details to DB. It is manual but need to be automated with some jquery framework */
function getCustomData() {
	return $('#creativeTalent').val();
	/*var valElms = document.querySelectorAll("[id='attributeValue']");
	var nameElms = document.querySelectorAll("[id='attributeName']");

	var customData = ',"projectCustDet":[';
	for (var i = 0; i < valElms.length; i++) {
		customData += '{"' + nameElms[i].id + '":"' + nameElms[i].value + '",';
		customData += '"' + valElms[i].id + '":"' + valElms[i].value + '"},';
	}
	return valElms.length > 0 ? customData = customData.substring(0, customData.length - 1)	+ "]" : "";*/
}

/* To prepare the JSON object to save video project details to DB. It is manual but need to be automated with some jquery framework */
function getCastCrewData() {
	var table = $("#addCastNCrewTbl tbody");
	var tableData = [];
	var crewData = '';
    table.find('tr').each(function (i) {
        var $tds = $(this).find('td'),
            cName = $tds.eq(0).text(),
            cRole = $tds.eq(1).text(),
            cEmail = $tds.eq(2).text();
        
        tableData.push('{"crewName":"' + cName + '","crewRole":"' + cRole + '","crewEmail":"' + cEmail + '"}');
    });
    //alert(tableData.length)
    return tableData.length > 0 ? crewData = ',"projectCrewDet":[' + tableData + ']' : ',"projectCrewDet":[]';
}

/* Method to save the project details */
function submitProject(formId) {
	
	//Add project validation part start
	var badColor = "#F70C0C";
	var goodColor = "#66cc66";
	 var videoType = document.getElementById('videoType'); 	
	 var videoLink = document.getElementById('videoLink'); 	
	 var videoTitle = document.getElementById('videoTitle'); 	
	 var videoGenre = document.getElementById('videoGenre'); 	
	 var aboutVideo = document.getElementById('aboutVideo'); 	
	 var videoTag = document.getElementById('videoTag'); 	
	 var releaseYear = document.getElementById('releaseYear'); 
	 var videoLanguage = document.getElementById('videoLanguage'); 
	 var youtupe_pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/; 
   var message = document.getElementById('confirmMessage');
   var message1 = document.getElementById('confirmMessage1');
   var message2 = document.getElementById('confirmMessage2');
   var message3 = document.getElementById('confirmMessage3');
   var message4 = document.getElementById('confirmMessage4');
   var message5 = document.getElementById('confirmMessage5');
   var message6 = document.getElementById('confirmMessage6');
   var message8 = document.getElementById('confirmMessage8');
   
    	
   if(videoLink.value==""){
	   videoLink.style.borderColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "please enter your video youtube url"
        	
        	return false;
    	
    }else if(!videoLink.value.match(youtupe_pattern)){
	   videoLink.style.borderColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "This is not a valid youtube url"
        	
        	return false;
    	
    }else{
    	videoLink.style.borderColor = goodColor;
  message.style.color = goodColor;
  message.innerHTML = ""
	 
}
    
   if (videoTitle.value.length > 100){
	   
    	videoTitle.style.borderColor = badColor;
        message1.style.color = badColor;
        message1.innerHTML = "your video title must have below 100-character"
        	
        	return false;
    	
    }else if(videoTitle.value==""){
    	videoTitle.style.borderColor = badColor;
        message1.style.color = badColor;
        message1.innerHTML = "please enter your video title"
        	
        	return false;
    	
    }else{
    	videoTitle.style.borderColor = goodColor;
    message1.style.color = goodColor;
    message1.innerHTML = ""
}
   	if(videoGenre.value==""){
		videoGenre.style.borderColor = badColor;
		message2.style.color = badColor;
		message2.innerHTML = "please enter your video genre"
			
			return false;
    	
    }else {
    	videoGenre.style.borderColor = goodColor;
		message2.innerHTML = ""
			message2.style.color = goodColor;
	}
 if(aboutVideo.value==""){
		aboutVideo.style.borderColor = badColor;
		message3.style.color = badColor;
		message3.innerHTML = "please tell somthing about your video"
			return false;
    	
    }else if(aboutVideo.value.length>5000) {
    	aboutVideo.style.borderColor = badColor;
    	message3.style.color = badColor;
		message3.innerHTML = "your video title must have below 5000-character"
			return false;
	}else{
		aboutVideo.style.borderColor = goodColor;
    	message3.style.color = goodColor;
		message3.innerHTML = ""
	}
   if(videoTag.value==""){
		videoTag.style.borderColor = badColor;
		message4.style.color = badColor;
		message4.innerHTML = "please enter your video Tag"
			return false;
    	
    }else {
    	videoTag.style.borderColor = goodColor;
		message4.innerHTML = ""
			message4.style.color = goodColor;
	}
    if(releaseYear.value==""){
		releaseYear.style.borderColor = badColor;
		message5.style.color = badColor;
		message5.innerHTML = "please enter your releaseYear"
			return false;
    	
    }else {
    	releaseYear.style.borderColor = goodColor;
		message5.innerHTML = ""
			message5.style.color = goodColor;
	}
    if(videoLanguage.value==""){
		videoLanguage.style.borderColor = badColor;
		message6.style.color = badColor;
		message6.innerHTML = "please enter your video language"
			return false;
			
    }else {
    	videoLanguage.style.borderColor = goodColor;
		message6.innerHTML = ""
			message6.style.color = goodColor;
	}if((shortFilms.checked == false) && (musicAlbum.checked == false) && (stageShow.checked == false) && (teaser.checked == false) && (addFilms.checked == false) && (others.checked == false)){
		   shortFilms.style.borderColor = badColor;
	        message8.style.color = badColor;
	        message8.innerHTML = "please enter your video type "
	        	
	        	
		}else {
			shortFilms.style.borderColor = goodColor;
			message8.innerHTML = "Your video type selected"
				message8.style.color = goodColor;
		}
	
	// if((!videoLink.value=="")&&(!videoTitle.value=="")&&(!videoGenre.value=="")&&(!aboutVideo.value =="")&& (!videoTag.value =="")&&(!releaseYear.value=="")&&(!videoLanguage.value=="")){
	//Add project validation part end
	
	  
	
	
	
	$('#videoId').val(getVideoIdParameterByName('v'));

	var projectDetails = '#' + formId;
	//e.preventDefault();
	var data = JSON.stringify($(projectDetails).serializeFormJSON());
	var customData = getCustomData().concat(getCastCrewData());
	if (customData && customData != "") {
		data = data.substring(0, data.length - 1).concat(customData)+ ',"userDetails":{"id": "'+ $('#userDetailsId').val() +'"}}';
	}
	console.log(data);
	$.ajax({
		url : baseAPIUrl + 'fot$ProjectVideoDet',
		//url : baseAPIUrl + 'fot$UserDetails/' + $('#userDetailsId').val(),
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'POST',
		data : data,
		async : false,
		//contentType : 'application/json',
		dataType : 'json',
		success : function(data) {
			//alert(JSON.stringify(data));
			alert("Your Project Successfully created.");
			window.location = "profile_view.jsp";
		},
		/*error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}*/
	});
}
/* function to add the template row for adding custom fields */
function addCustomFieldValues() {
	var templateRow = '<div class="row"><div class="col-md-6 col-xs-12"><div class="form-row"><div class="form-group required">';
	templateRow += '<label class="control-label">Attribute Name</label> <input class="form-control" size="3" type="text" id="attributeName" name="attributeName">';
	templateRow += '</div></div></div><div class="col-md-6 col-xs-12"><div class="form-row"><div class="form-group required">';
	templateRow += '<label class="control-label">Attribute value</label> <input class="form-control" size="3" type="text" id="attributeValue" name="attributeValue">';
	templateRow += '</div>	</div></div></div>';
	$('#addCustomFields').append(templateRow);
}

// Read a page's GET URL variables and return them as an associative array.
function getVideoIdParameterByName(name, url) {
	if (!url)
		url = $('#videoLink').val();
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* Comments here */
function loadCreativeTalent(screen) {
	var url = baseAPIUrl + 'fot$CreativeTalAttributes?view=creativeTalAttributes-view&sort=talentAttribute';

	$.ajax({
		url : url,
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'GET',
		async : false,
		contentType : 'application/json',
		//dataType: 'json',
		success : function(data) {
			//alert(JSON.stringify(data));
			//Clear the menus every time
			$('#creativeTalentRightDiv').html('');
			$('#creativeTalentLeftDiv').html('');
			$('#crewCreativeTalentRightDiv').html('');
			$('#crewCreativeTalentLeftDiv').html('');
			
			var otherTalent = '<div class="tab-pane" id="tab_OtherTechnicians">';
			otherTalent += '<div class="custom-form-ele">';
			otherTalent += '<div class="form-group">';
			otherTalent += '<div class="row">';
			otherTalent += '<div class="col-md-12 col-xs-12">';
			otherTalent += '<label for="filter">Other Technicians</label>';
			otherTalent += '<input class="form-control" type="text" id="OtherTechnicians" name="OtherTechnicians">';
			otherTalent += '</div></div></div></div></div>'
				
			if('forTalent' == screen){
				leftMenu = '';
				rightMenu = '';
				
				//Populating the menu field values - function
				printTalent(data, "");
				
				$('#creativeTalentRightDiv').append(rightMenu  + '</div></div>' + otherTalent );
				
				$('#creativeTalentLeftDiv').append(leftMenu + '<li><a href="#tab_OtherTechnicians" data-toggle="pill">Other Technicians</a></li></ul>');

			}else if('forCrew' == screen){
				$('#crewCreativeTalentRightDiv').html('');
				$('#crewCreativeTalentLeftDiv').html('');
				leftMenu = '';
				rightMenu = '';
				
				//Populating the menu field values - function
				printTalent(data, "");
				
				$('#crewCreativeTalentRightDiv').append(rightMenu + '</div></div>' + otherTalent );
				
				$('#crewCreativeTalentLeftDiv').append(leftMenu + '<li><a href="#tab_OtherTechnicians" data-toggle="pill">Other Technicians</a></li></ul>');
				
			}
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

//Populating JSON into html - Start
var array = [ "<ul>" ];
function printTalent(items, childId) {
	switch ($.type(items)) {
	case "object":
		getTalentChildren(items);
		break;
	case "string":
		//array.push("<li> key : " +childId+ ", value:" + items + "</li>");
		var key = '#' + childId;
    	/*if($(key).attr('type')){
    		$(key).val(items);
    	}else{
    		$(key).text(items);
    	}*/
		//console.log(items);
		break;
	case "array":
		printTalentArray(items);
		break;

	}

}

function getTalentChildren(parent) {
	//console.log(parent);
	for ( var child in parent) {
		if('creativeTalVal' == child){
			//alert(child +":"+ (parent[child]));
			for ( var subChild in parent[child]) {
				//alert(subChild +":"+ (parent[child][subChild]));
				if(parent[child][subChild]){
					showCreativeTalentRightMenu(parent[child][subChild]);
				}
			}
		}
		//console.log(child +":"+ (parent[child]));
		/*if('fot$CreativeTalValues' == parent[child]){
			showCreativeTalentRightMenu();
		}else*/ //if('fot$CreativeTalAttributes' == parent[child]){
			if('talentAttribute' == child){
				//alert(child +":"+ (parent[child]));
				showCreativeTalentLeftMenu(parent[child]);
			}
		//}
		//array.push("<li> key :" + child + "<ul>");
		printTalent(parent[child], child);
		array.push("</ul></li>");
	}
}
function printTalentArray(myArray) {
	for (var i = 0; i < myArray.length; i++) {
		//console.log(myArray[i]);
		if ($.type(myArray[i]) == "object") {
			getTalentChildren(myArray[i]);
		} else {
			array.push("<li>" + myArray[i] + "</li>");
		}
	}
}
//printTalent(allData, "");
array.push("<ul>");
$("#list").html(array.join(""));
//Populating JSON into html - Ends


/* function to add the template row for adding custom fields */
var leftMenu = '';
function showCreativeTalentLeftMenu(item) {
	//alert(item);
	
	if(!leftMenu){
		leftMenu += '<ul class="nav nav-pills nav-stacked col-md-6" ><li><a href="#tab_'+ item +'" data-toggle="pill">'+ item +'</a></li>';
	}else{
		leftMenu += '<li><a href="#tab_'+ item +'" data-toggle="pill">'+ item +'</a></li>';
	}
	//var templateRow = '<li><a href="#tab_'+ item +'" data-toggle="pill">'+ item +'</a></li>';
	//$('#creativeTalentLeftDiv').append(leftMenu);
}

/* function to add the template row for adding custom fields */
var oldMenu = '';
var templateRow = '';
var rightMenu = '';
function showCreativeTalentRightMenu(item) {
	var value = '';
	
	for ( var child in item) {
		//alert(child +":"+ (item[child]));
		
		if('talentValue' == child){
			value = item[child];
		}
		
		if('creativeTalAttributes' == child){
			//alert(item[child]._instanceName +":" + value);
			//alert($('#creativeTalentRightDiv').html());
			var idVal = item[child]._instanceName + value.replace(/\s/g, '');
			var nameVal = item[child]._instanceName;
			
			templateRow = '<div class="checkbox">';
			templateRow += '<input id="'+ idVal +'" type="checkbox" name="'+ nameVal +'" value="'+ value +'" onclick="toggleCheckBox(this);"><label for="'+ idVal +'"> '+ value +' </label>';
			templateRow += '</div>';
			
			
			//alert(nameVal + ":"+ oldMenu);
			var creatRow = '';
			if(nameVal != oldMenu){
			var mainDiv = '';
			if(oldMenu){
				mainDiv = '</div></div><div class="tab-pane" id="tab_'+item[child]._instanceName+'"><div class="custom-form-ele">';
			}else{
				mainDiv = '<div class="tab-pane" id="tab_'+item[child]._instanceName+'"><div class="custom-form-ele">';
			}
			//alert(templateRow);
				creatRow = mainDiv + templateRow;
			
			}else{
				creatRow = templateRow;
			}
			
			oldMenu = nameVal;
			rightMenu +=  creatRow;
			//alert(rightMenu + ":" + creatRow);
			//$('#creativeTalentRightDiv').append(creatRow);
			
		}
	}
}



$('#doneBtn1').click(function(e) {
	var checks = [];
	var checksHidden = [];
	$('#creativeTalentDisplay').text('');
	$('#creativeTalent').val('');
	
    $('#creativeTalentRightDiv input:checked').each(function(index, item) {
	    if($(item).attr('type') == 'checkbox'){
		    var itemId = jQuery(item).attr('id');
		    var itemName = jQuery(item).attr('name');
		    var itemVal = $('#'+itemId).val();
		    
		    var label = itemVal;//jQuery('label[for=' + jQuery(item).attr('id') + ']').text();
	        checks.push(label);
	        checksHidden.push('{"attributeName":"' + itemName + '","attributeValue":"' + itemVal + '"}');
	    }
    });
    if(checks.length == 0) {
    	alert('nothing checked');
    	$('#creativeTalentDisplay').text('');
    	$('#creativeTalent').val(',"projectCustDet":[]');
    }else {
    	$('#creativeTalent').val(',"projectCustDet":['+checksHidden + "]");
    	$('#creativeTalentDisplay').text(checks);
    	//alert(checks);
    }
});

$('#doneBtn3').click(function(e) {
	var checks = [];
	var checksHidden = [];
	$('#crewTalentDisplay').text('');
	$('#crewTalentHidden').val('');
	
    $('#crewCreativeTalentRightDiv input:checked').each(function(index, item) {
	    if($(item).attr('type') == 'checkbox'){
		    var itemId = jQuery(item).attr('id');
		    var itemName = jQuery(item).attr('name');
		    var itemVal = $('#'+itemId).val();
		    var label = jQuery('label[for=' + jQuery(item).attr('id') + ']').text();
	        checks.push(label);
	        checksHidden.push('{"attributeName":"' + itemName + '","attributeValue":"' + itemVal + '"}');
	    }
    });
    if(checks.length == 0) {
    	alert('nothing checked');
    	$('#crewTalentDisplay').text('');
    	$('#crewTalentHidden').val('');
    }else  {
    	$('#crewTalentHidden').val(',"projectCrewTalentDet":['+checksHidden + "]");
    	$('#crewTalentDisplay').text(checks);
    	//alert(checks);
    	
    }

});

$('#doneBtn2').click(function(e) {
	var crewName = $('#crewName').val();
	var crewEmail = $('#emailCastcrew').val();
	var crewTalent = $('#crewTalentDisplay').text();
	var newRowContent = '<tr>';//<td style="width:12%"></td>
	newRowContent += '<td colspan="2">'+ crewName +'</td> ';
	newRowContent += '<td>'+ crewTalent +'</td>';
	newRowContent += '<td>'+ crewEmail +'</td>';
	newRowContent += '<td style="width:5%"><a href="#" onclick="deleteCurrentRow(this);" class="castandcrew-link"><i class="fa fa-times-circle"></i></a></td>';
	newRowContent += '</tr>';
	
	//castcrew popup window validation start  
	  var badColor = "#ff6666";
		var goodColor = "#66cc66";
		var Error_alert1 = document.getElementById('Error_alert1'); 
		var Error_alert2 = document.getElementById('Error_alert2'); 
		var crewName = document.getElementById('crewName'); 
		var email_castcrew = document.getElementById('emailCastcrew'); 	
		 var Email_pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		
		 if(crewName.value==""){
			 crewName.style.borderColor = badColor;
			 Error_alert1.style.color = badColor;
			 Error_alert1.innerHTML = "please enter cast crew Name"
					return false;
		    	
		    }else {
		    	crewName.style.borderColor = goodColor;
		    	Error_alert1.innerHTML = ""
		    		Error_alert1.style.color = goodColor;
			}
		 if(email_castcrew.value==""){
			 email_castcrew.style.borderColor = badColor;
			 Error_alert2.style.color = badColor;
			 Error_alert2.innerHTML = "please enter your E-mail id"
				 return false;
		    	
		    }
		 else if(!email_castcrew.value.match(Email_pattern)){
			 email_castcrew.style.borderColor = badColor;
			 Error_alert2.style.color = badColor;
			 Error_alert2.innerHTML = "This is not a valid E-mail id"
				 return false;
		    	
		    }else {
		    	email_castcrew.style.borderColor = goodColor;
		    	Error_alert2.innerHTML = ""
		    		Error_alert2.style.color = goodColor;
			}
		  $('.modal.in').modal('hide')
	  
		//castcrew popup window validation End
	  $("#addCastNCrewTbl tbody").append(newRowContent);
		
		var userObj = getUserProfileDetailsByEmail(crewEmail);
		if (jQuery.isEmptyObject(userObj)) {
			console.log("User does not exists. Send a email to create the signup with FOT.");
		}else{
			console.log("User already registered with FOT.");
		}
	
	
	/*var url = baseAPIUrlForQueries +'fot$UserDetails/userWithGivenEmail?withEmail='+crewEmail;
	//alert(url)
	$.ajax({
      url: url,
      type: 'GET',
      async: false,
      contentType:'application/json',
      //dataType: 'json',
      success: function (data) {
		if (jQuery.isEmptyObject(data)) {
			console.log("User does not exists. Send a email to create the signup with FOT.");
		}else{
			console.log("User already registered with FOT.");
		}
      },
      error: function (response) {
        alert('error' + JSON.stringify(response.responseText));

      }
    }); */
	/*var checks = [];
    $(':checked').each(function(index, item) {
    
    var label = jQuery('label[for=' + jQuery(item).attr('id') + ']').text();
        checks.push(label);
    });
    if(checks.length == 0) {
    	alert('nothing checked');
    }else {
    	$('#castCrew').val(checks);
    	$('#castCrewDisplay').text(checks);
    	//alert(checks);
    }*/
});

	function deleteCurrentRow(td){
		$(td).parent().parent().remove(); //Deleting the Row (tr) Element
	}
	
	
	
	//Add project page upload button validation code 
	  function upload_files(){
		  var badColor = "#ff6666";
		  var goodColor = "#66cc66";
		  var videoAwards = document.getElementById('videoAwards'); 
		  var awardYear = document.getElementById('awardYear'); 
		  var error_msg1 = document.getElementById('error_msg1'); 
		  var error_msg2 = document.getElementById('error_msg2'); 
			 
		  if(videoAwards.value==""){
			  videoAwards.style.borderColor = badColor;
			  error_msg1.style.color = badColor;
			  error_msg1.innerHTML = "please enter your video Awards"
						return false;
			    	
			    }else {
			    	videoAwards.style.borderColor = goodColor;
			    	error_msg1.innerHTML = ""
			    		error_msg1.style.color = goodColor;
				}
			
	  if(awardYear.value==""){
		  awardYear.style.borderColor = badColor;
		  error_msg2.style.color = badColor;
		  error_msg2.innerHTML = "please enter your awards of year"
					return false;
		    	
		    }else {
		    	awardYear.style.borderColor = goodColor;
		    	error_msg2.innerHTML = ""
		    		error_msg2.style.color = goodColor;
			}
		}
		 
	//send enquiry to Admin
	function sendEnquirytoAdmin() {
		// User help menu popup window validation start
		var badColor = "#ff6666";
		var goodColor = "#66cc66";

		var Error_msg1 = document.getElementById('Error_msg1');
		var Error_msg2 = document.getElementById('Error_msg2');
		var Error_msg3 = document.getElementById('Error_msg3');

		var Sendername = document.getElementById('Sender_name');
		var senderemailid = document.getElementById("sendermail");
		var UserQuery = document.getElementById("userquery");
		var Email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (Sendername.value == "") {
			senderemailid.style.borderColor = badColor;
			Error_msg1.style.color = badColor;
			Error_msg1.innerHTML = "please enter your Name"
			return false;

		} else {
			Sendername.style.borderColor = goodColor;
			Error_msg1.innerHTML = ""
			Error_msg1.style.color = goodColor;
		}
		if (senderemailid.value == "") {
			senderemailid.style.borderColor = badColor;
			Error_msg2.style.color = badColor;
			Error_msg2.innerHTML = "please enter your E-mail id"
			return false;

		} else if (!senderemailid.value.match(Email_pattern)) {
			senderemailid.style.borderColor = badColor;
			Error_msg2.style.color = badColor;
			Error_msg2.innerHTML = "This is not a valid E-mail id"
			return false;

		} else {
			senderemailid.style.borderColor = goodColor;
			Error_msg2.innerHTML = ""
			Error_msg2.style.color = goodColor;
		}
		if (UserQuery.value == "") {
			UserQuery.style.borderColor = badColor;
			Error_msg3.style.color = badColor;
			Error_msg3.innerHTML = "please enter your query"
			return false;

		} else {
			UserQuery.style.borderColor = goodColor;
			Error_msg3.innerHTML = ""
			Error_msg3.style.color = goodColor;

		}
		alert("your query successfully sended to us");
		$('.modal.in').modal('hide')
		// User help menu popup window validation End
		// code for user enquiry sended to the Admin
		var senderemailid = $('#sendermail').val();
		var UserQuery = $('#userquery').val();
		var user = {
			"senderEmailid" : senderemailid,
			"userQuery" : UserQuery
		}
		var userData = JSON.stringify(user);

		$.ajax({
			url : restAPIUrl + 'registeredUser/sendUserEnquery',  //API for User Enquiry
			headers : {
				'Authorization' : 'Bearer' + oauthToken,
				'Content-Type' : 'application/json',
			},
			type : 'POST',
			data : userData,
			async : false,
			dataType : 'json',
			success : function(data) {

			},
			error : function(data) {
				alert(data)

			}
		})
	}

	//End 

