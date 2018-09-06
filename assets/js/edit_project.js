/**
 * Add all the js functions related to edit_project.jsp page here
 */

var oauthToken   = localStorage.getItem("oauthToken");

/* Method to save the project details */
function updateProject(formId) {
	$('#videoId').val(getVideoIdParameterByName('v'));

	var projectDetails = '#' + formId;
	//e.preventDefault();
	var data = JSON.stringify($(projectDetails).serializeFormJSON());
	var customData = getCustomData().concat(getCastCrewData());
	if (customData && customData != "") {
		data = data.substring(0, data.length - 1).concat(customData)+ "}";
	}
	//alert((data));
	
	$.ajax({
		url : baseAPIUrl + 'fot$ProjectVideoDet/' + $('#projectId').val(),
		type : 'put',
		data : data,
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		dataType : 'json',
		success : function(data) {
			//console.log(data);
			alert("Project details updated successfully");
			window.location = "profile_view.jsp";
		},
		error : function(data) {
			alert("update fail : " + JSON.stringify(data));
		}
	});
	
}

/*
 * Load project details for Edit 
 */
function onLoadEditProject(source) {
	var url = baseAPIUrlForQueries + 'fot$ProjectVideoDet/getProjectDetails?withProjectId='+ $('#projectId').val();
	//+'&videoTitle='+ $('#videoTitleParam').val();

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
			//Populating the html field values - function implementaion found in util.js
			printList(data, "");
			if(source && source == 'video_main'){
				 //$('#sub').val($('#cognitoUserId').val());
				 //Set IFrame src 
				 $('#videoUrl').attr('src', 'https://www.youtube.com/embed/'+ $('#videoId').val());	
				 onLoadGetCustomDetails();
				 onLoadAssignValues();
				 onLoadShowComments();
			}else{
				//Select video type radio
				onLoadselectVideoType();
				//Populate required data
				populateFastSelect('.langInput');
	        	populateFastSelect('.genreInput');
	        	populateFastSelect('.releaseYearInput');
	        	populateFastSelect('.tagsInput');
			}
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

function onLoadselectVideoType(){
    jQuery("input[value='"+ $('#videoType').val() +"']").attr('checked', true);
}