//﻿$(document).ready(function () {
//    $(".homemenu").addClass("active");
//
//    $.ajaxSetup({ async: false });
//    GetAllBranchBranchesByRegionId();
//    GetTicketDetByBranchIdHome();
//
//    window.setInterval(function () {
//        GetTicketDetByBranchIdHome();
//    }, 15000);
//    
//});
//
//function selectBranchDothis() {
//    GetTicketDetByBranchIdHome();
//}
//
//function HomeMenuOpenUrl(linkId) {
//    document.getElementById(linkId).click();
//
//}
//function GetTicketDetByBranchIdHome() {
//    var BranchId1 = $('#BranchIdCommon').val();
//    $.ajax({
//        url: GetTicketDetByBranchIdHomeURL, //"Home/GetTicketDetByBranchId",
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
//            alert("Get Ticket Det By BranchId Home");
//        }
//    });
//}