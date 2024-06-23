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

function handleResult(myEnergyResultMonth, selectedEnergyResultMonth, selectedEnergyResultYear, upgradeCostResult) {

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

  if (myScenario.Building.ID_Building % 2 !== 0) {
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
  $("#investmentSimuCost-placeholder").html(upgradeCostResult.UpgradeCost);
  createSimuEnergyChart(getChartDataFromEnergyResult(selectedEnergyResultMonth));

  let selectedScenario = new Scenario(gSelectedScenarioConfig, gMySurveyResult.availableComponents, gSelectedScenario.SEMS);
  // Get simulated configuration
  if (selectedScenario.PV.size !== 0) {
    $("#pv_exist").prop('checked', true);
    $("#pv_size").val(selectedScenario.PV.ID_PV).change();
  }

  if (selectedScenario.Battery.capacity !== 0) {
    $("#battery_exist").prop('checked', true);
    $("#battery_capacity").val(selectedScenario.Battery.ID_Battery).change();
  }

  $("#sems_exist").prop('checked', selectedScenario.sems);

  if (selectedScenario.Boiler.type !== 0) {
    $("#boiler_exist").prop('checked', true);
    $("#boiler_type").val(selectedScenario.Boiler.ID_Boiler).change();
  }

  $("#building_renovation").prop('checked', selectedScenario.Building.ID_Building % 2 !== 0);

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

function initData() {
  gSelectedScenario = JSON.parse(localStorage.getItem('selectedRecommendation'));
  gSelectedScenarioConfig = JSON.parse(localStorage.getItem('selectedRecommendationConfig'));
  gMySurveyResult = JSON.parse(localStorage.getItem('surveyResult'));
  gMyEnergyResultYear = JSON.parse(localStorage.getItem('myEnergyResultYear'));
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
  let selectedScenario = new Scenario(gSelectedScenarioConfig, gMySurveyResult.availableComponents, gSelectedScenario.SEMS);
  let pvExist = document.getElementById("pv_exist").checked;
  let batteryExist = document.getElementById("battery_exist").checked;
  let semsExist = document.getElementById("sems_exist").checked;
  let boilerExist = document.getElementById("boiler_exist").checked;
  let renovationExist = document.getElementById("building_renovation").checked;

  let pvId = gMySurveyResult.availableComponents.PV.length;
  if (pvExist) {
    pvId = parseInt(document.getElementById("pv_size").value);
  } 

  let batteryId = gMySurveyResult.availableComponents.Battery.length;
  if (batteryExist) {
    batteryId = parseInt(document.getElementById("battery_capacity").value);
  }
  
  let boilerId = gMySurveyResult.availableComponents.Boiler.length;
  if (boilerExist) {
    boilerId = parseInt(document.getElementById("boiler_type").value);
  }

  let buildingId = selectedScenario.Building.ID_Building;
  let renovated = selectedScenario.Building.ID_Building % 2 !== 0;
  if (renovationExist && !renovated) {
    buildingId = selectedScenario.Building.ID_Building - 1;
  } else if (!renovationExist && renovated) {
    buildingId = selectedScenario.Building.ID_Building + 1;
  }
  

  // Create a JavaScript object with the collected form data
  let componentIds = {
    "ID_PV": pvId,
    "ID_Battery": batteryId,
    "ID_Boiler": boilerId,
    "ID_Building": buildingId,
    "ID_HotWaterTank": selectedScenario.HotWaterTank.ID_HotWaterTank,
    "ID_SpaceHeatingTank": selectedScenario.HotWaterTank.ID_HotWaterTank,
    "ID_SpaceCoolingTechnology": 1,
    "ID_EnergyPrice": 1,
    "ID_Vehicle": 1,
    "ID_HeatingElement": 1,
  }

  $.ajax({
    type: "GET",
    url: "/api/v1/" + gMySurveyResult.myCountryCode + "/scenario",
    data: componentIds,
    dataType: "json",
    contentType: "application/json"
  }).then(function (data) {
    // update the selected scenario
    gSelectedScenario.ID_Scenario = data.ID_Scenario;;
    gSelectedScenario.SEMS = semsExist;
    gSelectedScenarioConfig = data;

    // update the diagram
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
    $.ajax({
      type: "GET",
      url: '/api/v1/' + myCountryCode + '/upgrade_cost',
      data: {
        'ID_Scenario': gMySurveyResult.myScenario,
        'SEMS': mySems,
        'ID_Scenario_Upgrade': gSelectedScenario.ID_Scenario,
        'SEMS_Upgrade': selectedSems,
      },
      dataType: "json",
      contentType: "application/json"
    }),
  ).done(function (
    myEnergyResultMonth, selectedEnergyResultMonth, selectedEnergyResultYear, upgradeCostResult) {
    handleResult(myEnergyResultMonth[0], selectedEnergyResultMonth[0], selectedEnergyResultYear[0], upgradeCostResult[0]);
  });
}

function initUpdateSurveyForm() {
  let availableComponents = gMySurveyResult.availableComponents
  let selectedScenario = new Scenario(gSelectedScenarioConfig, gMySurveyResult.availableComponents, gSelectedScenario.SEMS);
  // Set the available PV sizes
  let pvExistCheckbox = document.getElementById("pv_exist");
  let pvSizeSelect = document.getElementById('pv_size');
  if (availableComponents.PV.length <= 1) {
    pvExistCheckbox.disabled = true;
    pvSizeSelect.disabled = true;
  } else {
    pvExistCheckbox.disabled = false;
    pvSizeSelect.disabled = false;
    for (let i = 0; i < availableComponents.PV.length; i++) {
      if (availableComponents.PV[i].size === 0) {
        continue;
      }
      let option = document.createElement('option');
      option.value = availableComponents.PV[i].ID_PV;
      option.text = "around " + availableComponents.PV[i].size + " kWp";
      pvSizeSelect.appendChild(option);
    }
  }

  // Set the available battery capacities
  let batteryExistCheckbox = document.getElementById("battery_exist");
  let batteryCapacitySelect = document.getElementById('battery_capacity');
  if (availableComponents.Battery.length <= 1) {
    batteryExistCheckbox.disabled = true;
    batteryCapacitySelect.disabled = true;
  } else {
    batteryExistCheckbox.disabled = false;
    batteryCapacitySelect.disabled = false;
    for (let i = 0; i < availableComponents.Battery.length; i++) {
      if (availableComponents.Battery[i].capacity === 0) {
        continue;
      }
      let option = document.createElement('option');
      option.value = availableComponents.Battery[i].ID_Battery;
      option.text = "around " + availableComponents.Battery[i].capacity + " kWh";
      batteryCapacitySelect.appendChild(option);
    }
  }

  // Set the available boiler types
  const heatingMap = {
    "Air_HP": "Heat pump",
    "gases": "Natural gas boiler",
    "solids": "Biomass boiler",
    "district_heating": "District heating",
    "liquids": "Heating oil boiler"
  }
  let boilerExistCheckbox = document.getElementById("boiler_exist");
  let boilerTypeSelect = document.getElementById('boiler_type');
  if (availableComponents.Boiler.length === 0) {
    boilerExistCheckbox.disabled = true;
    boilerTypeSelect.disabled = true;
  } else {
    boilerExistCheckbox.disabled = false;
    boilerTypeSelect.disabled = false;
    for (let i = 0; i < availableComponents.Boiler.length; i++) {
      let option = document.createElement('option');
      option.value = availableComponents.Boiler[i].ID_Boiler;
      option.text = heatingMap[availableComponents.Boiler[i].type];
      boilerTypeSelect.appendChild(option);
    }
  }
}

export { initData, updateData, initUpdateSurveyForm, initChart, retrieveNewSurvey }
