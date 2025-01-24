$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RealtimePage").addClass("active");


    GetAllRegionCounteryLocalReginArea();

 
});


//function GetAllRegionCounteryLocalReginArea() {
//    $.ajax({
//        url: GetAllRegionCounteryLocalReginAreaURL,
//        data: {
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            var htmlCode = "<b>Select Branch :</b><select id='BranchIdCommon' onchange='selectBranchDothis()'>";

//            for (var i = 0; i < data.length; i++) {
//                if (localStorage.getItem("selectBranch") == data[i].branchId) {
//                    htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
//                }
//                else {
//                    htmlCode += "<option value='" + data[i].branchId + "'>" + data[i].branch + "</option>";
//                }
//            }
//            htmlCode += "</select>";
//            $('#RegionCounteryLocalReginAreaDropdownDiv').empty().append(htmlCode);
//        },
//        error: function (e) {
//            alert("GetAllBranchBranchesByRegionId");
//        }
//    });
//}




function EditUserBind(UserId) {
    $.ajax({
        url: GetUserByUserIdURL,
        data: {
            UserId: UserId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#userIdEdit').val(data.userId);
            $('#usernameEdit').val(data.username);
            $('#usernameEdita').val(data.username);
            document.getElementById("usernameEdita1").innerHTML = data.username;
            //document.getElementById("useIddis").innerHTML = data.userId;
            $('#userTypeEdit').val(data.userType);
            $('#passwordEdit').val(data.password);
            $('#ConfirmasswordEdit').val(data.password);
            $('#userImgNameEdit').val(data.userImgName);
            $('#employeeNumberEdit').val(data.employeeNumber);


            $('#userCreatedUser').empty().append(data.addedUsername + ", " + data.addedDtTime);
            $('#userModifiedUser').empty().append(data.modifiedUsername + ", " + data.modifiedDtTime);

            $("#UserImgEdit").attr('src', 'data:image/jpg;base64,' + data.userImg64String + '');

            if (data.isAct == 1) {
                $('#userIsActiveEdit').prop('checked', true);
            }
            else {
                $('#userIsActiveEdit').prop('checked', false);
            }

        },
        error: function (e) {
            alert("Edit User Bind Failed");
        }
    });


    $('#EditUserBindBtn').click();
}




function GetOpSummery(userId) {
    $.ajax({
        url: GetOpStatusURL, //"RealTime/GetOpSummery",
        data: {
            userId: userId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                     "
                + " <thead>                                 "
                + "     <tr>                                "
                + "         <th>Day</th>            "
                + "         <th>Week</th>                   "
                + "         <th>Month</th>        "
                + "         <th>Year</th>            "
                + "     </tr>                               "
                + " </thead>                                "
                + " <tbody>                                 ";
            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                htmlCode += "<tr><td colspan='4' >No Records Found</td></tr>";
            }
            for (var i = 0; i < ccd; i++) {
                htmlCode += "<tr>                                "
                    + "        <td>" + data[i].avgServiceTime + "</td>      "
                    + "        <td>" + data[i].avgServiceTimewk + "</td>            "
                    + "        <td>" + data[i].avgServiceTimemnth + "</td>   "
                    + "        <td>" + data[i].avgServiceTimeyr + "</td>   "
                    + "    </tr>";
            }


            htmlCode += "</tbody></table>";

            $('#OpStatusDet').empty().append(htmlCode);
            //$("#TicketsIssued").append(data.totalTicketsIssued);
            //$("#TicketsServed").append(data.totalTicketsServed);
            //$("#Ticketswaiting").append(data.totalTicketsWaiting);
        },
        error: function (e) {
            alert("GetOpStatus");
        }
    });
   
}

function GetOpSummeryTtlTick(userId) {
    $.ajax({
        url: GetOpStatusURL, //"RealTime/GetOpSummery",
        data: {
            userId: userId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {

            var htmlCode = "<table class='table'>                     "
                + " <thead>                                 "
                + "     <tr>                                "
                + "         <th>Day</th>            "
                + "         <th>Week</th>                   "
                + "         <th>Month</th>        "
                + "         <th>Year</th>            "
                + "     </tr>                               "
                + " </thead>                                "
                + " <tbody>                                 ";
            var ccd = Object.keys(data).length;
            if (ccd == 0) {
                htmlCode += "<tr><td colspan='4' >No Records Found</td></tr>";
            }
            for (var i = 0; i < ccd; i++) {
                htmlCode += "<tr>                                "
                    + "        <td>" + data[i].totalTickets + "</td>      "
                    + "        <td>" + data[i].totalTicketsWk + "</td>            "
                    + "        <td>" + data[i].totalTicketsMnth + "</td>   "
                    + "        <td>" + data[i].totalTicketsYr + "</td>   "
                    + "    </tr>";
            }


            htmlCode += "</tbody></table>";

            $('#OpTtlTckDet').empty().append(htmlCode);
            //$("#TicketsIssued").append(data.totalTicketsIssued);
            //$("#TicketsServed").append(data.totalTicketsServed);
            //$("#Ticketswaiting").append(data.totalTicketsWaiting);
        },
        error: function (e) {
            alert("GetOpStatusTtlTck");
        }
    });

}