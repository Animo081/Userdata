$(document).ready(function(){
    
    window.user_id = -1;
    window.role = "";
    var Cchange = "";
    var Chchange = "";
    var value = "";
    var row_id = -1;
	var vid_id = -1;
	var hidden = true;
	var vid_id = -1;
	var music_enable = true;
	var stop = false;

    getData();
    getTable();
    
    $("button[name='show_login']").click(function(){
       if ($('#login_form').is(":hidden")){
           $('#login_form').show();
		   $('#button_tr').hide();
           $("body").css("background-image","url('https://i.pinimg.com/originals/43/25/4c/43254cd4094edbcf6d89ce7cb9479fd7.jpg')");
           $("table").hide();
           $("div[class='form sign']").hide();
           $("#container").hide();
		   $(".play.him").hide();
       }
        else{
            $('#login_form').hide();
			$('#button_tr').hide();
            $("body").css("background-image","url('https://wallpapersite.com/images/pages/pic_h/11895.jpg')");   
            $("table").show();
			if (!hidden){
				$("#container").show();
		   		$(".play.him").show();
			}
        }
    });
    
    $("button[name='show_signup']").click(function(){
       if ($("div[class='form sign']").is(":hidden")){
           $("div[class='form sign']").show();
		   $('#button_tr').show();
           $("body").css("background-image","url('https://i.pinimg.com/originals/43/25/4c/43254cd4094edbcf6d89ce7cb9479fd7.jpg')");
           $("table").hide();
           $('#login_form').hide();
		   $("#container").hide();
		   $(".play.him").hide();
       }
        else{
            $("div[class='form sign']").hide();
			$('#button_tr').hide();
            $("body").css("background-image","url('https://wallpapersite.com/images/pages/pic_h/11895.jpg')");   
            $("table").show();
			if (!hidden){
				$("#container").show();
		   		$(".play.him").show();
			}
        }
    });
    
    $('#me_container').hide();
    
    $("button[name='show_me']").click(function(){
        $('#me_container').toggle("slide");
        $("button[class='change_me']").toggle(300);
		if (music_enable)
			if (!stop){
				document.getElementById("player").play();
				stop = true;	
			}else{
				stop = false;
				document.getElementById("player").pause();
			};
        $("span[class='change_row']").hide();
        $("input[name='change_val']").hide();
        $("button[class='apply']").hide();
		$(".play.me").toggle();
    })
    
    $(document).on("click","button[class='change_me']",function(){
        $("span[class='change_row']").toggle(100);
    })
    
    $(document).on("click","button[class='change_me him']",function(){
        $("span[class='change_row h']").toggle(100);
    })
    
    $("span[class='change_row']").click(function(){
        $("input[name='change_val']").show();
        $("button[class='apply']").show();
    })
    
    $("span[class='change_row h']").click(function(){
        $("input[name='change_Hval']").show();
        $("button[class='apply h']").show();
    })
    
    $(".change_row button").click(function(){
		$(this).css("background-color","rgba(18,81,98,1)");
		$(this).css("border","2px dashed rgba(255,255,255,.7)");
		if (Cchange != "" && Cchange != $(this).attr('name')){
			$("button[name='" + Cchange + "']").css("background-color","rgba(18,81,98,.6)")
			$("button[name='" + Cchange + "']").css("border","1px solid rgba(255,255,255,.4)");
		}
        Cchange = $(this).attr('name');
    })
    
    $("button[class='apply']").click(function(){
        value = setChange();
        if (Cchange[0] == "C")
            Cchange = Cchange.substr(1,Cchange.length);
        $.post("php/change.php",{field:Cchange,value:value},function(){
            getData();
            getTable(); 
        });
    });
    
    $(".change_row.h button").click(function(){
		$(this).css("background-color","rgba(18,81,98,1)");
		$(this).css("border","2px dashed rgba(255,255,255,.7)");
		if (Chchange != "" && Chchange != $(this).attr('name')){
			$("button[name='" + Chchange + "']").css("background-color","rgba(18,81,98,.6)")
			$("button[name='" + Chchange + "']").css("border","1px solid rgba(255,255,255,.4)");
		}
        Chchange = $(this).attr('name');
    })
    
    $("button[class='apply h']").click(function(){
        value = setHChange();
        if (Chchange[0] == "C" && Chchange[1] == "h")
            Chchange = Chchange.substr(2,Chchange.length);
        $.post("php/change_h.php",{field:Chchange,value:value,id:row_id},function(){
            getData();
            getTable();
            $.post("php/show_user.php",{id:row_id},function(data){
                    var result = $.parseJSON(data);
                    $("#container").html("<img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role);
            });
        });
    });
    
    $(document).on("mouseover","tr",function(){
        $(this).css("background-color","rgba(0, 179, 179,.4)");
    });
    
    $(document).on("mouseout","tr",function(){
        $(this).css("background-color","transparent");
    });
    
    $(document).on("click","button.delete_button",function(){
        var this_name = $(this).attr('name');
        if ((parseInt($(this).attr('name')) == user_id) || ($(this).attr('name') == row_id)){
            $("#container").hide();
            $("button[class='change_me him']").hide();
            $("span[class='change_row h']").hide();
            $("input[name='change_Hval']").hide();
            $("button[class='apply h']").hide();
			$(".play.him").hide();
        }
        $.post("php/delete.php",{id:$(this).attr('name')},function(){
            if (parseInt(this_name) == user_id){
                $('#me_container').hide();
                logout();
            }else{
                getData();
                getTable();
            }
        })
                   
    });
        
    $(document).on("click","tr",function(e){
        if (e.target.getAttribute('src') != "http://s1.iconbird.com/ico/2013/12/505/w450h4001385925290Delete.png"){
            var id = $(this).attr('id');
            if (row_id != id){
                $.post("php/show_user.php",{id:id},function(data){
                    var result = $.parseJSON(data);
                    $("#container").show();
					hidden = false;
                    $("#container").html("<img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role);
                    row_id = id;
					$(".play.him").show();
                    if (role == "admin")
                        $("button[class='change_me him']").show();
                });
            }else
                if ($("#container").is(":visible")){
                    $("#container").hide();
					hidden = true;
                    $("button[class='change_me him']").hide();
                    $("span[class='change_row h']").hide();
                    $("input[name='change_Hval']").hide();
                    $("button[class='apply h']").hide();
					$(".play.him").hide();
                }
                else{
                    $("#container").show();
					hidden = false;
					$(".play.him").show();
                    if (role == "admin")
                        $("button[class='change_me him']").show();    
                }
        };
    });
    
    $("button.sign_up").on('click',function(){
		var login = document.getElementById("s_login").value;
		var password = document.getElementById("s_password").value;
		var fname = document.getElementById("s_fname").value;
		var lname = document.getElementById("s_lname").value;
		var e_mail = document.getElementById("s_e-mail").value;
		var image = document.getElementById("img").value;
        $.ajax({
            url:'php/sign_up.php',
            type:"POST",
            data: {login:login,password:password,fname:fname,lname:lname,e_mail:e_mail,image:image}
        }).done(function(){
			 window.location = window.location.href;
		});
    });
    
    $('button.log_in').on('click',function(){
		var login = document.getElementById("l_login").value;
		var password = document.getElementById("l_password").value;
        $.ajax({
            url:'php/login.php',
            type:"POST",
			data: {login:login,password:password}
		}).done(function(){
			window.location = window.location.href;
		});
    });
    
    $("button[name='logout']").click(function(){
        logout();
    });
    
	$("#button_tr").on("click",function(){
		$("#file_tr").trigger("click")
	});
    
	$("#file_tr").change(function(){
		readURL(this);
	});
	
	
//3 LABA
	
	
	$("#music_enable").on("click",function(){
		if (music_enable){
			document.getElementById("mute").src = "https://png.icons8.com/ios/2x/mute.png";
			music_enable = false;
			stop = false;
			document.getElementById("player").pause();
		}else{
			document.getElementById("mute").src = "https://png.icons8.com/ios/2x/speaker.png";
			stop = true;
			music_enable = true;
			document.getElementById("player").play();
		}
	})
    
    $(document).on("mouseover",".play",function(){
        $(this).css("background-color","rgba(18,81,98,.7)");
        $(this).animate({"left":"+=15px"},"fast");
    });
    
    $(document).on("mouseout",".play",function(){
        $(this).css("background-color","rgba(18,81,98,.3)");
        $(this).animate({"left":"-=15px"},"fast");
    });
	
	$(".play").on("click",function(){
		document.getElementById("player").pause();
	})
	
	$(document).on("click",".play.me",function(e){
		vid_id = user_id;
		$.post("php/take_media.php",{id:user_id,type:"video"},function(data){
			if (data == "not found")
				$(".video_input").show();
			else
				if (data.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)){
					document.getElementById("yid").src = data;
					$("#yid").css("display","block");
					$(".video_input").show();
				}else{
					document.getElementById("vid").src = data;
					$("#vid").css("display","block");
					$(".video_input").show();
				}
		});
	});
		
	$(document).on("click",".play.him",function(e){
		vid_id = row_id;
		$.post("php/take_media.php",{id:row_id,type:"video"},function(data){
			if (data == "not found")
				$(".video_input").show();
			else
				if (data.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)){
					document.getElementById("yid").src = data;
					$("#yid").css("display","block");
					$(".video_input").show();
				}else{
					document.getElementById("vid").src = data;
					$("#vid").css("display","block");
					$(".video_input").show();
				}
		});
	});
	
	$("button.fb").on("click",function(){
		$(".video_input").hide();
		document.getElementById("player").play();
		document.getElementById("vid").pause();
		document.getElementById("yid").src = "";
	});
	
	$("button.sb").on("click",function(){
		if ($('#yid').css("display") == "block")
			$.post("php/set_media.php",{id:vid_id,url:document.getElementById("yid").src,type:"video"});
		else
			if ($('#vid').css("display") == "block")
				$.post("php/set_media.php",{id:vid_id,url:document.getElementById("vid").src,type:"video"});
			else
				alert("No video to send");
	});
	
	$('#youtube_in').on({"paste":function(){
									setTimeout(function(){
										var src = document.getElementById("youtube_in").value;
										src = src.replace("watch?v=","embed/");
										if(src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)){
											$("#video_in").val("");
											document.getElementById("vid").pause();
											document.getElementById("yid").src = src;
											$("#yid").css("display","block");
											$("#vid").css("display","none");
										}else{
											alert("Invalid url");
											$('#youtube_in').select();	
										}
									},100);
								},
						 "keypress":function(e){
										if (e.which == 13){
											var src = document.getElementById("youtube_in").value;
											src = src.replace("watch?v=","embed/");
											if(src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)){
												$("#video_in").val("");
												document.getElementById("vid").pause();
												document.getElementById("yid").src = src;
												$("#yid").css("display","block");
												$("#vid").css("display","none");
											}else{
												alert("Invalid url");
												$(this).select();	
											}
										};
									},
						});
	
	$("button.mb").on("click",function(){
		$("#music_in").trigger("click");
	});
	
	$("#music_in").change(function(){
		readURLm(this);
	});
    
	$("button[name='set_video']").on("click",function(){
		$("#video_in").trigger("click");
	});
    
	$("#video_in").change(function(){
		readURLv(this);
	});
	
	/*$("#vid").on("play",function(){
		document.getElementById("player").pause();
	});
	
	$("#vid").on("pause",function(){
		if (stop)
			document.getElementById("player").play();
	});
	*/
	$(window).keypress(function(e) {
  		var video = document.getElementById("vid");
  		if (e.which == 32) {
    		if (video.paused)
      			video.play();
    		else
      			video.pause();
  		}
	});
	
	
	
})

function readURLm(input){
	if (input.files && input.files[0]) {
		var fullPath = input.value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    	var filename = fullPath.substring(startIndex);
    	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {filename = filename.substring(1);}
		$.post("php/set_media.php",{id:user_id,url:"../audio/" + filename,type:"audio"},function(e){
			getData();
		});
    }
}

function readURLv(input){
	if (input.files && input.files[0]) {
		var fullPath = input.value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    	var filename = fullPath.substring(startIndex);
    	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {filename = filename.substring(1);}
		document.getElementById("yid").src = "";
		$("#yid").css("display","none");
		$("#vid").css("display","block");
    	document.getElementById("vid").src = "../video/" + filename;
    }
}

//3 LABA

function logout(){
    $.post("php/logout.php");
    window.location = window.location.href;
}

function readURL(input){
	if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
			$("#img").attr('value', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function setSrc(){
    var x = document.getElementById("img").value;
    var imageData = new Image();
    imageData.onload = function() {
        document.getElementById("image").src = x;  
    };
    imageData.onerror = function() {
        document.getElementById("image").src = "https://orig00.deviantart.net/2c0f/f/2012/343/c/4/lumpy_space_princess_2_by_doublehit-d5nkdhm.gif"
    };
    imageData.src = x;
}

function setChange(){
    value = document.getElementById("change_val").value;
    return value;
}

function setHChange(){
    value = document.getElementById("change_Hval").value;
    return value;
}

function getData(){
    $.post("php/getData.php",function(data){
        var result = $.parseJSON(data);
        if (Object.keys(result).length){
            $("#me_container").html("<div class='containers c1'><img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>E-mail: " + result.e_mail + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role + "</div>");
            user_id = result.id;
            role = result.role;
			$.post("php/take_media.php",{id:user_id,type:"audio"},function(data){
				if (data != "not found")
					document.getElementById("player").src = data;
			})
            $("button[name='logout']").show();
            $("button[name='show_login']").hide();
            $("button[name='show_signup']").hide();
            $("button[class='show_me']").show();
            $("#name_container").html("Hi, " + result.fname);
        }
    });
}

function getTable(){
    $.post("php/show_data.php",function(data){
        $('#table_cont').html(data);        
    });
}