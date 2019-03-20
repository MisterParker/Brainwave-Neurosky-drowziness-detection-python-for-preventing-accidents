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
};

// background.js
// browser.runtime.onMessage.addListener(message => {
//     console.log("background: onMessage", message);

//     // Add this line:
//     return Promise.resolve("Dummy response to keep the console quiet");
// });
// setInterval(function()
// {
//     console.log('Log Something');

//     $.ajax({
//         type: "get",
//         url: "http://localhost:5000/getdata",
//         success:function(data)
//         {
//             //console.log the response
//             console.log(data);
//         }
//     });
// }, 2000); //10000 milliseconds = 10 seconds

// function getAttention() {
//     $.ajax({
//         type: "get",
//         url: "http://localhost:5000/getdata",
//         success: function(data) {
//             //console.log the response
//             console.log(data);
//             x = data;
//             y = JSON.parse(x);
//             console.log("Main mai " + y.eSense.attention);
//             // return y.eSense.attention;
//         }
//     });
//     return data;
// }
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



// if(x == ""){
// return 1;
// }
// else{
//     y = JSON.parse(x);
//     console.log('In else ' + y.eSense.attention);
//     return y.eSense.attention;
// }
