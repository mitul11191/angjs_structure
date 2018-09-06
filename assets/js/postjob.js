/**
 * Start - Add the related functionality of post_job.jsp here - Shanur
 */

var oauthToken   = localStorage.getItem("oauthToken");

//load subscription plans
function onLoadGetJobPlans(){
	$('#postedUser').val($('#sub').val());
	
	var url = baseAPIUrl + 'fot$JobSubscriptionPlans?view=jobSubscriptionPlans-view&sort=planPrice';

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
			printSubscriptionPlans(data);
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});
}

/* Populate the screen with job subscription plans */
function printSubscriptionPlans(data){
	//alert(data.length);
	  var plnDetailsDiv ='';
	  jQuery.each( data, function( i, val ) {
		  var title = JSON.stringify(val['planTitle']).replace(/\"/g, "");
		  var subTitle = JSON.stringify(val['planSubTitle']).replace(/\"/g, "");
		  var planAmount = JSON.stringify(val['planPrice']).replace(/\"/g, "");
		  var planCode = "'" + JSON.stringify(val['planCode']).replace(/\"/g, "") + "'";
		  var planDurationDays = JSON.stringify(val['planDuration']).replace(/\"/g, "");
		  
		    plnDetailsDiv += '<div class="col-md-4 col-sm-6 col-xs-12">';
			plnDetailsDiv += '<div class="postjob-step01">';
			plnDetailsDiv += '<h1 class="service-box-tit">'+ title +'</h1>';
			plnDetailsDiv += '<h3 class="service-box-subtit">' + subTitle + '</h3>';
			plnDetailsDiv += '<div class="service-price">&#8377; '+ planAmount +' <small>/ MONTH</small></div>';
			plnDetailsDiv += '<button class="btn postjob-sub-btn btn-postjob-primary nextBtn" type="button" onclick="selectJobSubscPlan('+ planCode +"," + planDurationDays +')">Subscription</button>';
			plnDetailsDiv += '<ul class="service-feature-list">';
			
			var services =  val['planServices'];
			//alert(services.length);
			jQuery.each( services, function( j, ser ) {
				var serCode = JSON.stringify(ser['jobServiceCode']).replace(/\"/g, "");
				var serDesc = JSON.stringify(ser['jobServiceDescription']).replace(/\"/g, "");
				plnDetailsDiv += '<li><span class="service-feature-content">'+serDesc+'</span></li>';
			})
			
			plnDetailsDiv += '</ul></div></div>';
			
	  });
	  $('#jobSubscriptionPlans').append(plnDetailsDiv);
	  
  }

function selectJobSubscPlan(plan, duration){
	//alert(plan);
	document.getElementById("jobCode").value = randString(10);
	$('#postedUser').val($('#sub').val());
	$('#jobPlan').val(plan);
	
	var days = duration;
	var date      = new Date();
    var next_date = new Date(date.setDate(date.getDate() + days));
    var formatted = next_date.getUTCFullYear() + '-' + padNumber(next_date.getUTCMonth() + 1) + '-' + padNumber(next_date.getUTCDate());
    //alert(formatted);
	$('#jobPostEndDate').val(formatted);
	return true;
}

function padNumber(number) {
    var string  = '' + number;
    string      = string.length < 2 ? '0' + string : string;
    return string;
}

function setAuditionRadio(attribute){
	var attributeVal = $('input[name='+ attribute.name +']:checked').val();
	$('#needAuditionVideo').val(attributeVal);
	return false;
}

function saveJobDetails(){
	$('#postedUser').val($('#userDetailsId').val());
	var jobDetailsForm = '#jobDetailsForm';
	var postedUserId = $('#postedUser').val();
	
	var jobData = JSON.stringify($(jobDetailsForm).serializeFormJSON());
	jobData = jobData.substring(0, jobData.length - 1) + ',"postedUserDet":{"id":"'+ postedUserId +'"}}';
	$.ajax({

		url : baseAPIUrl + 'fot$JobPostDetails',
		headers: {
            'Authorization': 'Bearer ' + oauthToken,
            'Content-Type': 'application/json'
        },
		type : 'POST',
		data : jobData,
		async : false,
		//contentType : 'application/json',
		dataType : 'json',
		success : function(data) {			
			alert("Job Posted.");
			//document.getElementById("loadingmessage").style.display = "none"; 
			//alert(JSON.stringify(data));
		},
		error : function(response) {
			alert('error' + JSON.stringify(response.responseText));

		}
	});

}

/* Comments here */
function loadCreativeTalent() {
	var url = baseAPIUrl + 'fot$CreativeTalAttributes?view=creativeTalAttributes-view&sort=talentAttribute';

	$.ajax({
		url : url,
		type : 'GET',
		async : false,
		contentType : 'application/json',
		//dataType: 'json',
		success : function(data) {
			//alert(JSON.stringify(data));
			//Clear the menus every time
			$('#creativeTalentRightDiv').html('');
			$('#creativeTalentLeftDiv').html('');
			
			var otherTalent = '<div class="tab-pane" id="tab_OtherTechnicians">';
			otherTalent += '<div class="custom-form-ele">';
			otherTalent += '<div class="form-group">';
			otherTalent += '<div class="row">';
			otherTalent += '<div class="col-md-12 col-xs-12">';
			otherTalent += '<label for="filter">Other Technicians</label>';
			otherTalent += '<input class="form-control" type="text" id="OtherTechnicians" name="OtherTechnicians">';
			otherTalent += '</div></div></div></div></div>'
				
				leftMenu = '';
				rightMenu = '';
				
				//Populating the menu field values - function
				printTalent(data, "");
				
				$('#creativeTalentRightDiv').append(rightMenu  + '</div></div>' + otherTalent );
				
				$('#creativeTalentLeftDiv').append(leftMenu + '<li><a href="#tab_OtherTechnicians" data-toggle="pill">Other Technicians</a></li></ul>');

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
		}
	}
}

$('#doneBtn').click(function(e) {
	var checks = [];
	var checksHidden = [];
	$('#creativeTalentDisplay').text('');
	$('#jobTalent').val('');
	
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
    	$('#jobTalent').val('');
    }else {
    	$('#jobTalent').val(checks);
    	$('#creativeTalentDisplay').text(checks);
    	//alert(checks);
    }
});

//sliders - starts
//Range slider
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 1,
      max: 100,
      values: [ 15, 60 ],
      slide: function( event, ui ) {
        $( "#minAge" ).val( ui.values[ 0 ]) ;
		$( "#maxAge" ).val( ui.values[ 1 ]) ;
      }
    });
    $( "#minAge" ).val( $( "#slider-range" ).slider( "values", 0 ) );
	$( "#maxAge" ).val( $( "#slider-range" ).slider( "values", 1 ) );
  } );
  
//single slider
  $( function() {
	    $( "#slider" ).slider({
	      value:1,
	      min: 0,
	      max: 80,
	      step: 1,
	      slide: function( event, ui ) {
	        $( "#yearofExperience" ).val( ui.value );
	      }
	    });
	    $( "#yearofExperience" ).val( $( "#slider" ).slider( "value" ) );
	  } );
  
//sliders - ends  