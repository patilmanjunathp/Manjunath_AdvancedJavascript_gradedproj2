localStorage.setItem("name","manju");
localStorage.setItem("password","1234");

function login(){
    var username1=document.getElementById("username").value;
    var password1=document.getElementById("password").value;
    var user=localStorage.getItem("name");
    var pass=localStorage.getItem("password");

    if(username1==user && password1==pass){
       window.location.href="index.html";
    }
    else{
     alert("invalid username/password");
    }
}
function preback(){
        window.history.forward();
}
setTimeout("preback()",0);
    window.onunload=function(){
        null;
}