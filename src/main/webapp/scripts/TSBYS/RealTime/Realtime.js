$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RealtimePage").addClass("active");

   // GetAllBranchBranchesByRegionId();
    GetAllRegionCounteryLocalReginArea();//load new selecyt branch drop down list 
   

    //get branch id from url
      var pageURL = $(location).attr("href");
    var components = URI.parse(pageURL);
    var query = URI.parseQuery(components['query']);
    $('#BranchIdCommon').val(query['id']);


    var BranchId1 = $('#BranchIdCommon').val();


    GetBranchSummary(BranchId1);
    GetOperatorStatus(BranchId1);
    GetCategoryStatus(BranchId1);
    GetWatingTickets(BranchId1);
    EmptyDocExpnd(BranchId1);
    GetDocumentDetails(BranchId1);
   

    window.setInterval(function () {
        BranchId1 = $('#BranchIdCommon').val();
        
        GetBranchSummary(BranchId1);
        GetOperatorStatus(BranchId1);
        GetCategoryStatus(BranchId1);
        GetWatingTickets(BranchId1);
        EmptyDocExpnd(BranchId1);
        GetDocumentDetails(BranchId1);
       
    }, 10000);


});
function selectBranchDothis() {
    BranchId1 = $('#BranchIdCommon').val();
    GetBranchSummary(BranchId1);
    GetOperatorStatus(BranchId1);
    GetCategoryStatus(BranchId1);
    GetWatingTickets(BranchId1);
    EmptyDocExpnd(BranchId1);
    GetDocumentDetails(BranchId1);
}



function toHHMMSS(seconds) {
    var h, m, s, result = '';
    // HOURs
    h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    if (h) {
        result = h < 10 ? '0' + h + ':' : h + ':';
    } else {
        result = '00:';
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

function GetWatingTickets(BranchId) {
    $.ajax({
        url: GetWatingTicketsURL, //"RealTime/GetWatingTickets",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                    "
                           + "    <thead>                            "
                           + "        <tr>                           "
                           + "            <th>Ticket Number</th>     "
                           + "            <th>Category</th>          "
                           + "            <th>Waiting Time</th>       "
                           + "        </tr>                          "
                           + "    </thead>                           "
                           + "    <tbody>";

            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                htmlCode += "<tr><td colspan='3' >No Records Found</td></tr>";
            }
            for (var i = 0; i < ccd; i++) {
                htmlCode += "<tr>                                   "
                           + "        <td>" + data[i].ticketNumber + "</td>       "
                           + "        <td>" + data[i].category + "</td>                    "
                           + "        <td>" + data[i].watingTime + "</td>                    "
                           + "    </tr>";
            }


            htmlCode += "</tbody></table>";

            $('#WatingTicketsDet').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetWatingTickets");
        }
    });
}



function GetCategoryStatus(BranchId) {

    $.ajax({
        url: GetCategoryStatusURL, //"RealTime/GetCategoryStatus",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                          "
                           + "  <thead>                                    "
                           + "      <tr>                                   "
                           + "          <th>Category</th>                  "
                           + "          <th>Counter Serving</th>           "
                           + "          <th>Tickets Waiting</th>            "
                           + "          <th>Tickets Served</th>            "
                           + "          <th>Avg Wait Time</th>             "
                           + "          <th>Max Wait Time</th>             "
                           + "          <th>Target Waiting Time</th>       "
                           + "          <th>Avg Service Time</th>          "
                           + "          <th>Target Service Time</th>       "
                           + "      </tr>                                  "
                           + "  </thead>  <tbody>                          ";

            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                htmlCode += "<tr><td colspan='9' >No Records Found</td></tr>";
            }
            for (var i = 0; i < ccd; i++) {
                htmlCode += "<tr>                                   "
                           + "        <td>" + data[i].category + "</td>       "
                           + "        <td>" + data[i].counterServing + "</td>                    "
                    + "        <td>" + data[i].ticketsWating + "</td>                    "
                           + "        <td>" + data[i].ticketsServed + "</td>                   "
                           + "        <td>" + data[i].avgWaitTime + "</td>             "
                           + "        <td>" + data[i].maxWaitTime + "</td>             "
                           + "        <td>" + data[i].targetWaitingTime + "</td>             "
                           + "        <td>" + data[i].avgServiceTime + "</td>             "
                           + "        <td>" + data[i].targetServiceTime + "</td>             "
                           + "    </tr>";
            }


            htmlCode += "</tbody></table>";

            $('#CategoryStatusDet').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetCategoryStatus");
        }
    });
}


function GetOperatorStatus(BranchId) {
    $.ajax({
        url: GetOperatorStatusURL, //"RealTime/GetOperatorStatus",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                     "
                          + " <thead>                                 "
                          + "     <tr>                                "
                          + "         <th>Employee ID</th>            "
                          + "         <th>Name</th>                   "
                          + "         <th>Operator Status</th>        "
                          + "         <th>Counter No.</th>            "
                          + "         <th>Now Serving</th>         "
                         // + "         <th>Current Time</th>           "
                          + "         <th>Tickets Served</th>         "
                          + "         <th>Avg Service Time</th>       "
                          + "         <th>Total Time Logged</th>      "
                          + "         <th>% Time In Serving</th>      "
                          + "         <th>% Time In Backend</th>      "
                         + "         <th>% Time In Idle</th>         "
                          + "     </tr>                               "
                          + " </thead>                                "
                          + " <tbody>                                 ";
            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                htmlCode += "<tr><td colspan='11' >No Records Found</td></tr>";
            }
            for (var i = 0; i < ccd; i++) {
                htmlCode += "<tr>                                "
                           + "        <td>" + data[i].userId + "</td>      "
                    + '       <td><a style="cursor: pointer;"  onclick="EditUserBind(' + data[i].userId + ');GetOpSummery(' + data[i].userId + ');GetOpSummeryTtlTick(' + data[i].userId + ')">' + data[i].userName + '</a></td>  '
                           + "        <td>" + data[i].status + "</td>            "
                           + "        <td>" + data[i].counterNo + "</td>   "
                           + "        <td>" + data[i].nowServing + "</td>   "
                          // +"        <td>00:00:03</td>           "
                           + "        <td>" + data[i].totalTickets + "</td> "
                           + "        <td>" + data[i].avgServiceTime + "</td>           "
                           + "        <td>" + data[i].totalLogedInTime + "</td>           "
                           + "        <td>97.78%</td>             "
                           + "        <td>0.00%</td>              "
                    + "        <td>0.00%</td>              "
                    + '                <td style="display:none;">                  '
                    + '                    <ul>              '
                    + '                        <li><a onclick="EditUserBind(' + data[i].userId + ');GetOpSummery(' + data[i].userId + ');GetOpSummeryTtlTick(' + data[i].userId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                    + '                        <li style="display:none;"><a href="#" id="EditUserBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                    + '                    </ul>     '
                    + '                </td>         '
                           + "    </tr>";
            }


            htmlCode += "</tbody></table>";

            $('#OperatorStatusDet').empty().append(htmlCode);
            //$("#TicketsIssued").append(data.totalTicketsIssued);
            //$("#TicketsServed").append(data.totalTicketsServed);
            //$("#Ticketswaiting").append(data.totalTicketsWaiting);
        },
        error: function (e) {
            alert("GetOperatorStatus");
        }
    });
}




function GetBranchSummary(BranchId) {
    $.ajax({
        url: GetBranchSummaryURL,//"RealTime/GetBranchSummary",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                       "
                       + "  <thead>                                     "
                       + "      <tr>                                    "
                       + "          <th>Tickets Issued</th>             "
                       //+ "          <th>Ticket Transferred</th>         "
                       + "          <th>Tickets Served</th>             "
                       + "          <th>Tickets No Show</th>            "
                      // + "          <th>Cancelled Tickets</th>          "
                       + "          <th>Tickets Waiting</th>             "
                       + "          <th>Tickets In Serving</th>         "
                       + "          <th>Total Counter</th>              "
                       + "          <th>Active Counters</th>            "
                       + "          <th>Avg Service Time </th>          "
                       + "          <th>Avg Wait Time </th>             "
                       + "          <th>Max Service Time </th>          "
                       + "          <th>Max Wait Time </th>             "
                       + "      </tr>                                   "
                       + "  </thead>                                    "
                       + "  <tbody>                                     "
                       + "      <tr>                                    "
                       + "          <td>" + data.ticketsIssued + "</td>    "
                       //+ "          <td>" + data.ticketsTransferred + "</td>  "
                       + "          <td>" + data.ticketsServed + "</td>         "
                       + "          <td>" + data.ticketsNoShow + "</td>         "
                       //+ "          <td>" + "not" + "</td>                    "
                + "          <td>" + data.ticketsWating + "</td>         "
                       + "          <td>" + data.ticketsServing + "</td>        "
                       + "          <td>" + data.totalCounter + "</td>          "
                       + "          <td>" + data.totalActiveCounter + "</td>    "
                       + "          <td>" + data.avgServiceTime + "</td>                   "
                       + "          <td>" + data.avgWaitTime + "</td>                   "
                       + "          <td>" + data.maxServiceTime + "</td>                   "
                       + "          <td>" + data.maxWaitTime + "</td>                   "
                       + "      </tr>                                   "
                       + "  </tbody>                                    "
                        + " </table>";

            $('#BranchSummaryDet').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetBranchSummary");
        }
    });
}


function GetDocumentDetails(BranchId) {
    $.ajax({
        url: GetDocumentDetailsURL, //"RealTime/GetWatingTickets",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            //var htmlCode = "";
            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                var className = $('#doca').attr('class').split(' ').join(' ')
                //$("#docg")[0].click();
                if (className == "box box-solid") {
                    //$("#docg")[0].click();
                }
            }
            else {
            }

            var  htmlCode = "<table class='table'>                    "
                    + "    <thead>                            "
                    + "        <tr>                           "
                    + "            <th>Document ID</th>     "
                    + "            <th>Ticket ID</th>          "
                    + "            <th>Ticket No</th>          "
                    + "            <th>Document No</th>       "
                    + "            <th>Added Date</th>       "
                    + "            <th>Added Time</th>       "
                    + "            <th>Category</th>       "
                    + "            <th>Deed No</th>       "
                    + "            <th>Status</th>       "
                    + "        </tr>                          "
                    + "    </thead>                           "
                    + "    <tbody>";

                var ccd = Object.keys(data).length;
            if (ccd == 0) {
                //var className = $('#doca').attr('class').split(' ').join(' ')
                ////$("#docg")[0].click();
                //if (className == "box box-solid") {
                //    $("#docg")[0].click();
                //}
                htmlCode += "<tr><td colspan='9' >No Records Found</td></tr>";

            }
            //else {
            //    var className = $('#doca').attr('class').split(' ').join(' ')
            //    //$("#docg")[0].click();
            //    if (className == "box box-solid collapsed-box") {
            //        $("#docg")[0].click();
            //    }

            //}

                for (var i = 0; i < ccd; i++) {
                    htmlCode += "<tr>                                   "
                        + "        <td>" + data[i].id + "</td>       "
                        + "        <td>" + data[i].ticketId + "</td>                    "
                        + "        <td>" + data[i].ticketNo + "</td>                    "
                        + "        <td>" + data[i].documentNo + "</td>                    "
                        + "        <td>" + data[i].addedDate + "</td>                    "
                        + "        <td>" + data[i].addedTime + "</td>                    "
                        + "        <td>" + data[i].category + "</td>                    "
                        + "        <td>" + data[i].deedNo + "</td>                    "
                        + "        <td>" + data[i].status + "</td>                    "
                        + "    </tr>";
                }


                htmlCode += "</tbody></table>";

            $('#GetDocumentDetailsDet').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetDocumentDetails");
        }
    });
}


function EmptyDocExpnd(BranchId) {
    $.ajax({
        url: GetDocumentDetailsURL, //"RealTime/GetWatingTickets",
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                var className = $('#doca').attr('class').split(' ').join(' ')
                //$("#docg")[0].click();
                if (className == "box box-solid") {
                    $("#docg")[0].click();
                }
            }
            else { }
          
        },
        error: function (e) {
            alert("GetDocumentDetails");
        }
    });
}


function GetAllRegionCounteryLocalReginArea() {
    $.ajax({
        url: GetAllRegionCounteryLocalReginAreaURL,
        data: {
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = "<b>Select Branch :</b><select id='BranchIdCommon' onchange='selectBranchDothis()'>";

            for (var i = 0; i < data.length; i++) {
                if (localStorage.getItem("selectBranch") == data[i].branchId) {
                    htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
                }
                else {
                    htmlCode += "<option value='" + data[i].branchId + "'>" + data[i].branch + "</option>";
                }
            }
            htmlCode += "</select>";
            $('#RegionCounteryLocalReginAreaDropdownDiv').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetAllBranchBranchesByRegionId");
        }
    });
}




