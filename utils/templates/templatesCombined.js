export const confirmfrontStr=`    <style>
div {
    font-family: sans-serif;
    background-color: #EEEEEE;
    padding: 20px;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
}


h1 {
    color: #303030;
    text-align: center;
    margin-top: 0;
}

p {
    color: #555;
    font-size: 18px;
    text-align: center;
}

a {
    display: block;
    margin: 0 auto;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease-in-out;
    width: 20%;
    
}


button:hover {
    background-color: #3e8e41;
}

img {
    display: block;
    float: left;
    margin-right: 10px;
    
    height: 50px;

}
</style>
<div>
<div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RKMn7FEPGoElxcUUQLpfNZHTescpPRbdEg&usqp=CAU" alt="Logo">
</div>
<div>
    <h1>Confirm Account</h1>
    <p>Thank you for signing up! To complete your registration, please click the button below to confirm your
        account:</p>
    <a href="{targetUrl}/api/v1/auth/confirmRegistration?token={myJWT}">Confirm</a>
    <p>this link will expire in {expiration_time} minutes</p>
</div>
</div>
`

export const resetfrontStr=`
<style>
div {
    font-family: sans-serif;
    background-color: #EEEEEE;
    padding: 20px;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
}


h1 {
    color: #303030;
    text-align: center;
    margin-top: 0;
}

p {
    color: #555;
    font-size: 18px;
    text-align: center;
}

#submit {
    display: block;
    margin: 0 auto;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease-in-out;
    
}


button:hover {
    background-color: #3e8e41;
}

img {
    display: block;
    float: left;
    margin-right: 10px;
    
    height: 50px;

}
</style>
<div>
<div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RKMn7FEPGoElxcUUQLpfNZHTescpPRbdEg&usqp=CAU" alt="Logo">
</div>
<div>
    <h1>Reset password</h1>
    <p>Enter New password </p>

        <form style="text-align:center;" action="{targetUrl}/api/v1/auth/changePassword" method="post">
            <input type="hidden" name="token" value="{myJWT}"/>
            <label for="password">New Password:</label>
            <br>
            <input type="password" id="password" name="password" required><br><br>
            <label for="confirm_password">Confirm New Password:</label>
            <br>
            <input type="password" id="confirm_password" name="confirm_password" required><br><br>
            <input id="submit" type="submit" value="Reset Password">
        </form>
        
    <p>this link will expire in {expiration_time} minutes</p>
</div>
</div>
`