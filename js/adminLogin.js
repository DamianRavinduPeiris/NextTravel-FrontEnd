var selectedService = '';
$(document).ready(function(){
    $('#roleMenu .dropdown-item').click(function(){
        $("#loginButton").css("display","none")
        selectedService = $(this).text();
        $('#roleMenu .btn').text(selectedService);
        $("#loginButton").css("display","block")
        console.log(selectedService);
        switch (selectedService) {
            case "Guide Service." : window.location.href = "GuideManager.html";
                break;
        }

    });
});
$("#loginButton").on("click",()=>{
    if($("#username").val()=="" || $("#password").val()==""){
        return swal("Please fill in all the fields!","OOPS!","error");

    }
    $.ajax({
        url : "http://localhost:8080/api/v1/user/getUserByUserName?username="+$("#username").val()+"&password="+$("#password").val(),
        method:"GET",
        async :true,
        headers : {
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))

        },
        success : (res)=>{
            if(res.data.authenticated){
                 swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
                 switch (selectedService) {
                     case "Guide Service" : window.location.href = "GuideManager.html";
                     break;
                     case "Hotel Service" : window.location.href = "HotelManager.html";
                         break;
                 }

            }
            return swal("Bad Credentials!","OOPS!","error")

        },
        error:(error)=>{
            return swal("An error occurred while authenticating with the server : ","","error")

        }





    })



});