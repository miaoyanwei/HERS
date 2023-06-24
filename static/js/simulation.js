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

function getAnnuCost() {

  // Annualised costs (/kWp and /kWh)
  const perPV = 116;
  const perBattery = 41;

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

function handleResult(data) {
  let current = data.current;

  // Get current total cost
  $("#totalcost-placeholder").replaceWith(current.energy_data.energy_bill_year);

  // Get location
  if (current.config.pv_size) {
    $("#pv-true").css('display', 'inline')
  } else {
    $("#pv-false").css('display', 'inline')
  }

  if (current.config.battery_capacity) {
    $("#battery-true").css('display', 'inline')
  } else {
    $("#battery-false").css('display', 'inline')
  }

  if (current.config.sems) {
    $("#sems-true").css('display', 'inline')
  } else {
    $("#sems-false").css('display', 'inline')
  }

  if (current.config.heating_system_type) {
    $("#heatsource-true").css('display', 'inline')
  } else {
    $("#heatsource-false").css('display', 'inline')
  }

  if (current.config.building_renovation) {
    $("#renovation-true").css('display', 'inline')
  } else {
    $("#renovation-false").css('display', 'inline')
  }

  let energyData = current.energy_data;
  $("#totalDemand-placeholder").replaceWith(energyData.energy_demand);
  $("#totalSupply-placeholder").replaceWith(energyData.energy_generate);
  createCurrentEnergyChart(energyData);

  // get cookie value selected=<value>
  let selected = document.cookie.split(';').find(row => row.startsWith('selection=')).split('=')[1];
  let simuEnergyData = data.recommendation[selected].energy_data;
  $("#totalSimuDemand-placeholder").replaceWith(simuEnergyData.energy_demand);
  $("#totalSimuSupply-placeholder").replaceWith(simuEnergyData.energy_generate);
  $("#totalSimuCost-placeholder").replaceWith(simuEnergyData.energy_bill_year);
  $("#investmentSimuCost-placeholder").replaceWith(data.recommendation[selected].investment_cost);
  createSimuEnergyChart(simuEnergyData);
}

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
      fontFamily: 'Philosopher',
      fontSize: '10px'
    }
  }
}

// Shared yAxis configuration
var sharedYAxis = [{
  title: {
    text: null
  },
  labels: { // Ensable labels on the right side of the graph
    enabled: true,
    style: {
      fontFamily: 'Philosopher',
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
      data: energyData.heating,
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
        fontFamily: 'Philosopher', // Set the desired font family
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
      data: energyData.heating,
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
        fontFamily: 'Philosopher', // Set the desired font family
        fontSize: '12px' // Set the desired font size
      }
    },
  });
}

export { getAnnuCost, handleResult, initChart }
