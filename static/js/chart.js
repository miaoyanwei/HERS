// include Google Charts library
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
var data = google.visualization.arrayToDataTable([
    ['Time', 'Heating', 'Cooling', 'Appliance', 'Hot water'],
    ['JAN', 1000, 400, 800, 200],
    ['FEB', 1170, 460, 800, 200],
    ['MAR', 660, 1120, 800, 200],
    ['APR', 1030, 540, 800, 200],
    ['MAY', 1000, 400, 800, 200],
    ['JUN', 1170, 460, 800, 200],
    ['JUL', 660, 1120, 800, 200],
    ['AUG', 1030, 540, 800, 200],
    ['SEP', 1000, 400, 800, 200],
    ['OCT', 1170, 460, 800, 200],
    ['NOV', 660, 1120, 800, 200],
    ['DEC', 1030, 540, 800, 200],
]);

var options = {
    title: ' ',
    hAxis: {title: ' ',  titleTextStyle: {color: '#C2C2C2', fontName: 'Philosopher'}},
    vAxis: {minValue: 0, textStyle: {fontName: 'Philosopher'} },
    legend: 'none', // hide the legend
    isStacked: true, // added property for stacked chart
    colors: ['#A78067', '#E2E2E2', '#ADA3A3', '#DDB9A1'], // set colors for columns
    titleTextStyle: { fontSize: 10, color: '#C2C2C2', fontName: 'Philosopher' }, // set title font size and color
    legendTextStyle: { fontSize: 10, color: '#C2C2C2', fontName: 'Philosopher' }, // set legend font size and color
    vAxis: { textStyle: { fontSize: 10, color: '#C2C2C2', fontName: 'Philosopher' } }, // set vertical axis font size and color
    hAxis: { textStyle: { fontSize: 8, color: '#C2C2C2', fontName: 'Philosopher' } } // set horizontal axis font size and color
  };

var chart = new google.visualization.ColumnChart(document.getElementById('chart_current_year'));
chart.draw(data, options);
}