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


function handleResult(current, selected, investment_cost) {

  // Get current total cost
  $("#totalcost-placeholder").html(current.energy_cost.yearly_bill);


  // Get check or uncheck icons

  if (current.scenario.pv.size > 0) {
    $("#pv-true").css('display', 'inline')
    // Get current PV size
    $("#currentPVSize").html(getImprovementInfo('pv_size', current.scenario.pv.size));
  } else {
    $("#pv-false").css('display', 'inline')
  }

  if (current.scenario.battery.capacity > 0) {
    $("#battery-true").css('display', 'inline')
    // Get current Battery capacity
    $("#currentBatteryCapacity").html(getImprovementInfo('battery_capacity', current.scenario.battery.capacity));
  } else {
    $("#battery-false").css('display', 'inline')
  }

  if (current.scenario.sems === true) {
    $("#sems-true").css('display', 'inline')
  } else {
    $("#sems-false").css('display', 'inline')
  }

  if (current.scenario.boiler.type !== null) {
    $("#boiler-true").css('display', 'inline')
    // Get current heating system
    $("#currentBoilerType").html(getImprovementInfo('boiler_type', current.scenario.boiler.type));
  } else {
    $("#boiler-false").css('display', 'inline')
  }

  if (current.scenario.building.renovated === true) {
    $("#renovation-true").css('display', 'inline')
  } else {
    $("#renovation-false").css('display', 'inline')
  }

  // Show text if heating system is not heat pump
  if (current.scenario.boiler.type !== "Air_HP") {
    $("#curNotHP").css('display', 'block')
  }
  else {
    $("#curNotHP").css('display', 'none')
  }

  $("#totalDemand-placeholder").html(current.energy_data.total_demand);
  $("#totalSupply-placeholder").html(current.energy_data.total_generate);
  createCurrentEnergyChart(current.energy_data);

  // get cookie value selected=<value>
  $("#totalSimuDemand-placeholder").html(selected.energy_data.total_demand);
  $("#totalSimuSupply-placeholder").html(selected.energy_data.total_generate);
  $("#totalSimuCost-placeholder").html(selected.energy_cost.yearly_bill);
  $("#investmentSimuCost-placeholder").html(investment_cost);
  createSimuEnergyChart(selected.energy_data);

  // Get simulated configuration
  if (selected.scenario.pv.size !== 0) {
    $("#pv_exist").prop('checked', true);
    $("#pv_size").val(selected.scenario.pv.size).change();
  }

  if (selected.scenario.battery.capacity !== 0) {
    $("#battery_exist").prop('checked', true);
    $("#battery_capacity").val(selected.scenario.battery.capacity).change();
  }

  $("#sems_exist").prop('checked', selected.scenario.sems);

  if (selected.scenario.boiler.type !== 0) {
    $("#boiler_exist").prop('checked', true);
    $("#boiler_type").val(selected.scenario.boiler.type).change();
  }

  $("#building_renovation").prop('checked', selected.scenario.building.renovated !== 0);

  // Show text if heating system is not heat pump
  if (selected.scenario.boiler.type !== "Air_HP") {
    $("#simuNotHP").css('display', 'block')
  } else {
    $("#simuNotHP").css('display', 'none')
  }


  // Annualised costs (/kWp and /kWh)
  const perPV = 116;
  const perBattery = 41;

  // Retrieve the input values
  let pv_size = selected.scenario.pv.size;
  let battery_capacity = selected.scenario.battery.capacity;

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
    text: "kWh",
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
      data: energyData.boiler,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Cooling',
      data: energyData.cooling,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Appliance',
      data: energyData.appliance,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Hot water',
      data: energyData.hotwater,
      stack: 'amount',
      yAxis: 0
    }, {

      // Second bar
      name: 'PV',
      data: energyData.pv,
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
      data: energyData.boiler,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Cooling',
      data: energyData.cooling,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Appliance',
      data: energyData.appliance,
      stack: 'amount',
      yAxis: 0
    }, {
      name: 'Hot water',
      data: energyData.hotwater,
      stack: 'amount',
      yAxis: 0
    }, {

      // Second bar
      name: 'PV',
      data: energyData.pv,
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
  let my_scenario = document.cookie.split('; ').find(row => row.startsWith('my_scenario')).split('=')[1];
  let my_sems = document.cookie.split('; ').find(row => row.startsWith('my_sems')).split('=')[1];
  let selected_id = document.cookie.split('; ').find(row => row.startsWith('selected_id')).split('=')[1];
  let selected_sems = document.cookie.split('; ').find(row => row.startsWith('selected_sems')).split('=')[1];
  let selected_investment_cost = document.cookie.split('; ').find(row => row.startsWith('selected_investment_cost')).split('=')[1];
  $.when(
    $.ajax({
      type: "GET",
      url: "/api/v1/scenario",
      data: {
        'id': my_scenario
      }
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/energy_cost",
      data: {
        'id': my_scenario,
        'sems': my_sems
      }
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/energy_data",
      data: {
        'id': my_scenario,
        'sems': my_sems
      }
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/scenario",
      data: {
        'id': selected_id
      }
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/energy_cost",
      data: {
        'id': selected_id,
        'sems': selected_sems
      }
    }),
    $.ajax({
      type: "GET",
      url: "/api/v1/energy_data",
      data: {
        'id': selected_id,
        'sems': selected_sems
      }
    })
  ).done(function (
    my_scenario_res,
    my_energy_cost_res, my_energy_data_res,
    selected_scenario_res,
    selected_energy_cost_res,
    selected_energy_data_res) {
    let current = {};
    current.scenario = JSON.parse(my_scenario_res[0]);
    current.scenario.sems = my_sems;
    current.energy_cost = JSON.parse(my_energy_cost_res[0]);
    current.energy_data = JSON.parse(my_energy_data_res[0]);
    let selected = {};
    selected.scenario = JSON.parse(selected_scenario_res[0]);
    selected.scenario.sems = selected_sems;
    selected.energy_cost = JSON.parse(selected_energy_cost_res[0]);
    selected.energy_data = JSON.parse(selected_energy_data_res[0]);
    handleResult(current, selected, selected_investment_cost);
  });
}

export { updateData, initChart, retrieveNewSurvey }
