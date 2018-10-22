$(document).ready(function(){
    
    window.user_id = -1;
    window.role = "";
    var Cchange = "";
    var Chchange = "";
    var value = "";
    var row_id = -1;

    getData();
    getTable();
    
    $("button[name='show_login']").click(function(){
       if ($('#login_form').is(":hidden")){
           $('#login_form').show();
           $("body").css("background-image","url('https://i.pinimg.com/originals/43/25/4c/43254cd4094edbcf6d89ce7cb9479fd7.jpg')");
           $("table").hide();
           $("#container").hide();
           $("form[class='form sign']").hide();
           $(".circle").hide();
       }
        else{
            $('#login_form').hide();
            $("body").css("background-image","url('https://wallpapersite.com/images/pages/pic_h/11895.jpg')");   
            $("table").show();
            $("#container").show();
            $(".circle").show();
        }
    });
    
    $("button[name='show_signup']").click(function(){
       if ($("form[class='form sign']").is(":hidden")){
           $("form[class='form sign']").show();
           $("body").css("background-image","url('https://i.pinimg.com/originals/43/25/4c/43254cd4094edbcf6d89ce7cb9479fd7.jpg')");
           $("table").hide();
           $("#container").hide();
           $('#login_form').hide();
           $(".circle").hide();
       }
        else{
            $("form[class='form sign']").hide();
            $("body").css("background-image","url('https://wallpapersite.com/images/pages/pic_h/11895.jpg')");   
            $("table").show();
            $("#container").show();
            $(".circle").show();
        }
    });
    
    $('#me_container').hide();
    
    $("button[name='show_me']").click(function(){
        $('#me_container').toggle("slide");
        $("button[class='change_me']").toggle(300);
        $("span[class='change_row']").hide();
        $("input[name='change_val']").hide();
        $("button[class='apply']").hide();
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
        Cchange = $(this).attr('name');
    })
    
    $("button[class='apply']").click(function(){
        value = setChange();
        if (Cchange[0] == "C")
            Cchange = Cchange.substr(1,Cchange.length);
        $.post("change.php",{field:Cchange,value:value},function(){
            getData();
            getTable(); 
        });
    });
    
    $(".change_row.h button").click(function(){
        Chchange = $(this).attr('name');
    })
    
    $("button[class='apply h']").click(function(){
        value = setHChange();
        if (Chchange[0] == "C" && Chchange[1] == "h")
            Chchange = Chchange.substr(2,Chchange.length);
        $.post("change_h.php",{field:Chchange,value:value,id:row_id},function(){
            getData();
            getTable();
            $.post("show_user.php",{id:row_id},function(data){
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
        }
        $.post("delete.php",{id:$(this).attr('name')},function(){
            if (parseInt(this_name) == user_id){
                $('#me_container').hide();
                logout();
            }else{
                getData();
                getTable();
            }
        })
                   
    })
        
    $(document).on("click","tr",function(e){
        if (e.target.getAttribute('src') != "http://s1.iconbird.com/ico/2013/12/505/w450h4001385925290Delete.png"){
            var id = $(this).attr('id');
            if (row_id != id){
                $.post("show_user.php",{id:id},function(data){
                    var result = $.parseJSON(data);
                    $("#container").show();
                    $("#container").html("<img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role);
                    row_id = id;
                    if (role == "admin")
                        $("button[class='change_me him']").show();
                });
            }else
                if ($("#container").is(":visible")){
                    $("#container").hide();
                    $("button[class='change_me him']").hide();
                    $("span[class='change_row h']").hide();
                    $("input[name='change_Hval']").hide();
                    $("button[class='apply h']").hide();   
                }
                else{
                    $("#container").show();
                    if (role == "admin")
                        $("button[class='change_me him']").show();    
                }
        };
    });
    
    
    $('#login_form').on('submit',function(e){
        $.ajax({
            url:'login.php',
            type:"POST",
            data:$("#"+'login_form').serialize()
        });
    });
    
    $("button[name='logout']").click(function(){
        logout();
    })
    
})


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
    //
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
    $.post("getData.php",function(data){
        var result = $.parseJSON(data);
        if (Object.keys(result).length){
            $("#me_container").html("<div class='containers c1'><img style='float:right;padding:20px' alt='image' src='" + result.url + "'>ID: " + result.id + "<br>Login: " + result.login + "<br>E-mail: " + result.e_mail + "<br>First Name: " + result.fname + "<br>Last Name: " + result.lname + "<br>Role: " + result.role + "</div>");
            user_id = result.id;
            role = result.role;
            $("button[name='logout']").show();
            $("button[name='show_login']").hide();
            $("button[name='show_signup']").hide();
            $("button[class='show_me']").show();
            $("#name_container").html("Hi, " + result.fname);
        }
    });
}

function getTable(){
    $.post("show_data.php",function(data){
        $('#table_cont').html(data);        
    });
}

function logout(){
    $.post("logout.php");
    document.location.reload(true);
}