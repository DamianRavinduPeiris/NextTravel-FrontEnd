localStorage.setItem("userAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InVzZXJBZG1pbiIsInN1YiI6InVzZXJhZG1pbiIsImlhdCI6MTY5ODIzMDgyNywiZXhwIjo0ODUxODMwODI3fQ.RAetq0walF2yfDA-OJHC7iHG7bAZNFYlPQnCYR7XRbk"))


function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}

$("#home").on("click", () => {
    window.location.reload();
})

$("#logout").on("click", () => {
    window.location.href = "adminLogin.html";
});
var isFormsVisible = false;
var isTableVisible = false;
$("#guideManager").on("click", () => {


    $(".mainContent").css("display", "none");
    if (!isFormsVisible) {
        $("body").append("<div id='forms' class='flexContainer marginAdder'>" + "<div class='mb-3'>" + "<label for='userRole' class='form-label'>User Role.</label>" + "<select class='form-select' id='userRole'>" + "<option value='user'>USER</option>" + "<option value='hotelAdmin'>HOTEL ADMIN</option>" + "<option value='vehicleAdmin'>VEHICLE ADMIN</option>" + "<option value='guideAdmin'>GUIDE ADMIN</option>" + "<option value='packageAdmin'>PACKAGE ADMIN</option>" + "<option value='packageDetailsAdmin'>PACKAGE DETAILS ADMIN</option>" + "<option value='paymentsAdmin'>PAYMENTS ADMIN</option>" + "</select>" + "</div>" + "<div class='mb-3'>" + "<label for='userId' class='form-label'>User ID.</label>" + "<input type='text' class='form-control' id='userId' placeholder='12345.'>" + "</div>" + "<div class='mb-3'>" + "<label for='name' class='form-label'>Name.</label>" + "<input type='text' class='form-control' id='name' placeholder='Press Enter to Search! '>" + "</div>" + "<div class='mb-3'>" + "<label for='userName' class='form-label'>User Name.</label>" + "<input type='text' class='form-control' id='userName' placeholder='johndoe123.'>" + "</div>" + "<div class='mb-3'>" + "<label for='userPassword' class='form-label'>User Password.</label>" + "<input type='password' class='form-control' id='userPassword' placeholder='Password123.'>" + "</div>" + "<div class='mb-3'>" + "<label for='userNIC' class='form-label'>User NIC.</label>" + "<input type='file' class='form-control' id='userNIC'>" + "</div>" + "<div class='mb-3'>" + "<label for='userAge' class='form-label'>User Age.</label>" + "<input type='number' class='form-control' id='userAge' placeholder='25.'>" + "</div>" + "<div class='mb-3'>" + "<label for='gender' class='form-label'>Gender.</label>" + "<select class='form-select' id='gender'>" + "<option value='MALE'>Male.</option>" + "<option value='FEMALE'>Female.</option>" + "<option value='OTHER'>Other.</option>" + "</select>" + "</div>" + "<div class='mb-3'>" + "<label for='userEmail' class='form-label'>User Email.</label>" + "<input type='email' class='form-control' id='userEmail' placeholder='john.doe@example.com.'>" + "</div>" + "<div class='mb-3'>" + "<label for='userPhone' class='form-label'>User Phone.</label>" + "<input type='text' class='form-control' id='userPhone' placeholder='1234567890.'>" + "</div>" + "<div class='mb-3'>" + "<label for='userAddress' class='form-label'>User Address.</label>" + "<input type='text' class='form-control' id='userAddress' placeholder='123 Main St.'>" + "</div>" + "<div class='mb-3'>" + "<label for='remarks' class='form-label'>Remarks.</label>" + "<input type='text' class='form-control' id='remarks' placeholder='Additional information.'>" + "</div>" + "<div class='mb-3'>" + "<label for='userImageLocation' class='form-label'>User Image Location.</label>" + "<input type='file' class='form-control' id='userImageLocation'>" + "</div>" + "<button type='button' id='saveUser' class='btn btn-success'>Save User</button>" + "<button type='button' id='updateUser' class='btn btn-primary'>Update User</button>" + "<button type='button' id='deleteUser' class='btn btn-danger'>Delete User</button>" + "<button type='button' id='clearButton' class='btn btn-info'>Clear</button>" + "</div>");


        isFormsVisible = true;
        $("#userTable").css("display", "none");
        isTableVisible = false;


    }

    $("#userId").prop("disabled", true);


});

var imageLocations = [];
$(document).ready(() => {

    $(document).on("click", "#saveUser", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")


        }

        saveImage("#userNIC");
        setTimeout(() => {
            saveImage("#userImageLocation");


        }, 1000)
        setTimeout(() => {
            let user = {
                userRole: $("#userRole").val(),
                userId: $("#userId").val(),
                name: $("#name").val(),
                userName: $("#userName").val(),
                userPassword: $("#userPassword").val(),
                userNIC: $("#userNIC").val(),
                userNICImageLocation: imageLocations[0],
                userAge: $("#userAge").val(),
                gender: $("#gender").val(),
                userEmail: $("#userEmail").val(),
                userPhone: $("#userPhone").val(),
                userAddress: $("#userAddress").val(),
                remarks: $("#remarks").val(),
                userImageLocation: imageLocations[1],
                isAuthorized: false


            }

            $.ajax({
                url: "http://localhost:8080/api/v1/user/saveUser",
                method: "POST",

                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
                },
                data: JSON.stringify(user),
                success: (response) => {
                    console.log(response)


                            clearFields();
                        return swal("Done!", response.message, "error")



                }, error: (xhr, textStatus, errorThrown) => {
                    swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
                },


            })

        }, 5000)


    })

});

function saveImage(imageID) {
    console.log("image id : " + imageID)
    var formData = new FormData();
    var file = $(imageID)[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/uploadToDrive',
        type: 'POST',
        data: formData,
        async: false,
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
        }, cache: false, contentType: false, processData: false, success: function (data) {
            console.log("LINK : ",data.data)
            imageLocations.push(data.data);


        }, error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }
    });

}

function clearFields() {
    $("#userId").prop("disabled", false);
    $("#userId").val("");
    $("#name").val("");
    $("#userName").val("");
    $("#userPassword").val("");
    $("#userNIC").val("");
    $("#userAge").val("");
    $("#gender").val("");
    $("#userEmail").val("");
    $("#userPhone").val("");
    $("#userAddress").val("");
    $("#remarks").val("");
    $("#userImageLocation").val("");

    $("#userRole").val("user");
    $("#userId").prop("disabled", true);
}

function validator() {
    if ($("#userRole").val() === "" || $("#name").val() === "" || $("#userName").val() === "" || $("#userPassword").val() === "" || $("#userNIC").val() === "" || $("#userAge").val() === "" || $("#gender").val() === "" || $("#userEmail").val() === "" || $("#userPhone").val() === "" || $("#userAddress").val() === "" || $("#remarks").val() === "" || $("#userImageLocation").val() === "" || $("#userNIC").val() === "") {
        return false;
    }
    return true;


}

$(document).ready(() => {


    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})
$(document).ready(() => {
    $(document).on("click", "#updateUser", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")

        }
        saveImage("#userNIC");
        setTimeout(() => {
            saveImage("#userImageLocation");


        }, 3000)
        setTimeout(() => {
            let user = {
                userRole: $("#userRole").val(),
                userId: $("#userId").val(),
                name: $("#name").val(),
                userName: $("#userName").val(),
                userPassword: $("#userPassword").val(),
                userNIC: $("#userNIC").val(),
                userNICImageLocation: imageLocations[0],
                userAge: $("#userAge").val(),
                gender: $("#gender").val(),
                userEmail: $("#userEmail").val(),
                userPhone: $("#userPhone").val(),
                userAddress: $("#userAddress").val(),
                remarks: $("#remarks").val(),
                userImageLocation: imageLocations[1],
                isAuthorized: false


            }
            console.log("User : ",user)
            $.ajax({
                url: "http://localhost:8080/api/v1/user/updateUser", method: "PUT", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
                }, data: JSON.stringify(user), success: (response) => {

                    swal("Done!", response.message, "success")
                    return clearFields();


                }, error: (xhr, textStatus, errorThrown) => {
                    swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
                },


            })

        }, 3000)

    })
})
$(document).ready(() => {
    $(document).on("keydown", "#name", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8080/api/v1/user/getByName?name=" + $("#name").val(), method: "GET", headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
                }, success: (res) => {
                    console.log("RD : " + res.data)
                    console.log("SC : " + res.data.data)
                    $("#userRole").val(res.data.userRole)
                    $("#userId").val(res.data.userId);
                    $("#name").val(res.data.name)
                    $("#userName").val(res.data.userName);

                    $("#userPassword").val(res.data.userPassword);
                    $("#userAge").val(res.data.userAge);
                    $(document).ready(function () {
                        $("#gender").val(res.data.gender)
                    });
                    $("#userEmail").val(res.data.userEmail);
                    $("#userPhone").val(res.data.userPhone);
                    $("#userAddress").val(res.data.userAddress);
                    $("#remarks").val(res.data.remarks);
                    $("#isAuthenticated").val(res.data.authenticated);


                    $("#userId").prop("disabled", true);


                    return swal("Done!", res.message, "success");


                }, error: (xhr, textStatus, errorThrown) => {
                    swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deleteUser", () => {
        if ($("#userId").val() === "") {
            return swal("OOPS!", "Please enter a Hotel name to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/user/deleteUser?userId=" + $("#userId").val(),
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
            },
            success: (res) => {

                    return swal("Done!", res.message, "success");



            },
            error: (xhr, textStatus, errorThrown) => {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            }


        });


    })


});

$("#tableView").on("click", () => {


    $(".mainContent").css("display", "none");
    if (!isTableVisible) {
        $("body").append("<table data-aos='zoom-in' id='userTable' class='table table-dark'>" + "<thead>" + "<tr>" + "<th scope='col'>User Role.</th>" + "<th scope='col'>User ID.</th>" + "<th scope='col'>Name.</th>" + "<th scope='col'>User Name.</th>" + "<th scope='col'>User Password.</th>" + "<th scope='col'>User NIC.</th>" + "<th scope='col'>User Age.</th>" + "<th scope='col'>Gender.</th>" + "<th scope='col'>User Email.</th>" + "<th scope='col'>User Phone.</th>" + "<th scope='col'>User Address.</th>" + "<th scope='col'>Remarks.</th>" + "<th scope='col'>User Image Location.</th>" + "</tr>" + "</thead>" + "<tbody></tbody>" + "</table>");

        isTableVisible = true;
        $("#forms").css("display", "none");
        isFormsVisible = false;
    }


    $.ajax({
        url: "http://localhost:8080/api/v1/user/getAllUsers",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAdminAuthToken"))
        },
        success: (res) => {
            console.log(res.data)
            res.data.map((user) => {
                let row = "<tr>"+
                    "<td>"+user.userRole+"</td>"+
                    "<td>"+user.userId+"</td>"+
                    "<td>"+user.name+"</td>"+
                    "<td>"+user.userName+"</td>"+
                    "<td>"+user.userPassword+"</td>"+
                    "<td>"+user.userNIC+"</td>"+
                    "<td>"+user.userAge+"</td>"+
                    "<td>"+user.gender+"</td>"+
                    "<td>"+user.userEmail+"</td>"+
                    "<td>"+user.userPhone+"</td>"+
                    "<td>"+user.userAddress+"</td>"+
                    "<td>"+user.remarks+"</td>"+
                    "<td>"+user.userImageLocation+"</td>"+




                    "</tr>"



                $("#userTable tbody").append(row);

            })


        }, error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }


    })


});

/*Validation - Start.*/
function isValidLength(length) {
    return length >= 3;


}

function isExceedingLength(length) {
    return length > 10;
}

function isNegative(value) {
    return value < 0;

}

function isZero(value) {
    return value === 0;

}

function isValidPassword(value) {
    return value <= 8 && value >= 16;

}

function isContainingNumbers(value) {
    return /\d/.test(value)
}

function isEmpty(value) {
    return value === "";
}


$(document).on("mouseleave",'#name',()=>{
let name = $("#name").val();
    if(isEmpty(name)){
        isInvalid("#name");
        return swal("OOPS!","Name cannot be empty!","error");

    }else{
        isValid("#name");
    }
    if(isNegative(name)){
        isInvalid("#name");
        return  swal("OOPS!","Name cannot be negative!","error");

    }else{
        isValid("#name");
    }
    if(isContainingNumbers(name)){
        isInvalid("#name");
        return swal("OOPS!","Name cannot contain numbers!","error");

    }else {
        isValid("#name");
    }
    if(isExceedingLength(name.length)){
        isInvalid("#name");
        return swal("OOPS!","Name is too lengthy!","error");

    }else{
        isValid("#name");
    }


})
$(document).on("mouseleave",'#userName',()=>{
    let un = $("#userName").val();
    if(isEmpty(un)){
        isInvalid("#userName");
        return swal("OOPS!","User Name cannot be empty!","error");

    }else{
        isValid("#userName");
    }
    if(isNegative(un)){
        isInvalid("#userName");
        return  swal("OOPS!","User Name cannot be negative!","error");

    }else{
        isValid("#userName");
    }

    if(isExceedingLength(un.length)){
        isInvalid("#userName");
        return swal("OOPS!","User Name is too lengthy!","error");

    }else{
        isValid("#userName");
    }


})
$(document).on("mouseleave",'#userPassword',()=>{
    let up = $("#userPassword").val();
    if(isEmpty(up)){
        isInvalid("#userPassword");
        return swal("OOPS!","User Password cannot be empty!","error");

    }else{
        isValid("#userPassword");
    }
    if(isNegative(up)){
        isInvalid("#userPassword");
        return  swal("OOPS!","User Password cannot be negative!","error");

    }else{
        isValid("#userPassword");
    }

    if(up.length > 16 || up.length < 8){
        isInvalid("#userPassword");
        return swal("OOPS!","User Password should be between 8 and 16 characters!","error");

    }else{
        isValid("#userPassword");
    }


})
$(document).on("mouseleave",'#userAge',()=>{
    let ua = $("#userAge").val();
    if(ua < 18) {
        isInvalid("#userAge");
        return swal("OOPS!", "User Age should be greater than 18!", "error");


    }else{
        isValid("#userAge");
    }

    if(isEmpty(ua)){
        isInvalid("#userAge");
        return swal("OOPS!","User Age cannot be empty!","error");

    }else{
        isValid("#userAge");
    }

    if(isNegative(ua)){
        isInvalid("#userAge");
        return  swal("OOPS!","User Age cannot be negative!","error");

    }else{
        isValid("#userAge");
    }





})
$(document).on("mouseleave",'#userEmail',()=>{
    let ue = $("#userEmail").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(ue)){
        isInvalid("#userEmail");
        return  swal("OOPS!","User Email is invalid!","error");
    }else{
        isValid("#userEmail");
    }

    if(isEmpty(ue)){
        isInvalid("#userEmail");
        return swal("OOPS!","User Email cannot be empty!","error");

    }else{
        isValid("#userEmail");
    }

    if(isNegative(ue)){
        isInvalid("#userEmail");
        return  swal("OOPS!","User Email cannot be negative!","error");

    }else{
        isValid("#userEmail");
    }





})
$(document).on("mouseleave",'#userPhone',()=>{
    let up = $("#userPhone").val();


    if(isEmpty(up)){
        isInvalid("#userPhone");
        return swal("OOPS!","User Phone cannot be empty!","error");

    }else{
        isValid("#userPhone");
    }

    if(isNegative(up)){
        isInvalid("#userPhone");
        return  swal("OOPS!","User Phone cannot be negative!","error");

    }else{
        isValid("#userPhone");
    }
    if(up.length < 10 || up.length > 10){
        isInvalid("#userPhone");
        return swal("OOPS!","User Phone should be 10 digits!","error");

    }else{
        isValid("#userPhone");
    }





})
$(document).on("mouseleave",'#userAddress',()=>{
    let ua = $("#userAddress").val();


    if(isEmpty(ua)){
        isInvalid("#userAddress");
        return swal("OOPS!","User Address cannot be empty!","error");

    }else{
        isValid("#userAddress");
    }

    if(isNegative(ua)){
        isInvalid("#userAddress");
        return  swal("OOPS!","User Address cannot be negative!","error");

    }else{
        isValid("#userAddress");
    }






})
$(document).on("mouseleave",'#remarks',()=>{
    let remarks = $("#remarks").val();


    if(isEmpty(remarks)){
        isInvalid("#remarks");
        return swal("OOPS!","User Remarks cannot be empty!","error");

    }else{
        isValid("#remarks");
    }

    if(isNegative(remarks)){
        isInvalid("#remarks");
        return  swal("OOPS!","User Remarks cannot be negative!","error");

    }else{
        isValid("#remarks");
    }






})
function isValid(id) {

    $(id).css("border", "2px solid green");
    $(id).css("color", "green");

}

function isInvalid(id) {
    $(id).val("")
    $(id).css("border", "2px solid red");
    $(id).css("color", "red");
}
/*Validation - End.*/