$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RegionMenu").addClass("active");
    $(".createGlobalRegionMenu").addClass("active");
//
//    $('#SaveGlobalRegionBtn').click(function () {
////        SaveGlobalRegion();
//    });
//
//    $('#EditGlobalRegionSaveBtn').click(function () {
////        EditGlobalRegionGroup();
//    });

//    LoadAllGlobalRegion();

});

function EditGlobalRegionBind(branchId) {
    $.ajax({
        url: GetBranchByBranchIdUrl,
        data: {
            BranchId: branchId
        },

        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#branchIdEdit').val(data.branchId);
            $('#RegGlobalRegionCodeEdit').val(data.branchCode);
            $('#RegGlobalRegionNameEdit').val(data.branch);


            $('#GlblRegioncreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#GlblRegionModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);


            if (data.isAct == 1) {
                $('#RegGlobalIsActiveEdit').prop('checked', true);
            }
            else {
                $('#RegGlobalIsActiveEdit').prop('checked', false);
            }
        },

        error: function (e) {
        }
    });
    $('#EditGlobalRegionBindBtn').click();
}

function LoadAllGlobalRegion() {
    var htmltable = '<table class="table">                                                                                                                                                '
                   + '        <thead>                                                                                                                                                     '
                   + '            <tr>                                                                                                                                                    '
                   + '                <th>Code</th>                                                                                                                                       '
                   + '                <th>Global Region Name</th>                                                                                                                         '
                   + '                <th>Status</th>                                                                                                                                     '
                   + '                <th>Action</th>                                                                                                                                     '
                   + '            </tr>                                                                                                                                                   '
                   + '        </thead>                                                                                                                                                    '
                   + '        <tbody> ';

    $.ajax({
        url: LoadAllGlobalRegionUrl,// "Region/GetAllRegions",

        data: {
            branchLevel: -1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                htmltable += '<tr>'
                               + '                <td>' + data[i].branchCode + '</td>'
                               + '                <td>' + data[i].branch + '</td>    '
                               + '                  <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                               + '                <td>                                                                                                                                                '
                               + '                    <ul>                                                                                                                                            '
                               + ' <li><a onclick="EditGlobalRegionBind(' + data[i].branchId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                                    '
                               + '                        <li style="display:none;"><a id="EditGlobalRegionBindBtn"href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                '
                               + '                        <li>\n\
                                    <a  href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>                                                      '
                               + '                    </ul>                                                                                                                                           '
                               + '                </td>                                                                                                                                               '
                               + '                </ul>                                                                                                                                               '
                               + '            </tr> ';
            }
        },
        error: function (e) {
            alert("Global Region load Failed");
        }
    });

    htmltable += '</tbody></table>';

    $('#LoadGlobalRegionTableDiv').empty().append(htmltable);

    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function SaveGlobalRegion() {
    var RegGlobalRegionCode = $('#RegGlobalRegionCode').val();
    var RegGlobalRegionName = $('#RegGlobalRegionName').val();
    var RegGlobalIsActive = 0;
    if ($('#RegGlobalIsActive').is(":checked")) {
        RegGlobalIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (RegGlobalRegionCode == null || RegGlobalRegionCode == "") {
        isValid = false;
        Msge += "Global Region Code is empty! ";
    }
    if (RegGlobalRegionName == null || RegGlobalRegionName == "") {
        isValid = false;
        Msge += "Global Region Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: RegGlobalRegionCode,
        Branch: RegGlobalRegionName,
        isAct: RegGlobalIsActive,
        branchLevel : -1
    });

    if (isValid) {
        $.ajax({
            url: SaveGlobalRegionUrl,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");

                LoadAllGlobalRegion();
                $(function () {
                    function show_popup() {
                        $('#SaveCancelGlobalRegionBtn').click();
                    };

                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {

            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}

function EditGlobalRegionGroup() {
    var BranchId = $('#branchIdEdit').val();
    var RegGlobalRegionCode = $('#RegGlobalRegionCodeEdit').val();
    var RegGlobalRegionName = $('#RegGlobalRegionNameEdit').val();
    var RegGlobalIsActive = 0;
    if ($('#RegGlobalIsActiveEdit').is(":checked")) {
        RegGlobalIsActive = 1;
    }

    var isValid = true;
    var Msge = "";
    if (RegGlobalRegionCode == null || RegGlobalRegionCode == "") {
        isValid = false;
        Msge += "Global Region Code empty! ";
    }
    if (RegGlobalRegionName == null || RegGlobalRegionName == "") {
        isValid = false;
        Msge += "Global Region Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: RegGlobalRegionCode,
        Branch: RegGlobalRegionName,
        BranchId: BranchId,
        isAct: RegGlobalIsActive,
        branchLevel: -1
    });

    if (isValid) {
        $.ajax({
            url: EditGlobalRegionUrl,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllGlobalRegion();
                $(function () {
                    function show_popup() {
                        $('#CancelGlobalRegionBtnEdit').click();
                    };
                    window.setTimeout(show_popup, 500);
                });
            },

            error: function (e) {
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}