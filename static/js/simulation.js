//// TAB
//
//// Function to open tabs
//function openTab(evt, tabName, defaultTab) {
//  var i, tabcontent, tablinks;
//
//  // Hide all tab contents for the current tab set
//  tabcontent = document.getElementById(tabName).parentNode.getElementsByClassName("tabcontent");
//  for (i = 0; i < tabcontent.length; i++) {
//    tabcontent[i].style.display = "none";
//  }
//
//  // Remove "active" class from tab links for the current tab set
//  tablinks = document.getElementById(tabName).parentNode.getElementsByClassName("tablinks");
//  for (i = 0; i < tablinks.length; i++) {
//    tablinks[i].className = tablinks[i].className.replace(" active", "");
//  }
//
//  // Show the selected tab content
//  document.getElementById(tabName).style.display = "block";
//
//  // Add "active" class to the clicked tab link
//  evt.currentTarget.className += " active";
//}
//
//// Get the default open tab for each set and trigger click event
//document.getElementById("defaultOpen1").click();
//document.getElementById("defaultOpen2").click();


// Calculate annualised costs of PV and battery system

function getAnnuCost() 
{

  // Annualised costs (/kWp and /kWh)
  const perPV = 115.61;
  const perBattery = 41.29;

  // Retrieve the input values
  let pv_size = document.getElementById("pv_size").value;
  let battery_capacity = document.getElementById("battery_capacity").value;

  // Perform the calculation
  let annucostPV = parseFloat(perPV) * parseFloat(pv_size);
  let annucostBattery = parseFloat(perBattery) * parseFloat(battery_capacity);

  // Update the HTML with the result
  document.getElementById("sizePV").innerHTML = pv_size;
  document.getElementById("capBattery").innerHTML = battery_capacity;
  document.getElementById("annucostPV").innerHTML = annucostPV;
  document.getElementById("annucostBattery").innerHTML = annucostBattery;
}

function handleResult(data)
{

}

export {getAnnuCost, handleResult}
