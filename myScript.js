// Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


window.addEventListener('load', iniciar);


function iniciar(){
	//ID que da FB
	var app_id=1648221492114457;
	//permisos de la aplicacion
	var scopes='publish_actions';

	//botones
	var boton_login='<input type="button" id="btnLogin" value="HACER LOGIN">';
	var div_session='<div id="fb_session"><img src="" id="img_user"><h2 id="name_user"></h2><input type="button" id="btnCerrar" value="CERRAR SESION"></div>';

	

	//inicializar el LOGIN STATUS
//-----1
	window.fbAsyncInit = function() {
		  FB.init({
		    appId      : app_id,//my app_id
		    status:true,//status  session
		    cookie     : true,  // enable cookies to allow the server to access 
		                        // the session
		    xfbml      : true,  // parse social plugins on this page
		    version    : 'v2.2' // use version 2.2
		});
		FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response,function(){
	    	});
	  	});
	}


//-----2

  // This is called with the results from from FB.getLoginStatus().
  var statusChangeCallback=function(response,callback) {
    console.log(response);
    
    if (response.status === 'connected') {
      getFacebookData();
    } 
     else {
      callback(false);
    }
  }

  var checkLoginState=function(callback) {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response,function(data){
      	 callback(data);

	    });
    });
  }


  var getFacebookData=function(){
  	FB.api('/me',function(response){
  		$('#btnLogin').after(div_session);
  		$('#btnLogin').remove();
  		$('#name_user').text("Bienvenido: "+response.name);
  		$('#img_user').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');

  	})
  }

  var facebookLogin=function(){
		checkLoginState(function(response){
			//si no esta conectado
			if(!response){
				FB.login(function(response){
					if(response.status==='connected')
						getFacebookData();
				},{scope:scopes});
			}
		})

	}

	//login
	$(document).on('click','#btnLogin',function(){
		facebookLogin();
	})



 var facebookLogOut=function(){
		FB.getLoginStatus(function(response) {
			if(response.status==='connected')
				FB.logout(function(){
					$('#fb_session').after(boton_login);
					$('#fb_session').remove();
				});
		});


	}
	

	//logOut
	$(document).on('click','#btnCerrar',function(){
		if(confirm("LogOut?"))
			facebookLogOut();
		else 
			return false;
	});
} //iniciar






	
