function changeText() {
    var button = document.getElementById("myLang");
    if (button.innerHTML === "EN") {
      button.innerHTML = "DE";
    } else {
      button.innerHTML = "EN";
    }
}