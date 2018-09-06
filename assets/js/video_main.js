/**
 *  Add all the js functions related to video_main.jsp page here
 */
var oauthToken   = localStorage.getItem("oauthToken");

function onLoadAssignValues(){
	$('#name1').text($('#firstName').val());
	$('#name2').text($('#firstName').val());
	$('#name3').text($('#firstName').val());
	$('#family_name1').text($('#lastName').val());
	$('#family_name2').text($('#lastName').val());
	$('#family_name3').text($('#lastName').val());
}

function postUserComment(){
	if (!$.trim($('#userDetailsId').val())) {
        alert("Please Login to Comment.");
        return false;
     }
	if (!$.trim($('#comment').val())) {
        alert("Please Enter the Comments.");
        return false;
     }
	
	var comments = $('#comment').val();
	var userId = $('#userDetailsId').val();
	var userName = $('#name').val();
	var userEmail = $('#email').val();
	var projectId = $('#projectId').val();
	
	var commentObj =  '{ "userName": "' + userName + '", "userId": "' + userId + '", "userEmail": "' + userEmail  
					+ '", "userComment": "' + comments + '","projectDetails":{"id":"'+ projectId +'"}}';
	console.log(commentObj);
	
	$.ajax({

		url : baseAPIUrl + 'fot$ProjVideoCmnts',
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'POST',
		data : commentObj,
		async : false,
		//contentType : 'application/json',
		dataType : 'json',
		success : function(data) {			
			alert("Comments Posted but will be shown after approval.");
			//document.getElementById("loadingmessage").style.display = "none"; 
			//alert(JSON.stringify(data));
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

function onLoadShowComments(){
	var url = baseAPIUrlForQueries	+ 'fot$ProjVideoCmnts/getProjectComments?withProjectId='+ $('#projectId').val();
	//alert(url);
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
			var comments = '<ul class="cp-comments-listed">';    
			jQuery.each( data, function( i, val ) {
				  var comment = JSON.stringify(val['userComment']).replace(/\"/g, "");
				  var name = JSON.stringify(val['userName']).replace(/\"/g, "");
				  var email = JSON.stringify(val['userEmail']).replace(/\"/g, "");
				  
				  comments += '<li>	<div class="cp-author-info-holder">';
				  comments += '<div class="cp-thumb"><img src="assets/images/comments-img-07.png" alt=""></div>';
				  comments += '<div class="cp-text"><h4><a href="#">' + name + '</a></h4>';
				  comments += '	<p>' + comment + '</p>';
				  comments += '	<div class="cp-viewer-outer">';
				  comments += '	<a href="#"><i class="fa fa-thumbs-o-up"></i>59</a>';
				  comments += '	<a href="#"><i class="fa fa-thumbs-o-down"></i>13</a>';
				  comments += '	<a href="#">Reply 2</a>	</div></div></div></li>';
				  
			});
			comments += '</ul>';
			$('#commentsList').append(comments);
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	}); 
}

function printCommentList(data){
	JSON.stringify(data);
	
}