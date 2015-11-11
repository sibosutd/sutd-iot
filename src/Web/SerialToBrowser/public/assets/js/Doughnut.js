/**
 * @param doughtnut {string}
 * @param labelId {string}
 * @param maxValue {number}
 * @param units {string}
 * @param data {number}
 */
function updateDoughnut(doughtnut, labelId, maxValue, units, data) {
    doughtnut.segments[0].value = maxValue - data;
    doughtnut.segments[1].value = data;
    doughtnut.update();

    var label = document.getElementById(labelId);

    if (!units) {
        label.innerHTML = data;
    } else {
        label.innerHTML = data + ' ' + units;
    }

}

var INIT_VALUE = 50;
var MAX_VALUE = 100;
var COLOR = '#F44336';
var HIGHLIGHT = '#D32F2F'

function Doughnut (name, canvasId, labelId, initValue, maxValue, units, options) {
    this.labelId = labelId;
    this.maxValue = maxValue || MAX_VALUE;
    this.units = units;
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    var initValue = initValue || INIT_VALUE;

    var dataOptions = {
        value: initValue,
        color: options.color || COLOR,
        highlight: options.highlight || HIGHLIGHT,
        label: name
    };



    var data = [
        {
            value: this.maxValue - initValue,
            color: "#FFF",
            highlight: "#B6B6B6"
        },
        dataOptions
    ];

    this.chart = new Chart(ctx).Doughnut(data, {
        animationEasing: 'easeInOutQuart',
        animationSteps: 60,
        percentageInnerCutout : 70
    });
}

Doughnut.prototype = {
    constructor: Doughnut,
    update: function (data) {
        updateDoughnut(this.chart, this.labelId, this.maxValue, this.units, data);
    }
};
