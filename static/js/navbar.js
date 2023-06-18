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


//// Set language content
//const languageContent = {
//  english: {
//    title: "Your home energy could be cheaper & greener",
//    slogen: "We help you decide what to invest in your home energy system."
//  },
//  german: {
//    title: "Ihre Energie zu Hause könnte billiger und umweltfreundlicher sein",
//    slogen: "Wir helfen Ihnen bei der Entscheidung, was Sie in Ihr Energiesystem zu Hause investieren sollten."
//  }
//};
//
//const titleElement = document.getElementById('title');
//const slogenElement = document.getElementById('slogen');
//
//// Set default language
//let currentLanguage = 'german';
//updateContent();
//
//
// Switch language
function changeText() {
    var button = document.getElementById("myLang");
    if (button.innerHTML === "EN") {
      button.innerHTML = "DE";
//      currentLanguage = 'english';
//      updateContent();
    } else {
      button.innerHTML = "EN";
//      currentLanguage = 'german';
//      updateContent();
    }
}
//
//
//// Update content based on the selected language
//function updateContent() {
//  titleElement.textContent = languageContent[currentLanguage].title;
//  slogenElement.textContent = languageContent[currentLanguage].slogen;
//}