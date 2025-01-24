
$.ajaxSetup({async: false});
var vvvvv = [];
var sssss = "";
//
//    vvvvv.push(["", 0]);
//    vvvvv.push(["Active", 7]);
//    vvvvv.push(["Inactive", 10]);


//    var BranchId1 = $('#BranchIdCommon').val();
//    $.ajax({
//        url: GetActiveInActiveCounterDetByBranchIdURL, //"Dashboard/GetActiveInActiveCounterDetByBranchId",
//        data: {
//            BranchId: BranchId1
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            vvvvv.push(["", 0]);
//            vvvvv.push(["Active", data.activeCounters]);
//            vvvvv.push(["Inactive", data.inActiveCounters]);
//            if (data.activeCounters == 0 && data.inActiveCounters == 0) {
//                vvvvv.push(["No Counter", 1]);
//            }
//            sssss = data.activeCounters + "/" + data.inActiveCounters;
//        },
//        error: function (e) {
//            alert("Failed");
//        }
//    });


var chart = Highcharts.chart('container-p', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: sssss,
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            colors: [
                '#449be1',
                '#6ddc7c',
                '#e42f51',
                '#e00966',
                '#449be1',
                '#FF9655',
                '#FFF263',
                '#6AF9C4'
            ],
            dataLabels: {
                enabled: false,
                distance: -40,
                style: {
                    fontWeight: 'bold',
                    color: 'Blue'
                }
            },
            startAngle: 0,
            endAngle: 0,
            center: ['50%', '75%']
        }
    },
    series: [{
            type: 'pie',
            name: 'Counters',
            innerSize: '80%',
            data: vvvvv
        }]
});
$(document).ready(function () {

    window.setInterval(function () {
        vvvvv.push(["", 0]);
        vvvvv.push(["Active", 8]);
        vvvvv.push(["Inactive", 10]);
        chart.series[0].update({

        });

    }, 3000);
});

function container1() {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '2<br>Waiting / Counter',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '85%',
                data: [
                    ['', 20],
                    ['', 80],
                    ['', 0],
                    ['', 0],
                    ['', 0.],
                    {
                        name: 'Proprietary or Undetectable',
                        y: 0.2,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
    });
}
function container2() {
    Highcharts.chart('container2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '8<br>Custmor Waiting',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '85%',
                data: [
                    ['', 30],
                    ['', 70],
                    ['', 0],
                    ['', 0],
                    ['', 0.],
                    {
                        name: 'Proprietary or Undetectable',
                        y: 0.2,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
    });
}
function container3() {
    Highcharts.chart('container3', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '46.99<br>Service Level',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '85%',
                data: [
                    ['', 46],
                    ['', 54],
                    ['', 0],
                    ['', 0],
                    ['', 0.],
                    {
                        name: 'Proprietary or Undetectable',
                        y: 0.2,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
    });
}
function container4() {
    $.ajaxSetup({async: false});
    var container4Data = [];
    var container4Label = "";

    container4Data.push(["", 0]);
    container4Data.push(["Served", 50]);

    container4Label = 50 + "/" + 100 + "<br>Ticket Served";
    container4Data.push(["Waiting", (100 - 50)]);

//    var BranchId1 = $('#BranchIdCommon').val();
//    $.ajax({
//        url: GetTicketDetByBranchIdURL, //"Dashboard/GetTicketDetByBranchId",
//        data: {
//            BranchId: BranchId1
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            container4Data.push(["", 0]);
//            container4Data.push(["Served", data.totalTicketsServed]);
//
//            container4Label = data.totalTicketsServed + "/" + data.totalTicketsIssued + "<br>Ticket Served";
//            container4Data.push(["Waiting", (data.totalTicketsIssued - data.totalTicketsServed)]);
//            if (data.totalTicketsIssued == 0) {
//                data.totalTicketsIssued = 1;
//                container4Data.push(["", 1]);
//            }
//
//        },
//        error: function (e) {
//            alert("Failed");
//        }
//    });

    //Highcharts.getOptions().plotOptions.pie.colors = ['#0d233a', '#0d233a', '#910000', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];

    Highcharts.chart('container4', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: container4Label, //'75<br>Ticket Served',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                colors: [
                    '#449be1',
                    '#6ddc7c',
                    '#de5d4a',
                    '#9bd5d8',
                    '#449be1',
                    '#FF9655',
                    '#FFF263',
                    '#6AF9C4'
                ],
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Tickets',
                innerSize: '85%',
                data: container4Data
            }]
    });
}

function toHHMMSS(seconds) {
    var h, m, s, result = '';
    // HOURs
    h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    if (h) {
        result = h < 10 ? '0' + h + ':' : h + ':';
    }
    // MINUTEs
    m = Math.floor(seconds / 60);
    seconds -= m * 60;
    result += m < 10 ? '0' + m + ':' : m + ':';
    // SECONDs
    s = seconds % 60;
    result += s < 10 ? '0' + s : s;
    return result;
}

function container5() {
    $.ajaxSetup({async: false});
    var container5Data = [];
    var container5Label = "";
    var BranchId1 = $('#BranchIdCommon').val();
    $.ajax({
       // url: GetAvgWaitTimeDetInSecURL, //"Dashboard/GetAvgWaitTimeDetInSec",
        data: {
            BranchId: BranchId1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            container5Data.push(["", 0]);

            if (data.avgTimeInSec < data.timeInSec) {
                container5Data.push(["", data.avgTimeInSec]);
                container5Data.push(["", 0]);
                container5Data.push(["", 0]);
            } else if (data.avgTimeInSec < (data.timeInSec * 1.5)) {
                container5Data.push(["", 0]);
                container5Data.push(["", data.avgTimeInSec]);
                container5Data.push(["", 0]);
            } else {
                container5Data.push(["", 0]);
                container5Data.push(["", 0]);
                container5Data.push(["", data.avgTimeInSec]);
            }

            container5Data.push(["", (data.timeInSec - data.avgTimeInSec)]);

            container5Label = toHHMMSS(data.avgTimeInSec) + "/" + toHHMMSS(data.timeInSec) + "<br>Wait Time<br>Approx.";
        },
        error: function (e) {
            alert("Failed");
        }
    });


    //Highcharts.getOptions().plotOptions.pie.colors = ['#1aadce', '#1aadce', '#910000', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];


    Highcharts.chart('container5', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: container5Label, //'13<br>Wait Time(Mins)<br>Approx.',
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                colors: [
                    '#449be1',
                    '#6ddc7c',
                    '#de9231',
                    '#de5d4a',
                    '#9bd5d8',
                    '#FF9655',
                    '#FFF263',
                    '#6AF9C4'
                ],
                //colors: [
                //'#449be1',
                //'green',
                //'yellow',
                //'red',
                //'#449be1',
                //'#FF9655',
                //'#FFF263',
                //'#6AF9C4'
                //],
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Wait Time',
                innerSize: '85%',
                data: container5Data
            }]
    });
}

function container6() {
    $.ajaxSetup({async: false});
    var container6Data = [];
    var container6Label = "";
    var BranchId1 = $('#BranchIdCommon').val();
    $.ajax({
       // url: GetAvgServiceTimeDetInSecURL, //"Dashboard/GetAvgServiceTimeDetInSec",
        data: {
            BranchId: BranchId1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            container6Data.push(["", 0]);

            if (data.avgTimeInSec < data.timeInSec) {
                container6Data.push(["", data.avgTimeInSec]);
                container6Data.push(["", 0]);
                container6Data.push(["", 0]);
            } else if (data.avgTimeInSec < (data.timeInSec * 1.5)) {
                container6Data.push(["", 0]);
                container6Data.push(["", data.avgTimeInSec]);
                container6Data.push(["", 0]);
            } else {
                container6Data.push(["", 0]);
                container6Data.push(["", 0]);
                container6Data.push(["", data.avgTimeInSec]);
            }
            container6Data.push(["", ((2 * data.timeInSec) - data.avgTimeInSec)]);

            container6Label = toHHMMSS(data.avgTimeInSec) + "/" + toHHMMSS(data.timeInSec) + "<br>Service Time<br>Approx.";
        },
        error: function (e) {
            alert("Failed");
        }
    });

    Highcharts.chart('container6', {
        chart: {
            backgroundColor: '#000',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: container6Label,
            align: 'center',
            verticalAlign: 'middle',
            y: 10
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                colors: [
                    '#449be1',
                    '#6ddc7c',
                    '#de9231',
                    '#de5d4a',
                    '#9bd5d8',
                    '#FF9655',
                    '#FFF263',
                    '#6AF9C4'
                ],
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
                type: 'pie',
                name: 'Service Time',
                innerSize: '85%',
                data: container6Data
            }]
    });
}
