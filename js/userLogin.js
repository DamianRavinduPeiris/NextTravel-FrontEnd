$(document).ready(()=>{
    localStorage.setItem("userAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InVzZXIiLCJzdWIiOiJkYW1pYW4iLCJpYXQiOjE2OTgyMzA0OTIsImV4cCI6NDg1MTgzMDQ5Mn0.OSKuJa8hUpsSwrY2ITEZWmCjeaOpk3_Lic69ZYcb588"))
})


$("h5 > a").click(()=>{
    event.preventDefault();
    window.location.href = "userSignup.html";




})
$("#username").on("keydown",(event)=>{
    if(event.key === 'Enter'){
        $("#password").focus();

    }

})
$("#password").on("keydown",(event)=>{
    if(event.key === 'Enter'){
        $("#loginButton").click();

    }

})

$("#loginButton").on("click",()=>{
    if($("#username").val() === "" || $("#password").val() === ""){
        return swal("OOPS!", "Please fill all the fields!", "error");

    }

    $.ajax({
       url : "http://localhost:8080/api/v1/user/getUserByUserName?username="+$("#username").val()+"&password="+$("#password").val(),
       headers : {

           "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("userAuthToken"))
       },
        success : (res)=>{
           console.log(res);
           if(res.data.authenticated && res.data.userRole === 'user'){
               return swal("Success!", "Login Successfull!", "success");

           }else{
               return  swal("OOPS!", "Bad Credentials!", "error");
           }



        },
        error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        },




    });




});