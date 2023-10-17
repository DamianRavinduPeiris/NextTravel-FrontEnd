function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}

$("#logout").on("click", () => {
    window.location.href = "adminLogin.html";
});
$("#guideManager").on("click", () => {
    $(".flexBox").css("display", "none");
    $("body").append("<div id='forms' class='flexContainer  marginAdder'>" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideID\" class=\"form-label\">Guide ID.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideID\" placeholder=\"G001\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideName\" class=\"form-label\">Guide Name.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideName\" placeholder=\"John Doe.\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideAddress\" class=\"form-label\">Guide Address.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideAddress\" placeholder=\"Colombo.\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideAge\" class=\"form-label\">Age.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideAge\" placeholder=\"30\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideGender\" class=\"form-label\">Gender.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideGender\" placeholder=\"MALE / FEMALE.\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideContact.\" class=\"form-label\">Guide Contact.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideContact\" placeholder=\"0774519629\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideImage\" class=\"form-label\">Guide Image.</label>\n" +
        "  <input type=\"file\" class=\"form-control\" id=\"guideImage\" placeholder=\"\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideExperience\" class=\"form-label\">Guide Experience.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideExperience\" placeholder=\"\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideManDayValue\" class=\"form-label\">Man Day Value.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideManDayValue\" placeholder=\"Enter amount in LKR.\">\n" +
        "</div>\n" + "<div class=\"mb-3\">\n" +
        "  <label for=\"guideRemarks\" class=\"form-label\">Remarks.</label>\n" +
        "  <input type=\"text\" class=\"form-control\" id=\"guideRemarks\" placeholder=\"\">\n" +
        "</div>\n" + "<button type=\"button\" class=\"btn btn-success\">Save Guide.</button>\n" +
        "<button type=\"button\" id='updateGuide' class=\"btn btn-primary\">Update Guide.</button>\n" +
        "<button type=\"button\" class=\"btn btn-danger\">Clear.</button>\n" +


        "</div>")
});
$(document).ready(() => {

    $(document).on("click", "#updateGuide", () => {


    })

});
