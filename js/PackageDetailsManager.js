localStorage.setItem("packageDetailsAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBhY2thZ2VEZXRhaWxzQWRtaW4iLCJzdWIiOiJwY2RhZG1pbiIsImlhdCI6MTY5ODI0NTc2NywiZXhwIjo0ODUxODQ1NzY3fQ.u2NCi_WQhF0GvP4s852lfLc-Ve_JRnskJ6RqFMIuW9Q"));

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
        $("body").append(`
  <div id='forms' class='flexContainer marginAdder'>
    <div class="mb-3">
      <label for="packageDetailsId" class="form-label">Package Details ID.</label>
      <input type="text" class="form-control" id="packageDetailsId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="packageId" class="form-label">Package ID.</label>
      <input type="text" class="form-control" id="packageId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="packageCategory" class="form-label">Package Category.</label>
      <input type="text" class="form-control" id="packageCategory" placeholder="">
    </div>
    <div class="mb-3">
      <label for="hotelId" class="form-label">Hotel ID.</label>
      <input type="text" class="form-control" id="hotelId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="vehicleId" class="form-label">Vehicle ID.</label>
      <input type="text" class="form-control" id="vehicleId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="startDate" class="form-label">Start Date.</label>
      <input type="date" class="form-control" id="startDate">
    </div>
    <div class="mb-3">
      <label for="endDate" class="form-label">End Date.</label>
      <input type="date" class="form-control" id="endDate">
    </div>
    <div class="mb-3">
      <label for="noOfDays" class="form-label">Number of Days.</label>
      <input type="number" class="form-control" id="noOfDays">
    </div>
    <div class="mb-3">
      <label for="travelArea" class="form-label">Travel Area.</label>
      <input type="text" class="form-control" id="travelArea" placeholder="">
    </div>
    <div class="mb-3">
      <label for="noOfAdults" class="form-label">Number of Adults.</label>
      <input type="number" class="form-control" id="noOfAdults">
    </div>
    <div class="mb-3">
      <label for="noOfChildren" class="form-label">Number of Children.</label>
      <input type="number" class="form-control" id="noOfChildren">
    </div>
    <div class="mb-3">
      <label for="totalHeadCount" class="form-label">Total Head Count.</label>
      <input type="number" class="form-control" id="totalHeadCount">
    </div>
    <div class="mb-3">
      <label for="petsStatus" class="form-label">Pets Status.</label>
      <select class="form-select" id="petsStatus">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="guideStatus" class="form-label">Guide Status.</label>
      <select class="form-select" id="guideStatus">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="guideId" class="form-label">Guide ID.</label>
      <input type="text" class="form-control" id="guideId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="totalPackageValue" class="form-label">Total Package Value.</label>
      <input type="number" class="form-control" id="totalPackageValue">
    </div>
    <div class="mb-3">
      <label for="userId" class="form-label">User ID.</label>
      <input type="text" class="form-control" id="userId" placeholder="">
    </div>
    <div class="mb-3">
      <label for="paidValue" class="form-label">Paid Value.</label>
      <input type="number" class="form-control" id="paidValue">
    </div>
    <div class="mb-3">
      <label for="remarks" class="form-label">Remarks.</label>
      <input type="text" class="form-control" id="remarks" placeholder="">
    </div>
    <button type="button" id='savePackageDetails' class="btn btn-success">Save Package Details</button>
    <button type="button" id='updatePackageDetails' class="btn btn-primary">Update Package Details</button>
    <button type="button" id='deletePackageDetails' class="btn btn-danger">Delete Package Details</button>
    <button type="button" id='clearButton' class="btn btn-info">Clear</button>
  </div>
`);



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
                url: "http://localhost:8085/savePayment", method: "POST", headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))
                }, data: JSON.stringify(payment), success: (respSSonse) => {
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
        url: 'http://localhost:8090/uploadToDrive',
        type: 'POST',
        data: formData,
        async : false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            return paymentImageLocation = data.data;

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