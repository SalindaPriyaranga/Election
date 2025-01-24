$(document).ready(function () {
    $.ajaxSetup({ async: false });
    LoadAllFeedbackModels();
    $(".FbManagementmenu").addClass("active");
    //$(".createFeedbackModel").addClass("active");


    //GetAllRegionCounteryLocalReginArea();
   

    $('#FeedbackSaveBtn').click(function () {
        SaveFeedbackModel();
    });
    $('#FbEditBtn').click(function () {
        EditFb();
    });

    //$('#BranchIdCommon').change(function () {
    //    LoadAllUsers();
    //});

    //LoadAllUsers();
    //loadCountryDropDown();
});

//function selectBranchDothis() {
//    LoadAllUsers();
//}


function EditFbBind(Id) {
    $.ajax({
        url: GetFbBIdURL,
        data: {
         Id: Id
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#nameEdit').val(data.Name);
            $('#displaynameEdit').val(data.DisplayName);
            //$('#responseEdit').val(data.Response);
            $('#rplaceholderEdit').val(data.ResponsePlaceHolder);
            $('#ImgNameEdit').val(data.ImageURL);
            if (data.Response == 1) {
                $('#responseEdit').prop('checked', true);
            }
            else {
                $('#responseEdit').prop('checked', false);
            }

            $("#UserImgEdit").attr('src', 'data:image/jpg;base64,' + data.ImageURL64String + '');

          
        },
        error: function (e) {
            alert("Edit Feedback Model Bind Failed");
        }
    });


    $('#EditFbBindBtn').click();
}

function LoadAllFeedbackModels() {
    //var BranchId = $('#BranchIdCommon').val();
    var catGroupTable = '<table class="table">                '
                        + '  <thead>                          '
                        + '      <tr>                         '
                        + '          <th>ID</th>              '
                        + '          <th>Name</th>            '
                        + '          <th>Display Name</th>           '
                        + '          <th>Response Holder</th>          '
                        + '          <th>Image</th>          '
                        + '          <th>Action</th>          '
                        + '      </tr>                        '
                        + '  </thead>                         '
                        + '  <tbody>                          ';

    $.ajax({
        url: GetAllFeedbacksURL,
        data: {
          Id:1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                catGroupTable += '<tr>                       '
                    + '                <td>' + data[i].Id + '</td>      '
                    + '                <td>' + data[i].Name + '</td>      '
                    + '                <td>' + data[i].DisplayName + '</td>      '
                    + '                <td>' + data[i].ResponsePlaceHolder + '</td>     '
                    + '                <td><img src="data:image/jpg;base64, ' + data[i].ImageURL64String + '"  width="30px" height="30px"></td>     '
                    + '                <td>                  '
                    + '                    <ul>              '
                    + '                        <li><a onclick="EditFbBind(' + data[i].Id + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                    + '                        <li style="display:none;"><a href="#" id="EditFbBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
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

    $('#LoadFeedbackTableDiv').empty().append(catGroupTable);
    $('.table').DataTable();
}

function SaveFeedbackModel() {

    //var BranchId = $('#BranchIdCommon').val();
    //var userId = $('#userId').val();
    var name = $('#name').val();
    var displayname = $('#displayname').val();
    var rplaceholder = $('#rplaceholder').val();
    var ImgName = $('#ImgName').val();
  

    var response = 0;
    if ($('#response').is(":checked")) {
        response = 1;
    }
    var isValid = true;
    var Msge = "";
    if (name == null || name == "") {
        isValid = false;
        Msge += "name is empty! ";
    }
    if (displayname == null || displayname == "") {
        isValid = false;
        Msge += "displayname is empty! ";
    }
    if (rplaceholder == null || rplaceholder == "") {
        isValid = false;
        Msge += "rplaceholder is empty! ";
    }
    

    var DataString = JSON.stringify({
        Name: name,
        DisplayName: displayname,
        Response: response,
        ResponsePlaceHolder: rplaceholder,
        ImageURL: ImgName
       
    });

    if (isValid) {
        $.ajax({
            url: SaveFeedbackURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                $('#ImageUploadBtn').click();
                //LoadAllUsers();
                $(function () {
                    function show_popup() {
                        $('#UserSaveCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                });
            },
            error: function (e) {
                alert("Save Category Failed");
            }
        });
        $(document).ready(function () {
            $('.table').DataTable();
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}



function EditFb() {
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
        userImgName : userImgName,
        employeeNumber:employeeNumber,
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