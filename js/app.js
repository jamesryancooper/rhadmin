/** 1520 Consulting code BEGIN **/

var restURL = "https://fairmarketing.cloudapp.net:8443/rest1.0/admin_endpoint.jsp?";
//var restURL = "http://localhost:8084/rest1.0/admin_endpoint.jsp?";

var blueprintmenu = "<div class='rh-blueprint-type-head creation-side'><div class='rh-blueprint-type-headings-title'>Content Creation</div><ul class='rh-blueprint-type-headings'><li class='width-10 cart-icon-hd'><i class='icon-rh_addtocart'></i></li><li class='width-20'>What to Create</li><li class='width-50'>How to Optimize It</li><li class='width-20'>When Created</li></ul></div><div class='rh-blueprint-type-head publication-side'><div class='rh-blueprint-type-headings-title'>Content Publication</div><ul class='rh-blueprint-type-headings'><li class='width-35'>Where to Publish</li><li class='width-35'>Where Published</li><li class='width-20'>When Published</li><li class='width-10'>Status</li></ul></div>";

$(document).ready(function(){
    
});

$(window).load(function(){
    /*
    //Fill in the dynamic project
    getProjectsList('admin',function(projectsList){
        changeProject(projectsList,0);
    });
    
    //Fill in the dynamic notifications
    getNotifications('admin',function(notificationsList){
        //updateNotifications(notificationsList);
    })
    
    //Fill in the dynamic comments
    getComments('admin',function(commentsList){
        //updateNotifications(notificationsList);
    })
    
    //Update the week, month and year dropdowns
    var d = new Date();
   // var currentWeek = Math.ceil(d.getDate()/7);
    var currentWeek = "All Weeks";
    var currentMonth = d.getMonth()+1;
    var currentYear = d.getFullYear();
        currentYear = currentYear - 2013;
    
    document.getElementById('weekSelection').value = currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('yearSelection').value = currentYear;
    
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById('weekSelection').value = currentWeek;
   // document.getElementById('weekSelectionText').innerHTML = "Week "+currentWeek;
    document.getElementById('weekSelectionText').innerHTML = currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('monthSelectionText').innerHTML = months[currentMonth-1];
    document.getElementById('yearSelection').value = currentYear;
    document.getElementById('yearSelectionText').innerHTML = 2013+currentYear;
    */
});

function getProjectsList(userID,callback)
{
    var projectsList = "";
    $.ajax({url: restURL, data: {'command':'getProjectsList','userid':userID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            if(info.status == "success")
            {
                //Fill in the projects list
                projectsList = info.projects;
                var projectsArray = projectsList.split("|");
                var locCounter = 0;
                for(var i=0; i<projectsArray.length; i=i+2)
                {
                    var liString = '<li><a href="#" onclick="changeProject(\''+projectsList+'\',\''+locCounter+'\');">'+projectsArray[i]+'</a></li>';
                    $("#projectsList").append(liString);
                    locCounter++;
                }
            }
            callback(projectsList);
        }
    });
}

function getProjectContentTypeCounts(projectID,callback)
{
    var countData = "";
    $.ajax({url: restURL, data: {'command':'getProjectContentTypesCompletedCount','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            if(info.status == "success")
            {
                //Return the count data
                countData = info.countdata;
            }
            callback(countData);
        }
    });
}

function changeProject(projects, indexLoc)
{
    var projectsArray = projects.split("|");
    //Change the project name on the page
    $("#projectName").html("<span><i class=\"ti-arrow-circle-left\"></i></span> the <strong>asset</strong> <span class=\"rh-bracket rh-bracket-left\">[</span> "+projectsArray[(indexLoc*2)]+" <span class=\"rh-bracket rh-bracket-left\">]</span>");
    
    var projectID = projectsArray[(indexLoc*2)+1];
    
    //Also set the hidden input value
    document.getElementById('selectedProjectID').value = projectID;
    
    
    
    //Get all of the blueprints for this project, with keyword, cost, location and counts data
    getBlueprints(projectID,function(blueprintsList){
        //updateNotifications(notificationsList);
    })
    
    //Set sliders
    /*var slider_content = new Slider("#content-r ", {
            reversed : true
    });

    var slider_budget = new Slider("#budget-r", {
            reversed : true
    });
    var slider_month = new Slider("#month-r", {
            reversed : true
    });*/
    
    //Go get the new data
    /*getProjectContentTypeCounts(projectID,function(countData){
        
        //Parse the countData and apply the contents to the headings
        var countDataArray = countData.split("|");
        for(var i=0; i<countDataArray.length; i=i+2)
        {
            var elementID = "#"+countDataArray[i]+"Count";
            var count = countDataArray[i+1];
            $(elementID).html(count);
        }
        
    });*/
    
    //Update the week, month and year dropdowns
    var d = new Date();
    var currentWeek = Math.ceil(d.getDate()/7);
    var currentMonth = d.getMonth()+1;
    var currentYear = d.getFullYear();
        currentYear = currentYear - 2013;
    
    document.getElementById('weekSelection').value = currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('yearSelection').value = currentYear;
    
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById('weekSelection').value = currentWeek;
	//if(currentWeek == "All"){document.getElementById('weekSelectionText').innerHTML = currentWeek;}else{ document.getElementById('weekSelectionText').innerHTML = "Week "+currentWeek;}
    document.getElementById('weekSelectionText').innerHTML = "Week "+currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('monthSelectionText').innerHTML = months[currentMonth-1];
    document.getElementById('yearSelection').value = currentYear;
    document.getElementById('yearSelectionText').innerHTML = 2013+currentYear;
    
    /*getProjectContentTableData(projectID,function(tableData){
        
    });*/
    
    //Update the mission piece counts
    /*updateMissionPieceCount(projectID,function(missionPieceData){
        
    });*/
    
    //Update the content goal counters
    /*updateContentGoalStatus(projectID,function(contentGoalData){
        
    });*/
}

function setActiveHeading(selectedHeadingNum, blueprintID)
{
    var headings = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
   // var headingsTwo = ["blog","news","social","pressRelease","directory","video","image","forum","wiki","product"];

    var currElementName1 = '#heading'+selectedHeadingNum+'_'+blueprintID;
    var  set_selected = true;
    
    if($(currElementName1).hasClass('selected')){
        set_selected = false;
    }
    
    //Set all to inactive
    for(var i=0; i<headings.length; i++)
    {
        var elementName1 = '#heading'+headings[i]+'_'+blueprintID;
        $(elementName1).removeClass('selected');
    }
    
    $('.rh-blueprint-types-menu li').removeClass('selected');
    
    
    //Set the current heading to active
    if(set_selected){
        $(currElementName1).addClass('selected');
        $('.rh-blueprint-types-menu li a[href=#collapse'+selectedHeadingNum+'_'+blueprintID+']').parent().addClass('selected');
    }
}

function getNotifications(userID,callback)
{
    var notificationsList = "";
    $.ajax({url: restURL, data: {'command':'getNotifications','userid':userID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            
            if(info.status == "success")
            {
                var count = info.notifications.length;

                //Update the count on the bell
                document.getElementById('notificationsCount').innerHTML = count;

                for(var i=0; i<count; i++)
                {
                    var entry = info.notifications[i];

                    var divStyle = entry.div_style;
                    var liStyle = entry.li_style;
                    var content = entry.content;
                    var postDate = entry.post_date;

                    var liString = '<li><a href="#"><div class="'+divStyle+'"><span><i class="'+liStyle+'"></i></span></div><span class="text_info">'+content+'</span><span class="time_info">'+postDate+'</span></a></li>';
                    $("#notificationsList").append(liString);
                }

                //Put the "view all" li item in
                var finalString = '<li><a href="#" class="last_info">See all notifications</a></li>';
                $("#notificationsList").append(finalString);
            }
            callback(notificationsList);
        }
    });
}

function getComments(userID,callback)
{
    var commentsList = "";
    $.ajax({url: restURL, data: {'command':'getComments','userid':userID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            
            if(info.status == "success")
            {
                var count = info.comments.length;

                //Update the count on the badge
                document.getElementById('commentsCount').innerHTML = count;

                for(var i=0; i<count; i++)
                {
                    var entry = info.comments[i];

                    var fromUser = entry.from_user;
                    var content = entry.content;
                    var postDate = entry.post_date;

                    var liString = '<li><a href="#"><span class="avatar_left"><img src="images/avatar.jpeg" alt=""></span><span class="text_info"><strong>'+fromUser+':&nbsp;</strong>'+content+'</span><span class="time_info">'+postDate+'<i class="online ion-record"></i></span></a></li>';
                    $("#commentsList").append(liString);
                }
            }
            callback(commentsList);
        }
    });
}

function getProjectContentTableData(projectID,callback)
{
    $.ajax({url: restURL, data: {'command':'getContentTables','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            var tableData = "";
			
            
            if(info.status == "success")
            {
                var blogCount = info.Blog.length;
                var directoryCount = info.Directory.length;
                var forumCount = info.Forum.length;
                var imageCount = info.Image.length;
                var newsCount = info.News.length;
                var pressReleaseCount = info.PressRelease.length;
                var productCount = info.Product.length;
                var socialCount = info.Social.length;
                var videoCount = info.Video.length;
                var wikiCount = info.Wiki.length;

                //Blog table
				
					
				
				
                var tableHTML = "";	
				
                for(var i=0; i<blogCount; i++)
                {
                    var entry = info.Blog[i];
                    var what = "Blog";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
                    var j = Math.floor((Math.random() * blogCount));
                    var status1 = info.Blog[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "";
                        publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
                    
                    /*if(status1 == 'In Progress')
                    {
                        createDate1 = "In Progress"
                        circleStyle1 = "circle_warning";
                        circleStyle1 = "circle_success";				
                        publishDate1 = "Publish Now";
                        publishString1 = "";
                    }
                    else */
					if(status1 == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";

                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('blogTable').innerHTML = tableHTML;
				document.getElementById('TableMenu1').innerHTML = blueprintmenu;
                
                
                //Directory table
                var tableHTML = "";
                for(var i=0; i<directoryCount; i++)
                {
                    var entry = info.Directory[i];

                    var what = "Directory";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * directoryCount));
                    var status1 = info.Directory[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						 publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					/* if(status1 == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle1 = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status1 == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('directoryTable').innerHTML = tableHTML;
				document.getElementById('TableMenu5').innerHTML = blueprintmenu;
                
                
                //Forum table
                var tableHTML = "";
                for(var i=0; i<forumCount; i++)
                {
                    var entry = info.Forum[i];

                    var what = "Forum";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * forumCount));
                    var status1 = info.Forum[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						 publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/* if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else  */if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul> </div>';
                }
                document.getElementById('forumTable').innerHTML = tableHTML;
				document.getElementById('TableMenu8').innerHTML = blueprintmenu;
                
                
                //Image table
                var tableHTML = "";
                for(var i=0; i<imageCount; i++)
                {
                    var entry = info.Image[i];

                    var what = "Image";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * imageCount));
                    var status1 = info.Image[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						 publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/* if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul> </div>';
                }
                document.getElementById('imageTable').innerHTML = tableHTML;
				document.getElementById('TableMenu7').innerHTML = blueprintmenu;
                
                
                //News table
                var tableHTML = "";
                for(var i=0; i<newsCount; i++)
                {
                    var entry = info.News[i];

                    var what = "News";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * newsCount));
                    var status1 = info.News[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/*  if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('newsTable').innerHTML = tableHTML;
				document.getElementById('TableMenu2').innerHTML = blueprintmenu;
                
                
                //Press release table
                var tableHTML = "";
                for(var i=0; i<pressReleaseCount; i++)
                {
                    var entry = info.PressRelease[i];

                    var what = "Press Release";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * pressReleaseCount));
                    var status1 = info.PressRelease[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/*  if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul> </div>';
                }
                document.getElementById('pressReleaseTable').innerHTML = tableHTML;
				document.getElementById('TableMenu4').innerHTML = blueprintmenu;
                
                
                //Product table
                var tableHTML = "";
                for(var i=0; i<productCount; i++)
                {
                    var entry = info.Product[i];

                    var what = "Product";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * productCount));
                    var status1 = info.Product[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/* if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('productTable').innerHTML = tableHTML;
				document.getElementById('TableMenu10').innerHTML = blueprintmenu;
                
                
                //Social table
                var tableHTML = "";
                for(var i=0; i<socialCount; i++)
                {
                    var entry = info.Social[i];

                    var what = "Social";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * socialCount));
                    var status1 = info.Social[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					 
                   /*  if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('socialTable').innerHTML = tableHTML;
				document.getElementById('TableMenu3').innerHTML = blueprintmenu;
                
                
                //Video table
                var tableHTML = "";
                for(var i=0; i<videoCount; i++)
                {
                    var entry = info.Video[i];

                    var what = "Video";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * videoCount));
                    var status1 = info.Video[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					
					/*  if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else  */if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul></div>';
                }
                document.getElementById('videoTable').innerHTML = tableHTML;
				document.getElementById('TableMenu6').innerHTML = blueprintmenu;
                
                
                //Wiki table
                var tableHTML = "";
                for(var i=0; i<wikiCount; i++)
                {
                    var entry = info.Wiki[i];

                    var what = "Wiki";
                    var createDate = entry.create_date;
                    var publishDate = entry.publish_date;
                    var publishLocation = entry.publish_location;
                    var status = entry.status;
					var j = Math.floor((Math.random() * wikiCount));
                    var status1 = info.Wiki[j].status;
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        //publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        //publishDate = "Publish Now";
                        publishString = "";
						publishString = "Create Now";
                        createDate = "Create Now";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        //publishString = "Published: ";
                    }
					 
                   /*  if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else */ if(status == 'Incomplete')
                    {
                        circleStyle1 = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle1 = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<div class="table-row-outer"><ul class="rh-blueprint-type-table creation-side"><li class="width-10"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="width-20">'+what+'</li><li class="width-50">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="width-20 '+circleStyle+'"><i class="fa fa-circle "></i>'+createDate+'</li></ul><ul class="rh-blueprint-type-table publication-side"><li class="width-35">Outreach: <strong>22 options</strong> | DA: <strong>55</strong> <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="width-35"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="width-20 '+circleStyle1+'"><i class="fa fa-circle "></i>'+publishDate+'</li><li class="width-10"><div class="fa fa-circle first-status '+circleStyle1+'"><span class="fa fa-circle '+circleStyle+'"></span></div></li></ul> </div>';
                }
                document.getElementById('wikiTable').innerHTML = tableHTML;
				document.getElementById('TableMenu9').innerHTML = blueprintmenu;
                
            }
            callback(tableData);
        }
    });
}

function updateMissionPieceCount(projectID,callback)
{
    var returnData = "";
    
    var weekSelection = document.getElementById('weekSelection').value;
    var monthSelection = document.getElementById('monthSelection').value;
    var yearSelection = document.getElementById('yearSelection').value;
        
    $.ajax({url: restURL, data: {'command':'getMissionPieceCount','projectid':projectID,'week':weekSelection,'month':monthSelection,'year':yearSelection}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            
            if(info.status == "success")
            {
                var count = info.contentTarget;
                
                //Update the count in the heading
                document.getElementById('contentTarget').innerHTML = count;
            }
            callback(returnData);
        }
    });
}

function updateContentGoalStatus(projectID,callback)
{
    var returnData = "";
    
    $.ajax({url: restURL, data: {'command':'getContentGoalStatus','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);
            
            if(info.status == "success")
            {
                var complete = info.complete;
                var incomplete = info.incomplete;
                var total = parseInt(complete)+parseInt(incomplete);
                
                //Update the count in the heading
                document.getElementById('completeCount').innerHTML = complete+"<span class=\"rh-blueprint-status\">complete</span>";                
                document.getElementById('incompleteCount').innerHTML = incomplete+"<span class=\"rh-blueprint-status\">incomplete</span>";
                document.getElementById('totalCount').innerHTML = total;
            }
            callback(returnData);
        }
    });
}

function updateWeekSelection(val)
{
    document.getElementById('weekSelection').value = val;
   // document.getElementById('weekSelectionText').innerHTML = "Week "+val;
    if(val == "All"){document.getElementById('weekSelectionText').innerHTML = val+" Weeks";}else{ document.getElementById('weekSelectionText').innerHTML = "Week "+val;}
    //Update the mission piece counts
    var projectID = document.getElementById('selectedProjectID').value;
    updateMissionPieceCount(projectID,function(){
    });
}

function updateMonthSelection(val)
{
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    document.getElementById('monthSelection').value = val;
    document.getElementById('monthSelectionText').innerHTML = months[parseInt(val)-1];
    
    //Update the mission piece counts
    var projectID = document.getElementById('selectedProjectID').value;
    updateMissionPieceCount(projectID,function(){
    });
}

function updateYearSelection(val)
{
    document.getElementById('yearSelection').value = val;
    document.getElementById('yearSelectionText').innerHTML = 2013+parseInt(val);
    
    //Update the mission piece counts
    var projectID = document.getElementById('selectedProjectID').value;
    updateMissionPieceCount(projectID,function(){
    });
}

function validateBlueprint()
{
    var projectID = document.getElementById('selectedProjectID').value;
    var keyword = document.getElementById('blueprintKeyword').value;
    var location = document.getElementById('blueprintLocation').value;
    
    console.log("projectid = "+projectID);
    console.log("keyword = "+keyword);
    console.log("location = "+location);
    
    if(projectID == '' || projectID == '0' || keyword.trim() == '' || location.trim() == '')
    {
        alert("Error: You must enter a keyword phrase and location in order to create a new blueprint for this product.");
        return false;
    }
    else
    {
        var returnData = "";
    
        $.ajax({url: restURL, data: {'command':'quickCreateBlueprint','projectid':projectID,'keywords':keyword,'georegion':location}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    //Not sure what to do yet; should we go ahead and request Cognitive data? Auto-classify all of the links?
                }
                callback(returnData);
            }
        });
    }
}

function getBlueprints(projectID,callback)
{
    var blueprintsList = "";
    $.ajax({url: restURL, data: {'command':'getProjectBlueprints','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            
            var info = JSON.parse(returnData);
            
            if(info.status == "success")
            {
                //Remove the existing blueprints
                $("#blueprintsList").empty();
                
                var count = info.blueprints.length;

                for(var i=0; i<count; i++)
                {
                    var entry = info.blueprints[i];

                    var blueprintID = entry.id;
                    var keyword = entry.keyword;
                    var georegion = entry.georegion;
                    var cost = entry.cost;
                    var googlerank = entry.google_rank;
                    var yahoorank = entry.yahoo_rank;
                    var bingrank = entry.bing_rank;
                    var completecontent = entry.complete_content;
                    var percentcomplete = entry.percent_complete;
                    var incompletecontent = entry.incomplete_content;
                    
                    var liString = buildBlueprintHTML(blueprintID, keyword, georegion, cost, googlerank, yahoorank, bingrank, completecontent, percentcomplete, incompletecontent);
                    $("#blueprintsList").append(liString);
                }

                //Put the quick create blueprint item in the list
                var finalString = getBlueprintQuickCreateHTML();
                $("#blueprintsList").append(finalString);
            }
            callback(blueprintsList);
        }
    });
}

function toggleLeftMenu(blueprintID)
{
    var el = document.getElementById('left-menu_'+blueprintID);
    
    if(el.style.display == 'none')
    {
        console.log('got here');
        el.style.display = 'block';
    }
    else
    {
        el.style.display = 'none';
    }
}

function buildBlueprintHTML(blueprintID, keyword, georegion, cost, googlerank, yahoorank, bingrank, completecontent, percentcomplete, incompletecontent)
{
    var output = "<li class=\"collection-item\">\n" +
"              <div class=\"panel\">\n" +
"                <div class=\"panel-heading\">\n" +
"                  <div class=\"row\">\n" +
"                    <div class=\"col-lg-4 rh-right-border rh-column rh-blueprint\">\n" +
"                      <ul>\n" +
"                        <li class=\"rh-blueprint-settings piluku-dropdown dropdown\"> <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"ion ion-android-menu\"></i></a>\n" +
"                          <ul id=\"left-menu_"+blueprintID+"\" class=\"dropdown-menu dropdown-piluku-menu animated fadeInUp wow language-drop neat_drop blueprints_option-drop\" data-wow-duration=\"1500ms\" role=\"menu\">\n" +
"                            <li>\n" +
"                              <h2 class=\"headding-drop2\">Blueprint Strategy</h2>\n" +
"                              <a data-toggle=\"collapse\" href=\"#menu-click1_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click1_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Aggression Levels</a>\n" +
"							  <a  data-toggle=\"collapse\" href=\"#menu-click2_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click2_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Location & Competitors</a>\n" +
"							  <a  data-toggle=\"collapse\" href=\"#menu-click3_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click3_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Content & Backlink Template</a>\n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click4_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click4_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Retail Pricing Template</a>\n" +
"							  </li>\n" +
"                            <li>\n" +
"                              <h2 class=\"headding-drop2\">Content</h2>\n" +
"                              <a data-toggle=\"collapse\" href=\"#menu-click5_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click5_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Order Content</a>\n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click6_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click6_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Manage Content</a> \n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click7_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click7_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Export Content Order</a> \n" +
"							  </li>\n" +
"                            <li>\n" +
"                              <h2 class=\"headding-drop2\">Run Report</h2>\n" +
"                              <a data-toggle=\"collapse\" href=\"#menu-click8_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click8_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Historical Rankings</a> \n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click9_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click9_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Published Content</a> \n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click10_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click10_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Content Goal Status</a> \n" +
"							  <a data-toggle=\"collapse\" href=\"#menu-click11_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click11_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Download Blueprint</a>\n" +
"							  </li>\n" +
"                          </ul>\n" +
"                        </li>\n" +
"                        <li  class=\"rh-blueprint-info\"> <a href=\"#\" class=\"rh-blueprint-name\">"+keyword+"</a>\n" +
"                          <ul class=\"rh-blueprint-options\">\n" +
"                            <li><a data-toggle=\"collapse\" href=\"#menu-click1_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click1_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\" class=\"show-link-box rh-blueprint-budget\"><i class=\"icon-rh_budget\"></i>"+cost+"</a></li>\n" +
"                            <li><a data-toggle=\"collapse\" href=\"#menu-click2_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click2_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\" class=\"show-link-box rh-blueprint-location\"><i class=\"icon-rh_location\"></i>"+georegion+"</a></li>\n" +
"                            \n" +
"                          </ul>\n" +
"                        </li>\n" +
"                      </ul>\n" +
"                    </div>\n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-rank\"> <span class=\"rh-column-heading\">Search Engine <span class=\"rh-alt-color\">Rank</span></span>\n" +
"                      <ul>\n" +
"                        <!-- Changes For point #6 :Start-->\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click8_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click8_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box\">\n" +
"                          <div class=\"icon-rh_google social-icon-count\"> <span class=\"path1\"></span><span class=\"path2\"></span> </div>\n" +
"                          <span>"+googlerank+"</span></li>\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click8_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click8_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box\">\n" +
"                          <div class=\"icon-rh_yahoo social-icon-count\"> <span class=\"path1\"></span><span class=\"path2\"></span> </div>\n" +
"                          <span>"+yahoorank+"</span></li>\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click8_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click8_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box\">\n" +
"                          <div class=\"icon-rh_bing social-icon-count\"> <span class=\"path1\"></span><span class=\"path2\"></span> </div>\n" +
"                          <span>"+bingrank+"</span></li>\n" +
"                        <!-- Changes For point #6 :End-->\n" +
"                      </ul>\n" +
"                    </div>\n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-chart\" >\n" +
"                      <h2 data-toggle=\"modal\" data-target=\"#myModal\">PUBLISHED CONTENT</h2>\n" +
"                      <div id=\"chart_div\" data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click9_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click9_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box\"></div>\n" +
"                      <span class=\"rh-column-heading\"><span class=\"rh-alt-color\">You</span> vs. Them</span> </div>\n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-goals show_on_expand\"><span class=\"rh-column-heading\">Content <span class=\"rh-alt-color\">Goal</span> Status</span>\n" +
"                      <ul>\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click10_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click10_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box rh-blueprint-complete\">\n" +
"                          <p class=\"rh-blueprint-num\" id=\"completeCount_\">"+completecontent+"<span class=\"rh-blueprint-status\">complete</span> </p>\n" +
"                        </li>\n" +
"                        <li class=\"rh-blueprint-goal-arrow\"><i class=\"ion ion-ios-arrow-right\"></i></li>\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click10_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click10_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box rh-blueprint-goal\"><span class=\"rh-blueprint-num\" id=\"totalCount_\">"+(parseInt(completecontent)+parseInt(incompletecontent))+"</span></li>\n" +
"                        <li class=\"rh-blueprint-goal-arrow\"><i class=\"ion ion-ios-arrow-left\"></i></li>\n" +
"                        <li data-parent=\"#accordion-menus_"+blueprintID+"\" aria-controls=\"menu-click10_"+blueprintID+"\" aria-expanded=\"false\" href=\"#menu-click10_"+blueprintID+"\" data-toggle=\"collapse\" class=\"show-link-box rh-blueprint-incomplete\">\n" +
"                          <p class=\"rh-blueprint-num\" id=\"incompleteCount_\">"+incompletecontent+" <span class=\"rh-blueprint-status\">incomplete</span></p>\n" +
"                        </li>\n" +
"                      </ul>\n" +
"                      <div class=\"cart-section\"><span class=\"icon-rh_cart\"></span> </div>\n" +
"                    </div>\n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-goals-head show_on_collapse\">\n" +
"                      <h2 class=\"goal-headding\">CONTENT GOAL STATUS </h2>\n" +
"                    </div>\n" +
"                    \n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-open show_on_expand\"> <a data-toggle=\"collapse\" href=\"#menu-click12_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click12_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\" class=\"panel-minimize\"> Expand Blueprint<i class=\"icon ti-angle-right \"></i> </a> </div>\n" +
"                    <div class=\"col-lg-2 rh-right-border rh-column rh-blueprint-close show_on_collapse\"> <a data-toggle=\"collapse\" href=\"#menu-click12_"+blueprintID+"\" aria-expanded=\"false\" aria-controls=\"menu-click12_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\" class=\"panel-minimize\"> Collapse Blueprint<i class=\"icon icon-rh_close\"></i> </a> </div>\n" +
"                    <div class=\"blueprints-process\">\n" +
"                      <div class=\"progress progress-bar-mini\">\n" +
"                        <div style=\"width: "+percentcomplete+";\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\""+percentcomplete.replace("%","")+"\" role=\"progressbar\" class=\"progress-bar progress-bar-primary three-sec-ease-in-out\" title=\""+percentcomplete+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                  </div>\n" +
"                </div>\n" +
"               \n" +
"				<div class=\"panel-group\" id=\"accordion-menus_"+blueprintID+"\" role=\"tablist\" aria-multiselectable=\"true\">			\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click1_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"                          <ol class=\"breadcrumb\">\n" +
"                            <li><a data-toggle=\"collapse\" href=\"#menu-click12_"+blueprintID+"\" aria-controls=\"menu-click12_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Blueprint Strategy</a></li>\n" +
"                            <li class=\"active\">Aggression Levels</li>\n" +
"                          </ol>\n" +
"\n" +
"						  <div class=\"row\">\n" +
"                            <div class=\"col-md-6\">\n" +
"                              <h5>To publish <span class=\"label label-primary\">36</span> content pieces per month, at a cost of <span class=\"label label-success\">$3,200</span> per month, it will take you <span class=\"label label-danger\">52</span> months to catch your competition.</h5>\n" +
"                              <ul class=\"range-outer\">\n" +
"							  <li class=\"content-bg\"><input id=\"content-r\" type=\"text\" data-slider-min=\"5\" data-slider-max=\"100\" data-slider-step=\"1\" data-slider-value=\"0\" data-slider-orientation=\"vertical\"  data-slider-ticks=\"[0,50,100]\" data-slider-ticks-labels=\"['min', 'you', 'max']\" data-slider-ticks-positions=\"[0,50,100]\" data-slider-handle=\"square\"  /> <h4 class=\"range-txt\">CONTENT / MO. </h4></li>\n" +
"							  <li class=\"budget-bg\"><input id=\"budget-r\" type=\"text\" data-slider-min=\"-5\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"-3\" data-slider-orientation=\"vertical\" data-slider-tooltip=\"hide\" data-slider-handle=\"square\" data-slider-ticks=\"[0,50,100]\" data-slider-ticks-labels=\"['min', 'you', 'max']\" data-slider-ticks-positions=\"[0,50,100]\" /><h4 class=\"range-txt\">BUDGET / MO. <span>EditCostTemplate</span> </h4> </li>\n" +
"							  <li class=\"month-bg\"><input id=\"month-r\" type=\"text\" data-slider-min=\"-5\" data-slider-max=\"20\" data-slider-step=\"1\" data-slider-value=\"-3\" data-slider-orientation=\"vertical\" data-slider-tooltip=\"hide\" data-slider-handle=\"square\" data-slider-ticks=\"[0,50,100]\" data-slider-ticks-labels=\"['min', 'you', 'max']\" data-slider-ticks-positions=\"[0,50,100]\"/> <h4 class=\"range-txt\">MONTHS To CATCH </h4></li>\n" +
"                            </div>\n" +
"                            <div class=\"col-md-6\">\n" +
"                              <h5>Budget and Time to Catch Log</h5>\n" +
"                              <p>Last edited on: <span id=\"time-to-catch-log\">September 17, 2015</span> <i class=\"ion ion-ios-eye-outline icon-show fa-2x\"></i> <button class=\"btn-gray btn-radius btn-xs\">View Revision History</button></p>\n" +
"                              <div class=\"row row-v-spacing\">\n" +
"                                <div class=\"col-md-6 no-gutter-left\">\n" +
"                                  <div class=\"info-one whitebg-info greybd-info\">\n" +
"                                    <p>Notes: <br />This is a spot for notes in case multiple people are managing the blueprint.</p>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-6 no-gutter-right\">\n" +
"                                  <div class=\"info-one greybg-info whitebd-info\">\n" +
"                                    <p>Alerts: <br />Your competitors strategy has changed, you may want to refresh this blueprint.</p>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                              <div class=\"row row-v-spacing\">\n" +
"                                <div class=\"col-md-offset-4 col-md-8 no-gutter-right  right-align\">\n" +
"                                  <button class=\"btn btn-orange\">\n" +
"                                    <span>Save Changes</span>\n" +
"                                  </button>\n" +
"                                  <button class=\"btn btn-gray\">\n" +
"                                    Cancel\n" +
"                                  </button>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                            </div>\n" +
"                          </div>\n" +
"\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click2_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						  <h1>Location and Competition</h1>\n" +
"                          <table class=\"table table-bordered table-striped datatable responsive\" id=\"table-competitor\">\n" +
"                            <thead>\n" +
"                            <tr>\n" +
"                              <th class=\"text-center\">Include</th>\n" +
"                              <th class=\"text-center\">Rank</th>\n" +
"                              <th>Competitor Domain</th>\n" +
"                              <th class=\"text-center\">Domain Authority</th>\n" +
"                              <th>Ranking URL</th>\n" +
"                              <th class=\"text-center\">Page Authority</th>\n" +
"                              <th>Backlinks</th>\n" +
"                            </tr>\n" +
"                            </thead>\n" +
"                            <tbody>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">1</td>\n" +
"                              <td>abacusplumbing.net</td>\n" +
"                              <td class=\"text-center\">58</td>\n" +
"                              <td><a href=\"http://abacusplumbing.net/some-url-on-site.html\" target=\"_blank\">abacusplumbing.net/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">11</td>\n" +
"                              <td>53,450</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">2</td>\n" +
"                              <td>rotorooter.com</td>\n" +
"                              <td class=\"text-center\">64</td>\n" +
"                              <td><a href=\"http://rotorooter.com/some-url-on-site.html\" target=\"_blank\">rotorooter.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">33</td>\n" +
"                              <td>53,450</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">3</td>\n" +
"                              <td>angieslist.com</td>\n" +
"                              <td class=\"text-center\">55</td>\n" +
"                              <td><a href=\"http://angieslist.com/some-url-on-site.html\" target=\"_blank\">angieslist.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">14</td>\n" +
"                              <td>623,987</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">4</td>\n" +
"                              <td>wikipedia.org</td>\n" +
"                              <td class=\"text-center\">99</td>\n" +
"                              <td><a href=\"http://wikipedia.org/some-url-on-site.html\" target=\"_blank\">wikipedia.org/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">43</td>\n" +
"                              <td>13,876,320</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">5</td>\n" +
"                              <td>villageplumbing.com</td>\n" +
"                              <td class=\"text-center\">45</td>\n" +
"                              <td><a href=\"http://villageplumbing.com/some-url-on-site.html\" target=\"_blank\">villageplumbing.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">23</td>\n" +
"                              <td>3,245</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">6</td>\n" +
"                              <td>yellowpages.com</td>\n" +
"                              <td class=\"text-center\">96</td>\n" +
"                              <td><a href=\"http://yellowpages.com/some-url-on-site.html\" target=\"_blank\">yellowpages.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">12</td>\n" +
"                              <td>675,321</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">7</td>\n" +
"                              <td>theplumbingsolution.net</td>\n" +
"                              <td class=\"text-center\">57</td>\n" +
"                              <td><a href=\"http://theplumbingsolution.net/some-url-on-site.html\" target=\"_blank\">theplumbingsolution.net/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">22</td>\n" +
"                              <td>1,267</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">8</td>\n" +
"                              <td>happyplumber.com</td>\n" +
"                              <td class=\"text-center\">58</td>\n" +
"                              <td><a href=\"http://happyplumber.com/some-url-on-site.html\" target=\"_blank\">happyplumber.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">36</td>\n" +
"                              <td>988</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">9</td>\n" +
"                              <td>localplumbing.com</td>\n" +
"                              <td class=\"text-center\">67</td>\n" +
"                              <td><a href=\"http://localplumbing.com/some-url-on-site.html\" target=\"_blank\">localplumbing.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">33</td>\n" +
"                              <td>450</td>\n" +
"                            </tr>\n" +
"                            <tr>\n" +
"                              <td class=\"text-center\">\n" +
"                                <div class=\"make-switch switch-small\" data-on=\"success\" data-off=\"default\" data-on-label=\"Yes\" data-off-label=\"No\">\n" +
"                                  <input type=\"checkbox\" checked>\n" +
"                                </div>\n" +
"                              </td>\n" +
"                              <td class=\"text-center\">10</td>\n" +
"                              <td>houstonplumbing.com</td>\n" +
"                              <td class=\"text-center\">56</td>\n" +
"                              <td><a href=\"http://houstonplumbing.com/some-url-on-site.html\" target=\"_blank\">houstonplumbing.com/some-url-on-site.html</a></td>\n" +
"                              <td class=\"text-center\">44</td>\n" +
"                              <td>3,250</td>\n" +
"                            </tr>\n" +
"                            </tbody>\n" +
"                          </table>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click3_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"                            <h1>Content Filters</h1>\n" +
"\n" +
"                            <!-- Filters -->\n" +
"                            <form id=\"filters\" class=\"tab-pane rh-blueprint-settings-pane\">\n" +
"\n" +
"                              <div class=\"row well well-sm \">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Filter Templates</h5>\n" +
"                                  <span>Load a previously saved filter template or save your current filter settings as a template.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-3\">\n" +
"                                  <div class=\"heading-select\">\n" +
"                                    <label class=\"control-label\">Load Filter Template</label>\n" +
"                                    <select name=\"test\" class=\"selectboxit form-control\" data-native=\"true\" data-text=\"Select filter\">\n" +
"                                      <option value=\"seo-moz-filter\">SEO Moz Filter</option>\n" +
"                                      <option value=\"guest-blog-only-filter\">Guest Blog Only Filter</option>\n" +
"                                      <option value=\"social-filter\">Social Filter</option>\n" +
"                                      <option value=\"seo-moz-filter\">Abacus Plumbing Filter</option>\n" +
"                                    </select>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-6 col-md-push-3\">\n" +
"                                  <p>Save current settings as a new filter template</p>\n" +
"                                  <a href=\"javascript:;\" onclick=\"jQuery('#filter-templates').modal('show', {backdrop: 'static'});\"><button type=\"button\" class=\"btn btn-info\">Save</button></a>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Domain Filters</h5>\n" +
"                                  <span>You may restrict the backlinks withing your competitor's backlink profiles to only include backlinks originating from a designated list of domains. You may also exclude backlinks originating from a list of domains.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-6\">\n" +
"                                  <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"backlinks-domain-include\">\n" +
"                                  <label for=\"backlinks-domain-include\"><div>Include</div></label>\n" +
"                                  <p>Only include backlinks originating from the following list of domains.</p>\n" +
"                                  <div>\n" +
"                                    <textarea class=\"form-control autogrow\" id=\"keywords-list\" placeholder=\"Enter one domain per line\"></textarea>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-6\">\n" +
"                                  <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"backlinks-domain-exclude\">\n" +
"                                  <label for=\"backlinks-domain-exclude\"><div>Exclude</div></label>\n" +
"                                  <p>Exclude backlinks originating from the following list of domains.</p>\n" +
"                                  <div>\n" +
"                                    <textarea class=\"form-control autogrow\" id=\"field-ta\" placeholder=\"Enter one domain per line\"></textarea>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Health Filters</h5>\n" +
"                                  <span>Include backlinks that are tagged with the following health parameters.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow inline-check\" id=\"health-filter-natural\" checked>\n" +
"                                  <label for=\"health-filter-natural\">Natural</label>\n" +
"\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input tabindex=\"6\" type=\"checkbox\" class=\"icheckbox_square-yellow inline-check\" id=\"health-filter-unnatural\">\n" +
"                                  <label for=\"health-filter-unnatural\">Unnatural</label>\n" +
"\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input type=\"checkbox\" class=\"icheckbox_square-yellow inline-check\" id=\"health-filter-suspicious\">\n" +
"                                  <label for=\"health-filter-suspicious\">Suspicious</label>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input type=\"checkbox\" class=\"icheckbox_square-yellow inline-check\" id=\"health-filter-disavowed\">\n" +
"                                  <label for=\"health-filter-disavowed\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"Selecting the Disavowed filter will include a list of disavowed backlinks in this roadmap. Deselecting the Disavowed filter will exclude a list of disavowed links from this roadmap. Click the edit icon to modify the list of disavowed backlinks.\" data-original-title=\"Disavowed Filter\">Disavowed<a href=\"javascript:;\" onclick=\"jQuery('#health-filter-disavowed-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Link Flow Filters</h5>\n" +
"                                  <span>Include backlinks that are tagged with the following link flow parameters.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input tabindex=\"6\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"flow-filter-dofollow\" checked>\n" +
"                                  <label for=\"flow-filter-dofollow\">DoFollow</label>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"flow-filter-nofollow\">\n" +
"                                  <label for=\"flow-filter-nofollow\">NoFollow</label>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <input tabindex=\"6\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"flow-filter-sitewide\">\n" +
"                                  <label for=\"flow-filter-sitewide\">Sitewide</label>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Content Type Filters</h5>\n" +
"                                  <span>Include backlinks of the following content types.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-blog\" checked>\n" +
"                                      <label for=\"content-filter-blog\">Blog</label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input tabindex=\"6\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-news\" checked>\n" +
"                                      <label for=\"content-filter-news\">News</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-social\" checked>\n" +
"                                      <label for=\"content-filter-social\">Social</label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-press-release\" checked>\n" +
"                                      <label for=\"content-filter-press-release\">Press Release</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-directory\">\n" +
"                                      <label for=\"content-filter-directory\">Directory</label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-video\" checked>\n" +
"                                      <label for=\"content-filter-video\">Video</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-image\" checked>\n" +
"                                      <label for=\"content-filter-image\">Image</label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-forum\">\n" +
"                                      <label for=\"content-filter-forum\">Forum</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-wiki\">\n" +
"                                      <label for=\"content-filter-wiki\">Wiki</label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-product\">\n" +
"                                      <label for=\"content-filter-product\">Product</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"content-filter-article\">\n" +
"                                      <label for=\"content-filter-article\">Article</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Anchor Type Filters</h5>\n" +
"                                  <span>Include backlinks of the following anchor types.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group\">\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input tabindex=\"5\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-url\" checked>\n" +
"                                      <label for=\"anchor-filter-url\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The URL filter will tag anchor text that has specific URLs in it. Click the edit icon to modify the list of URLs.\" data-original-title=\"URL Filter\">URL<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-url-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input tabindex=\"6\" type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-exact\" checked>\n" +
"                                      <label for=\"anchor-filter-exact\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Exact filter will tag anchor text that exactly matches certain phrases. Click the edit icon to modify the list of phrases.\" data-original-title=\"Exact Filter\">Exact<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-exact-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-partial\">\n" +
"                                      <label for=\"anchor-filter-partial\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Partial filter will tag anchor text that contains one or more keywords from a list of designated keywords. Click the edit icon to modify the list of keywords.\" data-original-title=\"Partial Filter\">Partial<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-partial-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-brand\" checked>\n" +
"                                      <label for=\"anchor-filter-brand\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Branded filter will tag anchor text that contains any of the designated brand terms. Click the edit icon to modify the list of brand terms.\" data-original-title=\"Branded Filter\">Branded<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-brand-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-action\" checked>\n" +
"                                      <label for=\"anchor-filter-action\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Action filter will tag anchor text that has specific action terms in it. Click the edit icon to modify the list URLs.\" data-original-title=\"Action Filter\">Action<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-action-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-image\" checked>\n" +
"                                      <label for=\"anchor-filter-image\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Image filter will tag images.\" data-original-title=\"Image Filter\">Image</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <ul class=\"icheck-list\">\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-local\" checked>\n" +
"                                      <label for=\"anchor-filter-local\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Local filter will tag anchor text that has specific locations in it. Click the edit icon to modify the list of locations.\" data-original-title=\"Local Filter\">Local<a href=\"javascript:;\" onclick=\"jQuery('#anchor-filter-local-settings').modal('show', {backdrop: 'static'});\"><sup><i class=\"entypo-pencil\"></i></sup></a></label>\n" +
"                                    </li>\n" +
"                                    <li>\n" +
"                                      <input type=\"checkbox\" class=\"icheckbox_square-yellow\" id=\"anchor-filter-other\">\n" +
"                                      <label for=\"anchor-filter-other\" data-toggle=\"popover\" data-trigger=\"hover\" data-placement=\"top\" data-content=\"The Other filter will tag anchor text that has not otherwise been classified.\" data-original-title=\"Other Filter\">Other</label>\n" +
"                                    </li>\n" +
"                                  </ul>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <!-- Authority Filters -->\n" +
"                              <div  class=\"row well well-sm\">\n" +
"                                <div class=\"col-md-12\">\n" +
"                                  <h5>Authority Filters</h5>\n" +
"                                  <span>Include only backlinks originating from sites with a Domain Authority score greater than.</span>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                              <div class=\"row form-group slider-container\">\n" +
"                                <div class=\"col-md-8\">\n" +
"                                  <br /><br /><br />\n" +
"                                  <div class=\"authority-slider\"></div>\n" +
"                                  <br />\n" +
"                                  <h6 class=\"text-center\">SET DOMAIN AUTHORITY SCORE</h6>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-3 col-md-push-1 text-center\">\n" +
"                                  <div class=\"tile-stats tile-white tile-white-primary\">\n" +
"                                    <h4>DOMAIN AUTHORITY</h4>\n" +
"                                    <div class=\"authority-slider-result\"></div>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"\n" +
"                            </form>\n" +
"                            <!-- End Content Filters -->\n" +
"\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"                    <!-- Start Retail Pricing Templates -->\n" +
"					<div class=\"panel panel-default rh-retail-template\">\n" +
"						<div id=\"menu-click4_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"                          <ol class=\"breadcrumb\">\n" +
"                            <li><a data-toggle=\"collapse\" href=\"#menu-click12_"+blueprintID+"\" aria-controls=\"menu-click12_"+blueprintID+"\" data-parent=\"#accordion-menus_"+blueprintID+"\">Blueprint Strategy</a></li>\n" +
"                            <li class=\"active\">Retail Pricing Template</li>\n" +
"                          </ol>\n" +
"                          <div class=\"row right-align\">\n" +
"                            <div class=\"col-md-12\">\n" +
"                              <p>This screen allows you to modify the retail price per content piece by loading an existing retail price template or creating a new one. <i class=\"ion-ios-information-outline iconc-info\"></i></p>\n" +
"                            </div>\n" +
"                          </div>\n" +
"                          <div class=\"row row-v-spacing rh-alert\">\n" +
"                            <div class=\"col-md-12\">\n" +
"                              <div class=\"row alert alert bg-warning text-black\">\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <strong>Current Retail Price Template</strong>\n" +
"                                  <span class=\"piluku-dropdown dropdown\">\n" +
"                                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\" id=\"retailTemplateSelectionText\">Average Markup</a>\n" +
"                                    <ul class=\"dropdown-menu dropdown-piluku-menu animated fadeInUp wow language-drop neat_drop\" data-wow-duration=\"1500ms\" role=\"menu\">\n" +
"                                      <li><a href=\"#\">25% Markup</a></li>\n" +
"                                      <li><a href=\"#\">50% Markup</a></li>\n" +
"                                      <li><a href=\"#\">100% Markup</a></li>\n" +
"                                      <li><a href=\"#\">Authority Package Markup</a></li>\n" +
"                                      <li><a href=\"#\">Average Markup</a></li>\n" +
"                                    </ul>\n" +
"                                  </span>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <strong>Blueprints Applied</strong>\n" +
"                                  <p>12</p>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-2\">\n" +
"                                  <strong>In This Project</strong>\n" +
"                                  <p>4</p>\n" +
"                                </div>\n" +
"                                <div class=\"col-md-6 right-align\">\n" +
"                                  <p><i class=\"ion-alert-circled iconc-info\"></i><strong>Changing your retail pricing template will affect all projects and blueprints in which it is currently applied.</strong></p>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                            </div>\n" +
"                          </div>\n" +
"                          <div class=\"row row-v-spacing\">\n" +
"                            <div class=\"col-md-6\">\n" +
"                              <p>Now Viewing <a href=\"#\">Mid-High Markup</a> Template</p>\n" +
"                            </div>\n" +
"                            <div class=\"col-md-6 right-align\">\n" +
"                              <p>View Edit Log <i class=\"ion ion-ios-eye-outline icon-show fa-2x\"></i></p>\n" +
"                            </div>\n" +
"                          </div>\n" +
"                          <div class=\"row row-v-spacing\">\n" +
"                            <div class=\"col-md-4\">\n" +
"                              <div class=\"info-one greybg-info greybd-info\">\n" +
"                                <div class=\"row\">\n" +
"                                  <div class=\"col-md-6 left-align\">\n" +
"                                    <span class=\"rh-rt-heading\">OFFSITE</span><br />\n" +
"                                    <span class=\"rh-rt-type\">BLOGS</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-6 right-align\">\n" +
"                                    <span class=\"rh-rt-heading\">VENDOR</span><br />\n" +
"                                    <span class=\"piluku-dropdown dropdown rh-rt-vendor\">\n" +
"                                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\" id=\"retailVendorSelectionText\">Rank Hacker</a>\n" +
"                                      <ul class=\"dropdown-menu dropdown-piluku-menu animated fadeInUp wow language-drop neat_drop\" data-wow-duration=\"1500ms\" role=\"menu\">\n" +
"                                        <li><a href=\"#\">Internal</a></li>\n" +
"                                        <li><a href=\"#\">Guest Blogs R Us</a></li>\n" +
"                                        <li><a href=\"#\">Rank Hacker</a></li>\n" +
"                                      </ul>\n" +
"                                    </span>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                                <div class=\"row row-v-spacing\">\n" +
"                                  <div class=\"col-md-3 center-align\">\n" +
"                                    <span class=\"rh-rt-cost\">$50</span><br />\n" +
"                                    <span class=\"rh-rt-heading\">COST</span><br />\n" +
"                                    <a href=\"#\">Edit</a>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-6 center-align no-gutter\">\n" +
"                                    <span class=\"rh-bracket rh-bracket-left\">[</span><span class=\"rh-rt-markup\">100%</span><span class=\"rh-bracket rh-bracket-right\">]</span><br />\n" +
"                                    <span class=\"rh-rt-heading\">MARKUP</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-3 center-align\">\n" +
"                                    <span class=\"rh-rt-retail\">$100</span><br />\n" +
"                                    <span class=\"rh-rt-heading\">RETAIL</span><br />\n" +
"                                    <a href=\"#\">Edit</a>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                            </div>\n" +
"                            <div class=\"col-md-4\">\n" +
"                              <div class=\"info-one greybg-info greybd-info\">\n" +
"                                <div class=\"row\">\n" +
"                                  <div class=\"col-md-6 left-align\">\n" +
"                                    <span>OFFSITE</span><br />\n" +
"                                    <span>NEWS</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-6 right-align\">\n" +
"                                    <span>VENDOR</span><br />\n" +
"                                    <a href=\"#\">Rank Hacker</a>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>$100</span><br />\n" +
"                                    <span>COST</span><br />\n" +
"                                    <a href=\"#\">Edit Vendor Cost</a>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>[</span>100%<span>]</span><br />\n" +
"                                    <span>MARGIN</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>$200</span><br />\n" +
"                                    <span>RETAIL</span><br />\n" +
"                                    <a href=\"#\">Click $ to Edit Retail</a>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                            </div>\n" +
"                            <div class=\"col-md-4\">\n" +
"                              <div class=\"info-one greybg-info greybd-info\">\n" +
"                                <div class=\"row\">\n" +
"                                  <div class=\"col-md-6 left-align\">\n" +
"                                    <span>OFFSITE</span><br />\n" +
"                                    <span>SOCIAL</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-6 right-align\">\n" +
"                                    <span>VENDOR</span><br />\n" +
"                                    <a href=\"#\">Rank Hacker</a>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>$25</span><br />\n" +
"                                    <span>COST</span><br />\n" +
"                                    <a href=\"#\">Edit Vendor Cost</a>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>[</span>100%<span>]</span><br />\n" +
"                                    <span>MARGIN</span>\n" +
"                                  </div>\n" +
"                                  <div class=\"col-md-4 center-align\">\n" +
"                                    <span>$50</span><br />\n" +
"                                    <span>RETAIL</span><br />\n" +
"                                    <a href=\"#\">Click $ to Edit Retail</a>\n" +
"                                  </div>\n" +
"                                </div>\n" +
"                              </div>\n" +
"                            </div>\n" +
"                          </div>\n" +
"\n" +
"						</div>\n" +
"					</div>\n" +
"                    <!-- End Pricing Templates -->\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click5_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Order Content</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click6_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Manage Content</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click7_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Export Content Order</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"				\n" +
"				\n" +
"				<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click8_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Historical Rankings</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click9_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Published Content</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click10_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Content Goal Status</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"\n" +
"					<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click11_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"						<h1>Download Blueprint</h1>\n" +
"						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. </p>\n" +
"						</div>\n" +
"					</div>\n" +
"					\n" +
"				<div class=\"panel panel-default\">\n" +
"						<div id=\"menu-click12_"+blueprintID+"\" class=\"panel-collapse collapse menu-content-boxs\" role=\"tabpanel\" >\n" +
"					\n" +
"					<div class=\"panel-body blueprint-expand-outer\">\n" +
"                  <div class=\"row rh-blueprint-types\">\n" +
"                    <div class=\"col-lg-2 blueprint-set-outer\"> <span class=\"piluku-dropdown dropdown\"> <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Offsite</a>\n" +
"                      <ul class=\"dropdown-menu dropdown-piluku-menu animated fadeInUp wow language-drop neat_drop\" data-wow-duration=\"1500ms\" role=\"menu\">\n" +
"                        <li><a href=\"#\">Offsite</a></li>\n" +
"                        <li><a href=\"#\">Onsite</a></li>\n" +
"                      </ul>\n" +
"                      </span> Content Types </div>\n" +
"                    <div class=\"col-lg-8\">\n" +
"                      <ul class=\"rh-blueprint-types-menu\">\n" +
"                        <li class=\"selected\"><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseOne_"+blueprintID+"\" onclick=\"setActiveHeading('One','"+blueprintID+"');\">Blogs</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseTwo_"+blueprintID+"\" onclick=\"setActiveHeading('Two','"+blueprintID+"');\">News</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseThree_"+blueprintID+"\" onclick=\"setActiveHeading('Three','"+blueprintID+"');\">Social</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseFour_"+blueprintID+"\" onclick=\"setActiveHeading('Four','"+blueprintID+"');\">Press Releases</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseFive_"+blueprintID+"\" onclick=\"setActiveHeading('Five','"+blueprintID+"');\">Directories</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseSix_"+blueprintID+"\" onclick=\"setActiveHeading('Six','"+blueprintID+"');\">Videos</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseSeven_"+blueprintID+"\" onclick=\"setActiveHeading('Seven','"+blueprintID+"');\">Images</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseEight_"+blueprintID+"\" onclick=\"setActiveHeading('Eight','"+blueprintID+"');\">Forum</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseNine_"+blueprintID+"\" onclick=\"setActiveHeading('Nine','"+blueprintID+"');\">Wiki</a></li>\n" +
"                        <li><a data-parent=\"#accordion_"+blueprintID+"\" data-toggle=\"collapse\" href=\"#collapseTen_"+blueprintID+"\" onclick=\"setActiveHeading('Ten','"+blueprintID+"');\">Product</a></li>\n" +
"                      </ul>\n" +
"                    </div>\n" +
"                    <div class=\"col-lg-2  rh-blueprint-goals rh-nav-goals\">\n" +
"                      <ul>\n" +
"                        <li class=\"rh-blueprint-complete\">\n" +
"                          <p class=\"rh-blueprint-num\" id=\"completeCount\">"+completecontent+"<span class=\"rh-blueprint-status\">complete</span> </p>\n" +
"                        </li>\n" +
"                        <li class=\"rh-blueprint-goal-arrow\"><i class=\"ion ion-ios-arrow-right\"></i></li>\n" +
"                        <li class=\"rh-blueprint-goal\"><span class=\"rh-blueprint-num\" id=\"totalCount\">"+(parseInt(completecontent)+parseInt(incompletecontent))+"</span></li>\n" +
"                        <li class=\"rh-blueprint-goal-arrow\"><i class=\"ion ion-ios-arrow-left\"></i></li>\n" +
"                        <li class=\"rh-blueprint-incomplete\">\n" +
"                          <p class=\"rh-blueprint-num\" id=\"incompleteCount\">"+incompletecontent+" <span class=\"rh-blueprint-status\">incomplete</span></p>\n" +
"                        </li>\n" +
"                      </ul>\n" +
"                    </div>\n" +
"                    <div class=\"cart-section\"><span class=\"icon-rh_cart\"></span> </div>\n" +
"                    <!--For Point #10 : Remove Other Stuff--> \n" +
"                    <!--<div class=\"col-lg-2\">other stuff</div>--> \n" +
"                  </div>\n" +
"				\n" +
"                  <div class=\"panel-group piluku-accordion rh-blueprint-type-data accordion-outer\" id=\"accordion_"+blueprintID+"\" role=\"tablist\" aria-multiselectable=\"true\">\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading selected\" role=\"tab\" id=\"headingOne_"+blueprintID+"\"> <span class=\"panel-title\"> <a data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseOne_"+blueprintID+"\" onclick=\"setActiveHeading('One','"+blueprintID+"');\" aria-expanded=\"true\" aria-controls=\"collapseOne_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i> <span class=\"rh-blueprint-type-count\" id=\"blogCount_"+blueprintID+"\">0</span>Blogs </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 75%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseOne_"+blueprintID+"\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne_"+blueprintID+"\">\n" +
"\n" +
"\n" +
"                        <div id=\"TableMenu1_"+blueprintID+"\"> </div>\n" +
"					    <div class=\"panel-body\" id=\"blogTable_"+blueprintID+"\"> </div>\n" +
"\n" +
"\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingTwo_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseTwo_"+blueprintID+"\" onclick=\"setActiveHeading('Two','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseTwo_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"newsCount_"+blueprintID+"\">0</span>News </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 40%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseTwo_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo_"+blueprintID+"\">\n" +
"					   <div id=\"TableMenu2_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"newsTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingThree_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseThree_"+blueprintID+"\" onclick=\"setActiveHeading('Three','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseThree_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"socialCount_"+blueprintID+"\">0</span>Social </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2>25%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseThree_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingThree_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu3_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"socialTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingFour_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseFour_"+blueprintID+"\" onclick=\"setActiveHeading('Four','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseFour_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"pressReleaseCount_"+blueprintID+"\">0</span>Press Releases </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 55%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseFour_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingFour_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu4_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"pressReleaseTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingFive_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseFive_"+blueprintID+"\" onclick=\"setActiveHeading('Five','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseFive_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"directoryCount_"+blueprintID+"\">0</span>Directories </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 12%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseFive_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingFive_"+blueprintID+"\">\n" +
"					     <div id=\"TableMenu5_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"directoryTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingSix_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseSix_"+blueprintID+"\" onclick=\"setActiveHeading('Six','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseSix_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"videoCount_"+blueprintID+"\">0</span>Videos </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 33%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseSix_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingSix_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu6_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"videoTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingSeven_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseSeven_"+blueprintID+"\" onclick=\"setActiveHeading('Seven','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseSeven_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"imageCount_"+blueprintID+"\">0</span>Images </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 94%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseSeven_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingSeven_"+blueprintID+"\">\n" +
"					   <div id=\"TableMenu7_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"imageTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingEight_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseEight_"+blueprintID+"\" onclick=\"setActiveHeading('Eight','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseEight_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"forumCount_"+blueprintID+"\">0</span>Forum </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 5%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseEight_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingEight_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu8_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"forumTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingNine_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseNine_"+blueprintID+"\" onclick=\"setActiveHeading('Nine','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseNine_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"wikiCount_"+blueprintID+"\">0</span>Wiki </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 75%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseNine_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingNine_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu9_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"wikiTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                    <div class=\"panel panel-default\">\n" +
"                      <div class=\"panel-heading\" role=\"tab\" id=\"headingTen_"+blueprintID+"\"> <span class=\"panel-title\"> <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion_"+blueprintID+"\" href=\"#collapseTen_"+blueprintID+"\" onclick=\"setActiveHeading('Ten','"+blueprintID+"');\" aria-expanded=\"false\" aria-controls=\"collapseTen_"+blueprintID+"\"> <i class=\"ion ion-android-arrow-dropright col-close\"></i><i class=\"ion-android-arrow-dropdown col-open\"></i><span class=\"rh-blueprint-type-count\" id=\"productCount_"+blueprintID+"\">0</span>Product </a> </span>\n" +
"                        <div class=\"blogprocess\">\n" +
"                          <h2> 56%</h2>\n" +
"                        </div>\n" +
"                      </div>\n" +
"                      <div id=\"collapseTen_"+blueprintID+"\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTen_"+blueprintID+"\">\n" +
"					    <div id=\"TableMenu10_"+blueprintID+"\"> </div>\n" +
"                        <div class=\"panel-body\" id=\"productTable_"+blueprintID+"\"> </div>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                  </div>\n" +
"                </div>\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"\n" +
"              </div>\n" +
"              </div>\n" +
"              </div>\n" +
"\n" +
"\n" +
"\n" +
"			 </div>\n" +
"            </li>";

    return output;
}

function getBlueprintQuickCreateHTML()
{
    var output = "<li>\n" +
"              <div class=\"row blue_print\">\n" +
"                <div class=\"col-lg-1 rh-column rh-blueprint\">\n" +
"                  <ul>\n" +
"                    <li class=\"menu\"> <a href=\"#\"><i class=\"ion ion-android-menu\"></i></a> </li>\n" +
"                  </ul>\n" +
"                </div>\n" +
"                <div class=\"col-lg-5 rh-right-border rh-column rh-blueprint\">\n" +
"                  <input type=\"text\" class=\"bp_form-control\" placeholder=\"Enter Keyword Phrase\" id=\"blueprintKeyword\">\n" +
"                </div>\n" +
"                <div class=\"col-lg-3 rh-column rh-blueprint-chart\">\n" +
"                  <input type=\"text\" class=\"bp_form-control\" placeholder=\"Enter Location\" id=\"blueprintLocation\">\n" +
"                </div>\n" +
"                <div class=\"col-lg-3 rh-right-border rh-column create_bp\"> <a href=\"#\" class=\"panel-minimize\" onclick=\"return validateBlueprint();\"> + Create Blueprint </a> </div>\n" +
"              </div>\n" +
"            </li>";
    
    return output;
}


$('#createAccountButton').click(registerUser);

$('#loginButton').click(loginUser);

$('#recoverButton').click(remindPassword);

function loginUser()
{
    console.log('got here');
    var username = document.getElementById('icon_prefix-2').value;
    var password = document.getElementById('icon_prefix-3').value;
    
    if(username == '' || password == '')
    {
        alert("Please complete all required fields.");
        return false;
    }
    else
    {
        $.ajax({url: restURL, data: {'command':'loginUser','username':username,'password':password}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    //Not sure what to do yet; what is the app landing page?
                    document.cookie="username="+username;
                    document.location='projects.html';
                }
                else
                {
                    alert("Error: Invalid username and/or password.");
                }
            }
        });
    }
}

function registerUser()
{
    var firstname = document.getElementById('icon_prefix').value;
    var lastname = document.getElementById('icon_prefix-1').value;
    var username = document.getElementById('icon_prefix-2').value;
    var password = document.getElementById('icon_prefix-3').value;
    var email = document.getElementById('icon_prefix-4').value;
    
    if(username == '' || password == '')
    {
        alert("Please complete all required fields.");
        return false;
    }
    else
    {
        $.ajax({url: restURL, data: {'command':'registerUser','firstname':firstname,'lastname':lastname,'username':username,'password':password,'email':email}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    document.location='signin.html';
                }
                else
                {
                    alert("Error: Username already exists in the system.");
                }
            }
        });
    }
}

function remindPassword()
{
    var email = document.getElementById('remind-email').value;
    
    var targetURL = restURL + "command=remindPassword&username="+email+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            if(responseData.status == "success")
            {
                alert("Please check your email for a message from SSD Fair Marketing containing a new password for your account.");
                document.getElementById("forgot").style.display = "none";
            }
            else
            {
                alert("Error: We were unable to find an account under that email address.");
            }
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

/** 1520 Consulting code END **/



