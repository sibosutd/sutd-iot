function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };

    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function createCharts(colors, selectors) {
    return selectors.map(function (selector, index) {
        var canvas = document.getElementById(selector);

        var ctx = canvas.getContext('2d');

        var startingData = {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [
                {
                    fillColor: colors[index],
                    data: [0, 0, 0, 0, 0, 0 , 0]
                }
            ]
        };

        // Reduce the animation steps for demo clarity.
        return new Chart(ctx).Line(startingData, {
            animationSteps: 15,
            scaleFontSize: 10,
            scaleShowGridLines : false,
            pointDotRadius : 2,
            scaleFontFamily: "'Roboto'",
            pointDot : false
        });
    });
}

/**
 * @param chart
 * @param data x, y
 */
function addData(chart, data) {
    chart.addData([data[1]], data[0]);
    // Remove the first point so we dont just add values forever
    chart.removeData();
}

function updateCharts(charts, data) {
    charts.forEach(function (chart, index) {
        addData(chart, [counter, data[index]]);
    });
    counter += 1;
}

var CHART_NAMES = ['pulse-chart', 'oxygen-chart', 'patient-chart'];
var CHANNEL = 3;
var API_URL = '/device/' + CHANNEL;
var COLORS = ['#2196F3', '#E91E63', '#009688'];

var charts = createCharts(COLORS, CHART_NAMES);
var counter = 8; // keeps track of the x-axis

var PULSE_MAX = 160;
function createDoughnut(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    var initPulse = 50;
    var data = [
        {
            value: PULSE_MAX - initPulse,
            color: "#FFF",
            highlight: "#B6B6B6"
        },
        {
            value: initPulse,
            color: "#F44336",
            highlight: "#D32F2F",
            label: "Pulse"
        }
    ];

    var myDoughnutChart = new Chart(ctx).Doughnut(data, {

    });

    return myDoughnutChart;
}

function createDoughnuts(ids) {
    return ids.map(function (id) {
        return createDoughnut(id);
    });
}

var DOUGHNUT_NAMES = ['pulse-doughnut', 'oxygen-doughnut', 'patient-doughnut'];
var DOUGHNUT_LABELS = ['pulse-doughnut-label', 'oxygen-doughnut-label', 'patient-doughnut-label'];



var doughnuts = createDoughnuts(DOUGHNUT_NAMES);

function updateDoughnuts(doughnuts, data) {
    doughnuts.forEach(function (doughnut, index) {
        updateDoughnut(doughnut, DOUGHNUT_LABELS[index], data[index]);
    });
}

function updateDoughnut(doughtnut, labelId, data) {
    console.log(data);

    doughtnut.segments[0].value = PULSE_MAX - data;
    doughtnut.segments[1].value = data;
    doughtnut.update();

    var label = document.getElementById(labelId);
    label.textContent = data + ' BPM';
}

(function update() {
    httpGetAsync(API_URL, function (rawData) {
        var data = rawData.split(' ');
        updateCharts(charts, data);
        updateDoughnuts(doughnuts, data);
        update();
    });
})();
