$(document).ready(function () {
    $.ajaxSetup({ async: false });
//    $(".dashboardmenu").addClass("active");
//    GetAllBranchBranchesByRegionId();
//    var BranchId1 = $('#BranchIdCommon').val();

//    GetTicketDetByBranchId();
//    GetTicketsCountDetByBranchId();
//    GetActiveInActiveCounterDetByBranchId();
//    container4();
//    container5();
//    container6();

//    window.setInterval(function () {
////        GetActiveInActiveCounterDetByBranchId();
////        container4();
////        container5();
////        container6();
////        GetTicketDetByBranchId();
////        GetTicketsCountDetByBranchId();
//
//    }, 15000);
//
//    $('#displayform').empty().append("Dashboard");
});
//
//function selectBranchDothis() {
////    GetActiveInActiveCounterDetByBranchId();
////    container4();
////    container5();
////    container6();
////    GetTicketDetByBranchId();
////    GetTicketsCountDetByBranchId();
//}
//
//
//function GetTicketDetByBranchId() {
//    var BranchId1 = $('#BranchIdCommon').val();
//    $.ajax({
//        url: GetTicketDetByBranchIdURL, //"Dashboard/GetTicketDetByBranchId",
//        data: {
//            BranchId: BranchId1
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            $("#TicketsIssued").empty().append(data.totalTicketsIssued);
//            $("#TicketsServed").empty().append(data.totalTicketsServed);
//            $("#Ticketswaiting").empty().append(data.totalTicketsWaiting);
//        },
//        error: function (e) {
//            alert("GetTicketDetByBranchId");
//        }
//    });
//}
//
//
//function GetTicketsCountDetByBranchId() {
//    var BranchId1 = $('#BranchIdCommon').val();
//    $.ajax({
//        url: GetTicketsCountDetByBranchIdURL, //"Dashboard/GetTicketsCountDetByBranchId",
//        data: {
//            BranchId: BranchId1
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            $("#TicketsInServing").empty().append(data.ticketsInServing);
//            $("#TicketsServed2").empty().append(data.ticketsServed);
//            $("#TicketsNoShow").empty().append(data.ticketsNoShow);
//            $("#LocalWaitingTickets").empty().append(data.localWaitingTickets);
//        },
//        error: function (e) {
//            alert("GetTicketsCountDetByBranchId");
//        }
//    });
//}