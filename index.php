<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="UTF-8">
        <link href="beauty.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Mali" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Caveat|Marck+Script|Play|Poiret+One" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Amatic+SC:700" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="mainjs.js"></script>
    </head>
    
    <body class="bg">
        <div style="position:absolute;right:10px;top:10px">
            <span id="name_container" class="connect"></span>
            <button type="button" name="logout" class="connect">Log out</button>
            <button type="button" name="show_login" class="connect">Log in</button>
            <button type="button" name="show_signup" class="connect">Sign up</button>
        </div>
        <button type='button' name='show_me' class="show_me">Who am i?</button>
        <div id="me_container">
        </div>
        <button type="button" name="change_me" class="change_me">Change me</button><input type="text" name="change_val" id="change_val">
        <button type="button" name="change_attr" class="apply">Apply</button>
        <span class="change_row"><button name="Cfirstname">Name</button><button name="Clastname">Surname</button><button name="Ce-mail">E-mail</button><button name="Cpassword">Password</button><button name="Curl">Photo</button></span>
        <div id="container" class="containers c2">
        </div>
        <button type="button" name="change_him" class="change_me him">Change him</button><input type="text" name="change_Hval" id="change_Hval">
        <span class="change_row h"><button name="Chfirstname">Name</button><button name="Chlastname">Surname</button><button name="Chrole">Role</button></span>
        <button type="button" name="change_attr" class="apply h">Apply</button>
        <div id="table_cont">
        </div>
        <form method="POST" action="sign_up.php" class="form sign">
            <div>
                Login<br><input type="text" name="login" /><br>
                Password<br><input type="password" name="password" /><br>
                First Name<br><input type="text" name="fname" /><br>
                Last Name<br><input type="text" name="lname" /><br>
                E-maile<br><input type="text" name="e-mail" /><br>
                Image<br><input type="text" name="image" id="img"/><br>
                <img alt="image" src="" id="image" onerror="this.onerror=null;this.src='https://orig00.deviantart.net/2c0f/f/2012/343/c/4/lumpy_space_princess_2_by_doublehit-d5nkdhm.gif';"><br>
                <div class="button_block">
                    <button type="button" onclick="setSrc()">Check img</button><br>
                    <button type="submit" name="submit">Sign up</button>
                </div>
            </div>
        </form>
        <form method="POST" id="login_form" class="form login">
            <div>
                Login<br><input type="text" name="login" /><br>
                Password<br><input type="password" name="password" /><br>
                <button type="submit">Log In</button>
            </div>
        </form>
    </body>
</html>