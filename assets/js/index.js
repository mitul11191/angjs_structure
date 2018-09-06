/**
 * Add all the js functions related to index.jsp
 */

var oauthToken   = localStorage.getItem("oauthToken");

/* DB call to load the project related to that user */
function onLoadGetApprovedProjectList(){
 	 	var url = baseAPIUrlForQueries +'fot$ProjectVideoDet/getAllApprovedProjList';
 		$.ajax({
          url: url,
          headers: {
              'Authorization': 'Bearer ' + oauthToken,
              'Content-Type': 'application/json'
          },
          type: 'GET',
          async: false,
          //contentType:'application/json',
          //dataType: 'json',
          success: function (data) {
          	//alert(JSON.stringify(data));    
        	
        	  printApprovedProjects(data, "");
          },
          error: function (response) {
            console.log('error' + JSON.stringify(response.responseText));

          }
        }); 
     }

/* Populate the screen view video projects in tiles view dynamically */
function printApprovedProjects(data, key){
	//alert(data.length);
	  var content ='';
	  jQuery.each( data, function( i, val ) {
		  //content += $("#singleProjectli").clone().html();
		  var title = JSON.stringify(val['videoTitle']).replace(/\"/g, "");
		  var link = JSON.stringify(val['videoId']).replace(/\"/g, "");
		  var projectId = JSON.stringify(val['id']).replace(/\"/g, "");
		  content += '<li class="col-md-4 col-sm-4 col-xs-12"><div class="cp-video-item-fot"><h4 class="video-tit">';
		  content += '<a href="video_main.jsp?projectId='+projectId+'">'+ title +'</a></h4>';
		  content += '<div class="view view-first"><img src="https://img.youtube.com/vi/'+link+'/mqdefault.jpg" class="img-responsive" alt="">';
		  content += '<div class="mask"><div class="video-item-curator-actions"><ul> <li><span class="info">1546</span> <span class="icon-sec"><img class="icon-img" src="assets/images/icon-like.png" width="27px" height="27px" alt=""/></span></li>';
		  content += '<li><span class="info">34457</span><span class="icon-sec"><img class="icon-img" src="assets/images/icon-view.png" width="27px" height="27px" alt=""/></span></li>';
		  content += '<li><span class="icon-sec"><a href="#"><img class="icon-img" src="assets/images/icon-more.png" width="27px" height="27px" alt=""/></a></span></li>';
		  content += '</ul></div></div></div><div class="video-author-media"><div class="media-right"><div class="media-left">';
		  content += '<a href="#"><img src="assets/images/default_profile.png" /></a></div><div class="media-right"><a href="#" class=""> Punith Kumar</a>';
		  content += '</div></div><div class="video-skill-set">Direction, Cinematography, Acting....</div></div></div></li>';
	  	  //alert(content);
	  });
	  $('#allApprovedProjectli').append(content);
	  
  }
