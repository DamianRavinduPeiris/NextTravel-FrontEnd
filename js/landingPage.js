
$("#rb,#ml,#lb,#slb").on("click",()=>{
localStorage.setItem("packageName",JSON.stringify(event.target.id))
if(!JSON.parse(localStorage.getItem("useAuthToken"))){
    return window.location.href = "UserLogin.html";

}

})