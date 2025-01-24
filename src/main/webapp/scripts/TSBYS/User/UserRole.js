$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".UserManagementmenuCreateUsers").addClass("active");




    $(".createUserRole").addClass("active");
    $(".createUser").removeClass("active");




    $('#UserRoleSaveBtn').click(function () {
        SaveUserRole();
        // alert("success");
    });

    $('#UserRoleEditBtn').click(function () {
        EditUser();
    });


    $('#BranchIdCommon').change(function () {

        LoadAllUsers();
    });

    $('#myModalLabel').click(function () {
     //   GetAllUserRoles();
        // alert("success");
    });
    //GetAllUserRoles();
    //  
//    LoadAllUsers();
});


function SaveUserRole() {

    var BranchId = $('#BranchIdCommon').val();

    var roleId = $('#roleId').val();

    var userType = $('#userType').val();


    var homeIsActive = 0;
    if ($('#home').is(":checked")) {
        homeIsActive = 1;
        // alert(homeIsActive);
    }
    var dashboardIsActive = 0;
    if ($('#dashboard').is(":checked")) {
        dashboardIsActive = 1;
    }
    var customerIsActive = 0;
    if ($('#customer').is(":checked")) {
        customerIsActive = 1;
    }
    var regionIsActive = 0;
    if ($('#region').is(":checked")) {
        regionIsActive = 1;
    }
    var categoryIsActive = 0;
    if ($('#category').is(":checked")) {
        categoryIsActive = 1;
    }
    var kioskIsActive = 0;
    if ($('#kiosk').is(":checked")) {
        kioskIsActive = 1;
    }
    var userIsActive = 0;
    if ($('#user').is(":checked")) {
        userIsActive = 1;
    }
    var branchIsActive = 0;
    if ($('#branch').is(":checked")) {
        branchIsActive = 1;
    }
    var branchSummeryIsActive = 0;
    if ($('#branchSummery').is(":checked")) {
        branchSummeryIsActive = 1;
    }
    var centralIsActive = 0;
    if ($('#centralReporting').is(":checked")) {
        centralIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (userType == null || userType == "") {
        isValid = false;
        Msge += "User Type is empty! ";
        //  alert("111");
    }
    if (roleId == null || roleId == "") {
        isValid = false;
        Msge += "Role ID is empty! ";
        // alert("222");
    }


    var DataString = JSON.stringify({
        branchId: BranchId,
        roleID: roleId,
        userType: userType,
        home: homeIsActive,
        dashboard: dashboardIsActive,
        customer: customerIsActive,
        region: regionIsActive,
        category: categoryIsActive,
        kiosk: kioskIsActive,
        user: userIsActive,
        branch: branchIsActive,
        branchSummery: branchSummeryIsActive,
        centralReporting: centralIsActive

    });

    if (isValid) {
       addUserRole();
        $(document).ready(function () {
            $('.table').DataTable();
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}


function LoadAllUsers() {
    var BranchId = $('#BranchIdCommon').val();
    var catGroupTable = '<table class="table">                '
        + '  <thead>                          '
        + '      <tr>                         '
        + '          <th>ID</th>              '
        + '          <th>User Type</th>            '
        + '          <th>Home</th>           '
        + '          <th>Dashboard</th>          '
        + '          <th>Customer</th>         '
        + '          <th>Region</th>          '
        + '          <th>Category</th>              '
        + '          <th>KIOSK</th>            '
        + '          <th>User</th>           '
        + '          <th>Branch</th>          '
        + '          <th>Branch Summery</th>         '
        + '          <th>Central Reporting</th>          '
        + '          <th>Action</th>          '
        + '      </tr>                        '
        + '  </thead>                         '
        + '  <tbody>                          ';

//    $.ajax({
//        url: GetAllUserRolesURL,
//        data: {
//            BranchId: BranchId
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            var ccd = Object.keys(data).length;
//            for (var i = 0; i < ccd; i++) {
//                catGroupTable += '<tr>                       '
//                    + '                <td>' + data[i].roleID + '</td>      '
//                    + '                <td>' + data[i].userType + '</td>      '
//                    + '                <td>' + (data[i].home == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].dashboard == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].customer == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].region == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].category == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].kiosk == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].user == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].branch == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].branchSummery == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>' + (data[i].centralReporting == 1 ? "Active" : "Inactive") + '</td>     '
//                    + '                <td>                  '
//                    + '                    <ul>              '
//                    + '                        <li><a ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
//                    + '                        <li style="display:none;"><a href="#" id="EditUserRoleBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
//                    + '                    </ul>     '
//                    + '                </td>         '
//                    + '            </tr>           ';
//            }
//
//        },
//        error: function (e) {
//            alert("users load ");
//        }
//    });

    catGroupTable += '</tbody></table>';

    $('#LoadUsersTableDiv').empty().append(catGroupTable);
    $('.table').DataTable();
}


function EditUserBind(RoleID) {
    $.ajax({
        url: GetUserRoleByUserIdURL,
        data: {
            RoleID: RoleID
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#roleIdEdit').val(data.roleID);
            $('#userTypeEdit').val(data.userType);

            //$('#userCreatedUser').empty().append(data.addedUsername + ", " + data.addedDtTime);
            //$('#userModifiedUser').empty().append(data.modifiedUsername + ", " + data.modifiedDtTime);

            if (data.home == 1) {
                $('#homeEdit').prop('checked', true);
            }
            else {
                $('#homeEdit').prop('checked', false);
            }

            if (data.dashboard == 1) {
                $('#dashboardEdit').prop('checked', true);
            }
            else {
                $('#dashboardEdit').prop('checked', false);
            }

            if (data.customer == 1) {
                $('#customerEdit').prop('checked', true);
            }
            else {
                $('#customerEdit').prop('checked', false);
            }

            if (data.region == 1) {
                $('#regionEdit').prop('checked', true);
            }
            else {
                $('#regionEdit').prop('checked', false);
            }

            if (data.category == 1) {
                $('#categoryEdit').prop('checked', true);
            }
            else {
                $('#categoryEdit').prop('checked', false);
            }

            if (data.kiosk == 1) {
                $('#kioskEdit').prop('checked', true);
            }
            else {
                $('#kioskEdit').prop('checked', false);
            }

            if (data.user == 1) {
                $('#userEdit').prop('checked', true);
            }
            else {
                $('#userEdit').prop('checked', false);
            }

            if (data.branch == 1) {
                $('#branchEdit').prop('checked', true);
            }
            else {
                $('#branchEdit').prop('checked', false);
            }

            if (data.branchSummery == 1) {
                $('#branchSummeryEdit').prop('checked', true);
            }
            else {
                $('#branchSummeryEdit').prop('checked', false);
            }

            if (data.centralReporting == 1) {
                $('#centralReportingEdit').prop('checked', true);
            }
            else {
                $('#centralReportingEdit').prop('checked', false);
            }



        },
        error: function (e) {
            alert("Edit User Bind Failed");
        }
    });


    $('#EditUserRoleBindBtn').click();
}

function EditUser() {
    var BranchId = $('#BranchIdCommon').val();

    var roleId = $('#roleIdEdit').val();

    var userType = $('#userTypeEdit').val();


    var homeIsActive = 0;
    if ($('#homeEdit').is(":checked")) {
        homeIsActive = 1;
        // alert(homeIsActive);
    }
    var dashboardIsActive = 0;
    if ($('#dashboardEdit').is(":checked")) {
        dashboardIsActive = 1;
    }
    var customerIsActive = 0;
    if ($('#customerEdit').is(":checked")) {
        customerIsActive = 1;
    }
    var regionIsActive = 0;
    if ($('#regionEdit').is(":checked")) {
        regionIsActive = 1;
    }
    var categoryIsActive = 0;
    if ($('#categoryEdit').is(":checked")) {
        categoryIsActive = 1;
    }
    var kioskIsActive = 0;
    if ($('#kioskEdit').is(":checked")) {
        kioskIsActive = 1;
    }
    var userIsActive = 0;
    if ($('#userEdit').is(":checked")) {
        userIsActive = 1;
    }
    var branchIsActive = 0;
    if ($('#branchEdit').is(":checked")) {
        branchIsActive = 1;
    }
    var branchSummeryIsActive = 0;
    if ($('#branchSummeryEdit').is(":checked")) {
        branchSummeryIsActive = 1;
    }
    var centralIsActive = 0;
    if ($('#centralReportingEdit').is(":checked")) {
        centralIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (userType == null || userType == "") {
        isValid = false;
        Msge += "User Type is empty! ";
        //  alert("111");
    }
    if (roleId == null || roleId == "") {
        isValid = false;
        Msge += "Role ID is empty! ";
        // alert("222");
    }

    var DataString = JSON.stringify({
        branchId: BranchId,
        roleID: roleId,
        userType: userType,
        home: homeIsActive,
        dashboard: dashboardIsActive,
        customer: customerIsActive,
        region: regionIsActive,
        category: categoryIsActive,
        kiosk: kioskIsActive,
        user: userIsActive,
        branch: branchIsActive,
        branchSummery: branchSummeryIsActive,
        centralReporting: centralIsActive
    });

    if (isValid) {
        $.ajax({
            url: EditUserRolesURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");

                LoadAllUsers();
                $(function () {
                    function show_popup() {
                        $('#UserRoleEditCancleBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("Edit user Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }


}



//load user roles when creating a user
//function GetAllUserRoles() {
//    $.ajax({
//        url: GetAllUserRolesURL, //"/user/GetAllUserRoles",
//        data: {
//            BranchId: BranchId
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            var htmlTag = '<select id="userType" onchange="" class="addClassdropdown">';
//            for (var i = 0; i < data.length; i++) {
//                htmlTag += '<option type="text" class="form-control" value="' + data[i].roleID + '">' + data[i].userType + '</option>'
//            }
//            htmlTag += '</select>';
//
//            $('#userRolesDropDown').empty().append(htmlTag);
//        },
//        error: function (e) {
//            alert("GetAllBranchBranchesByRegionId");
//        }
//    });
//}