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
        $("body").append("<div id='forms' class='flexContainer marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentId\" class=\"form-label\">Payment ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"paymentId\" placeholder=\"Enter Payment ID to search.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"userId\" class=\"form-label\">User ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"userId\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"packageDetailsId\" class=\"form-label\">Package Details ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"packageDetailsId\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentDate\" class=\"form-label\">Payment Date.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"paymentDate\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentAmount\" class=\"form-label\">Payment Amount.</label>\n" + "  <input type=\"number\" class=\"form-control\" id=\"paymentAmount\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"paymentImageLocation\" class=\"form-label\">Payment Image Location.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"paymentImageLocation\" placeholder=\"\">\n" + "</div>\n" + "<button type=\"button\" id='deletePayment' class=\"btn btn-danger\">Delete Payment.</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear.</button>\n" + "</div>");


        isFormsVisible = true;
        $("#packageDetailsId").prop("disabled", true);
        $("#userId").prop("disabled", true);
        $("#paymentDate").prop("disabled", true);
        $("#paymentAmount").prop("disabled", true);
        $("#paymentImageLocation").prop("disabled", true);

        $("#paymentsTable").css("display", "none");
        isTableVisible = false;
    }


});


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
    $(document).on("keydown", "#paymentId", (event) => {

        if (event.key === 'Enter') {
            console.log($("#guideName").val())
            $.ajax({
                url: "http://localhost:8085/searchPayment?paymentID=" + $("#paymentId").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#paymentId").val(res.data.paymentId);
                        $("#userId").val(res.data.userId);
                        $("#packageDetailsId").val(res.data.packageDetailsId);
                        $("#paymentDate").val(res.data.paymentDate);
                        $("#paymentAmount").val(res.data.paymentAmount);
                        $("#paymentImageLocation").val(res.data.paymentImageLocation);


                        return swal("Done!", res.message, "success");

                    }
                    swal("OOPS!", res.message, "error");

                }, error: (error) => {
                    swal("OOPS!", "Payment record  not found! ", "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deletePayment", () => {
        if ($("#guideID").val() === "") {
            return swal("OOPS!", "Please enter a PID to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8085/deletePayment?paymentID=" + $("#paymentId").val()+"&userID="+$("#userId").val()+"&pdID="+$("#packageDetailsId").val(),
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))
            },
            success: (res) => {
                console.log(res)
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }


            }, error: (error) => {
                console.log(error)
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
        url: "http://localhost:8085/getAllPayments",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentsAdminAuthToken"))
        },
        success: (res) => {


            res.data.map((p) => {
                let row = "<tr>" + "<td>" + p.paymentId + "</td>" + "<td>" + p.userId + "</td>" + "<td>" + p.packageDetailsId + "</td>" + "<td>" + p.paymentDate + "</td>" + "<td>" + p.paymentAmount + "</td>" + "<td>" + p.paymentImageLocation + "</td>" + "</tr>";

                $("#paymentsTable tbody").append(row);

            })


        }, error: (error) => {
            swal("OOPS!", "Something went wrong! ", "error");

        }


    })


});