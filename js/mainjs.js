$(document).ready(function(){
    
    window.user_id = -1;
    window.role = "";
	window.vidosik = "";
    var Cchange = "";
    var Chchange = "";
    var value = "";
    var row_id = -1;
	var vid_id = -1;
	var hidden = true;
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
        $.post("/user/selfediting",{field:Cchange,value:value},function(){
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
        $.post("/table/edit",{field:Chchange,value:value,id:row_id},function(e){
            getData();
            getTable();
            $.post("/table/reveal",{id:row_id},function(data){
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
        $.post("/table/delete",{id:$(this).attr('name')},function(e){
			alert(e);
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
                $.post("/table/reveal",{id:id},function(data){
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
            url: '/user/signup',
            type:"POST",
            data: {login:login,password:password,fname:fname,lname:lname,e_mail:e_mail,image:image}
        }).done(function(e){
			if (e === "")
				window.location = window.location.href;
			else
				alert(e);
		});
    });
    
    $('button.log_in').on('click',function(){
		var login = document.getElementById("l_login").value;
		var password = document.getElementById("l_password").value;
        $.ajax({
            url:'/user/login',
            type:"POST",
			data: {login:login,password:password}
		}).done(function(e){
			if (e === "")
				window.location = window.location.href;
			else
				alert(e);
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
		$.post("/media/getMedia",{id:user_id,type:"video"},function(data){
			$(".show_v").show();
			$(".no_v").hide();
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
		$.post("/media/getMedia",{id:row_id,type:"video"},function(data){
			$(".show_v").hide();
			if (data == "not found"){
				$(".video_input").show();
				$(".no_v").show();
			}
			else
				if (data.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)){
					document.getElementById("yid").src = data;
					$("#yid").css("display","block");
					$(".video_input").show();
					$(".no_v").hide();
				}else{
					document.getElementById("vid").src = data;
					$("#vid").css("display","block");
					$(".video_input").show();
					$(".no_v").hide();
				}
		});
	});
	
	$("button.fb").on("click",function(){
		$(".video_input").hide();
		if (stop)
			document.getElementById("player").play();
		document.getElementById("vid").pause();
		document.getElementById("yid").src = "";
		$("#yid").css("display","none");
		$("#vid").css("display","none");
	});
	
	$("button.sb").on("click",function(){
		if ($('#yid').css("display") == "block")
			$.post("/media/setYoutube",{id:vid_id,url:document.getElementById("yid").src,type:"video"});
		else
			if ($('#vid').css("display") == "block"){
				vidosik.append("id",vid_id);
				vidosik.append("type","video");
				$.ajax({
					url:"/media/setLocal",
					type:"POST",
					data:vidosik,
					processData:false,
					contentType:false,
					success:function(){
						$.post("/media/getMedia",{id:vid_id,type:"video"},function(data){
							document.getElementById("vid").src = data;
						});
					}
				});
			}else
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
	
	
	$(window).keypress(function(e) {
  		var video = document.getElementById("vid");
  		if (e.which == 32) {
    		if (video.paused)
      			video.play();
    		else
      			video.pause();
  		}
	});
	
// Laba 4
	
	$("button.tb").on("click",function(){
		$(".all").toggle("slow",function(){
			cancel_pls = false;
			$(".canvas").show();
			$("#Coptions").show();
			$("datalist").show();
			$("#hide_canv").show();
			if (initialized == false)
				initial()
		});

	})
	
	window.cancel_pls = false;
	$("#hide_canv").on("click",function(){
		cancel_pls = true;
		$(".canvas").hide();
		$("#Coptions").hide();
		$("datalist").hide();
		$("#hide_canv").hide();
		$(".all").toggle("slow");
	})
	
	/*$(window).on("mousemove",function(e){
		mouse.x = e.x;
		mouse.y = e.y;
	})*/
	
	/*var mouse = {
		x: undefined,
		y: undefined
	}*/
	
	window.canvas = document.querySelector("canvas");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	window.c = canvas.getContext("2d");
	window.initialized = false;
	$(window).resize(function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
	})
	
	window.main_color = "300";
	$("#color_picker").on("change",function(){
		var color = document.getElementById('color_picker').value;
		main_color = toHsl(color);
	})
	
	window.fastAsFuck = 0;
	$("#speed").on("change",function(){
		switch(document.getElementById('speed').value){
			case "1": fastAsFuck = -25; break;
			case "2": fastAsFuck = 0; break;
			case "3": fastAsFuck = 25; break;
		}
	})
	
	window.figure = "circle";
	$("#make_triangle").on("click",function(){
		figure = "triangle"
	});
	
	$("#make_circle").on("click",function(){
		figure = "circle"
	});
	
})

function toHsl(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
	s = Math.round(s);
	l = l*100;
	l = Math.round(l);
	h = Math.round(360*h);

	var colorInHSL = h;
	return colorInHSL;
}

function Triangle(x1,y1,x2,y2,x3,y3){
	
	this.start_x1 = x1;
	var start_x2 = x2;
	var start_x3 = x3;
	var start_y1 = y1;
	var start_y2 = y2;
	var start_y3 = y3;
	
	this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	var fp = Math.floor(Math.random() * (80 - 20) + 20);
	var sp = Math.floor(Math.random() * (15 - 5) + 5);
	var dx = 2;
	var dy = 2;
	this.dicrease = false;
	this.deletable = false;
	this.done = false;
	
	this.draw = function(){
		
		c.beginPath();
		c.moveTo(this.x1,this.y1);
		c.lineTo(this.x2,this.y2);
		c.lineTo(this.x3,this.y3);
		c.closePath();
		c.fillStyle = "hsl(" + main_color + ", "+fp+"%, "+sp+"%)";
		c.fill();
		c.stroke();
			
	};
	
	this.init = function(){
		if (Math.abs(this.start_x1 - this.x1) <= 30 && this.dicrease == false){
			this.x1 -=dx;
			this.x2 +=dx;
			
			if (this.y3 > this.y2){
				this.y1 -=dy;
				this.y2 -=dy;
				this.y3 += dy;
			}
			else{
				this.y1 +=dy;
				this.y2 +=dy;
				this.y3 -= dy;
			}
		}else{
			this.dicrease = true;
			if (this.start_x1 != this.x1){
				this.x1 +=dx;
				this.x2 -=dx;
				if (this.y3 > this.y2){
					this.y1 +=dy;
					this.y2 +=dy;
					this.y3 -= dy;
				}
				else{
					this.y1 -=dy;
					this.y2 -=dy;
					this.y3 += dy;
				}
			}else
				this.done = true;
		}
		this.draw();
	}
	
	this.del = function(){
		if (this.x1 < this.x3){
			this.x1 +=0.7;
			this.x2 -=0.7;
			if (this.y3 > this.y2){
				this.y1 +=0.7;
				this.y2 +=0.7;
				this.y3 -= 0.7;
			}else{
				this.y1 -=0.7;
				this.y2 -=0.7;
				this.y3 += 0.7;
			}
		}else
			this.deletable = true;
		this.draw();
	}
	
	this.update = function(){
		this.draw();
	}
}

function Circle(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	var fp = Math.floor(Math.random() * (80 - 20) + 20);
	var sp = Math.floor(Math.random() * (15 - 5) + 5);
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = 0.05;
	this.distanceFromCenter = Math.floor(Math.random() * (350 - 250) + 250);
	
	this.update = function(){
		this.radians += this.velocity + fastAsFuck/1000;
		this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
		this.y = y + Math.sin(this.radians) * this.distanceFromCenter;			
		this.draw();
	}
	
	this.draw = function(){
		c.beginPath();
		if (figure == "circle"){
			c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
		}else{
			c.moveTo(this.x-radius,this.y+radius);
			c.lineTo(this.x+radius,this.y+radius);
			c.lineTo(this.x,this.y-radius);

		}
		c.fillStyle = "hsl(" + main_color + ", "+fp+"%, "+sp+"%)";
		c.fill();
		c.closePath();
	}
}

function initial(){
	window.TrArray1 = [];
	window.TrArray2 = [];
	window.TrArray3 = [];
	window.circles = [];
	for (var i=0;i<70;i++){
		circles.push(new Circle(canvas.width/2,canvas.height/2,5));	
	}
	window.done = false;
	var inc =14;
	var last = 30;
	var height = 25;
	var convergence = 119;
	sp2 = innerWidth/2 - inc*2 - inc*last + convergence;
	sp1 = innerWidth/2 - convergence;
	var xMin = 540;
	var xMax = 1000;
	var yMin = 120;
	var yMax = 750;
	var j = 0;
	window.k = 0;
	setTimeout(loop1,300,inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,1)
	j = 0;
	setTimeout(loop2,700,inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,1)
	j = 0;
	setTimeout(loop3,1100,inc,last*2+10,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,1)
	j = 0;
	setTimeout(splicer,300,j,xMin,xMax,yMin,yMax);
	initialized = true;
	animate()
};

function animate(){
	var myReq = requestAnimationFrame(animate);
	if (cancel_pls == true){
		c.clearRect(0,0,innerWidth,innerHeight);
		//cancelAnimationFrame(myReq);
	}else{
		//c.clearRect(0,0,innerWidth,innerHeight);
		c.fillStyle = "rgba(255,255,255,.04)"
		c.fillRect(0,0,innerWidth,innerHeight);
		if (k >= 3){
			for (var i=0;i<TrArray1.length;i++){
				TrArray1[i].update();
			}
			for (var i=0;i<TrArray2.length;i++){
				TrArray2[i].update();
			}
			for (var i=0;i<TrArray3.length;i++){
				TrArray3[i].update();
			}
			for (var i=1;i<circles.length;i++)
				circles[i].update();
		}
		else{
			for (var i=0;i<TrArray1.length;i++){
				TrArray1[i].init();
			}
			for (var i=0;i<TrArray2.length;i++){
				TrArray2[i].init();
			}
			for (var i=0;i<TrArray3.length;i++){
				TrArray3[i].init();
			}
		}
	}
};

function loop1(inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage){
	if (stage == 1){
		var triangle = new Triangle(sp1+inc*j,0+height*j,sp1+inc*2+inc*j,0+height*j,sp1+inc+inc*j,height+height*j);
		triangle.init();
		TrArray1.push(triangle);
		stage++;
	}
	else{
		var triangle = new Triangle(sp1+inc+inc*j,height+height*j,sp1+inc*3+inc*j,height+height*j,sp1+inc*2+inc*j,0+height*j);
		triangle.init();
		TrArray1.push(triangle);
		stage--;
		j++;
	}
	if (j < last)
		setTimeout(loop1,60,inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage);
	else
		k++;
};

function loop2(inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage){
	if (stage == 1){
		var triangle = new Triangle(sp2+inc*j,height*last-height*j,sp2+inc*2+inc*j,height*last-height*j,sp2+inc+inc*j,height*(last-1)-height*j);
		triangle.init();
		TrArray2.push(triangle);
		stage++;
	}else{
		var triangle = new Triangle(sp2+inc+inc*j,height*(last-1)-height*j,sp2+inc*3+inc*j,height*(last-1)-height*j,sp2+inc*2+inc*j,height*last-height*j);
		triangle.init();
		TrArray2.push(triangle);
		stage--;
		j++;
	}
	if (j < last)
		setTimeout(loop2,60,inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage);
	else
		k++;
};

function loop3(inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage){
	if (stage == 1){
		var triangle = new Triangle(-30+inc*2*j,innerHeight/2-height/2+60,-30+inc*2+inc*2*j,innerHeight/2-height/2+60,-30+inc+inc*2*j,innerHeight/2+height/2+60);
		triangle.init();
		TrArray3.push(triangle);
		stage++;
	}else{
		var triangle = new Triangle(-30+inc+inc*2*j,innerHeight/2+height/2+60,-30+inc*3+inc*2*j,innerHeight/2+height/2+60,-30+inc*2+inc*2*j,innerHeight/2-height/2+60);
		triangle.init();
		TrArray3.push(triangle);
		stage--;
		j++;
	}
	if (j < last)
		setTimeout(loop3,30,inc,last,height,convergence,sp2,sp1,xMin,xMax,yMin,yMax,j,stage);
	else
		k++
};

function splicer(j,xMin,xMax,yMin,yMax){
	if (k == 3)
		setTimeout(deleteC,20,xMin,xMax,yMin,yMax);
	else
		setTimeout(splicer,300,j,xMin,xMax,yMin,yMax);
};

function deleteC(xMin,xMax,yMin,yMax){
	var l = TrArray1.length;
	for (var i=0;i<TrArray1.length;i++)
		if (TrArray1[i].x1 < xMin || TrArray1[i].x3 > xMax || TrArray1[i].y1 < yMin || TrArray1[i].y3 > yMax){
			TrArray1[i].del();
			if (TrArray1[i].deletable){
				TrArray1.splice(i,1);
				i--;
				if (k == 3)
					k++;
			}
		}
	for (var i=0;i<TrArray2.length;i++)
		if (TrArray2[i].x1 < xMin || TrArray2[i].x3 > xMax || TrArray2[i].y1 < yMin || TrArray2[i].y3 > yMax){
			TrArray2[i].del();
			if (TrArray2[i].deletable){
				TrArray2.splice(i,1);
				i--;
				if (k == 4)
					k++;
			}
		}
	for (var i=0;i<TrArray3.length;i++)
		if (TrArray3[i].x1 < xMin || TrArray3[i].x3 > xMax || TrArray3[i].y1 < yMin || TrArray3[i].y3 > yMax){
			TrArray3[i].del();
			if (TrArray3[i].deletable){
				TrArray3.splice(i,1);
				i--;
				if (k == 5)
					k++;
			}
		}
	if (k != 6){
		setTimeout(deleteC,20,xMin,xMax,yMin,yMax);
	}else{
		for (var i=0;i<TrArray1.length;i++){
			if (TrArray1[i].x1 < xMin || TrArray1[i].x3 > xMax || TrArray1[i].y1 < yMin || TrArray1[i].y3 > yMax){
				TrArray1.splice(i,1);
				i--;
			}
		}
		for (var i=0;i<TrArray2.length;i++){
			if (TrArray2[i].x1 < xMin || TrArray2[i].x3 > xMax || TrArray2[i].y1 < yMin || TrArray2[i].y3 > yMax){
				TrArray2.splice(i,1);
				i--;
			}
		}
		for (var i=0;i<TrArray3.length;i++){
			if (TrArray3[i].x1 < xMin || TrArray3[i].x3 > xMax || TrArray3[i].y1 < yMin || TrArray3[i].y3 > yMax){
				TrArray3.splice(i,1);
				i--;
			}
		}
	}
}

// Laba 4

function readURLm(input){
	if (input.files && input.files[0]) {
		var muzika = new FormData();
		muzika.append("file",input.files[0]);
		muzika.append("id",user_id);
		muzika.append("type","audio");
		$.ajax({
			url:"/media/setLocal",
			type:"POST",
			data:muzika,
			processData:false,
			contentType:false,
			success:function(){
				getData();
			}
		});
    }
}

function readURLv(input){
	if (input.files && input.files[0]) {
		/*var fullPath = input.value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    	var filename = fullPath.substring(startIndex);
    	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {filename = filename.substring(1);}*/
		vidosik = new FormData();
		vidosik.append("file",input.files[0]);
		var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("yid").src = "";
			$("#yid").css("display","none");
			$("#vid").css("display","block");
			document.getElementById("vid").src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function logout(){
    $.post("/user/logout");
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
    $.post("/user/userInfo",function(data){
        var result = $.parseJSON(data);
        if (Object.keys(result).length){
            $("#me_container").html("<div class='containers c1'><img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>E-mail: " + result.e_mail + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role + "</div>");
            user_id = result.id;
            role = result.role;
			$.post("/media/getMedia",{id:user_id,type:"audio"},function(data){
				if (data != "not found" && document.getElementById("player").src != data){	
					document.getElementById("player").src = data;
				}
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
    $.post("/table/printT",function(data){
		var result = $.parseJSON(data);
		var table = "<table class='tt'><tr> <th>№</th> <th>First Name</th> <th>Last Name</th><th>Photo</th> <th>Role</th> <th>Delete<th></tr>"
		for(var i = 0;i < Object.keys(result).length;i++)
			table += "<tr class='tr' id = '" + result[i].id + "'><td>" + (i+1) + "</td><td>" + result[i].firstname + "</td><td>" + result[i].lastname + "</td><td><img class='timg' src='" + result[i].url + "' ></img></td><td>" + result[i].role + "</td><td><button class='delete_button' type='submit' name='" + result[i].id + "'><img class='delete_bi' alt='nothing' src='http://s1.iconbird.com/ico/2013/12/505/w450h4001385925290Delete.png'></button></td></tr>";
		table += "</table>";
        $('#table_cont').html(table);        
    });
}