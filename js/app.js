/** 1520 Consulting code BEGIN **/

//var restURL = "http://fairmarketing.cloudapp.net/rest1.0/endpoint.jsp?";
var restURL = "http://localhost:8084/rest1.0/admin_endpoint.jsp?";

$(document).ready(function(){
    
});

$(window).load(function(){
    
    //Fill in the dynamic data
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
                var projectsArray = projectsList.split("|");
                for(var i=0; i<projectsArray.length; i++)
                {
                    var liString = '<li><a href="#" onclick="changeProject(\''+projectsList+'\',\''+i+'\');">'+projectsArray[i]+'</a></li>';
                    $("#projectsList").append(liString);
                }
            }
            callback(projectsList);
        }
    });
}

function changeProject(projects, indexLoc)
{
    var projectsArray = projects.split("|");
    //Change the project name on the page
    $("#projectName").html("<span><i class=\"ti-arrow-circle-left\"></i></span> the <strong>asset</strong> <span class=\"rh-bracket rh-bracket-left\">[</span> "+projectsArray[indexLoc]+" <span class=\"rh-bracket rh-bracket-left\">]</span>");
    
    //Go get the new data
    
}


/** 1520 Consulting code END **/