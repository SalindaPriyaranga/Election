$(document).ready(function () {
    $(".BranchMangmtMenu").addClass("active");
    $(".addTellersMenu").addClass("active");
    $.ajaxSetup({ async: false });
    GetAllBranchBranchesByRegionId();
    LoadAllUsers();
    loadTellerDropDown();
});

function selectBranchDothis() {
    LoadAllUsers();
}

function loadTellerDropDown() {
    $.ajax({
        url: GetAllTellersURL,
        data: {
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmldrop = "<select id='BranchUserId'  class='addClassdropdown'>";
            for (var i = 0 ; i < data.length; i++) {
                htmldrop += "<option value='" + data[i].userId + "'>" + data[i].employeeNumber + " </option>";
            }
            htmldrop += "</select>";
            $('#tellerDropdownDiv').empty().append(htmldrop);
        },
        error: function (e) {
            alert("users load ");
        }
    });
}

function LoadAllUsers() {
    var BranchId = $('#BranchIdCommon').val();
    var catGroupTable = '<table class="table">                '
                        + '  <thead>                          '
                        + '      <tr>                         '
                        + '          <th>ID</th>              '
                        + '          <th>Name</th>            '
                        + '          <th>Group</th>           '
                        + '          <th>Status</th>          '
                        + '          <th>Picture</th>         '
                        + '          <th>Action</th>          '
                        + '      </tr>                        '
                        + '  </thead>                         '
                        + '  <tbody>                          ';

    $.ajax({
        url: GetAllUsersURL,
        data: {
            BranchId: BranchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                if (data[i].userType == "Teller") {
                    catGroupTable += '<tr>                       '
                       + '                <td>' + (i+1) + '</td>      '
                       + '                <td>' + data[i].username + '</td>      '
                       + '                <td>' + data[i].userType + '</td>      '
                       + '                <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                       + '                <td><img src="data:image/jpg;base64, ' + data[i].userImg64String + '"  width="30px" height="30px"></td>     '
                       + '                <td>                  '
                       + '                    <ul>              '
                       + '                        <li><a onclick="EditUserBind(' + data[i].userId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                       + '                        <li style="display:none;"><a href="#" id="EditUserBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                       + '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                       + '                    </ul>     '
                       + '                </td>         '
                       + '            </tr>           ';
                }
            }
        },
        error: function (e) {
            alert("users load ");
        }
    });

    catGroupTable += '</tbody></table>';

    $('#LoadUsersTableDiv').empty().append(catGroupTable);
    $('.table').DataTable();
}

function SaveTellers() {
    var BranchId = $('#BranchIdCommon').val();
    var username = $('#username').val();
    var firstname = $('#firstname').val();
    var password = $('#password').val();
    var userType = 'Teller';
    var BranchUserId = $('#BranchUserId').val();

    var userIsActive = 0;
    if ($('#userIsActive').is(":checked")) {
        userIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    
    var DataString = JSON.stringify({
        userId: BranchUserId,
        userId1: BranchUserId,
        username: username,
        password: password,
        userType: userType,
        branchId: BranchId,
        firstname: firstname,
        isAct: userIsActive
    });

    if (isValid) {
        $.ajax({
            url: SaveUsersURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                LoadAllUsers();
                $(function () {
                    function show_popup() {
                        $('#tellerSaveCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                });
            },
            error: function (e) {
                alert("Save Category Failed");
            }
        });
        $('.table').DataTable();
    }
    else {
        ShowErrorMsge(Msge);
    }
}