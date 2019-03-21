var fuckYou= 1;
var return_first = function () {
var resp = [];
$.ajax({
    type: "get",
    url: "http://localhost:5000/getdata",
    success: function(data) {
        //console.log the response
        console.log(data);
        x = data;
        y = JSON.parse(x);
        console.log("Main mai " + y.eSense.attention);
        resp.push(y);
        fuckYou = y.eSense.attention;
        // return y.eSense.attention;
    }
});
console.log('Bahar mai:'+ fuckYou);
return fuckYou;
};

window.onload = function() {
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Attention"
        },
        axisY: {
            includeZero: false
        },
        data: [
            {
                type: "line",
                dataPoints: dps
            }
        ]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point
    
    var updateChart = function(count) {
        count = count || 1;

        for (var j = 0; j < count; j++) {
            yVal = return_first();
            document.getElementById("attention").innerHTML = yVal;
            document.getElementById("attention-bar").style.width = yVal;
            // yVal = yVal.eSense;
            console.log("Y value is " + yVal);

            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        chart.render();
    };

    updateChart(dataLength);
    setInterval(function() {
        updateChart();
    }, updateInterval);
    
    
    // setInterval(document.getElementById("attention").innerHTML = fuckYou, 2000);
};






