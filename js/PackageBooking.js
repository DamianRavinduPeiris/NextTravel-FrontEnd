function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}


$(document).ready(()=>{
    if(JSON.parse(localStorage.getItem("packageName")) === "rb"){
        $("#packageName").text("Regular Package.");
        $("#packageDescription").text("These accommodations offer basic amenities and services suitable for budget-conscious travelers. Regular 3-star hotels provide standard facilities, while 2-star economy options offer even more budget-friendly options with fewer amenities.");
        $(".header__image__container").css("background-image","url('assets/h1.jpg')");
        return regularPackageLoader();

    }
    if(JSON.parse(localStorage.getItem("packageName")) === "ml"){
        $("#packageName").text("Mid Level Package.");
        $("#packageDescription").text("Mid-level 3-star hotels provide a comfortable stay with additional amenities and services. On the other hand, 4-star mid-range accommodations offer a higher level of quality and often include extra features for a more luxurious experience.");
        $(".header__image__container").css("background-image","url('assets/h2.jpg')");
        return midLevelPackageLoader();

    }
    if(JSON.parse(localStorage.getItem("packageName")) === "lb"){
        $("#packageName").text("Luxury Package.");
        $("#packageDescription").text("Luxury 4-star hotels provide a premium experience with top-notch amenities and services. 5-star luxury accommodations go a step further, offering the highest level of quality, elegance, and personalized service for a truly opulent stay.");
        $(".header__image__container").css("background-image","url('assets/h3.jpg')");
        return luxuryPackageLoader();

    }
    if(JSON.parse(localStorage.getItem("packageName")) === "slb"){
        $("#packageName").text("Super Luxury Package.");
        $("#packageDescription").text("These are the epitome of luxury in the hospitality industry. Super luxury 5-star hotels offer an extraordinary level of opulence, with the finest amenities, exceptional services, and a truly lavish experience. They are often frequented by discerning travelers seeking the utmost in comfort and sophistication.");
        $(".header__image__container").css("background-image","linear-gradient(\n" +
            "            to right,\n" +
            "            rgba(58, 59, 65, 0.9),\n" +
            "            rgba(100, 125, 187, 0.1)\n" +
            "    ),url('assets/h4.jpg')");
        return superLuxuryPackageLoader();

    }




})

function regularPackageLoader(){




}
function midLevelPackageLoader(){




}
function luxuryPackageLoader(){




}
function superLuxuryPackageLoader(){




}

$("#updateButton").on("click",()=>{
    let auth = {
        Authorization : "Bearer "+JSON.parse(localStorage.getItem("userAuthToken"))
    }
    let user = JSON.parse(localStorage.getItem("userDetails"));
    saveImage();
    user.userImageLocation = imageLocation;
    user.password = $("#password").val();
    console.log(user)
    localStorage.setItem("userDetails",JSON.stringify(user))
    setTimeout(()=>{
        console.log("img" +imageLocation)
        let user  = {
            userID : JSON.parse(localStorage.getItem("userDetails")).userId,
            password : $("#password").val(),
            userImageLocation : imageLocation,
        }
        axios.put("http://localhost:8080/api/v1/user/customUpdater",user,{headers:auth})
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err)
            })


    },5000)
})
var imageLocation;
function saveImage() {

    var formData = new FormData();
    var file = $("#userImageLocation")[0].files[0];
    formData.append('imageFile', file);

    $.ajax({
        url: 'http://localhost:8090/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            imageLocation = data;


        }, error: (xhr, textStatus, errorThrown) => {
            swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");
        }
    });

}