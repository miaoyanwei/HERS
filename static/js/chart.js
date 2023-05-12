// File: chart.js

document.addEventListener('DOMContentLoaded', function () {

  Highcharts.setOptions({
    colors: ['#A78067', '#E2E2E2', '#ADA3A3', '#DDB9A1', '#6DAE47']
  });

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
    xAxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      labels: {
        style: {
          fontFamily: 'Philosopher',
          fontSize: '10px'
        }
      }
    },
    // Primary Y-axis
    yAxis: [{ 
      title: { 
        text: null
      },
      labels: { // Disable labels on the right side of the graph
        enabled: false
      },
    }, { // Secondary Y-axis
      title: { 
        text: null
      },
      opposite: false,
      labels: { // Disable labels on the right side of the graph
        enabled: false
      }
    }],
    series: [{
      name: 'Heating',
      data: [1000, 1170, 660, 1030, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount',
    }, {
      name: 'Cooling',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {
      name: 'Appliance',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {
      name: 'Hot water',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {

      // Second bar
      name: 'PV',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      yAxis: 1
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
    xAxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      labels: {
        style: {
          fontFamily: 'Philosopher',
          fontSize: '10px'
        }
      }
    },
    // Primary Y-axis
    yAxis: [{ 
      title: { 
        text: null
      },
      labels: { // Disable labels on the right side of the graph
        enabled: false
      },
    }, { // Secondary Y-axis
      title: { 
        text: null
      },
      opposite: false,
      labels: { // Disable labels on the right side of the graph
        enabled: false
      }
    }],
    series: [{
      name: 'Heating',
      data: [1000, 1170, 660, 1030, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount',
    }, {
      name: 'Cooling',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {
      name: 'Appliance',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {
      name: 'Hot water',
      data: [400, 460, 1120, 540, 1000, 1170, 660, 1030, 1000, 1170, 660, 1030],
      stack: 'amount'
    }, {

      // Second bar
      name: 'PV',
      data: [10, 40, 100, 800, 1000, 1000, 1000, 800, 600, 80, 10, 10],
      yAxis: 1
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
});
