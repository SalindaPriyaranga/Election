$(document).ready(function () {
    $.ajaxSetup({ async: false });
    //loadBranchesTable();
    $(".branchSummaryMenu").addClass("active");

    GetAllRegionCounteryLocalReginArea();


    var BranchId1 = $('#BranchIdCommon').val();

    loadBranchesTable(BranchId1);

    window.setInterval(function () {
        BranchId1 = $('#BranchIdCommon').val();
        loadBranchesTable(BranchId1);
        //alert("ggx" + BranchId1);
    }, 10000);

  

    window.setInterval(function () {
        RefershBranchStatus();
    }, 60000);

   

});

function selectBranchDothis() {
    BranchId1 = $('#BranchIdCommon').val();
    loadBranchesTable(BranchId1);
    //RefershBranchStatus();
    //alert("anbhcdbhdhhcsdsbhdhbds");
    
}

function RefershBranchStatus() {
    console.log("Refresh started");
    $.ajax({
        url: refreshBranchesUrl,
        data: {
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            console.log("Refreshed");
        },
        error: function (e) {
            console.log("RefershBranchStatus failed");
        }
    });
}

function loadBranchesTable(BranchId) {
    $.ajax({
        url: GetAllBranchBranchesByRegionIdURLl,
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = '<table class="table">                    '
                          + '         <thead>                        '
                          + '             <tr>                       '
                          + '                 <td>Branch Code</td>         '
                          + '                 <td>Branch</td>         '
                          //+ '                 <td>Branch IP</td>         '
                          + '                 <td># Tellers</td>         '
                          + '                 <td># Kiosk</td>         '
                          + '                 <td># Main Display</td>         '
                          + '                 <td># Counters</td>         '
                          + '                 <td># Active Counters</td>         '
                          + '                 <td># Issued Ticktes</td>         '
                          + '                 <td># Served Tickets</td>         '
                          + '                 <td># Waiting Tickets</td>         '
                          + '                 <td># No-show Tickets</td>         '
                          + '                 <td>Status</td>         '
                          + '             </tr>                      '
                          + '         </thead>                       '
                          + '         <tbody>                        ';


            for (var i = 0 ; i < data.length ; i++) {
                htmlCode += '<tr>                           '
                    + '            <td><a href="' + data[i].RealTimeURL+'/RealTime/index?id=' + data[i].branchId + '">' + data[i].branchCode + '</a></td>  '
                               + '            <td>' + data[i].branch + '</td>   '
                               //+ '            <td>' + data[i].BranchIP + '</td>   '
                               + '            <td>' + data[i].noOgTellers + '</td>   '
                               + '            <td>' + data[i].noOfKiosks + '</td>   '
                               + '            <td>' + data[i].noOfMaindisplay + '</td>   '
                               + '            <td>' + data[i].totalCounters + '</td>   '
                               + '            <td>' + data[i].opnedCounters + '</td>   '
                               + '            <td>' + data[i].issuedTickets + '</td>   '
                               + '            <td>' + data[i].servedTickets + '</td> '
                               + '            <td>' + data[i].waitingTickets + '</td> '
                               + '            <td>' + data[i].noshowTickets + '</td> '
                               + '            <td>' + (data[i].isOnline == true ? '<img src="../Content/if_status_46254.ico" />' : '<img src="../Content/if_status-busy_46252.ico" />') + '</td> '
                               + '        </tr>               ';
            }
            htmlCode += '</tbody></table>';
            $('#branchesSummaryDet').empty().append(htmlCode);
        },
        error: function (e) {
            console.log("loadBranchesTable");
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
                     
                   //else if (data[i].branchLevel < 0) {
                   //     htmlCode += "<optgroup label='gayan'>"
                   //     htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
                   //     htmlCode += "</optgroup>"
                   // }
                }
                else {
                        htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
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