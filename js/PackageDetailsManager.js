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
      <input type="text" class="form-control" id="startDate">
    </div>
    <div class="mb-3">
      <label for="endDate" class="form-label">End Date.</label>
      <input type="text" class="form-control" id="endDate">
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
      <label for="petStatus" class="form-label petStatus">Pet Status.</label>
      <input type="text" class="form-control" id="petStatus" placeholder="" style="width: 30vw">
    </div>
     <div class="mb-3">
      <label for="guideStatus" class="form-label">Guide Status.</label>
      <input type="text" class="form-control" id="guideStatus" placeholder="">
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
      <label for="paymentSlip" class="form-label">Payment Slip Location.</label>
      <input type="text" class="form-control" id="paymentSlip">
    </div>
    <div class="mb-3">
      <label for="remarks" class="form-label">Remarks.</label>
      <input type="text" class="form-control" id="remarks" placeholder="">
    </div>

   
    <button type="button" id='deletePackageDetails' class="btn btn-danger">Delete Package Details.</button>
    <button type="button" id='clearButton' class="btn btn-info">Clear.</button>
  </div>
`);

        disableProps();
        isFormsVisible = true;

        $("#packageDetailsTable").css("display", "none");
        isTableVisible = false;
    }


});

function  disableProps(){
    $("#packageId").prop("disabled", true);
    $("#packageCategory").prop("disabled", true);
    $("#hotelId").prop("disabled", true);
    $("#vehicleId").prop("disabled", true);
    $("#startDate").prop("disabled", true);
    $("#endDate").prop("disabled", true);
    $("#noOfDays").prop("disabled", true);
    $("#travelArea").prop("disabled", true);
    $("#noOfAdults").prop("disabled", true);
    $("#noOfChildren").prop("disabled", true);
    $("#totalHeadCount").prop("disabled", true);
    $("#petStatus").prop("disabled", true);
    $("#guideStatus").prop("disabled", true);
    $("#guideId").prop("disabled", true);
    $("#totalPackageValue").prop("disabled", true);
    $("#userId").prop("disabled", true);
    $("#paidValue").prop("disabled", true);
    $("#paymentSlip").prop("disabled", true);
    $("#remarks").prop("disabled", true);
    $("#paymentId").prop("disabled", true);
}

function clearFields() {
    $("#packageDetailsId").val("");
    $("#packageId").val("");
    $("#packageCategory").val("");
    $("#hotelId").val("");
    $("#vehicleId").val("");
    $("#startDate").val("");
    $("#endDate").val("");
    $("#noOfDays").val("");
    $("#travelArea").val("");
    $("#noOfAdults").val("");
    $("#noOfChildren").val("");
    $("#totalHeadCount").val("");
    $("#petStatus").val("");
    $("#guideStatus").val("");
    $("#guideId").val("");
    $("#totalPackageValue").val("");
    $("#userId").val("");
    $("#paidValue").val("");
    $("#paymentSlip").val("");
    $("#remarks").val("");


}

function validator() {
    if ($("#paymentId").val() === "" || $("#userId").val() === "" || $("#packageDetailsId").val() === "" || $("#paymentDate").val() === "" || $("#paymentAmount").val() === "") {
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
    $(document).on("keydown", "#packageDetailsId", (event) => {


        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8087/searchPackageDetails?packageDetailsId=" + $("#packageDetailsId").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailsAdminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)

                    $("#packageId").val(res.data.packageId);
                    $("#packageCategory").val(res.data.packageCategory);
                    $("#hotelId").val(res.data.hotelId);
                    $("#vehicleId").val(res.data.vehicleId);
                    $("#startDate").val(res.data.startDate);
                    $("#endDate").val(res.data.endDate);
                    $("#noOfDays").val(res.data.noOfDays);
                    $("#travelArea").val(res.data.travelArea);
                    $("#noOfAdults").val(res.data.noOfAdults);
                    $("#noOfChildren").val(res.data.noOfChildren);
                    $("#totalHeadCount").val(res.data.totalHeadCount);
                    $(".petStatus").val(res.data.petStatus);
                    $("#guideStatus").val(res.data.guideStatus);
                    $("#guideId").val(res.data.guideId);
                    $("#paymentSlip").val(res.data.paymentImageLocation);
                    $("#totalPackageValue").val(res.data.totalPackageValue);
                    $("#userId").val(res.data.userId);
                    $("#paidValue").val(res.data.paidValue);
                    $("#remarks").val(res.data.remarks);
                    disableProps();



                },
                error: (error) => {
                    return swal("OOPS!", "No such package details found!", "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deletePackageDetails", () => {
        if ($("#packageDetailsId").val() === "" ||  $("#userId").val() === "") {
            return swal("OOPS!", "Please enter a PID to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8087/deletePackageDetails?packageDetailsId=" + $("#packageDetailsId").val()+"&userID="+$("#userId").val(),
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailsAdminAuthToken"))
            }, success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {
                    clearFields();
                    disableProps();

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
        $("body").append("<table data-aos='zoom-in' id='packageDetailsTable' class=\"table table-dark\">\n" + "  <thead>\n" + "    <tr>\n" + "      " +
            "<th scope=\"col\">Package Details Id.</th>\n" + "      " +
            "<th scope=\"col\">Package Id.</th>\n" + "      " +
            "<th scope=\"col\">Package Category.</th>\n" + "      " +
            "<th scope=\"col\">Hotel Id.</th>\n" + "      " +
            "<th scope=\"col\">Vehicle Id.</th>\n" + "      " +
            "<th scope=\"col\">Start Date.</th>\n" + "      " +
            "<th scope=\"col\">End Date.</th>\n" + "      " +
            "<th scope=\"col\">No Of Days.</th>\n" + "      " +
            "<th scope=\"col\">Travel Area.</th>\n" + "      " +
            "<th scope=\"col\">No Of Adults.</th>\n" + "      " +
            "<th scope=\"col\">No Of Children.</th>\n" + "      " +
            "<th scope=\"col\">Total Head Count.</th>\n" + "      " +
            "<th scope=\"col\">Pet Status.</th>\n" + "      " +
            "<th scope=\"col\">Guide Status.</th>\n" + "      " +
            "<th scope=\"col\">Guide Id.</th>\n" + "      " +
            "<th scope=\"col\">Total Package Value.</th>\n" + "      " +
            "<th scope=\"col\">User Id.</th>\n" + "      " +
            "<th scope=\"col\">Paid Value.</th>\n" + "      " +
            "<th scope=\"col\">Remarks.</th>\n" + "      " +
            "  </tr>\n" + "  </thead>\n" + "  <tbody></tbody>\n" + "</table>");






        isTableVisible = true;
        $("#forms").css("display", "none");
        isFormsVisible = false;
    }


    $.ajax({
        url: "http://localhost:8087/getAllPackageDetails",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailsAdminAuthToken"))
        }, success: (res) => {

            res.data.map((pd) => {
                var row = "<tr>";
                row += "<td>" + pd.packageDetailsId + "</td>";
                row += "<td>" + pd.packageId + "</td>";
                row += "<td>" + pd.packageCategory + "</td>";
                row += "<td>" + pd.hotelId + "</td>";
                row += "<td>" + pd.vehicleId + "</td>";
                row += "<td>" + pd.startDate + "</td>";
                row += "<td>" + pd.endDate + "</td>";
                row += "<td>" + pd.noOfDays + "</td>";
                row += "<td>" + pd.travelArea + "</td>";
                row += "<td>" + pd.noOfAdults + "</td>";
                row += "<td>" + pd.noOfChildren + "</td>";
                row += "<td>" + pd.totalHeadCount + "</td>";
                row += "<td>" + pd.petStatus + "</td>";
                row += "<td>" + pd.guideStatus + "</td>";
                row += "<td>" + pd.guideId + "</td>";
                row += "<td>" + pd.totalPackageValue + "</td>";
                row += "<td>" + pd.userId + "</td>";
                row += "<td>" + pd.paidValue + "</td>";
                row += "<td>" + pd.remarks + "</td>";
                row += "</tr>";


                $("#packageDetailsTable tbody").append(row);

            })


        }, error: (error) => {
            console.log(error)
            swal("OOPS!", "Something went wrong! ", "error");

        }


    })


});