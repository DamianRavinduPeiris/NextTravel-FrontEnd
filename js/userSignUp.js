$(document).ready(() => {
    $(".loader").css('display', 'none');

    $("#otpHolder").css("display", "none");

})
$("#signUpButton").on("click", () => {
    $('.loader').css('display', 'block');
    $('#heading').text('We are signing you up!');

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
                    localStorage.setItem("userDetails",JSON.stringify(user))
                    localStorage.setItem("userAuthToken", JSON.stringify(res.data))

                    sendEmail();


                }else{
                    swal("OOPS!", "Server threw an exception : " + res.message, "error");
                }


            }, error: (xhr, textStatus, errorThrown) => {
                $('.loader').css('display', 'none');
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
            $("#signUpButton").prop("disabled", true);
            $('#heading').text('We have sent you an OTP to your email!');
            $("#userOTP").val("");
            $('.loader').css('display', 'none');


        })
        .catch((err) => {
            $('.loader').css('display', 'none');
            swal("OOPS!", "Server threw an exception : " + err.responseJSON.message, "error");

        })
}


$("#userOTP").on("mouseleave", () => {


    if ($("#userOTP").val() === otp) {
         swal("Success!", "User Registered Successfully!", "success");
        return  setTimeout(()=>{
            window.location.href = "UserLogin.html";



        },2000)

    } else {
        console.log("OTP : ", otp);
        console.log("User OTP : ", $("#userOTP").val());
        return swal("OOPS!", "Invalid OTP!", "error");
    }


})


/*Validation - Start .*/

$("#userAge").on("mouseleave", function () {

    let value = parseInt($("#userAge").val());
    if (value < 18) {
        isInvalid("#userAge")
        swal("OOPS!", "User should be at least 18 years old!", "error");
    }else{
        isValid("#userAge")
    }
    if (value.length < 2 || value.length > 2) {
        isInvalid("#userAge")
        swal("OOPS!", "Age should be  2 characters!", "error");

    }else{
        isValid("#userAge")
    }
    if (value.length > 2) {
        isInvalid("#userAge")
        swal("OOPS!", "Age can only be 2 characters!", "error");

    }else{
        isValid("#userAge")
    }
    if (value < 0) {
        isInvalid("#userAge")
        swal("OOPS!", "Age cannot be negative !", "error");
    }else{
        isValid("#userAge")
    }


})
$("#userNIC").on("mouseleave", () => {
    const userNIC = $("#userNIC").val();

    if ($("#userNIC").val().length !== 12) {
        isInvalid("#userNIC")
        swal("Error!", "Invalid NIC format.", "error");
    }else{
        isValid("#userNIC")
    }

    if (isEmpty($("#userNIC").val())) {
        isInvalid("#userNIC")
        swal("Error", "NIC cannot be empty!", "error")
    }else{
        isValid("#userNIC")
    }
    if (isNegative(parseInt($("#userNIC").val()))) {
        isInvalid("#userNIC")
        swal("Error", "NIC Cannot be negative!", "error")
    }else{
        isValid("#userNIC")
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
    return value => 8 && value >=  16;

}

function isContainingNumbers(value) {
    return /\d/.test(value)
}

function isEmpty(value) {
    return value === "";
}


$("#name").on("mouseleave", function () {
    if (isNegative(parseInt($("#name").val()))) {
        isInvalid("#name")
        return swal("OOPS!", "Name cannot contain numbers!", "error");
    }else{
        isValid("#name")
    }
    if (isContainingNumbers($("#name").val())) {
        isInvalid("#name")
        return swal("OOPS!", "Name cannot contain numbers!", "error");
    }else{
        isValid("#name")
    }
    if (!isValidLength($("#name").val().length)) {
        isInvalid("#name")
        return  swal("OOPS!", "Name should be at least 3 characters!", "error");
    }else{
        isValid("#name")
    }
    if (isEmpty($("#name").val())) {
        isInvalid("#name")
       return  swal("OOPS!", "Name cannot be empty!", "error");


    }else{
        isValid("#name")
    }
})
$("#userName").on("mouseleave", () => {
    let val = parseInt($("#userName").val());
    if (isNegative(parseInt(val))) {
        isInvalid("#userName")
        return  swal("OOPS!", "User Name cannot be negative!", "error");


    }else{
        isValid("#userName")
    }
    if (!isValidLength($("#userName").val().length)) {
        isInvalid("#userName")
        return swal("OOPS!", "User Name should be at least 3 characters!", "error");

    }else{
        isValid("#userName")
    }

    if (isZero(val)) {
        isInvalid("#userName")
       return  swal("OOPS!", "User Name cannot be 0!", "error");


    }else{
        isValid("#userName")
    }
    if (isExceedingLength($("#userName").val().length)) {
        isInvalid("#userName")
      return   swal("OOPS!", "User Name cannot exceed 10 characters!", "error");

    }else{
        isValid("#userName")
    }
    if (isEmpty($("#userName").val())) {
        isInvalid("#userName")
        return swal("OOPS!", "User Name cannot be empty!", "error");

    }else{
        isValid("#userName")
    }


})


$("#userPassword").on("mouseleave", () => {
    if (!isValidPassword($("#userPassword").val().length)) {
        isInvalid("#userPassword")
       return  swal("OOPS!", "Password should be between 8 and 16 characters!", "error");

    }else{
        isValid("#userPassword")
    }
    if (isEmpty($("#userPassword").val())) {
        isInvalid("#userPassword")
        return  swal("OOPS!", "Password cannot be empty!", "error");


    }else{
        isValid("#userPassword")
    }


})


$("#userNICImageLocation").on("mouseleave", () => {

    if (isEmpty($("#userNICImageLocation").val())) {
        isInvalid("#userNICImageLocation")
       return  swal("Error", "NIC cannot be empty!", "error")

    }else{
        isValid("#userNICImageLocation")
    }


})
$("#userImageLocation").on("mouseleave", () => {

    if (isEmpty($("#userImageLocation").val())) {
        isInvalid("#userImageLocation")
        return  swal("Error", "User Image cannot be empty!", "error")

    }else{
        isValid("#userImageLocation")
    }


})


$("#userEmail").on("mouseleave", () => {
    const emailRegex = /^([a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.(com|co\.uk))|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
    if (isEmpty($("#userEmail").val())) {
        isInvalid("#userEmail")
      return   swal("Error", "Email cannot be empty!", "error")


    }else{
        isValid("#userEmail")
    }
    if (isNegative(parseInt($("#userEmail").val()))) {
        isInvalid("#userEmail")
        return swal("Error", "Email cannot be negative!", "error")

    }else{
        isValid("#userEmail")
    }

    if (!emailRegex.test($("#userEmail").val())) {
        isInvalid("#userEmail")
        return swal("Error", "Invalid Email Format!", "error")

    }else{
        isValid("#userEmail")
    }

})

function isContainingLetters(val) {
    console.log('val ',val)
    return /[a-zA-Z]/.test(val);
}

$("#userPhone").on("mouseleave", () => {

    if ($("#userPhone").val().length !== 10) {
        isInvalid("#userPhone")
      return   swal("Error", "Invalid Phone Number!", "error")
    }else{
        isValid("#userPhone")
    }
    if (isNegative(parseInt($("#userPhone").val()))) {
        isInvalid("#userPhone")
       return  swal("Error", "Phone Number cannot be negative!", "error")

    }else{
        isValid("#userPhone")
    }
    if (isEmpty($("#userPhone").val())) {
        isInvalid("#userPhone")
       return  swal("Error", "Phone Number cannot be empty!", "error")

    }else{
        isValid("#userPhone")
    }
    if(isContainingLetters($("#userPhone").val())){
        isInvalid("#userPhone")
       return  swal("Error", "Phone Number cannot contain letters!", "error")

    }else{
        isValid("#userPhone")
    }

})

$("#userAddress").on("mouseleave", () => {
    if (isEmpty($("#userAddress").val())) {
        isInvalid("#userAddress")
     return    swal("Error", "Address cannot be empty!", "error")


    }else{
        isValid("#userAddress")
    }
    if (isNegative(parseInt($("#userAddress").val()))) {
        isInvalid("#userAddress")
       return  swal("Error", "Address cannot be negative!", "error")


    }else{
        isValid("#userAddress")
    }
    if(!isValidLength($("#userAddress").val().length)){
        isInvalid("#userAddress")
       return  swal("Error", "Address should be at least 3 characters!", "error")

    }else{

    isValid("#userAddress")

    }
    if($("#userAddress").val().length > 30){
        isInvalid("#userAddress")
      return   swal("Error", "Address cannot exceed 30 characters!", "error")

    }else{
        isValid("#userAddress")
    }


})



function isValid(id) {
    $("#signUpButton").prop("disabled", false);
    $(id).css("border", "2px solid green");
    $(id).css("color", "green");

}

function isInvalid(id) {
    $("#signUpButton").prop("disabled", true);
    $(id).val('');
    $(id).css("border", "2px solid red");
    $(id).css("color", "red");
}


/*Validation - End .*/