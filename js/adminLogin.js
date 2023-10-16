$(document).ready(function(){
    $('#roleMenu .dropdown-item').click(function(){
        let selectedService = $(this).text();
        $('#roleMenu .btn').text(selectedService);

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
                return swal("Login Success!", "Redirecting you to the admin dashboard!", "success");

            }
            return swal("Bad Credentials!","OOPS!","error")

        },
        error:(error)=>{
            return swal("An error occurred while authenticating with the server : ","","error")

        }





    })



});