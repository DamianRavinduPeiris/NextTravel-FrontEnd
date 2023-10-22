localStorage.setItem("hotelAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6ImhvdGVsQWRtaW4iLCJzdWIiOiJyYXZpbmR1IiwiaWF0IjoxNjk3ODc2MzAxLCJleHAiOjQ4NTE0NzYzMDF9.mSeL9OwXzPb1jDYdVFTpSfzBkjdKG-4fZuoe8LYqi5U"));



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
        $("body").append("<div id='forms' class='flexContainer marginAdder'>" +
            "<div class='mb-3'>" +
            "<label for='userRole' class='form-label'>User Role.</label>" +
            "<select class='form-select' id='userRole'>" +
            "<option value='user'>USER</option>" +
            "<option value='hotelAdmin'>HOTEL ADMIN</option>" +
            "<option value='vehicleAdmin'>VEHICLE ADMIN</option>" +
            "<option value='guideAdmin'>GUIDE ADMIN</option>" +
            "<option value='packageAdmin'>PACKAGE ADMIN</option>" +
            "<option value='packageDetailsAdmin'>PACKAGE DETAILS ADMIN</option>" +
            "<option value='paymentsAdmin'>PAYMENTS ADMIN</option>" +
            "</select>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userId' class='form-label'>User ID.</label>" +
            "<input type='text' class='form-control' id='userId' placeholder='12345.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='name' class='form-label'>Name.</label>" +
            "<input type='text' class='form-control' id='name' placeholder='John Doe.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userName' class='form-label'>User Name.</label>" +
            "<input type='text' class='form-control' id='userName' placeholder='johndoe123.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userPassword' class='form-label'>User Password.</label>" +
            "<input type='password' class='form-control' id='userPassword' placeholder='Password123.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userNIC' class='form-label'>User NIC.</label>" +
            "<input type='file' class='form-control' id='userNIC'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userAge' class='form-label'>User Age.</label>" +
            "<input type='number' class='form-control' id='userAge' placeholder='25.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='gender' class='form-label'>Gender.</label>" +
            "<select class='form-select' id='gender'>" +
            "<option value='MALE'>Male.</option>" +
            "<option value='FEMALE'>Female.</option>" +
            "<option value='OTHER'>Other.</option>" +
            "</select>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userEmail' class='form-label'>User Email.</label>" +
            "<input type='email' class='form-control' id='userEmail' placeholder='john.doe@example.com.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userPhone' class='form-label'>User Phone.</label>" +
            "<input type='text' class='form-control' id='userPhone' placeholder='1234567890.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userAddress' class='form-label'>User Address.</label>" +
            "<input type='text' class='form-control' id='userAddress' placeholder='123 Main St.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='remarks' class='form-label'>Remarks.</label>" +
            "<input type='text' class='form-control' id='remarks' placeholder='Additional information.'>" +
            "</div>" +
            "<div class='mb-3'>" +
            "<label for='userImageLocation' class='form-label'>User Image Location.</label>" +
            "<input type='file' class='form-control' id='userImageLocation'>" +
            "</div>" +
            "<button type='button' id='saveUser' class='btn btn-success'>Save User</button>" +
            "<button type='button' id='updateUser' class='btn btn-primary'>Update User</button>" +
            "<button type='button' id='deleteUser' class='btn btn-danger'>Delete User</button>" +
            "<button type='button' id='clearButton' class='btn btn-info'>Clear</button>" +
            "</div>");


        isFormsVisible = true;
        $("#hotelTable").css("display", "none");
        isTableVisible = false;


    }
    setPackageIDs();
    $("#hotelId").prop("disabled", true);


});
var hCategory = '';
var isPetsAllowedOrNot = '';
var pId = '';
$(document).ready(() => {
    $(document).on("click", "#hotelCategory", () => {
        hCategory = $("#hotelCategory").val();

    })
    $(document).on("click", "#isPetsAllowed", () => {
        console.log($("#isPetsAllowed").val())
        hCategory = $("#isPetsAllowed").val();

    })
    $(document).on("click", "#packageId", () => {
        pId = $("#packageId").val();
        console.log($("#packageId").val())
        console.log("package id clicked" + $("#packageId").val())


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
                hotelId: "",
                packageId: $("#packageId").val(),
                hotelName: $("#hotelName").val(),
                hotelCategory: $("#hotelCategory").val(),
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
                petsAllowed: $("#isPetsAllowed").val(),
                hotelFee: $("#hotelFee").val(),
                cancellationCriteria: $("#cancellationCriteria").val(),
                remarks: $("#remarks").val()

            }

            $.ajax({
                url: "http://localhost:8081/saveHotel", method: "POST", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
                }, data: JSON.stringify(hotel), success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        swal("Done!", response.message, "success")
                        return clearFields();

                    } else {
                        return swal("OOPS!", response.message, "error")

                    }


                },  error: (xhr,textStatus,errorThrown) => {
                    swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
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
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
        }, cache: false, contentType: false, processData: false, success: function (data) {

            hcl = data;
            console.log("IMG : " + hcl)


        },  error: (xhr,textStatus,errorThrown) => {
            swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
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
    if ($("#packageId").val() === "" || $("#hotelName").val() === "" || $("#hotelCategory").val() === "" || $("#hotelLocation").val() === "" || $("#hotelLocationWithCoordinates").val() === "" || $("#hotelImageLocation").val() === "" || $("#hotelEmail").val() === "" || $("#hotelContact1").val() === "" || $("#hotelContact2").val() === "" || $("#fullBoardWithACLuxuryRoomDouble").val() === "" || $("#halfBoardWithACLuxuryRoomDouble").val() === "" || $("#fullBoardWithACLuxuryRoomTriple").val() === "" || $("#halfBoardWithACLuxuryRoomTriple").val() === "" || $("#isPetsAllowed").val() === "" || $("#hotelFee").val() === "" || $("#cancellationCriteria").val() === "" || $("#remarks").val() === "") {
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
    $(document).on("click", "#updateHotel", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")

        }
        saveImage();
        setTimeout(() => {
            console.log("Is pets allowed : "+$("#isPetsAllowed").val())
            let hotel = {
                hotelId: $("#hotelId").val(),
                packageId: $("#packageId").val(),
                hotelName: $("#hotelName").val(),
                hotelCategory: $("#hotelCategory").val(),
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
                petsAllowed: $("#isPetsAllowed").val(),
                hotelFee: $("#hotelFee").val(),
                cancellationCriteria: $("#cancellationCriteria").val(),
                remarks: $("#remarks").val()

            }
            console.log(hotel)
            $.ajax({
                url: "http://localhost:8081/updateHotel", method: "PUT", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
                }, data: JSON.stringify(hotel), success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        swal("Done!", response.message, "success")
                        return clearFields();

                    } else {
                        return swal("OOPS!", response.message, "error")

                    }


                },  error: (xhr,textStatus,errorThrown) => {
                    swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
                },


            })

        }, 3000)

    })
})
$(document).ready(() => {
    $(document).on("keydown", "#hotelName", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8081/getHotelByHotelName?hotelName=" + $("#hotelName").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
                },
                success: (res) => {


                    if (res.statusCode === 200 || res.statusCode === 201) {
                       /* if(!res.data){
                            return swal("OOPS!", res.message, "error");

                        }*/
                        $("#hotelId").prop("disabled", false);
                        $("#hotelId").val(res.data.hotelId);
                        $("#hotelId").prop("disabled", true);
                        $("#packageId").val(res.data.packageId);
                        $("#hotelName").val(res.data.hotelName);
                        $(document).ready(function () {
                            $("#hotelCategory option[value='" + res.data.hotelCategory + "']").remove();
                            $("#hotelCategory").append("<option value='" + res.data.hotelCategory + "'>" + res.data.hotelCategory + "</option>");
                            $("#hotelCategory option[value='" + res.data.hotelCategory + "']").attr('selected', 'selected');
                        });

                        $("#hotelLocation").val(res.data.hotelLocation);
                        $("#hotelLocationWithCoordinates").val(res.data.hotelLocationWithCoordinates);
                        $("#hotelEmail").val(res.data.hotelContactEmail);
                        $("#hotelContact1").val(res.data.hotelContact1);
                        $("#hotelContact2").val(res.data.hotelContact2);
                        $("#fullBoardWithACLuxuryRoomDouble").val(res.data.fullBoardWithACLuxuryRoomDouble);
                        $("#halfBoardWithACLuxuryRoomDouble").val(res.data.halfBoardWithACLuxuryRoomDouble);
                        $("#fullBoardWithACLuxuryRoomTriple").val(res.data.fullBoardWithACLuxuryRoomTriple);
                        $("#halfBoardWithACLuxuryRoomTriple").val(res.data.halfBoardWithACLuxuryRoomTriple);
                        $(document).ready(() => {
                            $("#isPetsAllowed option[value='" + res.data.petsAllowed + "']").remove();
                            $("#isPetsAllowed").append("<option value='" + res.data.petsAllowed + "'>" + res.data.petsAllowed + "</option>");
                            $("#isPetsAllowed option[value='" + res.data.petsAllowed + "']").attr('selected', 'selected');
                        })

                        $("#hotelFee").val(res.data.hotelFee);
                        $("#cancellationCriteria").val(res.data.cancellationCriteria);
                        $("#remarks").val(res.data.remarks);


                        return swal("Done!", res.message, "success");

                    }


                },
                error: (xhr,textStatus,errorThrown) => {
                    swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deleteHotel", () => {
        if ($("#hotelId").val() === "") {
            return swal("OOPS!", "Please enter a Hotel name to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8081/deleteHotel?hotelID=" + $("#hotelId").val(), method: "DELETE", headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
            }, success: (res) => {
                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }
                console.log(res.data)
                swal("OOPS!", res.message, "error");

            },  error: (xhr,textStatus,errorThrown) => {
                swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
            }


        });


    })


});

$("#tableView").on("click", () => {


    $(".mainContent").css("display", "none");
    if (!isTableVisible) {
        $("body").append("<table data-aos='zoom-in' id='hotelTable' class=\"table table-dark\">\n" + "  <thead>\n" + "    <tr>\n" + "      <th scope=\"col\">Hotel ID.</th>\n" + "      <th scope=\"col\">Package ID.</th>\n" + "      <th scope=\"col\">Hotel Name</th>\n" + "      <th scope=\"col\">Hotel Category.</th>\n" + "      <th scope=\"col\">Hotel Location.</th>\n" + "      <th scope=\"col\">Location (With Coordinates).</th>\n" + "      <th scope=\"col\">Image Location.</th>\n" + "      <th scope=\"col\">Hotel Email.</th>\n" + "      <th scope=\"col\">Hotel Contact 1.</th>\n" + "      <th scope=\"col\">Hotel Contact 2.</th>\n" + "      <th scope=\"col\">Full Board With AC Luxury Room Double.</th>\n" + "      <th scope=\"col\">Half Board With AC Luxury Room Double.</th>\n" + "      <th scope=\"col\">Full Board With AC Luxury Room Triple.</th>\n" + "      <th scope=\"col\">Half Board With AC Luxury Room Triple.</th>\n" + "      <th scope=\"col\">Is Pets Allowed?.</th>\n" + "      <th scope=\"col\">Hotel Fee.</th>\n" + "      <th scope=\"col\">Remarks.</th>\n" + "    </tr>\n" + "  </thead>\n" + "  <tbody></tbody>" + "</table>");

        isTableVisible = true;
        $("#forms").css("display", "none");
        isFormsVisible = false;
    }


    $.ajax({
        url: "http://localhost:8081/getAllHotels", method: "GET", headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("hotelAdminAuthToken"))
        }, success: (res) => {


            res.data.map((hotel) => {


                let row = "<tr>\n" + "      <th scope=\"row\">" + hotel.hotelId + "</th>\n" + "      <td>" + hotel.packageId + "</td>\n" + "      <td>" + hotel.hotelName + "</td>\n" + "      <td>" + hotel.hotelCategory + "</td>\n" + "      <td>" + hotel.hotelLocation + "</td>\n" + "      <td>" + hotel.hotelLocationWithCoordinates + "</td>\n" + "      <td>" + hotel.hotelImageLocation + "</td>\n" + "      <td>" + hotel.hotelContactEmail + "</td>\n" + "      <td>" + hotel.hotelContact1 + "</td>\n" + "      <td>" + hotel.hotelContact2 + "</td>\n" + "      <td>" + hotel.fullBoardWithACLuxuryRoomDouble + "</td>\n" + "      <td>" + hotel.halfBoardWithACLuxuryRoomDouble + "</td>\n" + "      <td>" + hotel.fullBoardWithACLuxuryRoomTriple + "</td>\n" + "      <td>" + hotel.halfBoardWithACLuxuryRoomTriple + "</td>\n" + "      <td>" + hotel.petsAllowed + "</td>\n" + "      <td>" + hotel.hotelFee + "</td>\n" + "      <td>" + hotel.remarks + "</td>\n" + "    </tr>";

                $("#hotelTable tbody").append(row);

            })


        },  error: (xhr,textStatus,errorThrown) => {
            swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
        }


    })


});

function setPackageIDs() {
    packageIDs.forEach((pID) => {
        $("#packageId").append("<option value='" + pID + "'>" + pID + "</option>")
    })

}