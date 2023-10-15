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
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='specialText '>Regular.</h1><img class='packagesImages' src='https://cdn.shopify.com/s/files/1/0080/0984/2786/files/shutterstock_1181523733.jpg?v=1655221599' ><p class='dText'> These accommodations offer basic amenities and services suitable for budget-conscious travelers. Regular 3-star hotels provide standard facilities, while 2-star economy options offer even more budget-friendly options with fewer amenities.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='specialText '>Mid Level.</h1><img class='packagesImages' src='https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2023/05/10054553/12-Flexible-Companies-That-Help-Pay-for-Your-Vacation.jpg'><p class='dText'> Mid-level 3-star hotels provide a comfortable stay with additional amenities and services. On the other hand, 4-star mid-range accommodations offer a higher level of quality and often include extra features for a more luxurious experience.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='specialText '>Luxury.</h1><img class='packagesImages' src='https://www.suncabo.com/images/casa-entre-suenos/casa-entre-suenos-thumbnail.jpg?ver=2023%2D09%2D21+3%3A01%3A48+AM'><p class='dText'> Luxury 4-star hotels provide a premium experience with top-notch amenities and services. 5-star luxury accommodations go a step further, offering the highest level of quality, elegance, and personalized service for a truly opulent stay.</p><button type='button' class='detailsButton btn btn-outline-warning '>Get More Details!</button></div>");
    $(".aboutUsContainer").append("<div data-aos='zoom-in' class='flexContainer fcRow'><h1 class='specialText '>Super Luxury.</h1><img class='packagesImages' src='https://www.travelcenter.uk/blog/wp-content/uploads/2022/08/luxury-main.jpg' ><p class='dText'>These are the epitome of luxury in the hospitality industry. Super luxury 5-star hotels offer an extraordinary level of opulence, with the finest amenities, exceptional services, and a truly lavish experience. They are often frequented by discerning travelers seeking the utmost in comfort and sophistication.</p><button type='button' class='btn btn-outline-warning detailsButton '>Get More Details!</button></div>");


    $('html, body').animate({
        scrollTop: '+=5000px'
    }, 'fast');


});
$("#tViewer").on("click",()=>{
    let srcArray = ["https://avatars.githubusercontent.com/u/115478137?v=4","https://avatars.githubusercontent.com/u/50785933?v=4","https://avatars.githubusercontent.com/u/71526158?v=4","https://avatars.githubusercontent.com/u/101160534?v=4","https://avatars.githubusercontent.com/u/121995696?v=4","https://avatars.githubusercontent.com/u/106425954?v=4"]
    let nameArray = ["Damian Peiris.","Ishan Lahiru.","Danuja Greru.","Janitha Rasanjana.","Sayantha Hansaka.","Prabash Wijerathne."]



    var testimonials = [
        "NextTravel turned my dream vacation into a reality! Their seamless planning and personalized recommendations made every moment unforgettable. From hidden gems to iconic landmarks, they curated an experience that exceeded my expectations. I can't wait to embark on my next adventure with NextTravel!",

        "Embarking on a journey with NextTravel was nothing short of magical! Their meticulous planning and tailored suggestions transformed every moment into a cherished memory. From discovering hidden treasures to exploring iconic landmarks, they curated an experience that surpassed all my hopes. I'm already counting down the days until my next adventure with NextTravel!",

        "NextTravel is the epitome of travel excellence! Their attention to detail and customized itinerary made my trip an absolute delight. From secret spots to renowned attractions, they crafted an adventure that went above and beyond. I'm already looking forward to my next voyage with NextTravel!",

        "My experience with NextTravel was beyond incredible! Their flawless planning and personalized suggestions made every second unforgettable. From hidden gems to iconic landmarks, they orchestrated an adventure that went above and beyond. I'm eagerly anticipating my next escapade with NextTravel!",

        "NextTravel exceeded all my travel expectations! Their seamless planning and tailored recommendations turned each moment into a cherished memory. From uncovering hidden treasures to exploring famous landmarks, they curated an experience that was beyond my wildest dreams. I'm already planning my next adventure with NextTravel!"
    ];

    var randomIndex = Math.floor(Math.random() * 6);
    $(".tCard>img").attr("src",srcArray[randomIndex]);
    $(".tCard>p").text(testimonials[randomIndex]);
    $(".tCard>h3").text(nameArray[randomIndex]);






});

$("#i1").on("click",()=>{
    var randomIndex = Math.floor(Math.random() * 3);
   let src = ["https://island.lk/wp-content/uploads/2021/07/lotus-tower.jpg","https://nexttravelsrilanka.com/wp-content/uploads/2023/02/Galle-Fort.jpg","https://ychef.files.bbci.co.uk/1280x720/p0b7n6dm.jpg","https://www.orienthotelsl.com/wp-content/uploads/2023/01/Nine-Arch-Bridge-Ella-1200x630-1.jpg"]
    $("#i1").attr("src",src[randomIndex]);






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
