
localStorage.setItem("packageAdminAuthToken", JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6InBhY2thZ2VBZG1pbiIsInN1YiI6InBhY2thZG1pbiIsImlhdCI6MTY5ODIzMDY5MSwiZXhwIjo0ODUxODMwNjkxfQ._20D3ZqwMDd5JtV7mi_7K1QpjbIiyTee3sw-LC_p6GI"))

var packageIDs = [];


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

$("#guideManager").on("click", () => {


    $(".mainContent").css("display", "none");


    if (!isFormsVisible) {
        isFormsVisible = true;
        $("#vehicleTable").css("display", "none");
        isTableVisible = false;
        $("body").append("<div id='forms' class='flexContainer marginAdder'>" + "<div class=\"mb-3\">\n" + "  <label for=\"packageId\" class=\"form-label\">Package ID.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"packageId\" placeholder=\"Generated by the server.\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"packageCategory\" class=\"form-label\">Package Category.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"packageCategory\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"hotelCategory\" class=\"form-label\">Hotel Category.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"hotelCategory\" placeholder=\"\">\n" + "</div>\n" + "<div class=\"mb-3\">\n" + "  <label for=\"vehicleCategory\" class=\"form-label\">Vehicle Category.</label>\n" + "  <input type=\"text\" class=\"form-control\" id=\"vehicleCategory\" placeholder=\"\">\n" + "</div>\n" + "<button type=\"button\" id='savePackage' class=\"btn btn-success\">Save Package</button>\n" + "<button type=\"button\" id='updatePackage' class=\"btn btn-primary\">Update Package</button>\n" + "<button type=\"button\" id='deletePackage' class=\"btn btn-danger\">Delete Package</button>\n" + "<button type=\"button\" id='clearButton' class=\"btn btn-info\">Clear</button>\n" + "</div>");


        $("#packageId").prop("disabled", true);

    }


});


$(document).ready(() => {

    $(document).on("click", "#savePackage", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")


        }


        let packageInfo = {
            packageId: $("#packageId").val(),
            packageCategory: $("#packageCategory").val(),
            hotelCategory: $("#hotelCategory").val(),
            vehicleCategory: $("#vehicleCategory").val(),


        }


        $.ajax({
            url: "http://localhost:8083/savePackage", method: "POST", headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAdminAuthToken"))
            }, data: JSON.stringify(packageInfo), success: (response) => {
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


    })

});


function clearFields() {
    $("#packageId").val("");
    $("#packageCategory").val("");
    $("#hotelCategory").val("");
    $("#vehicleCategory").val("");


}

function validator() {
    if ($("#packageCategory").val() === "" || $("#hotelCategory").val() === "" || $("#vehicleCategory").val() === "") {
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
    $(document).on("click", "#updatePackage", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")

        }


        let packageInfo = {
            packageId: $("#packageId").val(),
            packageCategory: $("#packageCategory").val(),
            hotelCategory: $("#hotelCategory").val(),
            vehicleCategory: $("#vehicleCategory").val(),


        }

        $.ajax({
            url: "http://localhost:8083/updatePackage", method: "PUT", headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAdminAuthToken"))

            }, data: JSON.stringify(packageInfo), success: (response) => {
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


    })
})
$(document).ready(() => {
    $(document).on("keydown", "#packageCategory", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8083/getPackageByCategory?category=" + $("#packageCategory").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAdminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {

                        $("#packageId").prop("disabled", false);
                        $("#packageId").val(res.data.packageId);
                        $("#packageCategory").val(res.data.packageCategory);
                        $("#hotelCategory").val(res.data.hotelCategory);
                        $("#vehicleCategory").val(res.data.vehicleCategory);
                        $("#packageId").prop("disabled", true);


                        return swal("Done!", res.message, "success");

                    }
                    swal("OOPS!", res.message, "error");

                },
                error: (xhr,textStatus,errorThrown) => {
                    swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
                }


            });

        }


    })


});
$(document).ready(() => {
    $(document).on("click", "#deletePackage", () => {
        console.log($("#packageId").val())
        if ($("#hotelId").val() === "") {
            return swal("OOPS!", "Please enter a Vehicle name to delete!", "error");
        }

        $.ajax({
            url: "http://localhost:8083/deletePackage?packageID=" + $("#packageId").val(), method: "DELETE", headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAdminAuthToken"))
            }, success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    return swal("Done!", res.message, "success");

                }
                swal("OOPS!", res.message, "error");

            },  error: (xhr,textStatus,errorThrown) => {
                swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
            }


        });


    })


});
var isTableVisible = false;


$("#tableView").on("click", () => {

    $(".mainContent").css("display", "none");

    if (!isTableVisible) {
        isTableVisible = true;
        $("#forms").css("display", "none");
        isFormsVisible = false;
        $("body").append("<table data-aos='zoom-in' id='packagesTable' class='table table-dark'>\n" + "  <thead>\n" + "    <tr>\n" + "      <th scope='col'>Package ID</th>\n" + "      <th scope='col'>Package Category</th>\n" + "      <th scope='col'>Hotel Category</th>\n" + "      <th scope='col'>Vehicle Category</th>\n" + "    </tr>\n" + "  </thead>\n" + "  <tbody></tbody>\n" + "</table>");
    }

    $.ajax({
        url: "http://localhost:8083/getAllPackages", method: "GET", headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAdminAuthToken"))
        }, success: (res) => {
            console.log(res.me);
            res.data.map((pack) => {
                let row = "<tr>" + "<td>" + pack.packageId + "</td>" + "<td>" + pack.packageCategory + "</td>" + "<td>" + pack.hotelCategory + "</td>" + "<td>" + pack.vehicleCategory + "</td>" + "</tr>";

                $("#packagesTable tbody").append(row);
            })
        },  error: (xhr,textStatus,errorThrown) => {
            swal("OOPS!", "Server threw an exception : "+xhr.responseJSON.message, "error");
        }
    })
});


