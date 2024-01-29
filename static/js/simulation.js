import Scenario from './scenario.js';

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

let gMyEnergyResultYear = {};
let gSelectedScenario = {};
let gSelectedScenarioConfig = {};
let gMySurveyResult = {};

function getChartDataFromEnergyResult(energyResults) {
  let chartData = {};
  for (let result of energyResults) {
    for (let key in result) {
      if (chartData[key] === undefined)
        chartData[key] = [];
      chartData[key].push(result[key]);
    }
  }
  return chartData;
}

function handleResult(myEnergyResultMonth, selectedEnergyResultMonth, selectedEnergyResultYear) {

  // Get current total cost
  let myScenario = new Scenario(gMySurveyResult.myComponents, gMySurveyResult.availableComponents, gMySurveyResult.mySems);
  $("#totalcost-placeholder").html(gMyEnergyResultYear.TotalCost);


  // Get check or uncheck icons
  if (myScenario.PV.size > 0) {
    $("#pv-true").css('display', 'inline')
    // Get current PV size
    $("#currentPVSize").html(getImprovementInfo('pv_size', myScenario.PV.size));
  } else {
    $("#pv-false").css('display', 'inline')
  }

  if (myScenario.Battery.capacity > 0) {
    $("#battery-true").css('display', 'inline')
    // Get current Battery capacity
    $("#currentBatteryCapacity").html(getImprovementInfo('battery_capacity', myScenario.Battery.capacity));
  } else {
    $("#battery-false").css('display', 'inline')
  }

  if (myScenario.sems === true) {
    $("#sems-true").css('display', 'inline')
  } else {
    $("#sems-false").css('display', 'inline')
  }

  if (myScenario.Boiler.type !== null) {
    $("#boiler-true").css('display', 'inline')
    // Get current heating system
    $("#currentBoilerType").html(getImprovementInfo('boiler_type', myScenario.Boiler.type));
  } else {
    $("#boiler-false").css('display', 'inline')
  }

  if (myScenario.Building.ID_Scenario % 2 !== 0) {
    $("#renovation-true").css('display', 'inline')
  } else {
    $("#renovation-false").css('display', 'inline')
  }

  // Show text if current heating system is not heat pump
  if (myScenario.Boiler.type !== "Air_HP") {
    $("#curNotHP").css('display', 'block')
  }
  else {
    $("#curNotHP").css('display', 'none')
  }

  $("#totalDemand-placeholder").html(gMyEnergyResultYear.TotalDemand);
  $("#totalSupply-placeholder").html(gMyEnergyResultYear.TotalGenerate);
  createCurrentEnergyChart(getChartDataFromEnergyResult(myEnergyResultMonth));

  // get cookie value selected=<value>
  $("#totalSimuDemand-placeholder").html(selectedEnergyResultYear.TotalDemand);
  $("#totalSimuSupply-placeholder").html(selectedEnergyResultYear.TotalGenerate);
  $("#totalSimuCost-placeholder").html(selectedEnergyResultYear.TotalCost);
  $("#investmentSimuCost-placeholder").html(0);
  createSimuEnergyChart(getChartDataFromEnergyResult(selectedEnergyResultMonth));

    let selectedScenario = new Scenario(gSelectedScenarioConfig, gMySurveyResult.availableComponents, gSelectedScenario.SEMS);
  // Get simulated configuration
  if (selectedScenario.PV.size !== 0) {
    $("#pv_exist").prop('checked', true);
    $("#pv_size").val(selectedScenario.PV.size).change();
  }

  if (selectedScenario.Battery.capacity !== 0) {
    $("#battery_exist").prop('checked', true);
    $("#battery_capacity").val(selectedScenario.Battery.capacity).change();
  }

  $("#sems_exist").prop('checked', selectedScenario.sems);

  if (selectedScenario.Boiler.type !== 0) {
    $("#boiler_exist").prop('checked', true);
    $("#boiler_type").val(selectedScenario.Boiler.type).change();
  }

  $("#building_renovation").prop('checked', selectedScenario.Building.ID_Scenario % 2 !== 0);

  // Show text if selected heating system is not heat pump
  if (selectedScenario.Boiler.type !== "Air_HP") {
    $("#simuNotHP").css('display', 'block')
  } else {
    $("#simuNotHP").css('display', 'none')
  }


  // Annualised costs (/kWp and /kWh)
  const perPV = 116;
  const perBattery = 41;

  // Retrieve the input values
  let pv_size = selectedScenario.PV.size;
  let battery_capacity = selectedScenario.Battery.capacity;

  // Perform the calculation
  let annucostPV = parseFloat(perPV) * parseFloat(pv_size);
  let annucostBattery = parseFloat(perBattery) * parseFloat(battery_capacity);

  // Update the HTML with the result
  $("#sizePV").html(pv_size);
  $("#capBattery").html(battery_capacity);
  $("#annucostPV").html(annucostPV);
  $("#annucostBattery").html(annucostBattery);

}


// Highcharts
function initChart() {
  Highcharts.setOptions({
    colors: ['#A78067', '#E2E2E2', '#ADA3A3', '#DDB9A1', '#6DAE47']
  });
}

// Shared xAxis configuration
var sharedXAxis = {
  categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  labels: {
    style: {
      fontFamily: 'Lato',
      fontSize: '10px'
    }
  }
}
// Shared yAxis configuration
var sharedYAxis = [{
  title: {
    text: "Energy (kWh)",
    style: {
      fontFamily: 'Lato', // Set the desired font family
      fontSize: '12px' // Set the desired font size
    }
  },
  labels: { // Ensable labels on the right side of the graph
    enabled: true,
    style: {
      fontFamily: 'Lato',
      fontSize: '10px'
    }
  },
}, { // Secondary Y-axis
  title: {
    text: null
  },
  opposite: false,
  labels: { // Disable labels on the right side of the graph
    enabled: false
  }
}]

function createCurrentEnergyChart(energyData) {
  Highcharts.chart('chart_current_year', {
    chart: {
      type: 'column'
    },
    title: {
      text: ' '
    },
    // Hide the legend
    legend: {
      enabled: false
    },
    xAxis: sharedXAxis,
    // Primary Y-axis
    yAxis: sharedYAxis,
    series: [{
      name: 'Heating',
      data: energyData.Boiler,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Cooling',
      data: energyData.Cooling,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Appliance',
      data: energyData.Appliance,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Hot water',
      data: energyData.HotWaterTank,
      stack: 'amount',
      yAxis: 0
    }, {

      // Second bar
      name: 'PV',
      data: energyData.PV,
      yAxis: 0
    }],
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    tooltip: {
      style: {
        fontFamily: 'Lato', // Set the desired font family
        fontSize: '12px' // Set the desired font size
      }
    },
  });
}

function createSimuEnergyChart(energyData) {
  Highcharts.chart('chart_simu_year', {
    chart: {
      type: 'column'
    },
    title: {
      text: ' '
    },
    // Hide the legend
    legend: {
      enabled: false
    },
    xAxis: sharedXAxis,
    // Primary Y-axis
    yAxis: sharedYAxis,
    series: [{
      name: 'Heating',
      data: energyData.Boiler,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Cooling',
      data: energyData.Cooling,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Appliance',
      data: energyData.Appliance,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Hot water',
      data: energyData.HotWaterTank,
      stack: 'amount',
      yAxis: 0
    }, {

      // Second bar
      name: 'PV',
      data: energyData.PV,
      yAxis: 0
    }],
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    tooltip: {
      style: {
        fontFamily: 'Lato', // Set the desired font family
        fontSize: '12px' // Set the desired font size
      }
    },
  });
}

// Retrieve new survey

function retrieveNewSurvey() {
  $(window).scrollTop(0);
  var pvExist = document.getElementById("pv_exist").checked;
  var batteryExist = document.getElementById("battery_exist").checked;
  var semsExist = document.getElementById("sems_exist").checked;
  var boilerExist = document.getElementById("boiler_exist").checked;
  var renovationExist = document.getElementById("building_renovation").checked;

  if (pvExist) {
    var pv_exist = true;
  } else {
    var pv_exist = false;
  }
  if (batteryExist) {
    var battery_exist = true;
  } else {
    var battery_exist = false;
  }
  if (semsExist) {
    var sems_exist = true;
  } else {
    var sems_exist = false;
  }
  if (boilerExist) {
    var boiler_exist = true;
  } else {
    var boiler_exist = false;
  }
  if (renovationExist) {
    var building_renovated = true;
  } else {
    var building_renovated = false;
  }

  var pv_size = parseInt(document.getElementById("pv_size").value);
  var battery_capacity = parseInt(document.getElementById("battery_capacity").value);
  var boiler_type = document.getElementById("boiler_type").value;

  // Create a JavaScript object with the collected form data
  var newSurvey = {
    pv_exist: pv_exist,
    pv_size: pv_size,
    battery_exist: battery_exist,
    battery_capacity: battery_capacity,
    sems_exist: sems_exist,
    boiler_exist: boiler_exist,
    boiler_type: boiler_type,
    building_renovated: building_renovated
  };

  let my_scenario_id = document.cookie.split('; ').find(row => row.startsWith('my_scenario')).split('=')[1];

  // retrieve my scenario
  $.ajax({
    url: '/api/v1/scenario',
    type: 'GET',
    data: {
      id: my_scenario_id
    },
  }).then(function (data) {
    let scenario = JSON.parse(data);
    if (newSurvey.pv_exist == true) {
      scenario.pv.size = newSurvey.pv_size;
    }
    if (newSurvey.battery_exist == true) {
      scenario.battery.capacity = newSurvey.battery_capacity;
    }
    if (newSurvey.boiler_exist == true) {
      scenario.boiler.type = newSurvey.boiler_type;
    }
    scenario.building.renovated = newSurvey.building_renovated;
    // Convert the JavaScript object to JSON
    let newJson = JSON.stringify(scenario);
    return $.ajax({
      url: '/api/v1/scenario',
      type: 'POST',
      contentType: 'application/json',
      data: newJson,
      dataType: 'json'
    })
  }).then(function (data) {
    // Set cookie
    document.cookie = "selected_id=" + data.id;
    document.cookie = "selected_sems=" + sems_exist;
  }).then(function () {
    // Update data
    updateData();
  });
}

// Add configuration detail
function getImprovementInfo(key, value) {
  if (key == 'pv_size') {
    return ' (' + value + 'kWp)'
  }
  else if (key == 'battery_capacity') {
    return ' (' + value + 'kWh)'
  }
  else if (key == 'boiler_type') {
    return ' (' + value + ')'
  }
  else {
    return ''
  }
}

function updateData() {
  // get cookie value selected=<value>
  // let my_scenario = parseInt(document.cookie.split('; ').find(row => row.startsWith('my_scenario')).split('=')[1]);
  // let my_sems = (document.cookie.split('; ').find(row => row.startsWith('my_sems')).split('=')[1] === 'true')
  // let selected_id = parseInt(document.cookie.split('; ').find(row => row.startsWith('selected_id')).split('=')[1]);
  // let selected_sems = (document.cookie.split('; ').find(row => row.startsWith('selected_sems')).split('=')[1] === 'true')
  // let selected_investment_cost = parseInt(document.cookie.split('; ').find(row => row.startsWith('selected_investment_cost')).split('=')[1]);
  gSelectedScenario = JSON.parse(localStorage.getItem('selectedRecommendation'));
  gSelectedScenarioConfig = JSON.parse(localStorage.getItem('selectedRecommendationConfig'));
  gMySurveyResult = JSON.parse(localStorage.getItem('surveyResult'));
  gMyEnergyResultYear = JSON.parse(localStorage.getItem('myEnergyResultYear'));


  let myCountryCode = gMySurveyResult.myCountryCode;
  let mySems = gMySurveyResult.mySems;
  let selectedSems = gSelectedScenario.SEMS;
  let myEnergyResultMonthUrl;
  let selectedEnergyResultMonthUrl;
  let selectedEnergyResultYearUrl;

  if (mySems) {
    myEnergyResultMonthUrl = '/api/v1/' + myCountryCode + '/result/optimization_month';
  } else {
      myEnergyResultMonthUrl = '/api/v1/' + myCountryCode + '/result/reference_month';
  }

  if (selectedSems) {
    selectedEnergyResultMonthUrl = '/api/v1/' + myCountryCode + '/result/optimization_month';
    selectedEnergyResultYearUrl = '/api/v1/' + myCountryCode + '/result/optimization_year';
  } else {
      selectedEnergyResultMonthUrl = '/api/v1/' + myCountryCode + '/result/reference_month';
      selectedEnergyResultYearUrl = '/api/v1/' + myCountryCode + '/result/reference_year';
  }

  $.when(
    $.ajax({
      type: "GET",
      url: myEnergyResultMonthUrl,
      data: {
        'ID_Scenario': gMySurveyResult.myScenario
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "GET",
      url: selectedEnergyResultMonthUrl,
      data: {
        'ID_Scenario': gSelectedScenario.ID_Scenario,
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "GET",
      url: selectedEnergyResultYearUrl,
      data: {
        'ID_Scenario': gSelectedScenario.ID_Scenario,
      },
      dataType: "json",
      contentType: "application/json"
    }),
  ).done(function (
    myEnergyResultMonth, selectedEnergyResultMonth, selectedEnergyResultYear) {
      handleResult(myEnergyResultMonth[0], selectedEnergyResultMonth[0], selectedEnergyResultYear[0][0]);
    });
}

export { updateData, initChart, retrieveNewSurvey }
