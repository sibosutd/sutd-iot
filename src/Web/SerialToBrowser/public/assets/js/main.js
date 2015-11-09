function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };

    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function createCharts(selectors) {
    return selectors.map(function (selector) {
        var canvas = document.getElementById(selector);

        var ctx = canvas.getContext('2d');

        var startingData = {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [
                {
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        // Reduce the animation steps for demo clarity.
        return new Chart(ctx).Line(startingData, {animationSteps: 15});
    });
}

/**
 * @param chart
 * @param data x, y
 */
function addData(chart, data) {
    console.log(data);
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

var charts = createCharts(CHART_NAMES);
var counter = 8;

(function update() {
    httpGetAsync(API_URL, function (rawData) {
        var data = rawData.split(' ');
        updateCharts(charts, data);
        update();
    });
})();
