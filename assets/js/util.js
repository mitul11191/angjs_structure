//Converting form to JSON object - Start
var oauthToken = '2057a9e8-be7f-4fce-832e-fd438651fa12';

(function($) {
	$.fn.serializeFormJSON = function() {

		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
})(jQuery);
//Converting form to JSON object - Ends

//Populating JSON into html - Start
var array = [ "<ul>" ];
function printList(items, childId) {
	switch ($.type(items)) {
	case "object":
		getChildren(items);
		break;
	case "string":
		//array.push("<li> key : " +childId+ ", value:" + items + "</li>");
		var key = '#' + childId;
    	if($(key).attr('type')){
    		$(key).val(items);
    	}else{
    		$(key).text(items);
    	}
		//console.log(items);
		break;
	case "array":
		printArray(items);
		break;
	case "number":
        var key = '#' + childId;
        $(key).val(items);
        break;


	}

}

function getChildren(parent) {
	for ( var child in parent) {
		//console.log(child +":"+ (parent[child]));
		
		//for edit profile screen - start (Need to separate from here)
		if('fot$UserAwardDet' == parent[child]){
			addCustomAwardSec();
		}else if('fot$UserCustomDet' == parent[child]){
			addCustomSec();
		}else if('fot$UserProfDet' == parent[child]){
			addCustomProfSec();
		}
		//for edit profile screen - ends
		
		//for edit video project - starts (Need to separate from here)
		  var infoJSON = parent[child];
		    if(typeof parent[child] == "object" && child == 'projectCustDet'){
		       //console.log(',"' + child + '":' +JSON.stringify(parent[child]));
		       $('#creativeTalent').val(',"' + child + '":' +JSON.stringify(parent[child]));
		       
		       var displayText = [];
				for (key1 in infoJSON) {
					//alert(key1 +'=' + JSON.stringify(infoJSON[key1]));
					var infoChildJSON = infoJSON[key1];
					for(var key2 in infoChildJSON){
						if(key2 == 'attributeValue'){
							//alert(key2 +":"+JSON.stringify(infoChildJSON[key2]).replace(/\"/g, ""));
							displayText.push(JSON.stringify(infoChildJSON[key2]).replace(/\"/g, ""));
							$('#creativeTalentDisplay').text(displayText);
						}
					}
				}
		    }
		    if(typeof parent[child] == "object" && child == 'projectCrewDet'){
			       //console.log(',"' + child + '":' +JSON.stringify(parent[child]));
			       
			       var displayText = [];
					for (key1 in infoJSON) {
						//alert(key1 +'=' + JSON.stringify(infoJSON[key1]));
						//alert(JSON.stringify(infoJSON[key1].crewName + infoJSON[key1].crewRole + infoJSON[key1].crewEmail));
						
						var crewName = infoJSON[key1].crewName ? JSON.stringify(infoJSON[key1].crewName).replace(/\"/g, "") : "";
						var crewEmail = infoJSON[key1].crewEmail ? JSON.stringify(infoJSON[key1].crewEmail).replace(/\"/g, "") : "";
						var crewTalent = infoJSON[key1].crewRole ? JSON.stringify(infoJSON[key1].crewRole).replace(/\"/g, "") :"";
						var newRowContent = '<tr>';//<td style="width:12%"></td>
						newRowContent += '<td colspan="2">'+ crewName +'</td> ';
						newRowContent += '<td>'+ crewTalent +'</td>';
						newRowContent += '<td>'+ crewEmail +'</td>';
						newRowContent += '<td style="width:5%"><a href="#" onclick="deleteCurrentRow(this);" class="castandcrew-link"><i class="fa fa-times-circle"></i></a></td>';
						newRowContent += '</tr>';

						$("#addCastNCrewTbl tbody").append(newRowContent);
						
					}
			  }
		// for edit video project - Ends
		    
		// for video main page - Starts
		    if(typeof parent[child] == "object" && child == 'projectCrewDet'){
			       //console.log(',"' + child + '":' +JSON.stringify(parent[child]));
			       
			       //var displayText = [];
			       var newRowContent = '';
					for (key1 in infoJSON) {
						//alert(key1 +'=' + JSON.stringify(infoJSON[key1]));
						//alert(JSON.stringify(infoJSON[key1].crewName + infoJSON[key1].crewRole + infoJSON[key1].crewEmail));
						
						var crewName = infoJSON[key1].crewName ? JSON.stringify(infoJSON[key1].crewName).replace(/\"/g, "") : "";
						var crewEmail = infoJSON[key1].crewEmail ? JSON.stringify(infoJSON[key1].crewEmail).replace(/\"/g, "") : "";
						var crewTalent = infoJSON[key1].crewRole ? JSON.stringify(infoJSON[key1].crewRole).replace(/\"/g, "") :"";
						var emailParam = "'" + crewEmail + "'"
						newRowContent += '<li><div class="cast-thumb"><img src="assets/images/author-sm-img-01.jpg" alt=""/></div><div class="cast-desc"><a href="javascript:openUserProfile('+ emailParam +');" >'+ crewName +'</a></div><div class="cast-desc"><a href="#">'+ crewTalent +'</a></div></li>';
						displayText.push(newRowContent)
					}
					$("#projectCastCrewSec").append('<ul>' + newRowContent + '</ul>');
			  }
		// for video main page - Ends    
		    
		printList(parent[child], child);
		array.push("</ul></li>");
	}
}
function printArray(myArray) {
	for (var i = 0; i < myArray.length; i++) {
		//console.log(myArray[i]);
		if ($.type(myArray[i]) == "object") {
			getChildren(myArray[i]);
		} else {
			array.push("<li>" + myArray[i] + "</li>");
		}
	}
}
//printList(allData, "");
array.push("<ul>");
$("#list").html(array.join(""));
//Populating JSON into html - Ends

//scripts for fast select initial values autopopulate - starts
function populateFastSelect(element){
	var value = $(element).val();
	$( element ).attr( "value", value );
    var values = value.split(",");
    var initial = "";
	for(i = 0; i < values.length; i++){
		initial += '{"text": "'+ values[i] +'","value" : "' + values[i] +'"},';
	}	
	initial = initial.substring(0, initial.length - 1);
	$(element ).attr( "data-initial-value", '[' + initial + ']');
	$(element).fastselect();    	 
}
//scripts for fast select initial values autopopulate - Ends

//Parse the URL parameter to get the value by name - Start
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//Parse the URL parameter to get the value by name - Ends

//select single checkbox with same name - Starts
function toggleCheckBox(elem){
	//alert(elem.id);alert(elem.name);
	var elements = document.getElementsByName(elem.name);
	var elemLen = elements.length;
	for (var i = 0;i < elemLen; i++)
    {
		elements[i].checked = false;
    }
    document.getElementById(elem.id).checked = true;
}
//select single checkbox with same name - Ends

//get user details - Stars
function getUserProfileDetailsByEmail(emailParam){
	var userDetailsObj = '';
	var url = baseAPIUrlForQueries +'fot$UserDetails/userWithGivenEmail?withEmail='+emailParam;
	
	$.ajax({
      url: url,
      headers: {
          'Authorization': 'Bearer ' + oauthToken,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'GET',
      async: false,
      //contentType:'application/json',
      //dataType: 'json',
      success: function (data) {
    	  
		if (jQuery.isEmptyObject(data)) {
			console.log("User does not exists.");
		}else{
			userDetailsObj = data[0];
		}
      },
      error: function (response) {
        alert('error' + JSON.stringify(response.responseText));

      }
    }); 
	//alert(userDetailsObj)
	return userDetailsObj;
}
//get user details - Ends

//Open user profile page - Starts
function openUserProfile(userEmail){
	var userDetailsObj = getUserProfileDetailsByEmail(userEmail);
	if (jQuery.isEmptyObject(userDetailsObj)) {
		alert('User has no active profile.');
	}else{
		var userDetailsId = JSON.stringify(userDetailsObj.userDetailsId).replace(/\"/g, "");
		window.location = "profile_view.jsp?userDetailsId="+userDetailsId;
	}
}
//Open user profile page - Ends

//Bootstrap date picker - starts
$('.form_date').datetimepicker({
    language:  'en',
    weekStart: 1,
    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		startDate: '-0d', //this will disable the past date and time
		//endDate: '+0d',
		format: 'dd/mm/yyyy'
});

$('.form_datetime').datetimepicker({
	  	language:  'en',
    	weekStart: 1,
    	todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
      showMeridian: 1,
		//startDate: '-0d',
		format: 'dd/mm/yyyy hh:ii'
});

//datepicker - ends

//random code generator(Job code) - starts
function randString(x){
    var s = "";
    while(s.length<x&&x>0){
        var r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
    }
    return s;
}

//Random code generator - ends

//Allow only number - starts
function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
//Allow only number - Ends