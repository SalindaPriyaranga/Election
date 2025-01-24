$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RegionMenu").addClass("active");
    $(".createLocalRegionMenu").addClass("active");


//    $('#LocalRegionSaveBtn').click(function () {
//        SaveLocalRegion();
//    });
//    $('#LocalRegionEditBtn').click(function () {
//        EditLocalRegion();
//    });
//
//    LoadAllLocalRegion();
//    loadCountryDropDown();
});


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
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
            }
            htmlTag += '</select>';

            $('#branchCountryDiv').empty().append(htmlTag);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

function EditLocalRegionBind(RegionId) {
    $.ajax({
        url: GetBranchByBranchIdURL,
        data: {
            BranchId: RegionId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#LocalRegionId').val(data.branchId);
            $('#LocalRegionCodeEdit').val(data.branchCode);
            $('#LocalRegionNameEdit').val(data.branch);

            $('#localRegionCreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#localRegionModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);



            if (data.isAct == 1) {
                $('#LocalRegionActiveEdit').prop('checked', true);
            }
            else {
                $('#LocalRegionActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("Edit branch Bind Failed");
        }
    });


    $('#EditLocalRegionBindBtn').click();
}

function LoadAllLocalRegion() {
    var catGroupTable = '<table class="table">                             '
                       + '    <thead>                                      '
                       + '        <tr>                                     '
                       + '            <th>Code</th>                        '
                       + '            <th>Local Region Name</th>           '
                       + '            <th>Status</th>                      '
                       + '            <th>Action</th>                      '
                       + '        </tr>                                    '
                       + '    </thead>                                     '
                       + '    <tbody>                                      ';

    $.ajax({
        url: GetAllRegionsByLevelURL,
        data: {
            branchLevel: -3
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
                   + '                        <li><a onclick="EditLocalRegionBind(' + data[i].branchId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                   + '                        <li style="display:none;"><a href="#" id="EditLocalRegionBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
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

    $('#LoadLocalRegionTableDiv').empty().append(catGroupTable);
    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function SaveLocalRegion() {
    var LocalRegionCode = $('#LocalRegionCode').val();
    var LocalRegionName = $('#LocalRegionName').val();
    var branchCountry = $('#branchCountry').val();
    if (branchCountry == null || branchCountry == "") {
        branchCountry = 0;
    }
    var LocalRegionActive = 0;
    if ($('#LocalRegionActive').is(":checked")) {
        LocalRegionActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (LocalRegionCode == null || LocalRegionCode == "") {
        isValid = false;
        Msge += "Local Region Code is empty! ";
    }
    if (LocalRegionName == null || LocalRegionName == "") {
        isValid = false;
        Msge += "Local Region Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: LocalRegionCode,
        Branch: LocalRegionName,
        branchLevel: -3,
        isAct: LocalRegionActive,
        parentBranchId: branchCountry
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
                LoadAllLocalRegion();
                $(function () {
                    function show_popup() {
                        $('#LocalRegionSaveCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {
                alert("Save Failed");
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



function EditLocalRegion() {
    var LocalRegionCode = $('#LocalRegionCodeEdit').val();
    var LocalRegionId = $('#LocalRegionId').val();
    var LocalRegionName = $('#LocalRegionNameEdit').val();

    var LocalRegionActive = 0;
    if ($('#LocalRegionActiveEdit').is(":checked")) {
        LocalRegionActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (LocalRegionCode == null || LocalRegionCode == "") {
        isValid = false;
        Msge += "Local Region Code is empty! ";
    }
    if (LocalRegionName == null || LocalRegionName == "") {
        isValid = false;
        Msge += "Local Region Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: LocalRegionCode,
        BranchId: LocalRegionId,
        Branch: LocalRegionName,
        branchLevel: -3,
        isAct: LocalRegionActive
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
                LoadAllLocalRegion();
                $(function () {
                    function show_popup() {
                        $('#LocalRegionEditCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
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