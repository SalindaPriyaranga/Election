$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".CategoryManagementMenu").addClass("active");
    $(".CategoryManagementSubGroupMenu").addClass("active");


    $('#SaveCategorySubGroupBtn').click(function () {
        SaveCategorySubGroup();
    });
    $('#EditCategorySubGroupBtn').click(function () {
        EditCategorySubGroup();
    });

    LoadAllCategorySubGroup();
});

function EditSubGroupBind(CategoryId) {
    $('#CatGroupCodeEditCategoryId').val(CategoryId);
    $.ajax({
        url: EditCategoryBindUrl, //"/Category/GetCategoryByCategoryId",
        data: {
            CategoryId: CategoryId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#CatSubGroupCodeEditCategoryId').val(data.categoryId);
            $('#CatSubGroupCodeEdit').val(data.categoryCode);
            $('#CatSubShortGroupCodeEdit').val(data.categoryShotName);
            $('#CatSubGroupNameEdit').val(data.category);

            $('#catSubcreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#catSubModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);


            if (data.isAct == 1) {
                $('#CatSubGroupIsActiveEdit').prop('checked', true);
            }
            else {
                $('#CatSubGroupIsActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("EditSubGroupBind Failed");
        }
    });
    $('#EditSubGroupBindBtn').click();
}

function LoadAllCategorySubGroup() {
    var catGroupTable = '<table class="table">                   '
                        + '    <thead>                           '
                        + '        <tr>                          '
                        + '            <th>Sub Grp Code</th>     '
                        + '            <th>Short Group Code</th> '
                        + '            <th>Group Name</th>       '
                        + '            <th>Status</th>           '
                        + '            <th>Action</th>           '
                        + '        </tr>                         '
                        + '    </thead>                          '
                        + '    <tbody>';


    $.ajax({
        url: LoadAllCategoryUrl,
        data: {
            GroupLevel: -2
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                catGroupTable += '<tr>                               '
                          + '          <td>' + data[i].categoryCode + '</td>            '
                          + '          <td>' + data[i].categoryShotName + '</td>                  '
                          + '          <td>' + data[i].category + '</td>           '
                          + '          <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>              '
                          + '          <td>                           '
                          + '              <ul>                       '
                          + '                        <li><a onclick="EditSubGroupBind(' + data[i].categoryId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                          + '                  <li style="display:none;"><a id="EditSubGroupBindBtn" href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                          + '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                          + '              </ul>     '
                          + '          </td>         '
                          + '          </ul>         '
                          + '      </tr>';
            }
        },
        error: function (e) {
            alert("Load All Category Sub Group Failed");
        }
    });

    catGroupTable += '</tbody></table>';

    $('#LoadCatSubGroupTableDiv').empty().append(catGroupTable);
    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function SaveCategorySubGroup() {
    var CatGroupCode = $('#CatSubGroupCode').val();
    var CatShortGroupCode = $('#CatShortSubGroupCode').val();
    var CatGroupName = $('#CatSubGroupName').val();
    var CatGroupIsActive = 0;
    if ($('#CatSubGroupIsActive').is(":checked")) {
        CatGroupIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (CatGroupCode == null || CatGroupCode == "") {
        isValid = false;
        Msge += "Sub Group Code is empty! ";
    }
    if (CatShortGroupCode == null || CatShortGroupCode == "") {
        isValid = false;
        Msge += "Sub Group short Code is empty! ";
    }
    if (CatGroupName == null || CatGroupName == "") {
        isValid = false;
        Msge += "Sub Group name is empty! ";
    }
    var DataString = JSON.stringify({
        Category: CatGroupName,
        CategoryCode: CatGroupCode,
        CategoryShotName: CatShortGroupCode,
        isAct: CatGroupIsActive,
        GroupLevel: -2
    });

    if (isValid) {
        $.ajax({
            url: SaveCategoryUrl, //"/Category/SaveCategory",
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllCategorySubGroup();
                clearFeild();
                $(function () {
                    function show_popup() {
                        $('#CancelCategorySubGroupBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("SaveCategoryGroup Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}

function clearFeild() {
    $('#CatSubGroupCode').val('');
    $('#CatShortSubGroupCode').val('');
    $('#CatSubGroupName').val('');
}


function EditCategorySubGroup() {
    var CatGroupCode = $('#CatSubGroupCodeEdit').val();
    var CatShortGroupCode = $('#CatSubShortGroupCodeEdit').val();
    var CatGroupName = $('#CatSubGroupNameEdit').val();
    var CatGroupCodeEditCategoryId = $('#CatSubGroupCodeEditCategoryId').val();
    var CatGroupIsActive = 0;
    if ($('#CatSubGroupIsActiveEdit').is(":checked")) {
        CatGroupIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (CatGroupCode == null || CatGroupCode == "") {
        isValid = false;
        Msge += "Sub Group Code is empty! ";
    }
    if (CatShortGroupCode == null || CatShortGroupCode == "") {
        isValid = false;
        Msge += "Sub Group short Code is empty! ";
    }
    if (CatGroupName == null || CatGroupName == "") {
        isValid = false;
        Msge += "Sub Group name is empty! ";
    }
    
    var DataString = JSON.stringify({
        Category: CatGroupName,
        CategoryId: CatGroupCodeEditCategoryId,
        CategoryCode: CatGroupCode,
        CategoryShotName: CatShortGroupCode,
        isAct: CatGroupIsActive,
        GroupLevel: -2
    });

    if (isValid) {
        $.ajax({
            url: EditCategoryUrl, // "/Category/EditCategory",
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllCategorySubGroup();
                $(function () {
                    function show_popup() {
                        $('#CancelCategorySubGroupBtnEdit').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("Edit Category Sub Group Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}