function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}

var pID = '';
var pC = '';
var auth = {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))
}

$(document).ready(() => {
    $(".pfp").attr("src", JSON.parse(localStorage.getItem("userDetails")).userImageLocation);
    $("#totalNoOfDays").prop("disabled", true);
    $("#hotelPrice").prop("disabled", true);
    $("#vehiclePrice").prop("disabled", true);
    $("#totalPrice").val("");
    $("#totalPrice").prop("disabled", true);
    $("#guidePrice").prop("disabled", true);
    $("#serviceCharge").prop("disabled", true);
    if (JSON.parse(localStorage.getItem("packageName")) === "rb") {
        $("#packageName").text("Regular.");
        $("#packageDescription").text("These accommodations offer basic amenities and services suitable for budget-conscious travelers. Regular 3-star hotels provide standard facilities, while 2-star economy options offer even more budget-friendly options with fewer amenities.");
        $(".header__image__container").css("background-image", "url('assets/h1.jpg')");
        pID = "P001";
        pC = "Regular";
        return packageLoader(pID);

    }
    if (JSON.parse(localStorage.getItem("packageName")) === "ml") {
        $("#packageName").text("Mid Level.");
        $("#packageDescription").text("Mid-level 3-star hotels provide a comfortable stay with additional amenities and services. On the other hand, 4-star mid-range accommodations offer a higher level of quality and often include extra features for a more luxurious experience.");
        $(".header__image__container").css("background-image", "url('assets/h2.jpg')");
        pID = "P002";
        pC = "Mid Level";
        return packageLoader(pID);

    }
    if (JSON.parse(localStorage.getItem("packageName")) === "lb") {
        $("#packageName").text("Luxury.");
        $("#packageDescription").text("Luxury 4-star hotels provide a premium experience with top-notch amenities and services. 5-star luxury accommodations go a step further, offering the highest level of quality, elegance, and personalized service for a truly opulent stay.");
        $(".header__image__container").css("background-image", "url('assets/h3.jpg')");
        pID = "P003";
        pC = "Luxury";
        return packageLoader(pID);

    }
    if (JSON.parse(localStorage.getItem("packageName")) === "slb") {
        $("#packageName").text("Super Luxury.");
        $("#packageDescription").text("These are the epitome of luxury in the hospitality industry. Super luxury 5-star hotels offer an extraordinary level of opulence, with the finest amenities, exceptional services, and a truly lavish experience. They are often frequented by discerning travelers seeking the utmost in comfort and sophistication.");
        $(".header__image__container").css("background-image", "linear-gradient(\n" + "            to right,\n" + "            rgba(58, 59, 65, 0.9),\n" + "            rgba(100, 125, 187, 0.1)\n" + "    ),url('assets/h4.jpg')");
        pID = "P004";
        pC = "Super Luxury";
        return packageLoader(pID);

    }


})

function packageLoader(pID) {
    axios.get("http://localhost:8081/getHotelByPackageId?packageId=" + pID, {headers: auth})
        .then((res) => {
            localStorage.setItem("hotelData", JSON.stringify(res.data.data))
            res.data.data.forEach((hotel) => {
                $('#hotels').append('<option hotel="' + hotel.hotelName + '">' + hotel.hotelName + '</option>');
            });
        })
        .catch((e) => {
            console.log(e);
        });


    axios.get("http://localhost:8082/getVehicleByPackageId?packageId=" + pID, {headers: auth})
        .then((res) => {
            localStorage.setItem("vehicleData", JSON.stringify(res.data.data))
            res.data.data.forEach((vehicle) => {
                $('#vehicles').append('<option value="' + vehicle.vehicleId + '" vehicleBrand="' + vehicle.vehicleBrand + '">' + vehicle.vehicleBrand + ' : ' + vehicle.feeForADay + ' LKR Per Day.' + '</option>');

            });
        })
        .catch((e) => {
            console.log(e);
        });


}

var hID = '';
var vID = '';

function calculateTotal() {
    if ($("#guide").val() !== "false" && $("#availableGuides").val() === null) {
        return swal("OOPS!", "Please Select a Guide!", "error");
    }
    if ($("#guidePrice").val()) {
        return $("#totalPrice").val(parseInt($("#hotelPrice").val()) + parseInt($("#vehiclePrice").val()) + parseInt($("#serviceCharge").val()) + parseInt($("#guidePrice").val()));


    } else {
        return $("#totalPrice").val(parseInt($("#hotelPrice").val()) + parseInt($("#vehiclePrice").val()) + parseInt($("#serviceCharge").val()));

    }


}

$(document).ready(function () {


    $('#hotels').on('change', function () {
        if ($("#totalNoOfDays").val() === '') {
            return swal("OOPS!", "Select a valid date range!", "error");

        }

        console.log('Selected Hotel Name:', $(this).val());
        var selectedHotelName = $(this).val();
        var hotelData = JSON.parse(localStorage.getItem("hotelData"));

        hotelData.forEach(function (hotel) {
            if (selectedHotelName === hotel.hotelName) {
                hID = hotel.hotelId;
                $("#packageName").text(hotel.hotelName);
                $(".header__image__container").css("background-image", "url('" + hotel.hotelImageLocation + "')");
                $('html, body').animate({scrollTop: '0px'}, "slow");

                $("#hotelPackages").empty();
                $("#hotelPackages").append("<option value='" + hotel.fullBoardWithACLuxuryRoomDouble + "'>" + "Full Board With AC Luxury Room Double  : " + hotel.fullBoardWithACLuxuryRoomDouble + " LKR.</option>");

                $("#hotelPackages").append("<option value='" + hotel.fullBoardWithACLuxuryRoomTriple + "'>" + "Full Board With AC Luxury Room Triple  : " + hotel.fullBoardWithACLuxuryRoomTriple + " LKR.</option>");

                $("#hotelPackages").append("<option value='" + hotel.halfBoardWithACLuxuryRoomDouble + "'>" + "Half Board With AC Luxury Room Double  : " + hotel.halfBoardWithACLuxuryRoomDouble + " LKR.</option>");

                $("#hotelPackages").append("<option value='" + hotel.halfBoardWithACLuxuryRoomTriple + "'>" + "Half Board With AC Luxury Room Triple  : " + hotel.halfBoardWithACLuxuryRoomTriple + " LKR.</option>");


                console.log('Selected Hotel Name:', selectedHotelName);
                console.log("Hotel Package", hotel.fullBoardWithACLuxuryRoomDouble, " ", hotel.fullBoardWithACLuxuryRoomTriple, " ", hotel.halfBoardWithACLuxuryRoomDouble, " ", hotel.halfBoardWithACLuxuryRoomTriple);
            }
        });


    });
});
$(document).ready(() => {
    $("#hotelPackages").on("change", () => {
        $("#hotelPrice").val(parseInt($("#hotelPackages").val()) * parseInt($("#totalNoOfDays").val()));
        return $("#serviceCharge").val(parseInt($("#hotelPrice").val()) * 5 / 100);


    });
    $("#vehicles").on("change", () => {

        let vd = JSON.parse(localStorage.getItem("vehicleData"))
        vd.forEach((v) => {
            if (v.vehicleId === $("#vehicles").val()) {
                return vehiclePrice = v.feeForADay;

            }

        })


        $("#vehiclePrice").val(parseInt($("#totalNoOfDays").val()) * vehiclePrice);
        return calculateTotal();


    });

})
var vehiclePrice = 0;


$("#updateButton").on("click", () => {
    let auth = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))
    }
    let user = JSON.parse(localStorage.getItem("userDetails"));
    saveImage("#userImageLocation");
    user.userImageLocation = imageLocation;
    user.password = $("#password").val();
    console.log(user)
    localStorage.setItem("userDetails", JSON.stringify(user))
    setTimeout(() => {
        console.log("img" + imageLocation)
        let user = {
            userID: JSON.parse(localStorage.getItem("userDetails")).userId,
            password: $("#password").val(),
            userImageLocation: imageLocation,
        }
        axios.put("http://localhost:8080/api/v1/user/customUpdater", user, {headers: auth})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })


    }, 5000)
})
var imageLocation;


var guideData = [];
var guidePrice = 0;
$(document).ready(function () {
    $("#guide").on("change", () => {
        if ($("#guide").val() !== "false") {
            axios.get("http://localhost:8084/getAllGuides", {headers: auth})
                .then((res) => {
                    guideData = res.data.data;


                })
                .catch((er) => {
                    swal("OOPS!", "Server threw an exception : " + er.responseJSON.message, "error");

                })


            setTimeout(() => {
                $(".form").append("<div id='guideHolder'data-aos='zoom-in' class=\"mb-3\">\n" + "            <label for=\"availableGuides\" class=\"form-label specialLabels\">Available Guides :</label>\n" + "            <select class=\"form-select\" id=\"availableGuides\" name=\"pets\" required>\n" + "                 \n" + "            </select>\n" + "        </div>");

                guideData.forEach((guide) => {
                    $('#availableGuides').append('<option  value="' + guide.guideId + '">' + guide.guideName + ' : ' + guide.manDayValue + ' LKR Per Day.' + '</option>');


                })

            }, 1000)


        } else {
            $("#totalPrice").val($("#totalPrice").val() - $("#guidePrice").val());
            $("#guidePrice").val("");
            $("#guideHolder").remove();
        }


    })
    $(document).ready(() => {
        $("body").on("change", "#availableGuides", () => {
            console.log($("#availableGuides").val())
            $("#guidePrice").val("");
            $("#totalPrice").val("");
            guideData.forEach((g) => {
                if (g.guideId === $("#availableGuides").val()) {
                    guidePrice = g.manDayValue;

                }

            })

            $("#guidePrice").val(parseInt($("#totalNoOfDays").val()) * guidePrice);
            return calculateTotal();


        })
    })


    $('#startDate, #endDate').change(() => {
        $("#hotelPrice").val("");
        $("#vehiclePrice").val("");
        $("#totalPrice").val("");
        $("#serviceCharge").val("");
        $("#totalNoOfDays").val("");
        $("#totalNoOfAdults").val("");
        $("#totalNoOfChildren").val("");
        $("#guidePrice").val("");

        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

        if (startDate !== null && endDate !== null) {
            var start = new Date(startDate);
            var end = new Date(endDate);
            var totalDays = (end - start) / (1000 * 60 * 60 * 24);
            if (totalDays <= 0) {
                return swal("OOPS!", "Select a valid date range!", "error");

            }
            return $('#totalNoOfDays').val(totalDays);
        }
    });
});


function negativeChecker(val) {
    return val < 0;

}

$("#totalNoOfAdults,#totalNoOfChildren").on("mouseleave", () => {
    if (negativeChecker(parseInt($("#totalNoOfAdults").val())) || negativeChecker(parseInt($("#totalNoOfChildren").val()))) {
        return swal("OOPS!", "Number cannot be negative!", "error");

    }

})


var piLocation = '';

function saveImage(id) {
    var formData = new FormData();
    var file = $(id)[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            piLocation = data;
            console.log("IMG : " + piLocation)


        },
        error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }
    });

}

$("#bnButton").on("click", () => {
    if($("#totalNoOfChildren").val() === "" || $("#totalNoOfAdults").val() === "" || $("#totalNoOfDays").val() === "" || $("#startDate").val() === "" || $("#endDate").val() === "" || $("#destination").val() === "" || $("#pets").val() === "" || $("#guide").val() === "" || $("#totalPrice").val() === ""){
        return swal("OOPS!", "Please fill all the fields!", "error");


    }

    let pd = {
        packageDetailsId: "",
        packageId: pID,
        packageCategory: pC,
        hotelId: hID,
        vehicleId: $("#vehicles").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val(),
        noOfDays: parseInt($("#totalNoOfDays").val()),
        travelArea: $("#destination").val(),
        noOfAdults: parseInt($("#totalNoOfAdults").val()),
        noOfChildren: parseInt($("#totalNoOfChildren").val()),
        totalHeadCount: parseInt($("#totalNoOfAdults").val()) + parseInt($("#totalNoOfChildren").val()),
        petStatus: $("#pets").val(),
        guideStatus: $("#guide").val(),
        guideId: $("#availableGuides").val(),
        totalPackageValue: parseInt($("#totalPrice").val()),
        userId: JSON.parse(localStorage.getItem("userDetails")).userId,
        paidValue: 0,
        paymentImageLocation: "",
        remarks: "Initial Booking!"
    }
    console.log(pd)
    localStorage.setItem("packageDetails", JSON.stringify(pd))
    localStorage.setItem("amount", parseInt($("#totalPrice").val()))
    window.location.href = 'PaymentPortal.html'


})

