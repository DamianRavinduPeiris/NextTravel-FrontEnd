function changeTitle(title) {
    if (title === 'Home.') {
        return window.location.reload();

    }
    document.title = title;
}

$("#packageSelector").on("click", () => {
    $(".myFooter").css("display", "none");
    $(".aboutUsContainer").css("display", "none");
    $(".aboutUsContainer").css("background-color", "white");
    $("body").append("<div class='aboutUsContainer'><div class='flexContainer'><h1 class='mainText specialText underLiner'>Available Packages.</h1></div></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='dText '>Regular.</h1><img src='../assets/R.svg' class='stepsImages'><p class='dText'> These accommodations offer basic amenities and services suitable for budget-conscious travelers. Regular 3-star hotels provide standard facilities, while 2-star economy options offer even more budget-friendly options with fewer amenities.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='dText '>Mid Level.</h1><img src='../assets/M.svg' class='stepsImages'><p class='dText'> Mid-level 3-star hotels provide a comfortable stay with additional amenities and services. On the other hand, 4-star mid-range accommodations offer a higher level of quality and often include extra features for a more luxurious experience.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='dText '>Luxury.</h1><img src='../assets/L.svg' class='stepsImages'><p class='dText'> Luxury 4-star hotels provide a premium experience with top-notch amenities and services. 5-star luxury accommodations go a step further, offering the highest level of quality, elegance, and personalized service for a truly opulent stay.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='dText '>Super Luxury.</h1><img src='../assets/S.svg' class='stepsImages'><p class='dText'>These are the epitome of luxury in the hospitality industry. Super luxury 5-star hotels offer an extraordinary level of opulence, with the finest amenities, exceptional services, and a truly lavish experience. They are often frequented by discerning travelers seeking the utmost in comfort and sophistication.</p><button type='button' class='btn btn-outline-warning detailsButton '>Get More Details!</button></div>");


    $('html, body').animate({
        scrollTop: '+=5000px'
    }, 'fast');


});
$(document).ready(()=>{
$(document).on("click",".detailsButton",()=>{
    $.ajax({
       url :"http://localhost:8080/api/v1/auth/demo",
       type : "GET",
       async : true,
       headers : {
           "Authorization" : "Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1pYW4iLCJpYXQiOjE2OTY3ODE0NTUsImV4cCI6MTY5NjgxNzQ1NX0.PSco2Fc9CmYs4i4KIMUPVtI08jnRhDKSMGw-Nj8F5wY"

       } ,
        success : ((res)=>{
            console.log(res);


        }),
        error : ((err)=>{
            swal("Error!", "Something went wrong!"+err, "error");

        })





    });

})


});