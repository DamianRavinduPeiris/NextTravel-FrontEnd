$(document).ready(()=>{
    localStorage.setItem("userAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InVzZXIiLCJzdWIiOiJkYW1pYW4iLCJpYXQiOjE2OTgzNDAzNTAsImV4cCI6NDg1MTk0MDM1MH0.TX4hCO5UhCAKFDya_RlxVTz3DMVkf7pMY7-raV6y4ps"))
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
               localStorage.setItem("userDetails",JSON.stringify(res.data))
                swal("Success!", "Login Successfull!", "success");
                setTimeout(()=>{
                    window.location.href ='PackageBooking.html'
                },2000)

           }else{
               return  swal("OOPS!", "Bad Credentials!", "error");
           }



        },
        error: (xhr, textStatus, errorThrown) => {
            console.log("error");
            /*swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");*/
        },




    });




});