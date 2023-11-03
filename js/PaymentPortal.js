var paymentImageLocation = '';
var newAmount
$(document).ready(()=>{
    $('#checkout-form').css('display','none');
   newAmount = JSON.parse(localStorage.getItem("amount"));

    $('#amount').val(newAmount);
    $('.stripe-button').attr('data-amount', newAmount);




    $('#uploadButton').on('click',()=>{
        if(!$('#paymentSlip').val()){
            return swal("Error", "Please upload a payment slip", "error");

        }
        saveImage();
        savePackageDetails(paymentImageLocation);

    })
})

function savePackageDetails(pil){
    setTimeout(()=>{
        let pd = JSON.parse(localStorage.getItem("packageDetails"));
        let ud = JSON.parse(localStorage.getItem("userDetails"))
        pd.paidValue = parseInt(newAmount);
        pd.paymentImageLocation = pil;

        $.ajax({
            url : "http://localhost:8087/savePackageDetails",
            data : JSON.stringify(pd),
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("userAuthToken"))

            },
            success : (res)=>{
                if(res.statusCode === 201){
                    let auth = {
                        "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("userAuthToken"))
                    }

                    pd.paymentImageLocation ="";
                    pd.name = ud.name;
                    pd.email = "drpeiris3@gmail.com"
                    axios.post("http://localhost:8093/sendPackageDetails",pd,{headers : auth})
                        .then((res)=>{
                            if(pil === ''){
                             return;

                            }

                          return   window.location.href = "SuccessfulPayment.html"





                        })
                        .catch((er)=>{
                            return swal("Error", "Error sending payment details to user email!", "error");

                        })


                }

            },
            error : (xhr)=>{
                swal("OOPS!", "Server threw an exception : " + xhr.responseJSON.message, "error");

            }

        })




    },2000)



}


function saveImage() {
    var formData = new FormData();
    var file = $("#paymentSlip")[0].files[0];
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

        }, error: function (er) {
            return swal("Error", "Error uploading image", "error");
        }
    });




}
$("#stripeButton").on("click",()=>{
    $("#checkout-form").css("display","block");
    savePackageDetails('');
})