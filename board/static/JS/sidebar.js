/*$('li').click(function(){
  $(this).addClass('active').siblings().removeClass('active');
});*/
// Initialization for ES Users
// import { Dropdown, Ripple, initMDB } from "mdb-ui-kit";

// initMDB({ Dropdown, Ripple });


// //Get dropdown element
// const dropdown = document.getElementById("dropdown");
// const dynamicWord = document.getElementById("category");

// // Add an event listener to detect when the dropdown value changes
// dropdown.addEventListener("change", function() {
//   // Update the text content of the span with the selected value
//   dynamicWord.textContent = dropdown.value;
// });



document.addEventListener("DOMContentLoaded", function () {
  new StickySidebar('#my-sidebar', {
    topSpacing: 20, // Space from the top of the viewport
    bottomSpacing: 20, // Space from the bottom of the viewport
    containerSelector: '.container_', // Parent container
    innerWrapperSelector: '.sidenav', // The actual sticky sidebar
  });
});