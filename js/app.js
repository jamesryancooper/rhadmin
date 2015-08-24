/** 1520 Consulting code BEGIN **/

var restURL = "https://fairmarketing.cloudapp.net:8443/rest1.0/admin_endpoint.jsp?";
//var restURL = "http://localhost:8084/rest1.0/admin_endpoint.jsp?";

$(document).ready(function(){
    
});

$(window).load(function(){
    
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
    var currentWeek = Math.ceil(d.getDate()/7);
    var currentMonth = d.getMonth()+1;
    var currentYear = d.getFullYear();
        currentYear = currentYear - 2013;
    
    document.getElementById('weekSelection').value = currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('yearSelection').value = currentYear;
    
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById('weekSelection').value = currentWeek;
    document.getElementById('weekSelectionText').innerHTML = "Week "+currentWeek;
    document.getElementById('monthSelection').value = currentMonth;
    document.getElementById('monthSelectionText').innerHTML = months[currentMonth-1];
    document.getElementById('yearSelection').value = currentYear;
    document.getElementById('yearSelectionText').innerHTML = 2013+currentYear;
    
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
    
    //Go get the new data
    var projectID = projectsArray[(indexLoc*2)+1];
    
    getProjectContentTypeCounts(projectID,function(countData){
        
        //Parse the countData and apply the contents to the headings
        var countDataArray = countData.split("|");
        for(var i=0; i<countDataArray.length; i=i+2)
        {
            var elementID = "#"+countDataArray[i]+"Count";
            var count = countDataArray[i+1];
            $(elementID).html(count);
        }
        
    });
    
    getProjectContentTableData(projectID,function(tableData){
        
    });
    
    //Update the mission piece counts
    updateMissionPieceCount(projectID,function(missionPieceData){
        
    });
    
    //Update the content goal counters
    updateContentGoalStatus(projectID,function(missionPieceData){
        
    });
}

function setActiveHeading(selectedHeadingNum)
{
    var headings = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
    var headingsTwo = ["blog","news","social","pressRelease","directory","video","image","forum","wiki","product"];
    
    //Set all to inactive
    for(var i=0; i<headings.length; i++)
    {
        var elementName1 = '#heading'+headings[i];
        $(elementName1).removeClass('selected');
    }
    
    //Set the current heading to active
    var currElementName1 = '#heading'+selectedHeadingNum;
    $(currElementName1).addClass('selected');
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('blogTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('directoryTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('forumTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('imageTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('newsTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('pressReleaseTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('productTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('socialTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('videoTable').innerHTML = tableHTML;
                
                
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
                    
                    var circleStyle = "";
                    var publishString = "";
                    
                    if(status == 'In Progress')
                    {
                        createDate = "In Progress"
                        circleStyle = "circle_warning";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else if(status == 'Incomplete')
                    {
                        circleStyle = "circle_danger";
                        publishDate = "Publish Now";
                        publishString = "";
                    }
                    else
                    {
                        circleStyle = "circle_success";
                        publishString = "Published: ";
                    }

                    tableHTML += '<ul class="rh-blueprint-type-table"><li class="xtra-narrow"><i class="ion ion-ios-cart-outline ordered"></i></li><li class="narrow">'+what+'</li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+createDate+'</li><li class="xtra-wide">Backlink: <strong>4</strong> | Anchor Type: 1 branded, 2 url, 1 generic</li><li class="wide">Outreach: <strong>22 options</strong> | DA: 55 <a href="#"><i class="ion ion-ios-eye-outline"></i></a></li><li class="narrow"><i class="fa fa-circle '+circleStyle+'"></i>'+publishDate+'</li><li class="wide"><span class="text-bold">'+publishString+'</span> <span class="text-lowercase text-light text-light">'+publishLocation+'</span></li><li class="xtra-narrow"><i class="fa fa-circle '+circleStyle+'"></i></li></ul>';
                }
                document.getElementById('wikiTable').innerHTML = tableHTML;
                
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
                document.getElementById('completeCount').innerHTML = complete;
                document.getElementById('incompleteCount').innerHTML = incomplete;
                document.getElementById('totalCount').innerHTML = total;
            }
            callback(returnData);
        }
    });
}

function updateWeekSelection(val)
{
    document.getElementById('weekSelection').value = val;
    document.getElementById('weekSelectionText').innerHTML = "Week "+val;
    
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

/** 1520 Consulting code END **/
