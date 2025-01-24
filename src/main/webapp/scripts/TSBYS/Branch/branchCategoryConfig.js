$(document).ready(function () {
    $(".BranchMangmtMenu").addClass("active");
    $(".createBranchCategoryMenu").addClass("active");
    $.ajaxSetup({ async: false });
    GetAllBranchBranchesByRegionId();
    LoadcategoryMas();
    LoadBranchcategory();
    LoadcategoryGroupMas();
    LoadBranchCategoryGroup();
    loadBranchCategoryTable();

});

function selectBranchDothis() {
    loadBranchCategoryTable();
    LoadBranchCategoryGroup();
    LoadcategoryGroupMas();
    LoadBranchcategory();
}

function updateBranchCategory(GroupLevel) {
    var branchId = $('#BranchIdCommon').val();
    var carMasId = 0;
    var categoryId = 0;
    var CategoryDefaultEndTicket = "";
    var CategoryDefaultStartTicket = "";
    var CategoryWaitTime = "";
    var CategoryServiceTime = "";
    var CatGroupIsActive = 0;

    if (GroupLevel == 0) {
        carMasId = $('#carMasIdEdit').val();
        CategoryDefaultEndTicket = $('#CategoryDefaultEndTicketEdit').val();
        CategoryDefaultStartTicket = $('#CategoryDefaultStartTicketEdit').val();
        CategoryWaitTime = $('#CategoryWaitTimeEdit').val(); 
        CategoryServiceTime = $('#CategoryServiceTimeEdit').val();
        categoryId = $('#branchCategoryEditId').val();

        if ($('#CategoryIsActiveEdit').is(":checked")) {
            CatGroupIsActive = 1;
        }
    } else {
        carMasId = $('#catGroupMasIdEdit').val();
        CategoryDefaultEndTicket = $('#CategoryGroupDefaultEndTicketEdit').val();
        CategoryDefaultStartTicket = $('#CategoryGroupDefaultStartTicketEdit').val();
        CategoryWaitTime = $('#CategoryGroupWaitTimeEdit').val();
        CategoryServiceTime = $('#CategoryGroupServiceTimeEdit').val();

        categoryId = $('#branchCategoryGroupEditId').val();

        if ($('#CategoryGroupIsActiveEdit').is(":checked")) {
            CatGroupIsActive = 1;
        }

    }

    if (CategoryDefaultStartTicket == null || CategoryDefaultStartTicket == "") {
        CategoryDefaultStartTicket = 0;
    }
    if (CategoryDefaultEndTicket == null || CategoryDefaultEndTicket == "") {
        CategoryDefaultEndTicket = 0;
    }


    $.ajax({
        url: checkTicketRangeUrl,
        data: {
            CategoryDefaultStartTicket: CategoryDefaultStartTicket,
            CategoryDefaultEndTicket: CategoryDefaultEndTicket,
            branchId: branchId,
            carMasId: carMasId,
            GroupLevel: GroupLevel,
            isNew:0
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            console.log(data);
            if (data.data == true || data.message == true) {
                var isValid = true;
                var Msge = "";

                var DataString = JSON.stringify({
                    BranchId: branchId,
                    CategoryId: categoryId,
                    WaitTime: CategoryWaitTime,
                    ServiceTime: CategoryServiceTime,
                    NoRangeMin: CategoryDefaultStartTicket,
                    NoRangeMax: CategoryDefaultEndTicket,
                    isAct: CatGroupIsActive,
                    GroupLevel: GroupLevel
                });

                if (isValid) {
                    $.ajax({
                        url: updateBranchCategoryUrl,
                        data: {
                            DataString: DataString
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "Json",
                        success: function (data) {
                            loadBranchCategoryTable();
                            ShowSuccessMsge("Saved Success....");
                            $(function () {
                                function show_popup() {
                                    ShowErrorMsge(""); ShowSuccessMsge("");
                                    $('.SaveCancelBtn').click();
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
            }
            else {
                ShowErrorMsge(data.message);
                console.log("data.message: " + data.message);
            }
        },
        error: function (e) {
            console.log("Save Category Failed");
        }
    });
}

function EditCategoryBind(categoryId) {
    //alert(categoryId);
    $.ajax({
        url: getCategoryByIdUrl,
        data: {
            CategoryId: categoryId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            //alert(data.categoryId);
            if (data.groupLevel == 0) {
                
                $('#CategoryWaitTimeEdit').val(data.waitTime);
                $('#CategoryServiceTimeEdit').val(data.serviceTime);
                $('#CategoryDefaultStartTicketEdit').val(data.noRangeMin);
                $('#CategoryDefaultEndTicketEdit').val(data.noRangeMax);

                $('#branchCategoryEditId').val(data.categoryId);


                if (data.isAct == 1) {
                    $('#CategoryIsActiveEdit').prop('checked', true);
                }
                else {
                    $('#CategoryIsActiveEdit').prop('checked', false);
                }


                $('#CategoryCreatedUser').empty().append(data.addedUsername);
                $('#CategorymodifiedUsername').empty().append(data.modifiedUsername);

                $('#EditCategoryBindBtn').click();
            }
            else if (data.groupLevel == -1) {
                //
                $('#CategoryGroupWaitTimeEdit').val(data.waitTime);
                $('#CategoryGroupServiceTimeEdit').val(data.serviceTime);
                $('#CategoryGroupDefaultStartTicketEdit').val(data.noRangeMin);
                $('#CategoryGroupDefaultEndTicketEdit').val(data.noRangeMax);


                $('#branchCategoryGroupEditId').val(data.categoryId);


                if (data.isAct == 1) {
                    $('#CategoryGroupIsActiveEdit').prop('checked', true);
                }
                else {
                    $('#CategoryGroupIsActiveEdit').prop('checked', false);
                }


                $('#CategoryGroupCreatedUser').empty().append(data.addedUsername);
                $('#CategoryGroupmodifiedUsername').empty().append(data.modifiedUsername);
                $('#EditCategoryGroupBindBtn').click();
            }
            else {
                //$('#EditCategoryGroupBindBtn').click();
            }
        },
        error: function (e) {
            alert("Edit Category Bind");
        }
    });
}


function loadBranchCategoryTable() {
    var branchId = $('#BranchIdCommon').val();
    var catGroupTable = '<table class="table">                            '
                       + '  <thead>                                       '
                       + '      <tr>                                      '
                       + '          <th>#</th>                  '
                       + '          <th>Category Code</th>                '
                       + '          <th>Start Ticket</th>                '
                       + '          <th>End Ticket</th>           '
                       + '          <th>Wait Time Exceptions</th>         '
                       + '          <th>Service Time Exceptions</th>      '
                       + '          <th>Status</th>                       '
                       + '          <th>Action</th>                       '
                       + '      </tr>                                     '
                       + '  </thead>                                      '
                       + '  <tbody>';

    $.ajax({
        url: LoadAllBranchCategoryUrl,
        data: {
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                catGroupTable += '<tr>                       '
                   + '                <td>' + (i+1) + '</td>      '
                   + '                <td>' + data[i].categoryCode + '</td>      '
                   + '                <td>' + data[i].noRangeMin + '</td>      '
                   + '                <td>' + data[i].noRangeMax + '</td>      '
                   + '                <td>' + data[i].waitTime + '</td>          '
                   + '                <td>' + data[i].serviceTime + '</td>      '
                   + '                <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                   + '                <td>                  '
                   + '                    <ul>              '
                   + '                        <li><a onclick="EditCategoryBind(' + data[i].categoryId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li style="display:none;"><a href="#" id="EditCategoryBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li style="display:none;"><a href="#" id="EditCategoryGroupBindBtn" data-toggle="modal" data-target="#myModal22"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                   + '                    </ul>     '
                   + '                </td>         '
                   + '            </tr>           ';

                if (data[i].groupLevel == -1) {
                    $.ajax({
                        url: GetAllCategoryByGroupIdUrl,
                        data: {
                            catGroupId: data[i].categoryId
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "Json",
                        success: function (dataGroup) {
                            catGroupTable += '<tr style="background-color: #d4c9c9;"><td style="color:blue;"></td><td colspan="7" ><table style="width:50%;" class="table">                            '
                        + '  <thead style="background: -webkit-linear-gradient( -29deg, #0ea2d8 13%, #383535 70%);">                                       '
                        + '      <tr>                                      '
                        + '          <th>#</th>                  '
                        + '          <th>Category Code</th>                '
                        + '      </tr>                                     '
                        + '  </thead>                                      '
                        + '  <tbody>';
                            var ccd = Object.keys(dataGroup).length;
                            for (var j = 0; j< ccd; j++) {
                                catGroupTable += '<tr>                       '
                                   + '                <td>' + (j+1) + '</td>      '
                                   + '                <td>' + dataGroup[j].categoryCode + '</td>      '
                                   + '            </tr>           ';
                            }
                        },
                        error: function (e) {
                            alert("Category Load Failed!");
                        }
                    });
                    catGroupTable += '</tbody></table></td></tr>';
                }
            }
        },
        error: function (e) {
            alert("Category Load Failed!");
        }
    });
    catGroupTable += '</tbody></table>';
    $('.LoadCategoryTableDiv').empty().append(catGroupTable);

    $(document).ready(function () {
        $('.table').DataTable();
    });
}


function saveBranchCategoryGroupConfig() {
    var carMasId = $('#carMasId2').val();
    var branchId = $('#BranchIdCommon').val();
    var catGroupMasId = $('#catGroupMasId2').val();

    $.ajax({
        url: SaveBranchCategoryGroupConfigUrl,
        data: {
            branchId: branchId,
            carMasId: carMasId,
            catGroupMasId: catGroupMasId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            loadBranchCategoryTable();
            ShowSuccessMsge("Saved Success....");
            $(function () {
                function show_popup() {
                    ShowErrorMsge(""); ShowSuccessMsge("");
                    $('.SaveCancelBtn').click();
                };
                window.setTimeout(show_popup, 500);
            });
        },
        error: function (e) {
            alert("saveBranchCategoryGroupConfig");
        }
    });
}

function saveBranchCategory(GroupLevel) {
    var branchId = $('#BranchIdCommon').val();
    var carMasId = 0;
    var CategoryDefaultEndTicket = "";
    var CategoryDefaultStartTicket = "";
    var CategoryWaitTime = "";
    var CategoryServiceTime = "";
    var CatGroupIsActive = 0;

    if (GroupLevel == 0) {
        carMasId = $('#carMasId').val();
        CategoryDefaultEndTicket = $('#CategoryDefaultEndTicket').val();
        CategoryDefaultStartTicket = $('#CategoryDefaultStartTicket').val();
        CategoryWaitTime = $('#CategoryWaitTime').val();
        CategoryServiceTime = $('#CategoryServiceTime').val();

        if ($('#CategoryIsActive').is(":checked")) {
            CatGroupIsActive = 1;
        }
    } else {
        carMasId = $('#catGroupMasId').val();
        CategoryDefaultEndTicket = $('#CategoryGroupDefaultEndTicket').val();
        CategoryDefaultStartTicket = $('#CategoryGroupDefaultStartTicket').val();
        CategoryWaitTime = $('#CategoryGroupWaitTime').val();
        CategoryServiceTime = $('#CategoryGroupServiceTime').val();

        if ($('#CategoryGroupIsActive').is(":checked")) {
            CatGroupIsActive = 1;
        }

    }

    if(CategoryDefaultStartTicket == null || CategoryDefaultStartTicket == "") {
        CategoryDefaultStartTicket = 0;
    }
    if (CategoryDefaultEndTicket == null || CategoryDefaultEndTicket == "") {
        CategoryDefaultEndTicket = 0;
    }


    $.ajax({
        url: checkTicketRangeUrl,
        data: {
            CategoryDefaultStartTicket: CategoryDefaultStartTicket,
            CategoryDefaultEndTicket: CategoryDefaultEndTicket,
            branchId: branchId,
            carMasId: carMasId,
            GroupLevel: GroupLevel,
            isNew:1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            if (data.data == true || data.message == true) {
                var isValid = true;
                var Msge = "";

                var DataString = JSON.stringify({
                    BranchId: branchId,
                    CategoryId: carMasId,
                    WaitTime: CategoryWaitTime,
                    ServiceTime: CategoryServiceTime,
                    NoRangeMin: CategoryDefaultStartTicket,
                    NoRangeMax: CategoryDefaultEndTicket,
                    isAct: CatGroupIsActive,
                    GroupLevel: GroupLevel
                });

                if (isValid) {
                    $.ajax({
                        url: SaveBranchCategoryUrl,
                        data: {
                            DataString: DataString
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "Json",
                        success: function (data) {
                            loadBranchCategoryTable();
                            LoadBranchcategory();
                            LoadcategoryGroupMas();
                            LoadBranchCategoryGroup();
                            ShowSuccessMsge("Saved Success....");
                            $(function () {
                                function show_popup() {
                                    ShowErrorMsge(""); ShowSuccessMsge("");
                                    $('#branchCategorySaveCancelBtn').click();
                                    $('#branchGroupSaveCancelBtn').click();
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
            }
            else {
                ShowErrorMsge(data.message);
                console.log("data.message: " + data.message);
            }
        },
        error: function (e) {
            console.log("Save Category Failed");
        }
    });
}
function LoadcategoryGroupMas() {
    $.ajax({
        url: LoadAllCategoryUrl,
        data: {
            GroupLevel: -1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = "<select id='catGroupMasId'  class='addClassdropdown'>";
            var htmlCode2 = "<select id='catGroupMasIdEdit'  class='addClassdropdown'>";

            for (var i = 0 ; i < data.length ; i++) {
                htmlCode += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
                htmlCode2 += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
            }
            htmlCode += "</select>";
            htmlCode2 += "</select>";
            $('#categoryGroupSelectDiv').empty().append(htmlCode);
            $('#categoryGroupSelectDivEdit').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetAll category  GroupSelectDiv");
        }
    });
}

function LoadBranchCategoryGroup() {
    var branchId = $('#BranchIdCommon').val();
    $.ajax({
        url: LoadBranchCategoryGroupUrl,
        data: {
            GroupLevel: -1,
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode2 = "<select id='catGroupMasId2'  class='addClassdropdown'>";

            for (var i = 0 ; i < data.length ; i++) {
                htmlCode2 += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
            }
            htmlCode2 += "</select>";
            $('#categoryGroupSelectDiv2').empty().append(htmlCode2);
        },
        error: function (e) {
            alert("Get All category GroupS electD iv");
        }
    });
}


function LoadcategoryMas() {
    $.ajax({
        url: LoadAllCategoryUrl, 
        data: {
            GroupLevel: 0
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = "<select id='carMasId'  class='addClassdropdown'>";
            var htmlCode2 = "<select id='carMasIdEdit'  class='addClassdropdown'>";

            for (var i = 0 ; i < data.length ; i++) {
                htmlCode += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
                htmlCode2 += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
            }
            htmlCode += "</select>";
            htmlCode2 += "</select>";
            $('#categorySelectDiv').empty().append(htmlCode);
            $('#categorySelectDivEdit').empty().append(htmlCode2);
        },
        error: function (e) {
            alert("GetAllBranchBranchesByRegionId");
        }
    });

}


function LoadBranchcategory() {
    var branchId = $('#BranchIdCommon').val();
    $.ajax({
        url: LoadBranchCategoryGroupUrl,
        data: {
            GroupLevel: 0,
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode2 = "<select id='carMasId2'  class='addClassdropdown'>";

            for (var i = 0 ; i < data.length ; i++) {
                htmlCode2 += "<option class='form-control' value='" + data[i].categoryId + "'>" + data[i].category + "</option>";
            }
            htmlCode2 += "</select>";
            $('#categorySelectDiv2').empty().append(htmlCode2);
        },
        error: function (e) {
            alert("Load Branch category");
        }
    });

}