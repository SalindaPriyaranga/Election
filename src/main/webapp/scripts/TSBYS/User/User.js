$(document).ready(function () {
    $.ajaxSetup({async: false});
    $(".UserManagementmenu").addClass("active");
    $(".UserManagementmenuCreateUsers").addClass("active");


    GetAllRegionCounteryLocalReginArea();


    $('#UserSaveBtn').click(function () {
        SaveUser();
    });
    $('#UserEditBtn').click(function () {
        EditUser();
    });

    $('#BranchIdCommon').change(function () {
        LoadAllUsers();
    });

    LoadAllUsers();
    loadCountryDropDown();
});

function selectBranchDothis() {
    LoadAllUsers();
}

//function GetAllRegionCounteryLocalReginArea() {
//    $.ajax({
//        url: GetAllRegionCounteryLocalReginAreaURL,
//        data: {
//        },
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        success: function (data) {
//            var htmlCode = "<b>Select Branch :</b><select id='BranchIdCommon' onchange='selectBranch()'>";

//            for (var i = 0 ; i < data.length ; i++) {
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


function loadCountryDropDown() {
    $.ajax({
        url: LoadGlobalRegionByParentUrl,
        data: {
            Parent: 0,
            type: -2
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="branchCountry" onchange="" class="addClassdropdown">';
            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
            }
            htmlTag += '</select>';

            $('#CountryDropDownDiv').empty().append(htmlTag);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

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
            } else {
                $('#userIsActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("Edit User Bind Failed");
        }
    });


    $('#EditUserBindBtn').click();
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
                catGroupTable += '<tr>                       '
                        + '                <td>' + data[i].employeeNumber + '</td>      '
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
        },
        error: function (e) {
            alert("users load ");
        }
    });

    catGroupTable += '</tbody></table>';

    $('#LoadUsersTableDiv').empty().append(catGroupTable);
    $('.table').DataTable();
}

function SaveUser() {
    var BranchId = $('#BranchIdCommon').val();
    var userId = $('#userId').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var Confirmassword = $('#Confirmassword').val();
    var userType = $('#userType').val();
    var employeeNumber = $('#employeeNumber').val();
    var userImgName = $('#userImgName').val();

    var userIsActive = 0;
    if ($('#userIsActive').is(":checked")) {
        userIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (username === null || username === "") {
        isValid = false;
        Msge += "username is empty! ";
    }
    if (password == null || password == "") {
        isValid = false;
        Msge += "password is empty! ";
    }
    if (employeeNumber == null || employeeNumber == "") {
        isValid = false;
        Msge += "Employee Number is empty! ";
    }
    if (Confirmassword != password) {
        isValid = false;
        Msge += "password does not match! ";
    }

//    var DataString = JSON.stringify({
//        username: username,
//        password: password,
//        userType: userType,
//        branchId: BranchId,
//        userImgName: userImgName,
//        employeeNumber: employeeNumber,
//        isAct: userIsActive
//    });

    if (!isValid) {
            alert("sss");
        // alert("sss"+Msge);
        //swal('Alert!',Msge, 'error');
//        $.ajax({
//            url: SaveUsersURL,
//            data: {
//                DataString: DataString
//            },
//            contentType: "application/json; charset=utf-8",
//            dataType: "Json",
//            success: function (data) {
//                ShowSuccessMsge("Saved Success....");
//                $('#userImageUploadBtn').click();
//                LoadAllUsers();
//                $(function () {
//                    function show_popup() {
//                        $('#UserSaveCancelBtn').click();
//                    };
//                    window.setTimeout(show_popup, 500); // 5 seconds
//                });
//            },
//            error: function (e) {
//                alert("Save Category Failed");
//            }
//        });
//        $(document).ready(function () {
//            $('.table').DataTable();
//        });
//    }
//    else {
        ShowErrorMsge(Msge);
//         $(function () {
//                    function show_popup() {
//                        $('#UserSaveCancelBtn').click();
//                    };
//                    window.setTimeout(show_popup,15000); // 5 seconds
//                });
    } else {
    alert("aaa");

        addNew2();
    }
}



function EditUser() {
    var BranchId = $('#BranchIdCommon').val();
    var userId = $('#userIdEdit').val();
    var username = $('#usernameEdit').val();
    var password = $('#passwordEdit').val();
    var Confirmassword = $('#ConfirmasswordEdit').val();
    var userType = $('#userTypeEdit').val();
    var employeeNumber = $('#employeeNumberEdit').val();
    var userImgName = $('#userImgNameEdit').val();

    var userIsActive = 0;
    if ($('#userIsActiveEdit').is(":checked")) {
        userIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (username == null || username == "") {
        isValid = false;
        Msge += "username is empty! ";
    }
    if (userId == null || userId == "") {
        isValid = false;
        Msge += "userId is empty! ";
    }
    if (employeeNumber == null || employeeNumber == "") {
        isValid = false;
        Msge += "Employee Number empty! ";
    }
    if (password == null || password == "") {
        isValid = false;
        Msge += "password is empty! ";
    }
    if (Confirmassword != password) {
        isValid = false;
        Msge += "password does not match! ";
    }

    var DataString = JSON.stringify({
        userId: userId,
        userId1: userId,
        username: username,
        password: password,
        userType: userType,
        branchId: BranchId,
        userImgName: userImgName,
        employeeNumber: employeeNumber,
        isAct: userIsActive
    });

    if (isValid) {
        $.ajax({
            url: EditUsersURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                $('#userImageUploadBtnEdit').click();
                LoadAllUsers();
                $(function () {
                    function show_popup() {
                        $('#UserEditCancleBtn').click();
                    }
                    ;
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("Edit user Failed");
            }
        });
    } else {
        ShowErrorMsge(Msge);
    }


}