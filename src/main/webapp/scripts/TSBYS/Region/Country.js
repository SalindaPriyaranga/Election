$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".RegionMenu").addClass("active");
    $(".createCountryMenu").addClass("active");

//    $('#SaveCountryBtn').click(function () {
//        Savecountry();
//    });
//
//    $('#EditRegionCountrySaveBtn').click(function () {
//        EditCountry();
//    });
//    LoadAllRegionCountry();
//    LoadGlobalRegionDropDown();
});

function LoadGlobalRegionDropDown() {
    $.ajax({
        url: LoadGlobalRegionByParentUrl,
        data: {
            Parent: 0,
            type: -1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="branchGlobalRegion" onchange="" class="addClassdropdown">';
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
            }
            htmlTag += '</select>';

            $('#branchGlobalRegionDiv').empty().append(htmlTag);
        },
        error: function (e) {
            alert("LoadGlobalRegionDropDown failed");
        }
    });
}

function EditCountryBind(branchId) {
    $.ajax({
        url: GetBranchByBranchIdUrl,
        data: {
            BranchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#branchIdEdit').val(data.branchId);
            $('#RegCountryCodeEdit').val(data.branchCode);
            $('#RegCountryNameEdit').val(data.branch);


            $('#countryCreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#countryModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);




            if (data.isAct == 1) {
                $('#RegCountryIsActiveEdit').prop('checked', true);
            }
            else {
                $('#RegCountryIsActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {
            alert("Edit Country Bind Failed");
        }
    });

    $('#EditCountryBindBtn').click();
}

function LoadAllRegionCountry() {
    var htmltable = '<table class="table">                                                                                                                                                '
                      + '        <thead>                                                                                                                                                     '
                      + '            <tr>                                                                                                                                                    '
                      + '                <th>Country Code</th>                                                                                                                                       '
                      + '                <th>Country Name</th>                                                                                                                         '
                      + '                <th>Status</th>                                                                                                                                     '
                      + '                <th>Action</th>                                                                                                                                     '
                      + '            </tr>                                                                                                                                                   '
                      + '        </thead>                                                                                                                                                    '
                      + '        <tbody> ';

    $.ajax({
        url: LoadAllRegionCountryURL,

        data: {
            branchLevel: -2
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
                               + ' <li><a onclick="EditCountryBind(' + data[i].branchId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                                    '
                               + '                        <li style="display:none;"><a id="EditCountryBindBtn"href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                '
                               + '                        <li><a  href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>                                                      '
                               + '                    </ul>                                                                                                                                           '
                               + '                </td>                                                                                                                                               '
                               + '                </ul>                                                                                                                                               '
                               + '            </tr> ';
            }
        },

        error: function (e) {
            alert("Country load Failed")
        }
    });

    htmltable += '</tbody></table>';
    $('#LoadRegionCountryTableDiv').empty().append(htmltable);

    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function Savecountry() {
    var RegCountryCode = $('#RegCountryCode').val();
    var RegCountryName = $('#RegCountryName').val();
    var branchGlobalRegion = $('#branchGlobalRegion').val();
    if (branchGlobalRegion == null || branchGlobalRegion == "") {
        branchGlobalRegion = 0;
    }
    var RegCountryIsActive = 0;
    if ($('#RegGlobalIsActive').is(":checked")) {
        RegCountryIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (RegCountryCode == null || RegCountryCode == "") {
        isValid = false;
        Msge += " Region Country Code is empty! ";
    }
    if (RegCountryName == null || RegCountryName == "") {
        isValid = false;
        Msge += " Region Country Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: RegCountryCode,
        Branch: RegCountryName,
        isAct: RegCountryIsActive,
        branchLevel: -2,
        parentBranchId: branchGlobalRegion
    });
    if (isValid) {
        $.ajax({
            url: SavecountryUrl, //"/Region/SaveRegion",
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllRegionCountry();
                $(function () {
                    function show_popup() {
                        $('#cancelCountryBtn').click();
                    };

                    window.setTimeout(show_popup, 500);
                });
            },
            error: function (e) {

            }
        });
    }
    else
    {
        ShowErrorMsge(Msge);
    }
}

function EditCountry() {
    var BranchId = $('#branchIdEdit').val();
    var RegCountryCode = $('#RegCountryCodeEdit').val();
    var RegCountryName = $('#RegCountryNameEdit').val();
    var RegCountryIsActive = 0;
    if ($('#RegCountryIsActiveEdit').is(":checked")) {
        RegCountryIsActive = 1;
    }

    var isValid = true;
    var Msge = "";
    if (RegCountryCode == null || RegCountryCode == "") {
        isValid = false;
        Msge += "Global Region Code empty! ";
    }

    if (RegCountryName == null || RegCountryName == "") {
        isValid = false;
        Msge += "Global Region Name is empty! ";
    }

    var DataString = JSON.stringify({
        BranchCode: RegCountryCode,
        Branch: RegCountryName,
        BranchId: BranchId,
        isAct: RegCountryIsActive,
        branchLevel: -2
    });

    if (isValid) {
        $.ajax({
            url: EditCountryUrl, //"/Region/EditRegion",
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                LoadAllRegionCountry();
                $(function () {
                    function show_popup() {
                        $('#cancelEditCountryBtn').click();
                    };
                    window.setTimeout(show_popup, 500);
                    // 5 seconds
                });
            },

            error: function (e) {
                alert("Failed");
            }
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}








