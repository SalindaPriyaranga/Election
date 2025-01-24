$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".CategoryManagementMenu").addClass("active");
    $(".CategoryManagementCategoryMenu").addClass("active");

    $('#CategorySaveBtn').click(function () {
        SaveCategory();
    });
    $('#CategoryEditBtn').click(function () {
        EditCategory();
    });

    LoadAllCategory();
});

function EditCategoryBind(CategoryId) {
    $('#CatGroupCodeEditCategoryId').val(CategoryId);
    $.ajax({
        url: EditCategoryBindUrl, 
        data: {
            CategoryId: CategoryId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#CategoryIDEdit').val(data.categoryId);
            $('#CategoryCodeEdit').val(data.categoryCode);
            $('#ShortCategoryNameEdit').val(data.categoryShotName);
            $('#CategoryNameEdit').val(data.category);
            $('#CategoryWaitTimeEdit').val(data.waitTime);
            $('#CategoryServiceTimeEdit').val(data.serviceTime);
            $('#CategoryDefaultStartTicketEdit').val(data.noRangeMin);
            $('#CategoryDefaultEndTicketEdit').val(data.noRangeMax);
            $('#CategoryAutoTransferCatEdit').val(data.categoryAutoTransferCat);
            $('#CategoryCreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#CategorymodifiedUsername').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);

            if (data.isAct == 1) {
                $('#CategoryIsActiveEdit').prop('checked', true);
            }
            else {
                $('#CategoryIsActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("Edit Category Bind Failed");
        }
    });
    $('#EditCategoryBindBtn').click();
}

function LoadAllCategory() {
    var catGroupTable = '<table class="table">                            '
                       + '  <thead>                                       '
                       + '      <tr>                                      '
                       + '          <th>Category ID</th>                  '
                       + '          <th>Category Code</th>                '
                       + '          <th>Category Name</th>                '
                       + '          <th>Sort Category Name</th>           '
                       + '          <th>Wait Time Exceptions</th>         '
                       + '          <th>Service Time Exceptions</th>      '
                       + '          <th>Status</th>                       '
                       + '          <th>Action</th>                       '
                       + '      </tr>                                     '
                       + '  </thead>                                      '
                       + '  <tbody>';

    $.ajax({
        url: LoadAllCategoryUrl ,
        data: {
            GroupLevel: 0
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                catGroupTable += '<tr>                       '
                   + '                <td>' + data[i].categoryId + '</td>      '
                   + '                <td>' + data[i].categoryCode + '</td>      '
                   + '                <td>' + data[i].category + '</td>      '
                   + '                <td>' + data[i].categoryShotName + '</td>      '
                   + '                <td>' + data[i].waitTime + '</td>          '
                   + '                <td>' + data[i].serviceTime + '</td>      '
                   + '                <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                   + '                <td>                  '
                   + '                    <ul>              '
                   + '                        <li><a onclick="EditCategoryBind(' + data[i].categoryId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li style="display:none;"><a href="#" id="EditCategoryBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                   + '                    </ul>     '
                   + '                </td>         '
                   + '            </tr>           ';
            }
        },
        error: function (e) {
            alert("Category Load Failed!");
        }
    });
    catGroupTable += '</tbody></table>';
    $('#LoadCategoryTableDiv').empty().append(catGroupTable);

}

function ClearCategoryAddForm() {
    $('#CategoryCode').val('');
    $('#ShortCategoryName').val('');
    $('#CategoryName').val('');
    $('#CategoryWaitTime').val('');
    $('#CategoryServiceTime').val('');
    $('#CategoryDefaultStartTicket').val('');
    $('#CategoryDefaultEndTicket').val('');
    $('#CategoryAutoTransferCat').val('');
    $('#CategoryIsActiveEdit').prop('checked', false);
}
function ClearCategoryEditForm() {
    $('#CategoryIDEdit').val('');
    $('#CategoryCodeEdit').val('');
    $('#ShortCategoryNameEdit').val('');
    $('#CategoryNameEdit').val('');
    $('#CategoryWaitTimeEdit').val('');
    $('#CategoryServiceTimeEdit').val('');
    $('#CategoryDefaultStartTicketEdit').val('');
    $('#CategoryDefaultEndTicketEdit').val('');
    $('#CategoryAutoTransferCatEdit').val('');
    $('#CategoryIsActiveEdit').prop('checked', false);
}
function SaveCategory() {
    var CategoryId = 0;
    var CategoryCode = $('#CategoryCode').val();
    var CategoryName = $('#CategoryName').val();
    var ShortCategoryName = $('#ShortCategoryName').val();
    var CategoryWaitTime = $('#CategoryWaitTime').val();
    var CategoryServiceTime = $('#CategoryServiceTime').val();
    var CategoryDefaultStartTicket = $('#CategoryDefaultStartTicket').val();
    var CategoryDefaultEndTicket = $('#CategoryDefaultEndTicket').val();
    var CategoryAutoTransferCat = $('#CategoryAutoTransferCat').val();
    var CatGroupIsActive = 0; 
    if ($('#CategoryIsActive').is(":checked")) {
        CatGroupIsActive = 1;
    }

    if (CategoryDefaultStartTicket == null || CategoryDefaultStartTicket == "") {
        CategoryDefaultStartTicket = 0;
    }
    if (CategoryDefaultEndTicket == null || CategoryDefaultEndTicket == "") {
        CategoryDefaultEndTicket = 0;
    }

    var isValid = true;
    var Msge = "";
    if (CategoryCode == null || CategoryCode == "") {
        isValid = false;
        Msge += "Category Code is empty! ";
    }
    if (CategoryName == null || CategoryName == "") {
        isValid = false;
        Msge += "Category Name is empty! ";
    }
    if (ShortCategoryName == null || ShortCategoryName == "") {
        isValid = false;
        Msge += "Short Category Name is empty! ";
    }
    var DataString = JSON.stringify({
        CategoryId: CategoryId,
        CategoryCode: CategoryCode,
        Category: CategoryName,
        CategoryShotName: ShortCategoryName,
        WaitTime: CategoryWaitTime,
        ServiceTime: CategoryServiceTime,
        NoRangeMin: CategoryDefaultStartTicket,
        NoRangeMax: CategoryDefaultEndTicket,
        CategoryAutoTransferCat: CategoryAutoTransferCat,
        isAct: CatGroupIsActive,
        GroupLevel: 0
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
                ClearCategoryAddForm();
                ShowSuccessMsge("Saved Success....");
                LoadAllCategory();
                $(function () {
                    function show_popup() {
                        $('#CategorySaveCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("Save Category Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
    $(document).ready(function () {
        $('.table').DataTable();
    });
}



function EditCategory() {
    var CategoryId = $('#CategoryIDEdit').val();
    var CategoryCode = $('#CategoryCodeEdit').val();
    var CategoryName = $('#CategoryNameEdit').val();
    var ShortCategoryName = $('#ShortCategoryNameEdit').val();
    var CategoryWaitTime = $('#CategoryWaitTimeEdit').val();
    var CategoryServiceTime = $('#CategoryServiceTimeEdit').val();
    var CategoryDefaultStartTicket = $('#CategoryDefaultStartTicketEdit').val();
    var CategoryDefaultEndTicket = $('#CategoryDefaultEndTicketEdit').val();
    var CategoryAutoTransferCat = $('#CategoryAutoTransferCatEdit').val();
    var CatGroupIsActive = 0;
    if ($('#CategoryIsActiveEdit').is(":checked")) {
        CatGroupIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (CategoryCode == null || CategoryCode == "") {
        isValid = false;
        Msge += "Category Code is empty! ";
    }
    if (CategoryName == null || CategoryName == "") {
        isValid = false;
        Msge += "Category Name is empty! ";
    }
    if (ShortCategoryName == null || ShortCategoryName == "") {
        isValid = false;
        Msge += "Short Category Name is empty! ";
    }
    $('#ErrorMsge').empty().append(Msge);

    var DataString = JSON.stringify({
        CategoryId: CategoryId,
        CategoryCode: CategoryCode,
        Category: CategoryName,
        CategoryShotName: ShortCategoryName,
        WaitTime: CategoryWaitTime,
        ServiceTime: CategoryServiceTime,
        NoRangeMin: CategoryDefaultStartTicket,
        NoRangeMax: CategoryDefaultEndTicket,
        CategoryAutoTransferCat: CategoryAutoTransferCat,
        isAct: CatGroupIsActive,
        GroupLevel: 0
    });

    if (isValid) {
        $.ajax({
            url: EditCategoryUrl, //"/Category/EditCategory",
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllCategory();
                $(function () {
                    function show_popup() {
                        $('#CategoryEditCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("EditCategory Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
    $(document).ready(function () {
        $('.table').DataTable();
    });

}