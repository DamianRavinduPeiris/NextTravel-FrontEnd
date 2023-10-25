localStorage.setItem("paymentsAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBheW1lbnRzQWRtaW4iLCJzdWIiOiJwYXlhZG1pbiIsImlhdCI6MTY5ODI0NTY2MSwiZXhwIjo0ODUxODQ1NjYxfQ.kMmhlmNQC6bfAriMgBZwyqpe-5tIL6l5_id1I4_dLOY"));
var names = [];
var pdIds = [];
$(document).ready(()=>{
    let auth = {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))

    }
    axios.get("http://localhost:8080/api/v1/user/getAllNames",{headers: auth})
        .then((res)=>{
            console.log(res.data)


        }).catch((er)=>{
            swal("OOPS!", "Something went wrong while fetching names! ", "error");

    })
    axios.get("http://localhost:8080/api/v1/user/getAllIds",{headers: auth})
        .then((res)=>{
            console.log(res.data)


        }).catch((er)=>{
        swal("OOPS!", "Something went wrong while fetching ids! ", "error");

    })



})
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
        $("body").append("<div id='forms' class='flexContainer  marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentId\" class=\"form-label\">Payment ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"paymentId\" placeholder=\"Generated by the server.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"userId\" class=\"form-label\">User ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"userId\" placeholder=\"U001\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"packageDetailsId\" class=\"form-label\">Package Details ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"packageDetailsId\" placeholder=\"Generated by the server.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentDate\" class=\"form-label\">Payment Date.</label>\n" + "  <input type=\"date\" class=\"form-control\" id=\"paymentDate\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentAmount\" class=\"form-label\">Payment Amount.</label>\n" + "  <input type=\"number\" class=\"form-control\" id=\"paymentAmount\" placeholder=\"Enter amount\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentImageLocation\" class=\"form-label\">Payment Image Location.</label>\n" + "  <input type=\"file\" class=\"form-control\" id=\"paymentImageLocation\" placeholder=\"\">\n" + "</div>\n" + "<button type=\"button\" id='savePayment' class=\"btn btn-success\">Save Payment.</button>\n" + "<button type=\"button\" id='updatePayment' class=\"btn btn-primary\">Update Payment.</button>\n" + "<button type=\"button\" id='deletePayment' class=\"btn btn-danger\">Delete Payment.</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear.</button>\n" + "</div>");

        isFormsVisible = true;
        $("#paymentId").prop("disabled", true);
        $("#packageDetailsId").prop("disabled", true);
        $("#guideTable").css("display", "none");
        isTableVisible = false;
    }


});
var paymentImageLocation = '';
$(document).ready(() => {

    $(document).on("click", "#savePayment", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")


        }

        saveImage();
        setTimeout(() => {
            let payment = {
                paymentId: $("#paymentId").val(),
                userId: $("#userId").val(),
                packageDetailsId: $("#packageDetailsId").val(),
                paymentDate: $("#paymentDate").val(),
                paymentAmount: $("#paymentAmount").val(),
                paymentImageLocation: paymentImageLocation


            }

            $.ajax({
                url: "http://localhost:8085/savePayment",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))
                },
                data: JSON.stringify(payment),
                success: (respSSonse) => {
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
    var file = $("#paymentImageLocation")[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/upload', type: 'POST', data: formData,

        cache: false, contentType: false, processData: false, success: function (data) {
            return paymentImageLocation = data;

        }, error: function () {
            console.error('Error uploading file');
        }
    });

}

function clearFields() {
    $("#paymentId").val("");
    $("#userId").val("");
    $("#packageDetailsId").val("");
    $("#paymentDate").val("");
    $("#paymentAmount").val("");
    $("#paymentImageLocation").val("");
    $("#paymentId").focus();
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
                guideImageLocation: paymentImageLocation,
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
            url: "http://localhost:8084/deleteGuide?guideID=" + $("#guideID").val(), method: "DELETE", headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAdminAuthToken"))
            }, success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }
                swal("OOPS!", res.message, "error");

            }, error: (error) => {
                swal("OOPS!", "Something went wrong! ", "error");
            }


        });


    })


});

$("#tableView").on("click", () => {
    $(".mainContent").css("display", "none");
    if (!isTableVisible) {
        $("body").append("<table data-aos='zoom-in' id='paymentsTable' class=\"table table-dark\">\n" + "  <thead>\n" + "    <tr>\n" + "      <th scope=\"col\">Payment ID.</th>\n" + "      <th scope=\"col\">User ID.</th>\n" + "      <th scope=\"col\">Package Details ID.</th>\n" + "      <th scope=\"col\">Payment Date.</th>\n" + "      <th scope=\"col\">Payment Amount.</th>\n" + "      <th scope=\"col\">Payment Image Location.</th>\n" + "    </tr>\n" + "  </thead>\n" + "  <tbody></tbody>\n" + "</table>");

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
                let row = "<tr>" + "<td>" + guide.paymentId + "</td>" + "<td>" + guide.userId + "</td>" + "<td>" + guide.packageDetailsId + "</td>" + "<td>" + guide.paymentDate + "</td>" + "<td>" + guide.paymentAmount + "</td>" + "<td>" + guide.paymentImageLocation + "</td>" + "</tr>";

                $("#paymentsTable tbody").append(row);

            })


        }, error: (error) => {
            swal("OOPS!", "Something went wrong! ", "error");

        }


    })


});