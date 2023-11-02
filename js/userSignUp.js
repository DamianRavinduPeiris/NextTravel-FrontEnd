$(document).ready(() => {

    $("#otpHolder").css("display", "none");

})
$("#signUpButton").on("click", () => {

    saveImage("#userNICImageLocation");
    saveImage("#userImageLocation");

    let user = {
        userRole: "user",
        userId: "",
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
        remarks: "User Just Signed Up!",
        userImageLocation: imageLocations[1],
        isAuthorized: false


    }
    console.log(user)
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/getAuth",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(user),
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200 || res.statusCode === 201) {
                    localStorage.setItem("userAuthToken", JSON.stringify(res.data))

                    sendEmail();


                }


            }, error: (xhr, textStatus, errorThrown) => {
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
            },



    })

})
var imageLocations = [];

function saveImage(imageID) {
    var formData = new FormData();
    var file = $(imageID)[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/uploadToDrive',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log("Image Location : ", data.data)

            imageLocations.push(data.data);


        },
        error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }
    });

}

var otp = '';

function sendEmail() {

    let auth = {
        "content-type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))

    }
    let emailDetails = {
        name: $("#name").val(), toEmail: $("#userEmail").val(),

    }

    axios.post("http://localhost:8093/sendEmail", emailDetails, {headers: auth})
        .then((res) => {
            console.log("8093 : ", res.data);

            otp = res.data.data;

            $("#otpHolder").css("display", "block");
            $("#userOTP").val("");


        })
        .catch((err) => {
            swal("OOPS!", "Server threw an exception : " + err.responseJSON.message, "error");

        })
}


$("#userOTP").on("mouseleave", () => {


    if ($("#userOTP").val() === otp) {
         swal("Success!", "User Registered Successfully!", "success");
        return  setTimeout(()=>{
            window.location.href = "PackageBooking.html";



        },2000)

    } else {
        console.log("OTP : ", otp);
        console.log("User OTP : ", $("#userOTP").val());
        return swal("OOPS!", "Invalid OTP!", "error");
    }


})


/*Validation - Start .*/

$("#userAge").on("mouseleave", function () {
    let id = $(this).attr("id");
    let value = parseInt($("#" + id).val());
    if (value < 18) {
        swal("OOPS!", "User should be at least 18 years old!", "error");
    }
    if ($("#" + id).val().length < 2) {
        swal("OOPS!", "Age should be at least 2 characters!", "error");

    }
    if ($("#" + id).val().length > 2) {
        swal("OOPS!", "Age can only be 2 characters!", "error");

    }
    if (value < 0) {
        swal("OOPS!", "Age cannot be negative !", "error");
    }


})
$("#userNIC").on("mouseleave", () => {
    const userNIC = $("#userNIC").val();

    if ($("#userNIC").val().length !== 12) {
        swal("Error!", "Invalid NIC format.", "error");
    }

    if (isEmpty($("#userNIC").val())) {
        swal("Error", "NIC cannot be empty!", "error")
    }
    if (isNegative(parseInt($("#userNIC").val()))) {
        swal("Error", "NIC Cannot be negative!", "error")
    }

});


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
function isValidPassword(value){
    return value <= 8 && value >=  16;

}

function isContainingNumbers(value) {
    return /\d/.test(value)
}

function isEmpty(value) {
    return value === "";
}


$("#name").on("mouseleave", function () {
    if (isContainingNumbers($("#name").val())) {
        swal("OOPS!", "Name cannot contain numbers!", "error");
    }
    if (!isValidLength($("#name").val().length)) {
        swal("OOPS!", "Name should be at least 3 characters!", "error");
    }
    if (isEmpty($("#name").val())) {
        swal("OOPS!", "Name cannot be empty!", "error");


    }
})
$("#userName").on("mouseleave", () => {
    let val = parseInt($("#userName").val());
    if (!isValidLength($("#userName").val().length)) {
        swal("OOPS!", "User Name should be at least 3 characters!", "error");

    }
    if (isNegative(val)) {
        swal("OOPS!", "User Name cannot be negative!", "error");


    }
    if (isZero(val)) {
        swal("OOPS!", "User Name cannot be 0!", "error");


    }
    if (isExceedingLength($("#userName").val().length)) {
        swal("OOPS!", "User Name cannot exceed 10 characters!", "error");

    }
    if (isEmpty($("#userName").val())) {
        swal("OOPS!", "User Name cannot be empty!", "error");

    }


})


$("#userPassword").on("mouseleave", () => {
    if (!isValidPassword($("#userPassword").val().length)) {
        swal("OOPS!", "Password should be between 8 and 16 characters!", "error");

    }
    if (isEmpty($("#userPassword").val())) {
        swal("OOPS!", "Password cannot be empty!", "error");


    }


})


$("#userNICImageLocation,#userImageLocation").on("mouseleave", () => {

    if (isEmpty($("#userImageLocation").val())) {
        swall("Error", "Images cannot be empty!", "error")

    }


})


$("#userEmail").on("mouseleave", () => {
    const emailRegex = /^([a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.(com|co\.uk))|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (isEmpty($("#userEmail").val())) {
        swal("Error", "Email cannot be empty!", "error")


    }
    if (isNegative(parseInt($("#userEmail").val()))) {
        swal("Error", "Email cannot be negative!", "error")

    }

    if (!emailRegex.test($("#userEmail").val())) {
        swal("Error", "Invalid Email Format!", "error")

    }

})

function isContainingLetters(val) {
    console.log('val ',val)
    return /[a-zA-Z]/.test(val);
}

$("#userPhone").on("mouseleave", () => {

    if ($("#userPhone").val().length !== 10) {
        swal("Error", "Invalid Phone Number!", "error")
    }
    if (isNegative(parseInt($("#userPhone").val()))) {
        swal("Error", "Phone Number cannot be negative!", "error")

    }
    if (isEmpty($("#userPhone").val())) {
        swal("Error", "Phone Number cannot be empty!", "error")

    }
    if(isContainingLetters($("#userPhone").val())){
        swal("Error", "Phone Number cannot contain letters!", "error")

    }

})

$("#userAddress").on("mouseleave", () => {
    if (isEmpty($("#userAddress").val())) {
        swal("Error", "Address cannot be empty!", "error")


    }
    if (isNegative(parseInt($("#userAddress").val()))) {
        swal("Error", "Address cannot be negative!", "error")


    }
    if(isValidLength($("#userAddress").val().length)){
        swal("Error", "Address should be at least 3 characters!", "error")

    }
    if($("#userAddress").val().length > 30){
        swal("Error", "Address cannot exceed 30 characters!", "error")

    }


})


/*Validation - End .*/