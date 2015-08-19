/** 1520 Consulting code BEGIN **/

var restURL = "https://fairmarketing.cloudapp.net:8443/rest1.0/admin_endpoint.jsp?";
//var restURL = "http://localhost:8084/rest1.0/admin_endpoint.jsp?";

$(document).ready(function(){
    
});

$(window).load(function(){
    
    //Fill in the dynamic data
    console.log("going to get project data...");
    getProjectsList('admin',function(projectsList){
        changeProject(projectsList,0);
    });
    
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
                console.log(projectsList);
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
    
}

function setActiveHeading(selectedHeadingNum)
{
    var headings = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
    
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
/** 1520 Consulting code END **/
