$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RegionMenu").addClass("active");
    $(".createAreaMenu").addClass("active");
//
//    $('#AreaSaveBtn').click(function () {
////        SaveArea();
//    });
//    $('#AreaEditBtn').click(function () {
////        EditArea();
//    });
//
//    LoadAllArea();
//    LoadLocalRegionDropdown();
});


function LoadLocalRegionDropdown() {
    $.ajax({
        url: LoadGlobalRegionByParentUrl,
        data: {
            Parent: 0,
            type: -3
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="branchLocalRegion" onchange="" class="addClassdropdown">';
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
            }
            htmlTag += '</select>';

            $('#branchLocalRegionDiv').empty().append(htmlTag);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

function EditAreaBind(RegionId) {
    $.ajax({
        url: GetBranchByBranchIdURL,
        data: {
            BranchId: RegionId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#AreaId').val(data.branchId);
            $('#AreaCodeEdit').val(data.branchCode);
            $('#AreaNameEdit').val(data.branch);

            $('#areaCreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#areaModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);


            if (data.isAct == 1) {
                $('#AreaActiveEdit').prop('checked', true);
            }
            else {
                $('#AreaActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("Edit branch Bind Failed");
        }
    });
    $('#EditAreaBindBtn').click();
}

function LoadAllArea() {
    clearAreaForm();
    var catGroupTable = '<table class="table">              '
                       + '    <thead>                       '
                       + '        <tr>                      '
                       + '            <th>Code</th>         '
                       + '            <th>Area Name</th>    '
                       + '            <th>Status</th>       '
                       + '            <th>Action</th>       '
                       + '        </tr>                     '
                       + '    </thead>                      '
                       + '    <tbody>                       ';

    $.ajax({
        url: GetAllRegionsByLevelURL,
        data: {
            branchLevel: -4
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                catGroupTable += '<tr>                       '
                   + '                <td>' + data[i].branchCode + '</td>      '
                   + '                <td>' + data[i].branch + '</td>      '
                   + '                <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                   + '                <td>                  '
                   + '                    <ul>              '
                   + '                        <li><a onclick="EditAreaBind(' + data[i].branchId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li style="display:none;"><a href="#" id="EditAreaBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                   + '                    </ul>     '
                   + '                </td>         '
                   + '            </tr>           ';
            }
        },
        error: function (e) {
            alert("Faileddd");
        }
    });

    catGroupTable += '</tbody></table>';

    $('#LoadAreaTableDiv').empty().append(catGroupTable);
    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function SaveArea() {
    var AreaCode = $('#AreaCode').val();
    var AreaName = $('#AreaName').val();
    var branchLocalRegion = $('#branchLocalRegion').val();
    if (branchLocalRegion == null || branchLocalRegion == ""){
        branchLocalRegion = 0;
    }
    var AreaActive = 0;
    if ($('#AreaActive').is(":checked")) {
        AreaActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (AreaCode == null || AreaCode == "") {
        isValid = false;
        Msge += "Area code is empty! ";
    }
    if (AreaName == null || AreaName == "") {
        isValid = false;
        Msge += "AreaName is empty! ";
    }


    var DataString = JSON.stringify({
        BranchCode: AreaCode,
        Branch: AreaName,
        branchLevel: -4,
        isAct: AreaActive,
        parentBranchId: branchLocalRegion
    });

    if (isValid) {
        $.ajax({
            url: SaveLocalRegionsURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllArea();
                ClickBtnUsingId('AreaSaveCancelBtn');
            },
            error: function (e) {
                alert("Save Failed");
            }
        });
    }
    else
    {
        ShowErrorMsge(Msge);
    }

    $(document).ready(function () {
        $('.table').DataTable();
    });
}


function clearAreaForm() {
    $('#AreaCodeEdit').val('');
    $('#AreaId').val('');
    $('#AreaNameEdit').val('');
    $('#AreaCode').val('');
    $('#AreaName').val('');
}


function EditArea() {
    var AreaCode = $('#AreaCodeEdit').val();
    var AreaId = $('#AreaId').val();
    var AreaName = $('#AreaNameEdit').val();

    var AreaActive = 0;
    if ($('#AreaActiveEdit').is(":checked")) {
        AreaActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (AreaCode == null || AreaCode == "") {
        isValid = false;
        Msge += "Area code is empty! ";
    }
    if (AreaName == null || AreaName == "") {
        isValid = false;
        Msge += "AreaName is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: AreaCode,
        BranchId: AreaId,
        Branch: AreaName,
        branchLevel: -4,
        isAct: AreaActive
    });

    if (isValid) {
        $.ajax({
            url: EditLocalRegionsURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllArea();
                ClickBtnUsingId('AreaEditCancelBtn');
            },
            error: function (e) {
                alert("Edit region Failed");
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