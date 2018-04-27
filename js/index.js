$(function(){
  $('#wowsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#wowapidata').html('<div id="loader"><img src="https://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    
    var username = $('#wowusername').val();
       var requri   = 'https://us.api.battle.net/wow/character/stormrage/'+username+ 'locale=en_US&apikey=f98d652fdxvtjmnjf8gvvyumgp82sfmt';
    // var requri   = 'https://us.api.battle.net/'+username;
    // var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#wowapidata').html("<h2>No Player Info Found</h2>");
      }
      
      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.thumbnail;
        // var profileurl = json.html_url;
        var location   = json.realm;
        var level = json.level;
        var achive = json.achievementPoints;
        var gender     = json.gender;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="wowcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Current Level: '+level+' - Achievements: '+achieve+'<br>Gender: '+gender+'</p></div>';
        outhtml = outhtml + '<div class="wowlist clearfix">';
        
        var api;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No player!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Players List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="https://worldofwarcraft.com/en-us/character/stormrage/.username + "</a></li>';
            });                                  
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#wowapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});