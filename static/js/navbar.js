// Get navbar
$.get("../html/navbar.html", function(data){
  $("#nav-placeholder").replaceWith(data);
});

// Get dark navbar
$.get("../html/navbar-dark.html", function(data){
  $("#darknav-placeholder").replaceWith(data);
});


// Get footer
$.get("../html/footer.html", function(data){
  $("#footer-placeholder").replaceWith(data);
});

// Get dark footer
$.get("../html/footer-dark.html", function(data){
  $("#darkfooter-placeholder").replaceWith(data);
});


// Switch language
function changeText() {
    var button = document.getElementById("myLang");
    if (button.innerHTML === "EN") {
      button.innerHTML = "DE";
    } else {
      button.innerHTML = "EN";
    }
}