$(document).ready(function () {
    getAllBranches();
    $(".BranchMangmtMenu").addClass("active");
    $(".addBranchMenu").addClass("active");

    LoadGlobalRegionDropDown();
    globalChanged();
    LoadLocalRegionDropdown();
    LoadbranchAreaDropdown();
});



function EditBranch() {
    var branchId = $('#BranchIdEdit').val();
    var branchName = $('#branchNameEdit').val();
    var branchCode = $('#branchCodeEdit').val();
    var branchGlobalRegion = $('#branchGlobalRegionEdit').val();
    var branchCountry = $('#branchCountryEdit').val();
    var branchLocalRegion = $('#branchLocalRegionEdit').val();
    var branchArea = $('#branchAreaEdit').val();
    var branchAddress = $('#branchAddressEdit').val();
    var branchContactNumber = $('#branchContactNumberEdit').val();
    var branchEmail = $('#branchEmailEdit').val();
    var branchLocationLong = $('#branchLocationLongEdit').val();
    var branchLocationLat = $('#branchLocationLatEdit').val();
    var branchAvgWaitingTime = $('#branchAvgWaitingTimeEdit').val();
    var branchAvgServingTime = $('#branchAvgServingTimeEdit').val();
    var branchIP = $('#branchIPEdit').val();
    var syncPort = $('#syncPortEdit').val();
    var seatingCapacity = $('#seatingCapacityEdit').val();
    if (seatingCapacity == null || seatingCapacity == "") {
        seatingCapacity = 0;
    }
    var BranchIsActive = 0;
    if ($('#BranchIsActiveEdit').is(":checked")) {
        BranchIsActive = 1;
    }

    var isValid = true;
    var Msge = "<ul>";

    if (branchName == null || branchName == "") {
        isValid = false;
        Msge += "<li>Branch Name is empty!</li>";
    }
    if (branchCode == null || branchCode == "") {
        isValid = false;
        Msge += "<li>Branch Code is empty!</li>";
    }
    if (branchIP == null || branchIP == "") {
        isValid = false;
        Msge += "<li>Branch ip is empty!</li>";
    }

    Msge += "</ul>";
    var DataString = JSON.stringify({
        branchId: branchId,
        branch: branchName,
        branchCode: branchCode,
        branchGlobalRegion: branchGlobalRegion,
        branchCountry: branchCountry,
        branchLocalRegion: branchLocalRegion,
        branchAreaId: branchArea,
        branchAddress: branchAddress,
        Telephone1: branchContactNumber,
        Email1: branchEmail,
        branchLocationLong: branchLocationLong,
        branchLocationLat: branchLocationLat,
        branchAvgWaitingTime: branchAvgWaitingTime,
        branchAvgServingTime: branchAvgServingTime,
        isAct: BranchIsActive,
        Level: 0,
        BranchIP: branchIP,
        SyncPort: syncPort,
        seatingCapacity: seatingCapacity
    });

    if (isValid) {
        $.ajax({
            url: EditBranchUrl,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                getAllBranches();
                $(function () {
                    function show_popup() {
                        $('.branchSaveCancelBtn').click();
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

function EditBranchDataBind(branchId) {
    $.ajax({
        url: GetBranchByBranchIdURL,
        data: {
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#BranchIdEdit').val(branchId);
            $('#branchNameEdit').val(data.branch);
            $('#branchCodeEdit').val(data.branchCode);
            $('#branchGlobalRegionEdit').val(data.branchGlobalRegion);
            $('#branchCountryEdit').val(data.branchCountry);
            $('#branchLocalRegionEdit').val(data.branchLocalRegion);
            $('#branchAreaEdit').val(data.branchArea);
            $('#branchAddressEdit').val(data.branchAddress);
            $('#branchContactNumberEdit').val(data.Telephone1);
            $('#branchEmailEdit').val(data.Email1);
            //$('#branchLocationLongEdit').val(data.branchCode);
           // $('#branchLocationLatEdit').val(data.branchCode);
            //$//('#branchAvgWaitingTimeEdit').val(data.branchCode);
            //$('#branchAvgServingTimeEdit').val(data.branchCode);
            $('#branchIPEdit').val(data.BranchIP);
            $('#syncPortEdit').val(data.SyncPort);
            $('#seatingCapacityEdit').val(data.seatingCapacity);

            $('#dgfgdgdfgdfgdgd').click();
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

function getAllBranches() {
    $.ajax({
        url: GetAllBranchesURL,
        data: {
            Parent: 0,
            branchLevel: 0
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<table class="table">                '
                         + '  <thead>                           '
                         + '      <tr>                          '
                         + '          <th>ID</th>               '
                         + '          <th>Branch Name </th>     '
                         + '          <th>Branch Code</th>      '
                         + '          <th>Local Region</th>     '
                         + '          <th>Area</th>             '
                         + '          <th>Seating Capacity</th>           '
                         + '          <th>Status</th>           '
                         + '          <th>Action</th>           '
                         + '      </tr>                         '
                         + '  </thead>                          '
                         + '  <tbody>                           ';
                                
                                
                            
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<tr>                              '
                          + '       <td>' + (i+1) + '</td>                 '
                          + '       <td>' + data[i].branch + '</td>       '
                          +'       <td>' + data[i].branchCode + '</td>               '
                          + '       <td>' + data[i].branchLocalRegion + '</td>           '
                          + '       <td>' + data[i].branchArea + '</td>         '
                          + '       <td>' + data[i].seatingCapacity + '</td>         '
                          + '       <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>            '
                          +'       <td>                       '
                          +'           <ul>                   '
                          + '               <li><a href="#" onclick="EditBranchDataBind(' + data[i].branchId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                          + '               <li style="display:none" ><a href="#" id="dgfgdgdfgdfgdgd" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                          +'               <li><a href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>'
                          +'           </ul>                  '
                          +'       </td>                      '
                          +'       </ul>                      '
                          +'   </tr>';
            }
            htmlTag += '</tbody></table>';

            $('#branchtableDiv').empty().append(htmlTag);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}


function LoadbranchAreaDropdown() {
    $.ajax({
        url: LoadGlobalRegionByParentUrl,
        data: {
            Parent: 0,
            type: -4
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="branchArea" onchange="" class="addClassdropdown">';
            var htmlTag2 = '<select id="branchAreaEdit" onchange="" class="addClassdropdown">';
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
                htmlTag2 += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
            }
            htmlTag += '</select>';
            htmlTag2 += '</select>';

            $('#branchAreaDiv').empty().append(htmlTag);
            $('#branchAreaDivEdit').empty().append(htmlTag2);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

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
            var htmlTag2 = '<select id="branchLocalRegionEdit" onchange="" class="addClassdropdown">';
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
                htmlTag2 += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
            }
            htmlTag += '</select>';
            htmlTag2 += '</select>';

            $('#branchLocalRegionDiv').empty().append(htmlTag);
            $('#branchLocalRegionDivEdit').empty().append(htmlTag2);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

function globalChanged() {
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
            var htmlTag2 = '<select id="branchCountryEdit" onchange="" class="addClassdropdown">';
            for (var i = 0 ; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
                htmlTag2 += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>';
            }
            htmlTag += '</select>';
            htmlTag2 += '</select>';

            $('#branchCountryDiv').empty().append(htmlTag);
            $('#branchCountryDivEdit').empty().append(htmlTag2);
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

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
            var htmlTag = '<select id="branchGlobalRegion" onchange="globalChanged()" class="addClassdropdown">';
            var htmlTag2 = '<select id="branchGlobalRegionEdit" onchange="globalChanged()" class="addClassdropdown">';
            for(var i =0 ; i < data.length;i++){
                htmlTag += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
                htmlTag2 += '<option type="text" class="form-control" value="' + data[i].branchId + '">' + data[i].branch + '</option>'
            }
            htmlTag += '</select>';
            htmlTag2 += '</select>';

            $('#branchGlobalRegionDiv').empty().append(htmlTag);
            $('#globalRegionDropDownDiv').empty().append(htmlTag2);
        },
        error: function (e) {
            alert("LoadGlobalRegionDropDown failed");
        }
    });
}

function SaveBranch() {
    var branchName = $('#branchName').val();
    var branchCode = $('#branchCode').val();
    var branchGlobalRegion = $('#branchGlobalRegion').val();
    var branchCountry = $('#branchCountry').val();
    var branchLocalRegion = $('#branchLocalRegion').val();
    var branchArea = $('#branchArea').val();
    var branchAddress = $('#branchAddress').val();
    var branchContactNumber = $('#branchContactNumber').val();
    var branchEmail = $('#branchEmail').val();
    var branchLocationLong = $('#branchLocationLong').val();
    var branchLocationLat = $('#branchLocationLat').val();
    var branchAvgWaitingTime = $('#branchAvgWaitingTime').val();
    var branchAvgServingTime = $('#branchAvgServingTime').val();
    var branchIP = $('#branchIP').val();
    var syncPort = $('#syncPort').val();
    var seatingCapacity = $('#seatingCapacity').val();
    if (seatingCapacity == null || seatingCapacity == "") {
        seatingCapacity = 0;
    }
    var BranchIsActive = 0;
    if ($('#BranchIsActive').is(":checked")) {
        BranchIsActive = 1;
    }

    var isValid = true;
    var Msge = "<ul>";

    if (branchName == null || branchName == "") {
        isValid = false;
        Msge += "<li>Branch Name is empty!</li>";
    }
    if (branchCode == null || branchCode == "") {
        isValid = false;
        Msge += "<li>Branch Code is empty!</li>";
    }
    if (branchIP == null || branchIP == "") {
        isValid = false;
        Msge += "<li>Branch ip is empty!</li>";
    }

    Msge += "</ul>";
    var DataString = JSON.stringify({
        branch: branchName,
        branchCode: branchCode,
        branchGlobalRegion: branchGlobalRegion,
        branchCountry: branchCountry,
        branchLocalRegion: branchLocalRegion,
        branchAreaId: branchArea,
        branchAddress: branchAddress,
        Telephone1: branchContactNumber,
        Email1: branchEmail,
        branchLocationLong: branchLocationLong,
        branchLocationLat: branchLocationLat,
        branchAvgWaitingTime: branchAvgWaitingTime,
        branchAvgServingTime: branchAvgServingTime,
        isAct: BranchIsActive,
        Level: 0,
        BranchIP: branchIP,
        SyncPort: syncPort,
        seatingCapacity: seatingCapacity
    });

    if (isValid) {
        $.ajax({
            url: SaveBranchUrl,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                getAllBranches();
                $(function () {
                    function show_popup() {
                        $('#branchSaveCancelBtn').click();
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
    $('.table').DataTable();
}
