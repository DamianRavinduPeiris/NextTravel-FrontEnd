localStorage.setItem("paymentsAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBheW1lbnRzQWRtaW4iLCJzdWIiOiJwYXlhZG1pbiIsImlhdCI6MTY5ODI0NTY2MSwiZXhwIjo0ODUxODQ1NjYxfQ.kMmhlmNQC6bfAriMgBZwyqpe-5tIL6l5_id1I4_dLOY"));


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
        $("body").append("<div id='forms' class='flexContainer  marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"guideID\" class=\"form-label\">Guide ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideID\" placeholder=\"G001\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideName\" class=\"form-label\">Guide Name.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideName\" placeholder=\"John Doe.  [Type name and press enter to search.]\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideAddress\" class=\"form-label\">Guide Address.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideAddress\" placeholder=\"Colombo.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideAge\" class=\"form-label\">Age.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideAge\" placeholder=\"30\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideGender\" class=\"form-label\">Gender.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideGender\" placeholder=\"MALE / FEMALE.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideContact.\" class=\"form-label\">Guide Contact.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideContact\" placeholder=\"0774519629\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideImage\" class=\"form-label\">Guide Image.</label>\n" + "  <input type=\"file\" class=\"form-control\" id=\"guideImage\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideExperience\" class=\"form-label\">Guide Experience.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideExperience\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideManDayValue\" class=\"form-label\">Man Day Value.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideManDayValue\" placeholder=\"Enter amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"guideRemarks\" class=\"form-label\">Remarks.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"guideRemarks\" placeholder=\"\">\n" + "</div>\n" + "<button type=\"button\" id='saveGuide' class=\"btn btn-success\">Save Guide.</button>\n" + "<button type=\"button\" id='updateGuide' class=\"btn btn-primary\">Update Guide.</button>\n" + "" + "<button type=\"button\" id='deleteGuide' class=\"btn btn-danger\">Delete Guide.</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear.</button>\n" +


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
                url: "http://localhost:8084/saveGuide", method: "POST", headers: {
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

});

function saveImage() {
    var formData = new FormData();
    var file = $("#guideImage")[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/upload', type: 'POST', data: formData,

        cache: false, contentType: false, processData: false, success: function (data) {
            return guideImageLocation = data;

        }, error: function () {
            console.error('Error uploading file');
        }
    });

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
                    if (res.statusCode === 200 || res.statusCode === 201) {
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
                    swal("OOPS!", res.message, "error");

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