$(document).ready(function(){
    $('#roleMenu .dropdown-item').click(function(){
        let selectedService = $(this).text();
        $('#roleMenu .btn').text(selectedService);

    });
});
