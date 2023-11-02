localStorage.setItem("guideAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6Imd1aWRlQWRtaW4iLCJzdWIiOiJndWlkZWFkbWluIiwiaWF0IjoxNjk4MjMwNTgwLCJleHAiOjQ4NTE4MzA1ODB9.EvPx0eLysnae_jz4GIFrEcq8ED7p9Yt9pr0K-hUXyU8"));


function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}

$("#logout").on("click", () => {
    window.location.href = "adminLogin.html";
});
var isFormsVisible = false;
var isTableVisible = false;
$("#guideManager").on("click", () => {

    $(".mainContent").css("display", "none");
    if (!isFormsVisible) {
        $("body").append("<div id='forms' class='flexContainer  marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"guideID\" class=\"form-label\">Guide ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideID\" placeholder=\"G001\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideName\" class=\"form-label\">Guide Name.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideName\" placeholder=\"John Doe.  [Type name and press enter to search.]\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideAddress\" class=\"form-label\">Guide Address.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideAddress\" placeholder=\"Colombo.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideAge\" class=\"form-label\">Age.</label>\n" + "  <input type=\"number\" class=\"form-control\" id=\"guideAge\" placeholder=\"30\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideGender\" class=\"form-label\">Gender.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideGender\" placeholder=\"MALE / FEMALE.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideContact.\" class=\"form-label\">Guide Contact.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideContact\" placeholder=\"0774519629\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideImage\" class=\"form-label\">Guide Image.</label>\n" + "  <input type=\"file\" class=\"form-control\" id=\"guideImage\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideExperience\" class=\"form-label\">Guide Experience.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideExperience\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideManDayValue\" class=\"form-label\">Man Day Value.</label>\n" + "  <input type=\"number\" class=\"form-control\" id=\"guideManDayValue\" placeholder=\"Enter amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideRemarks\" class=\"form-label\">Remarks.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideRemarks\" placeholder=\"\">\n" + "</div>\n" + "<button type=\"button\" id='saveGuide' class=\"btn btn-success\">Save Guide.</button>\n" + "<button type=\"button\" id='updateGuide' class=\"btn btn-primary\">Update Guide.</button>\n" + "" + "<button type=\"button\" id='deleteGuide' class=\"btn btn-danger\">Delete Guide.</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear.</button>\n" +


            "</div>")
        isFormsVisible = true;
        $("#guideTable").css("display", "none");
        isTableVisible = false;
    }


});
var guideImageLocation = '';
$(document).ready(() => {

    $(document).on("click", "#saveGuide", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")


        }

        saveImage();
        setTimeout(() => {
            let guide = {
                guideId: $("#guideID").val(),
                guideName: $("#guideName").val(),
                guideAddress: $("#guideAddress").val(),
                guideAge: $("#guideAge").val(),
                guideGender: $("#guideGender").val(),
                guideContact: $("#guideContact").val(),
                guideImageLocation: guideImageLocation,
                guideNICImageLocation: "",
                guideIDImageLocation: "",
                guideExperience: $("#guideExperience").val(),
                manDayValue: $("#guideManDayValue").val(),
                remarks: $("#guideRemarks").val()

            }
            console.log("Guide Remarks : " + guide.guideRemarks)
            console.log("Man Day Value : " + guide.guideManDayValue)
            $.ajax({
                url: "http://localhost:8084/saveGuide",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
                },
                data: JSON.stringify(guide),
                success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        swal("Done!", response.message, "success")
                        return clearFields();

                    } else {
                        return swal("OOPS!", response.message, "error")

                    }


                }, error: (error) => {
                    swal("Operation failed!", error.status + " : Something went wrong! : " + error.data, "error")

                },


            })

        }, 5000)


    })

});
/*Validation - Start.*/
$(document).ready(function (){
    $(document).on("mouseleave","#guideID",function (){
        var gv = $("#guideID").val()

        if(isEmpty(gv)){
            return swal("OOPS!","Please enter a guide ID!","error");

        }
        if(isZero(parseInt(gv)) || isNegative(gv)){
            return swal("OOPS!","Please enter a valid guide ID!","error");

        }
        if(!isValidLength(parseInt(gv.length))){
            return swal("OOPS!","Please enter a valid guide ID!","error");

        }
        if(isExceedingLength(gv.length)){
            return swal("OOPS!","Please enter a valid guide ID!","error");

        }
    })
    $(document).on("mouseleave","#guideName",function (){
        var gn = $("#guideName").val()

        if(isEmpty(gn)){
            return swal("OOPS!","Please enter a guide Name!","error");

        }
        if(isZero(parseInt(gn)) || isNegative(gn)){
            return swal("OOPS!","Please enter a valid guide Name!","error");

        }
        if(!isValidLength(parseInt(gn.length))){
            return swal("OOPS!","Please enter a valid guide Name!","error");

        }
        if(isExceedingLength(gn.length)){
            return swal("OOPS!","Please enter a valid guide Name!","error");

        }
    })
    $(document).on("mouseleave","#guideAddress",function (){
        var ga = $("#guideAddress").val()

        if(isEmpty(ga)){
            return swal("OOPS!","Please enter a guide address!","error");

        }
        if(isZero(parseInt(ga)) || isNegative(ga)){
            return swal("OOPS!","Please enter a valid guide address!","error");

        }
        if(!isValidLength(parseInt(ga.length))){
            return swal("OOPS!","Please enter a valid guide address!","error");

        }
        if(isExceedingLength(ga.length)){
            return swal("OOPS!","Please enter a valid guide address!","error");

        }
    })
    $(document).on("mouseleave","#guideAge",function (){
        var ga = $("#guideAge").val()

        if(isEmpty(ga)){
            return swal("OOPS!","Please enter a guide age!","error");

        }
        if(isZero(parseInt(ga)) || isNegative(ga)){
            return swal("OOPS!","Please enter a valid guide age!","error");

        }
        if(parseInt(ga) < 18 || isNegative(ga)){
            return swal("OOPS!","Guide age should be greater than 18!","error");

        }
        if(ga.length >= 3){
            return swal("OOPS!","Guide Age should be 2 characters!","error");

        }

    })
    $(document).on("mouseleave","#guideGender",function (){
        var gg = $("#guideGender").val()

        if(isEmpty(gg)){

            return swal("OOPS!","Gender should be either MALE or FEMALE","error");

        }
        if(isZero(parseInt(gg)) || isNegative(gg)){
            return swal("OOPS!","Please enter a valid guide age!","error");

        }
        if(gg !== 'MALE' &&  gg !== 'FEMALE'){
            return swal("OOPS!","Gender should be either MALE or FEMALE","error");


        }


    })
    $(document).on("mouseleave","#guideContact",function (){
        var gc = $("#guideContact").val()

        if(isEmpty(gc)){

            return swal("OOPS!","Contact Number cannot be empty!","error");

        }
        if(isZero(parseInt(gc)) || isNegative(gc) || gc.length > 10){
            return swal("OOPS!","Please enter a valid contact number!","error");

        }
        if(!isContainingNumbers(gc)){
            return swal("OOPS!","Please enter a valid contact number!","error");

        }


    })
    $(document).on("mouseleave","#guideExperience",function (){
        var ge = $("#guideExperience").val()

        if(isEmpty(ge)){
            return swal("OOPS!","Please enter a guide experience!","error");

        }
        if(isZero(parseInt(ge)) || isNegative(ge) ){
            return swal("OOPS!","Please enter a valid guide experience!","error");

        }
        if(!isValidLength(parseInt(ge.length))){
            return swal("OOPS!","Please enter a valid guide experience!","error");

        }



    })
    $(document).on("mouseleave","#guideManDayValue",function (){
        var gmv = $("#guideManDayValue").val()

        if(isEmpty(gmv)){
            return swal("OOPS!","Please enter a valid Man Day Value for Guide!","error");

        }
        if(isZero(parseInt(gmv)) || isNegative(gmv) ){
            return swal("OOPS!","Guide Man Day Value cannot be 0 or a negative!","error");


        }
        if(gmv.length > 5){
           return swal("OOPS!","Guide Man day value cannot exceed 5 digits!","error")

        }



    })
    $(document).on("mouseleave","#guideRemarks",function (){
        var gr = $("#guideRemarks").val()

        if(isEmpty(gr)){
            return swal("OOPS!","Please enter remarks for Guide!","error");

        }
        if(isZero(parseInt(gr)) || isNegative(gr) ){
            return swal("OOPS!","Guide Remarks Value cannot be 0 or a negative!","error");


        }
        if(gr.length > 100){
            return swal("OOPS!","Guide Remarks cannot exceed 100 characters!","error")

        }



    })



})

/*Validation - End.*/

function saveImage() {
    var formData = new FormData();
    var file = $("#guideImage")[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/uploadToDrive',
        type: 'POST',
        data: formData,
        async : false,
        cache: false, contentType: false, processData: false, success:
            function (data) {
            return guideImageLocation = data.data;

        }, error: function () {
            console.error('Error uploading file');
        }
    });

}
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

function clearFields() {
    $("#guideID").val("");
    $("#guideName").val("");
    $("#guideAddress").val("");
    $("#guideAge").val("");
    $("#guideGender").val("");
    $("#guideContact").val("");
    $("#guideExperience").val("");
    $("#guideManDayValue").val("");
    $("#guideRemarks").val("");
    $("#guideImage").val("");
}

function validator() {
    if ($("#guideID").val() === "" || $("#guideName").val() === "" || $("#guideAddress").val() === "" || $("#guideAge").val() === "" || $("#guideGender").val() === "" || $("#guideContact").val() === "" || $("#guideExperience").val() === "" || $("#guideManDayValue").val() === "" || $("#guideRemarks").val() === "" || $("#guideImage").val() === "") {
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
    $(document).on("click", "#updateGuide", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")

        }
        saveImage();
        setTimeout(() => {
            let guide = {
                guideId: $("#guideID").val(),
                guideName: $("#guideName").val(),
                guideAddress: $("#guideAddress").val(),
                guideAge: $("#guideAge").val(),
                guideGender: $("#guideGender").val(),
                guideContact: $("#guideContact").val(),
                guideImageLocation: guideImageLocation,
                guideNICImageLocation: "",
                guideIDImageLocation: "",
                guideExperience: $("#guideExperience").val(),
                manDayValue: $("#guideManDayValue").val(),
                remarks: $("#guideRemarks").val()

            }
            console.log(guide)
            $.ajax({
                url: "http://localhost:8084/updateGuide", method: "PUT", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
                }, data: JSON.stringify(guide), success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        swal("Done!", response.message, "success")
                        return clearFields();

                    } else {
                        return swal("OOPS!", response.message, "error")

                    }


                }, error: (error) => {
                    swal("Operation failed!", error.status + " : Something went wrong! : " + error.data, "error")

                },


            })

        }, 5000)

    })
})
$(document).ready(() => {
    $(document).on("keydown", "#guideName", (event) => {

        if (event.key === 'Enter') {
            console.log($("#guideName").val())
            $.ajax({
                url: "http://localhost:8084/getGuideByGuideName?guideName=" + $("#guideName").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201 && !res.data) {
                        $("#guideID").val(res.data.guideId);
                        $("#guideName").val(res.data.guideName);
                        $("#guideAddress").val(res.data.guideAddress);
                        $("#guideAge").val(res.data.guideAge);
                        $("#guideGender").val(res.data.guideGender);
                        $("#guideContact").val(res.data.guideContact);
                        $("#guideExperience").val(res.data.guideExperience);
                        $("#guideManDayValue").val(res.data.manDayValue);
                        $("#guideRemarks").val(res.data.remarks);


                        return swal("Done!", res.message, "success");

                    }
                   return  swal("OOPS!", res.message, "error");

                },
                error: (error) => {
                    swal("OOPS!", "Guide not found! ", "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deleteGuide", () => {
        if ($("#guideID").val() === "") {
            return swal("OOPS!", "Please enter a guide name to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8084/deleteGuide?guideID=" + $("#guideID").val(),
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
            },
            success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }
                swal("OOPS!", res.message, "error");

            },
            error: (error) => {
                swal("OOPS!", "Something went wrong! ", "error");
            }


        });


    })


});

$("#tableView").on("click", () => {
    $(".mainContent").css("display", "none");
    if (!isTableVisible) {
        $("body").append("<table data-aos='zoom-in' id='guideTable' class=\"table table-dark\">\n" + "  <thead>\n" + "    <tr>\n" + "      <th scope=\"col\">Guide ID.</th>\n" + "      <th scope=\"col\">Guide Name.</th>\n" + "      <th scope=\"col\">Guide Address.</th>\n" + "      <th scope=\"col\">Guide Age.</th>\n" + "      <th scope=\"col\">Guide Gender.</th>\n" + "      <th scope=\"col\">Guide Contact.</th>\n" + "      <th scope=\"col\">Guide Image Location.</th>\n" + "      <th scope=\"col\">Guide Experience.</th>\n" + "      <th scope=\"col\">Guide Man Day Value.</th>\n" + "      <th scope=\"col\">Guide Remarks.</th>\n" + "    </tr>\n" + "  </thead>\n" +

            "  <tbody></tbody>" + "</table>");
        isTableVisible = true;
        $("#forms").css("display", "none");
        isFormsVisible = false;
    }


    $.ajax({
        url: "http://localhost:8084/getAllGuides", method: "GET", headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
        }, success: (res) => {


            res.data.map((guide) => {
                console.log("inside of the loop " + guide.guideName)
                let row = "<tr>" + "<td>" + guide.guideId + "</td>" + "<td>" + guide.guideName + "</td>" + "<td>" + guide.guideAddress + "</td>" + "<td>" + guide.guideAge + "</td>" + "<td>" + guide.guideGender + "</td>" + "<td>" + guide.guideContact + "</td>" + "<td>" + guide.guideImageLocation + "</td>" + "<td>" + guide.guideExperience + "</td>" + "<td>" + guide.manDayValue + "</td>" + "<td>" + guide.remarks + "</td>+" + "</tr>";
                $("#guideTable tbody").append(row);

            })


        }, error: (error) => {
            swal("OOPS!", "Something went wrong! ", "error");

        }


    })


});