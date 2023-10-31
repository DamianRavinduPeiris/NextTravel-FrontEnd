var selectedService = '';

$(document).ready(() => {
    localStorage.setItem("guideAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6Imd1aWRlQWRtaW4iLCJzdWIiOiJndWlkZWFkbWluIiwiaWF0IjoxNjk4MjMwNTgwLCJleHAiOjQ4NTE4MzA1ODB9.EvPx0eLysnae_jz4GIFrEcq8ED7p9Yt9pr0K-hUXyU8"));
    localStorage.setItem("hotelAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6ImhvdGVsQWRtaW4iLCJzdWIiOiJob3RlbGFkbWluIiwiaWF0IjoxNjk4MjMwNjMwLCJleHAiOjQ4NTE4MzA2MzB9.miSJLscg-rgKac48IXHVCoHAEqzmyjYkCC-4pvS_xoM"));
    localStorage.setItem("packageAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBhY2thZ2VBZG1pbiIsInN1YiI6InBhY2thZG1pbiIsImlhdCI6MTY5ODIzMDY5MSwiZXhwIjo0ODUxODMwNjkxfQ._20D3ZqwMDd5JtV7mi_7K1QpjbIiyTee3sw-LC_p6GI"))
    localStorage.setItem("vehicleAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InZlaGljbGVBZG1pbiIsInN1YiI6InZlaGFkbWluIiwiaWF0IjoxNjk4MjMwNzUzLCJleHAiOjQ4NTE4MzA3NTN9.Cq0FEBlvx6UPMeLXTABpDaDApnpYSf5-aZx63TX-3-I"))
    localStorage.setItem("userAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InVzZXJBZG1pbiIsInN1YiI6InVzZXJhZG1pbiIsImlhdCI6MTY5ODIzMDgyNywiZXhwIjo0ODUxODMwODI3fQ.RAetq0walF2yfDA-OJHC7iHG7bAZNFYlPQnCYR7XRbk"))
    localStorage.setItem("paymentsAdminAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBheW1lbnRzQWRtaW4iLCJzdWIiOiJwYXlhZG1pbiIsImlhdCI6MTY5ODI0NTY2MSwiZXhwIjo0ODUxODQ1NjYxfQ.kMmhlmNQC6bfAriMgBZwyqpe-5tIL6l5_id1I4_dLOY"))
    localStorage.setItem("packageDetailsAdminAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBhY2thZ2VEZXRhaWxzQWRtaW4iLCJzdWIiOiJwY2RhZG1pbiIsImlhdCI6MTY5ODI0NTc2NywiZXhwIjo0ODUxODQ1NzY3fQ.u2NCi_WQhF0GvP4s852lfLc-Ve_JRnskJ6RqFMIuW9Q"))

})
$(document).ready(function () {
    $('#roleMenu .dropdown-item').click(function () {
        $("#loginButton").css("display", "none")
        selectedService = $(this).data('value');
        console.log(selectedService, "Token ", getToken(selectedService));
        $('#roleMenu .btn').text(selectedService);
        $("#loginButton").css("display", "block")


    });
});
$("#loginButton").on("click", () => {
    if ($("#username").val() == "" || $("#password").val() == "") {
        return swal("Please fill in all the fields!", "OOPS!", "error");

    }
    $.ajax({
        url: "http://localhost:8080/api/v1/user/getUserByUserName?username=" + $("#username").val() + "&password=" + $("#password").val(),
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getToken(selectedService)

        },
        success: (res) => {
            console.log(res);
            if (res.data.authenticated) {
                if (res.data.userRole === selectedService) {
                    swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
                    redirector(res.data.userRole)

                } else {
                    return swal("Invalid Role!", "Your role is " + res.data.userRole + "!", "error")
                }


            } else {
                return swal("Login Failed!", "Please check your username and password!", "error");
            }


        },
        error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }


    })


});

function getToken(role) {
    switch (role) {
        case "guideAdmin" :
            return JSON.parse(localStorage.getItem("guideAdminAuthToken"));
            break;
        case "hotelAdmin" :
            return JSON.parse(localStorage.getItem("hotelAdminAuthToken"));
            break;
        case "packageAdmin" :
            return JSON.parse(localStorage.getItem("packageAdminAuthToken"));
            break;
        case "vehicleAdmin" :
            return JSON.parse(localStorage.getItem("vehicleAdminAuthToken"));
            break;
        case "userAdmin" :
            return JSON.parse(localStorage.getItem("userAdminAuthToken"));
            break;
        case "packageDetailsAdmin":
            return JSON.parse(localStorage.getItem("packageDetailsAdminAuthToken"));
            break;
        case  "paymentsAdmin":
            return JSON.parse(localStorage.getItem("paymentsAdminAuthToken"));
            break;
            default :
                swal("OOPS!", "Invalid role!", "error");
            return null;

    }

}

function redirector(role) {
    console.log("passed role"+role);
    switch (role) {
        case "guideAdmin" :
            window.location.href = "GuideManager.html";
            break;
        case "hotelAdmin" :
            window.location.href = "HotelManager.html";
            break;
        case "packageAdmin" :
            window.location.href = "PackageManager.html";
            break;
        case "userAdmin" :
            window.location.href = "UserManager.html";
            break;
        case "vehicleAdmin" :
            window.location.href = "VehicleManager.html";
            break;
           case "paymentsAdmin" :
            window.location.href = "PaymentManager.html";
            break;
        case "packageDetailsAdmin":
            window.location.href = "PackageDetailsManager.html";
            break;

        default:
            swal("OOPS!", "Invalid role!", "error");
            break;


    }

}