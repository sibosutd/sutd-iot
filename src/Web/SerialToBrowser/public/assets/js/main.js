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

var CHART_NAMES = ['pulse-chart', 'oxygen-chart'];
var CHANNEL = 3;
var API_URL = '/device/' + CHANNEL;
var COLORS = {
    pulse: 'rgb(229,115,115)',
    oxygen: 'rgb(79,195,247)'
}

var charts = createCharts([COLORS.pulse, COLORS.oxygen], CHART_NAMES);
var counter = 8; // keeps track of the x-axis

var DOUGHNUTS = [
    {
        name: 'Pulse',
        canvasId: 'pulse-doughnut',
        labelId: 'pulse-doughnut-label',
        units: 'BPM',
        initValue: 50,
        maxValue: 160,
        options: {
            color: COLORS.pulse
        }
    },
    {
        name: 'Oxygen',
        canvasId: 'oxygen-doughnut',
        labelId: 'oxygen-doughnut-label',
        units: 'S<sub>p</sub>O<sub>2</sub>',
        options: {
            color: COLORS.oxygen
        }
    }
];

var doughnuts = DOUGHNUTS.map(function (doughnutDetails) {
    return new Doughnut(
        doughnutDetails.name,
        doughnutDetails.canvasId,
        doughnutDetails.labelId,
        doughnutDetails.initValue,
        doughnutDetails.maxValue,
        doughnutDetails.units,
        doughnutDetails.options);
});

var patientPosition = new Position('patient-position-label');

function updateDoughnuts(doughnuts, data) {
    doughnuts.forEach(function (doughnut, index) {
        doughnut.update(data[index]);
    });
}

(function update() {
    httpGetAsync(API_URL, function (rawData) {
        var data = rawData.split(' ');
        updateCharts(charts, data);
        updateDoughnuts(doughnuts, data);
        patientPosition.update(data[2]);
        update();
    });
})();
