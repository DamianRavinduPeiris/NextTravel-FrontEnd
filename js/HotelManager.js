localStorage.setItem("adminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lODEwIiwiaWF0IjoxNjk3MzQ5OTAzLCJleHAiOjQ4NTA5NDk5MDN9.gj2KHG8cbsU6alm28tXeaPkiu-pKbdZr2a2PS2FEzAE"));
var packageIDs = [];
$(document).ready(() => {
    let auth = {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
    }
    axios.get("http://localhost:8080/api/v1/packages/getAllIDs", {headers: auth})
        .then((res) => {
            packageIDs = res.data;

        })
        .catch(() => {
            swal("OOPS!", "Something went wrong while fetching PIDs!", "error")
        })


});

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
$("#guideManager").on("click", () => {


    $(".mainContent").css("display", "none");


    $("#hotelTable").css("display", "none");


    $("body").append("<div id='forms' class='flexContainer  marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelId\" class=\"form-label\">Hotel ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelId\" placeholder=\"H001\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"packageId\" class=\"form-label\">Package ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"packageId\" placeholder=\"P001.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelName\" class=\"form-label\">Hotel Name.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelName\" placeholder=\"Hilton Colombo.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelCategory\" class=\"form-label\">Hotel Category.</label>\n" + "  <select class=\"form-select\" id=\"hotelCategory\">\n" + "    <option value=\"regular\">Regular</option>\n" + "    <option value=\"midLevel\">Mid-Level</option>\n" + "    <option value=\"luxury\">Luxury</option>\n" + "    <option value=\"superLuxury\">Super-Luxury</option>\n" + "  </select>\n" + "</div>\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelLocation\" class=\"form-label\">Hotel Location.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelLocation\" placeholder=\"Colombo.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelLocationWithCoordinates\" class=\"form-label\">Hotel Location With Coordinates</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelLocationWithCoordinates\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelImageLocation\" class=\"form-label\">Hotel Image.</label>\n" + "  <input type=\"file\" class=\"form-control\" id=\"hotelImageLocation\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelEmail\" class=\"form-label\">Hotel Email.</label>\n" + "  <input type=\"email\" class=\"form-control\" id=\"hotelEmail\" placeholder=\"contact@hilton.com\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelContact1\" class=\"form-label\">Hotel Contact 1.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelContact1\" placeholder=\"Enter Contact Number 1.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelContact2\" class=\"form-label\">Hotel Contact 2.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelContact2\" placeholder=\"Enter Contact Number 2.\">\n" + "<div class=\"mb-3\">\n" + "  <label for=\"fullBoardWithACLuxuryRoomDouble\" class=\"form-label\">Full Board With AC Luxury Room Double.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"fullBoardWithACLuxuryRoomDouble\" placeholder=\"Enter Amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"halfBoardWithACLuxuryRoomDouble\" class=\"form-label\">Half Board With AC Luxury Room Double.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"halfBoardWithACLuxuryRoomDouble\" placeholder=\"Enter Amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"fullBoardWithACLuxuryRoomTriple\" class=\"form-label\">Full Board With AC Luxury Room Triple.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"fullBoardWithACLuxuryRoomTriple\" placeholder=\"Enter Amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"halfBoardWithACLuxuryRoomTriple\" class=\"form-label\">Half Board With AC Luxury Room Triple.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"halfBoardWithACLuxuryRoomTriple\" placeholder=\"Enter Amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + " <div class=\"mb-3\">\n" + "  <label for=\"isPetsAllowed\" class=\"form-label\">Is Pets Allowed?</label>\n" + "  <select class=\"form-select\" id=\"isPetsAllowed\">\n" + "    <option value=\"yes\">Yes</option>\n" + "    <option value=\"no\">No</option>\n" + "  </select>\n" + "</div>\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelFee\" class=\"form-label\">Hotel Fee.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelFee\" placeholder=\"Enter Amount in LKR.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"cancellationCriteria\" class=\"form-label\">Cancellation Criteria.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"cancellationCriteria\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"remarks\" class=\"form-label\">Remarks.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"remarks\" placeholder=\"\">\n" + "</div>\n" +


        "</div>\n" + "<button type=\"button\" id='saveHotel' class=\"btn btn-success\">Save Hotel.</button>\n" + "<button type=\"button\" id='updateHotel' class=\"btn btn-primary\">Update Hotel.</button>\n" + "" + "<button type=\"button\" id='deleteHotel' class=\"btn btn-danger\">Delete Hotel.</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear.</button>\n" +


        "</div>")
});
var hCategory = '';
var isPetsAllowedOrNot = '';
$(document).ready(() => {
    $(document).on("click", "#hotelCategory", () => {
        hCategory = $("#hotelCategory").val();

    })
    $(document).on("click", "#isPetsAllowed", () => {
        console.log($("#isPetsAllowed").val())
        hCategory = $("#isPetsAllowed").val();

    })
});
var hcl = '';
$(document).ready(() => {

    $(document).on("click", "#saveHotel", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")


        }

        saveImage();
        setTimeout(() => {
            let hotel = {
                hotelId: $("#hotelId").val(),
                packageId: $("#packageId").val(),
                hotelName: $("#hotelName").val(),
                hotelCategory: hCategory,
                hotelLocation: $("#hotelLocation").val(),
                hotelLocationWithCoordinates: $("#hotelLocationWithCoordinates").val(),
                hotelImageLocation: hcl,
                hotelContactEmail: $("#hotelEmail").val(),
                hotelContact1: $("#hotelContact1").val(),
                hotelContact2: $("#hotelContact2").val(),
                fullBoardWithACLuxuryRoomDouble: $("#fullBoardWithACLuxuryRoomDouble").val(),
                halfBoardWithACLuxuryRoomDouble: $("#halfBoardWithACLuxuryRoomDouble").val(),
                fullBoardWithACLuxuryRoomTriple: $("#fullBoardWithACLuxuryRoomTriple").val(),
                halfBoardWithACLuxuryRoomTriple: $("#halfBoardWithACLuxuryRoomTriple").val(),
                isPetsAllowed: isPetsAllowedOrNot,
                hotelFee: $("#hotelFee").val(),
                cancellationCriteria: $("#cancellationCriteria").val(),
                remarks: $("#remarks").val()

            }

            $.ajax({
                url: "http://localhost:8080/api/v1/hotels/save", method: "POST", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                }, data: JSON.stringify(hotel), success: (response) => {
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
    var file = $('#hotelImageLocation')[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/upload', type: 'POST', data: formData, headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
        }, cache: false, contentType: false, processData: false, success: function (data) {
            console.log("IMG : " + data)
            return hcl = data;

        }, error: function () {
            console.error('Error uploading file');
        }
    });

}

function clearFields() {
    $("#hotelId").val("");
    $("#packageId").val("");
    $("#hotelName").val("");
    $("#hotelCategory").val("");
    $("#hotelLocation").val("");
    $("#hotelLocationWithCoordinates").val("");
    $("#hotelImageLocation").val("");
    $("#hotelEmail").val("");
    $("#hotelContact1").val("");
    $("#hotelContact2").val("");
    $("#fullBoardWithACLuxuryRoomDouble").val("");
    $("#halfBoardWithACLuxuryRoomDouble").val("");
    $("#fullBoardWithACLuxuryRoomTriple").val("");
    $("#halfBoardWithACLuxuryRoomTriple").val("");
    $("#isPetsAllowed").val("");
    $("#hotelFee").val("");
    $("#cancellationCriteria").val("");
    $("#remarks").val("");
}

function validator() {
    if ($("#hotelId").val() === "" || $("#packageId").val() === "" || $("#hotelName").val() === "" || $("#hotelCategory").val() === "" || $("#hotelLocation").val() === "" || $("#hotelLocationWithCoordinates").val() === "" || $("#hotelImageLocation").val() === "" || $("#hotelEmail").val() === "" || $("#hotelContact1").val() === "" || $("#hotelContact2").val() === "" || $("#fullBoardWithACLuxuryRoomDouble").val() === "" || $("#halfBoardWithACLuxuryRoomDouble").val() === "" || $("#fullBoardWithACLuxuryRoomTriple").val() === "" || $("#halfBoardWithACLuxuryRoomTriple").val() === "" || $("#isPetsAllowed").val() === "" || $("#hotelFee").val() === "" || $("#cancellationCriteria").val() === "" || $("#remarks").val() === "") {
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
                guideImageLocation: hcl,
                guideNICImageLocation: "",
                guideIDImageLocation: "",
                guideExperience: $("#guideExperience").val(),
                manDayValue: $("#guideManDayValue").val(),
                remarks: $("#guideRemarks").val()

            }
            console.log(guide)
            $.ajax({
                url: "http://localhost:8080/api/v1/guide/updateGuide", method: "PUT", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
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
                url: "http://localhost:8080/api/v1/guide/getByName?guideName=" + $("#guideName").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
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
            url: "http://localhost:8080/api/v1/guide/deleteGuide?guideID=" + $("#guideID").val(),
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
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

    $("#forms").css("display", "none");


    $(".mainContent").css("display", "none");


    $("body").append("<table data-aos='zoom-in' id='hotelTable' class=\"table table-dark\">\n" + "  <thead>\n" + "    <tr>\n" + "      <th scope=\"col\">Hotel ID.</th>\n" + "      <th scope=\"col\">Package ID.</th>\n" + "      <th scope=\"col\">Hotel Category.</th>\n" + "      <th scope=\"col\">Hotel Location.</th>\n" + "      <th scope=\"col\">Location (With Coordinates).</th>\n" + "      <th scope=\"col\">Image Location.</th>\n" + "      <th scope=\"col\">Hotel Email.</th>\n" + "      <th scope=\"col\">Hotel Contact 1.</th>\n" + "      <th scope=\"col\">Hotel Contact 2.</th>\n" + "      <th scope=\"col\">Full Board With AC Luxury Room Double.</th>\n" + "      <th scope=\"col\">Half Board With AC Luxury Room Double.</th>\n" + "      <th scope=\"col\">Full Board With AC Luxury Room Triple.</th>\n" + "      <th scope=\"col\">Half Board With AC Luxury Room Triple.</th>\n" + "      <th scope=\"col\">Is Pets Allowed?.</th>\n" + "      <th scope=\"col\">Hotel Fee.</th>\n" + "      <th scope=\"col\">Remarks.</th>\n" + "    </tr>\n" + "  </thead>\n" + "  <tbody></tbody>" + "</table>");


    $.ajax({
        url: "http://localhost:8080/api/v1/guide/getAllGuides", method: "GET", headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
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