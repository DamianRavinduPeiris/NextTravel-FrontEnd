function changeTitle(title) {
   if (title === 'Home.') {
      return window.location.reload();

   }
   document.title = title;
}
$("#logout").on("click",()=>{
   window.location.href = "adminLogin.html";
});